
const donationForm = document.getElementById('donationForm');
const donationList = document.getElementById('donationList');
const downloadBtn = document.getElementById('downloadBtn');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageIndicator = document.getElementById('pageIndicator');

let currentPage = 1;
const pageSize = 5;
let totalPages = 1;

async function makeDonate(event) {
    event.preventDefault()

    const amount = document.getElementById('amount').value;
    const cause = document.getElementById('cause').value;

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    // add leading zeros to day and month if needed
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    // create the date string in date-month-year format
    const dateStr = `${formattedDay}-${formattedMonth}-${year}`;


    const data = {
        date: dateStr,
        amount: amount,
        cause: cause
    }

    try {
        const token = localStorage.getItem('token');
        const donate = await axios.post("http://localhost:7000/donate/donateR", data, { headers: { "Authorization": token } });
        console.log("yuiopjk x")
        donationForm.reset()
        donateCharity()

    } catch (err) {
        console.log(err);
    }
}
async function donateCharity() {
    const token = localStorage.getItem('token');
    const response = await axios.get("http://localhost:7000/donate/donateCharity", { headers: { "Authorization": token } })
    console.log(response.data);
    console.log(response.data.order.id);
    var options = {
        key: response.data.key_id,//Enter the key id generated from the dashboard
        order_id: response.data.order.id,//for one time payment
        ////this handler function will handle the success payment
        handler: async function (response) {
            const email = localStorage.getItem('userEmail');

            await axios.post(`http://localhost:7000/donate/updatetransaction/${email}`, {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            }, { headers: { "Authorization": token } })
            alert("thank you");
            getDonations()


        }
    }
    const rzp1 = new Razorpay(options);
    rzp1.open();

    rzp1.on('payment.failed', function (response) {
        console.log(response)
        alert("Payment Failed")
    })
}
async function getDonations() {
    const token = localStorage.getItem('token');
    const res = await axios.get(`http://localhost:7000/donate/donateGet?page=${currentPage}&limit=${pageSize}`, { headers: { Authorization: token } });
    res.data.getdonate.forEach(d => {
        donationList.innerHTML = '';
        const li = document.createElement('li');
        li.textContent = `You donated ${d.amount} to ${d.cause}.`;
        donationList.appendChild(li);
    })

    totalPages = res.data.totalPages;
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}


function download() {
    const token = localStorage.getItem('token');
    axios.get("http://localhost:7000/donate/download", { headers: { Authorization: token } })
        .then((response) => {
            if (response.status === 200) {

                var a = document.createElement("a");
                a.href = response.data.fileUrl;
                console.log(response);
                a.download = 'history.csv';
                a.click();
            } else {
                throw new Error(response.data.message);
            }
        }).catch((err) => {
            console.log(err);
        })
}
prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        getDonations();
    }
});

nextPageBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        getDonations();
    }
});

// Initial load
getDonations();
donationForm.addEventListener('submit', makeDonate)

downloadBtn.addEventListener('click', download)
const email = localStorage.getItem('userEmail');
async function load() {
    const res = await fetch(`http://localhost:7000/user/profile/${email}`);
    const dataValue = await res.json();
    document.getElementById('name').innerText = dataValue.name
}
load()