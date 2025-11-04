async function checkHealth() {
  try {
    const r = await fetch('/api/health');
    const j = await r.json();
    document.getElementById('status').textContent = j.status + ' @ ' + new Date(j.time).toLocaleTimeString();
  } catch (e) {
    document.getElementById('status').textContent = 'unhealthy';
  }
}

async function listMessages() {
  const ul = document.getElementById('messages');
  ul.innerHTML = 'Loading…';
  try {
    const r = await fetch('/api/messages');
    const j = await r.json();
    ul.innerHTML = '';
    j.forEach(m => {
      const li = document.createElement('li');
      li.textContent = `#${m.id} • ${m.text} • ${new Date(m.ts).toLocaleString()}`;
      ul.appendChild(li);
    });
  } catch (e) {
    ul.innerHTML = 'Failed to load messages.';
  }
}

document.getElementById('msgForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = document.getElementById('msgInput');
  const text = input.value.trim();
  if (!text) return;
  try {
    await fetch('/api/messages', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ text })
    });
    input.value='';
    await listMessages();
  } catch (e) {
    alert('Failed to add message.');
  }
});

checkHealth();
listMessages();
setInterval(checkHealth, 10000);
