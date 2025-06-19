document.getElementById('orgLoginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('orgEmail').value;
  const password = document.getElementById('orgPassword').value;

  const res = await fetch('http://localhost:7000/charity/organizationLogin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok) {
    alert('Login successful!');
    localStorage.setItem('orgEmail', email);
    window.location.href = '/charityOrganization/organizationdashboard/dashboard.html'; // Your organization dashboard page
  } else {
    alert(data.error || 'Login failed');
  }
});