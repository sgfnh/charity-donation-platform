document.getElementById('orgRegisterForm').addEventListener('submit', async e => {
  e.preventDefault();
  const org = {
    name: orgName.value,
    email: orgEmail.value,
    password: orgPassword.value,
    phone: orgPhone.value,
    address: orgAddress.value,
    mission: orgMission.value,

  };
  const res = await fetch('http://localhost:7000/charity/organizationRegister', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(org)
  });
  const data = await res.json();
  alert(data.message);
  window.location.href = "/charityOrganization/organizationLogin/login.html";
});