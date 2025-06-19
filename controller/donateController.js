const donateM = require('../models/donateModel')
const Razorpay = require('razorpay');
const Order = require('../models/order')
const reports = require('../models/reports')
const jwt = require('jsonwebtoken')
const sendTransEmail = require('../email/emailSent');

const S3Service = require('../services/s3service')
const { Parser } = require('json2csv');

exports.donateDes = async (req, res) => {
  try {
    const { name, amount, cause, date } = req.body;
    await donateM.create({
      date: date,
      amount: amount,
      name: name,
      cause: cause,
      userId: req.user.id

    })
    console.log("name", name)
    res.status(200).json({ message: "Expenses added" });

  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, error: err })

  }
}
exports.getDonation = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  try {
    const totaldonate = await donateM.count({
      where: { userId: req.user.id }
    });
    const getdonate = await donateM.findAll({
      where: { userId: req.user.id },
      //const { count, rows } = await donateM.findAndCountAll({
      order: [['id', 'DESC']],
      limit,
      offset
    });

    res.json({

      getdonate: getdonate,
      totalPages: Math.ceil(totaldonate / limit),
      page,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching donations' });
  }
};
exports.donateCharity = async (req, res) => {
  try {
    var rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    })

    const amount = 2500;

    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      req.user.createOrder({ orderid: order.id, status: 'PENDING' }).then(() => {
        return res.status(201).json({ order, key_id: rzp.key_id });

      }).catch(err => {
        throw new Error(err)
      })
    })
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: 'Sometghing went wrong', error: err })
  }
}
function generateAccessToken(id, name) {
  return jwt.sign({ userId: id, name: name }, process.env.JWT_SECRET);
}
exports.updateTransaction = async (req, res) => {
  try {

    const userId = req.user.id;
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne({ where: { orderid: order_id } }) //2
    const promise1 = order.update({ paymentid: payment_id, status: 'SUCCESSFUL' })
    const promise2 = req.user.update({ charitydonation: true })
    const token = generateAccessToken(userId)
    console.log("op", token)

    Promise.all([promise1, promise2]).then(async () => {

      const { email } = req.params;
      await sendDonationConfirmationEmail({ toEmail: email });

      return res.status(202).json({ sucess: true, message: "Transaction Successful", token: generateAccessToken(userId) });

    }).catch((error) => {
      throw new Error(error)
    })



  } catch (err) {
    console.log(err);
    res.status(403).json({ errpr: err, message: 'Sometghing went wrong' })

  }
}

exports.downloadC = async (req, res, next) => {
  try {
    const userId = req.user.id
    const donate = await Order.findAll({ where: { userId: userId } })

    const stringifiedDonate = JSON.stringify(donate);

    const filename = `Expense${userId}/${new Date()}.txt`
    const fileUrl = await S3Service.uploadToS3(stringifiedDonate, filename);
    const today = new Date();

    let year = today.getFullYear();
    let month = today.getMonth() + 1; // Adding 1 because month is zero-based
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    const formattedDate = `${year}-${month}-${day}`;
    const formattedMonth = `${year}-${month}`

    const response = await reports.create({
      link: fileUrl,
      userId: userId,
      date: formattedDate,
      month: formattedMonth

    })

    res.status(200).json({ fileUrl, success: true })
  } catch (err) {
    res.status(500).json({ fileUrl: '', success: false, err: err })
    console.log("err", err)
  }
}
async function sendDonationConfirmationEmail({ toEmail }) {
  const emailData = {
    sender: { name: 'Charity Platform', email: 'poojapatel22200@gmail.com' },
    to: [{ email: toEmail }],
    subject: 'Thank you for your donation!',
    htmlContent: `
      <h3>Hello,</h3>
      <p>Thank you for your generous donation of .</p>
      <p>Your support helps us make a difference.</p>
      <br>
      <p>Regards,<br/>The Charity Team</p>
    `,
  };

  try {
    await sendTransEmail.sendTransacEmail(emailData);
    console.log('Donation email sent successfully');
  } catch (err) {
    console.error('Failed to send donation email:', err);
  }
}
exports.donationHistory = async (req, res) => {
  const email = req.params.email;
  const donations = await Order.findAll({

  });

  res.json(donations);
}