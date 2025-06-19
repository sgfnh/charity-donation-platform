const email = localStorage.getItem('orgEmail');

if (!email) {
  window.location.href = '../charityOrganization/organizationLogin/login.html'; // Not logged in
}

async function loadOrganization() {
  const res = await fetch(`http://localhost:7000/user/profile/${email}`);
  const org = await res.json();

  document.getElementById('orgName').innerText = `Welcome ${org.name}`;
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('orgEmail');
  window.location.href = '/charityOrganization/organizationLogin/login.html';
});

loadOrganization();


document.getElementById('campaignForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value
  const description = document.getElementById('description').value
  const imageUrl = document.getElementById('imageUrl').value
  const tags = document.getElementById('tags').value

  const res = await fetch('http://localhost:7000/charity/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, orgEmail: email, imageUrl, tags })
  });
  const data = await res.json();

  if (res.ok) {
    alert("✅ Campaign Launched!");
    loadCampaigns();
    document.getElementById('campaignForm').reset();
  } else {
    alert(data.error || "Failed to launch campaign");
  }

});

async function loadCampaigns() {
  const res = await fetch(`http://localhost:7000/charity/${email}`);
  const campaigns = await res.json();

  const list = document.getElementById('campaignList');
  list.innerHTML = '';

  campaigns.forEach(c => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${c.imageUrl || ''}" style="width: 100px; height: auto;" />
      <h4>${c.title}</h4>
      <p>${c.description}</p>

      <p><strong>Tags:</strong> ${c.tags || 'None'}</p>
      <button onclick="editCampaign(${c.id})">✏️ Edit</button>
      <button onclick="deleteCampaign(${c.id})">🗑️ Delete</button>
      <hr/>
    `;
    list.appendChild(li);
  });
}
function editCampaign(id) {
  const newTitle = prompt("New title:");
  const newDescription = prompt("New description:");
  //const newGoal = prompt("New goal amount:");
  const newImage = prompt("New image URL:");
  const newTags = prompt("New tags (comma separated):");

  fetch(`http://localhost:7000/charity/update/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: newTitle,
      description: newDescription,

      imageUrl: newImage,
      tags: newTags
    })
  }).then(() => loadCampaigns());
}

function deleteCampaign(id) {
  if (confirm("Are you sure you want to delete this campaign?")) {
    fetch(`http://localhost:7000/charity/delete/${id}`, {
      method: 'DELETE'
    }).then(() => loadCampaigns());
  }
}


loadCampaigns();