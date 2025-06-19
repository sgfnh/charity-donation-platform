const express = require('express')
const app = express()

const userRoute = require('./routes/userRoute')
const donateAmount = require('./routes/donateRoute')
const charityOrganization = require('./routes/organizationRoute')
const adminRoute = require('./routes/adminRoute')

const userModel = require('./models/userModel')
const donateModel = require('./models/donateModel')
const Order = require('./models/order')
const Organization = require('./models/organization')
const Campaign = require('./models/campaign')

const sequelize = require('./util/db')

const dotenv = require('dotenv');
dotenv.config()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/home/home.html')
})

const cors = require('cors')
app.use(cors())

app.use('/user', userRoute)
app.use('/donate', donateAmount)
app.use('/charity', charityOrganization)
app.use('/admin', adminRoute)

userModel.hasMany(donateModel)
donateModel.belongsTo(userModel)
userModel.hasMany(Order);
Order.belongsTo(userModel);
Organization.hasMany(Campaign, { onDelete: 'CASCADE' });
Campaign.belongsTo(Organization);

sequelize
  .sync()
  .then(result => {
    app.listen(7000, () => {
      console.log("server is running")
    })
  })
  .catch((err) => {
    console.log("err", err)
  })