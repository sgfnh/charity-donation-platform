async function loadCampaigns() {
  const res = await fetch('http://localhost:7000/charity');
  const campaigns = await res.json();

  const container = document.getElementById('campaignsContainer');
  container.innerHTML = '';
  campaigns.forEach(c => {
    const div = document.createElement('div');
    div.className = 'campaign';

    div.innerHTML = `
    <img src="${c.imageUrl || 'https://via.placeholder.com/250x200'}" alt="Campaign Image" />
    <div class="campaign-details">
      <h3>${c.title}</h3>
      <p>${c.description}</p>
      <p class="tags"><strong>Tags:</strong> ${c.tags || 'None'}</p>
      <p><strong>By:</strong> ${c.Organization?.name || 'Unknown Organization'}</p>
      <button onclick="donateNow()">Donate</button>
    </div>
  `;

    container.appendChild(div);
  });
}

function donateNow() {
  // You can redirect to donation page or open a donation modal here.
  window.location.href = "/login/login.html";
}

loadCampaigns();