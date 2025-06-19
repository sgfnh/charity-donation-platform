const subMenu = document.getElementById('sub-menu')
const editMenu = document.getElementById('edit-menu')
const transactionMenu = document.getElementById('transaction-menu')
function toggleMenu() {
  subMenu.classList.toggle("open-menu");
}
function toggleEditMenu() {
  editMenu.classList.toggle("open-menu");
}
function toggleTransaction() {

  transactionMenu.classList.toggle("open-menu");
}

const email = localStorage.getItem('userEmail');

async function showUserGreeting() {
  const email = localStorage.getItem('userEmail');
  if (!email) return;

  const res = await fetch(`http://localhost:7000/user/profile/${email}`);
  const user = await res.json();

  if (user.name) {
    document.getElementById('userGreeting').innerText = `${user.name}`;
  } else {
    document.getElementById('userGreeting').innerText = `${user.email}`;
  }
}

showUserGreeting();

async function loadProfile() {
  const res = await fetch(`http://localhost:7000/user/profile/${email}`);
  const data = await res.json();
  document.getElementById('email').innerText = data.email;
  document.getElementById('name').innerText = data.name || '';
  document.getElementById('phone').innerText = data.phone || '';
  document.getElementById('passportNumber').innerText = data.passportNumber || '';
  document.getElementById('dateOfBirth').innerText = data.dateOfBirth || '';
  document.getElementById('panNumber').innerText = data.panNumber || '';

  document.getElementById('editName').value = data.name || '';
  document.getElementById('editPhone').value = data.phone || '';
  document.getElementById('editPassport').value = data.passportNumber || '';
  document.getElementById('editDOB').value = data.dateOfBirth || '';
  document.getElementById('editPAN').value = data.panNumber || '';

}

function openEditForm() {
  document.getElementById('editForm').style.display = 'block';
}

async function updateProfile() {
  const name = document.getElementById('editName').value;
  const phone = document.getElementById('editPhone').value;
  const passportNumber = document.getElementById('editPassport').value;
  const dateOfBirth = document.getElementById('editDOB').value;
  const panNumber = document.getElementById('editPAN').value;

  const res = await fetch(`http://localhost:7000/user/profile/${email}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone, passportNumber, dateOfBirth, panNumber }),
  });

  const data = await res.json();
  alert("successfully");
  loadProfile();
}
function logout() {
  localStorage.removeItem('userEmail');
  window.location.href = '/login/login.html';
}
document.getElementById('donateBtn').addEventListener('click', () => {
  alert("Redirecting to the donation page...");
  window.location.href = "/donate/donate.html";
});



loadProfile();
async function loadTransactionHistory() {
  const email = localStorage.getItem('userEmail');
  if (!email) return alert('Not logged in');

  const res = await fetch(`http://localhost:7000/donate/history/${email}`);
  const history = await res.json();

  const tbody = document.getElementById('transactionBody');
  const table = document.getElementById('transactionTable');
  tbody.innerHTML = '';

  if (!history.length) {
    tbody.innerHTML = '<tr><td colspan="3">No donations found</td></tr>';
  } else {
    history.forEach(d => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${d.paymentid}td>
          <td>${d.orderid}</td>
          <td>${d.status}</td>
          <td>${d.createdAt}</td>
        `;
      tbody.appendChild(row);
    });
  }

  table.style.display = 'table';
}
loadTransactionHistory()