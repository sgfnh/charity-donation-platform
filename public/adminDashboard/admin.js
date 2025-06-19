async function loadUsers() {
  const res = await fetch('/admin/users');
  const users = await res.json();
  const table = document.querySelector('#usersTable tbody');
  table.innerHTML = '';
  users.forEach(u => {
    table.innerHTML += `
          <tr>
            <td>${u.id}</td>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td>${u.isActive ? 'Active' : 'Inactive'}</td>
            <td>
              <button onclick="toggleUser(${u.id})">${u.isActive ? 'Deactivate' : 'Activate'}</button>
              <button onclick="deleteUser(${u.id})">Delete</button>
            </td>
          </tr>
        `;
  });
}

async function toggleUser(id) {
  await fetch(`/admin/user/${id}/toggle`, { method: 'PUT' });
  loadUsers();
}

async function deleteUser(id) {
  if (confirm("Delete user?")) {
    await fetch(`/admin/user/${id}`, { method: 'DELETE' });
    loadUsers();
  }
}

async function loadCampaigns() {
  const res = await fetch('/admin/campaigns');
  const campaigns = await res.json();
  const table = document.querySelector('#campaignsTable tbody');
  table.innerHTML = '';
  campaigns.forEach(c => {
    table.innerHTML += `
          <tr>
            <td>${c.id}</td>
            <td>${c.title}</td>
            <td>${c.tags}</td>
            <td>${c.isActive ? 'Active' : 'Inactive'}</td>
            <td>
              <button onclick="toggleCampaign(${c.id})">${c.isActive ? 'Deactivate' : 'Activate'}</button>
              <button onclick="deleteCampaign(${c.id})">Delete</button>
            </td>
          </tr>
        `;
  });
}

async function toggleCampaign(id) {
  await fetch(`/admin/campaign/${id}/toggle`, { method: 'PUT' });
  loadCampaigns();
}

async function deleteCampaign(id) {
  if (confirm("Delete campaign?")) {
    await fetch(`/admin/campaign/${id}`, { method: 'DELETE' });
    loadCampaigns();
  }
}

loadUsers();
loadCampaigns();