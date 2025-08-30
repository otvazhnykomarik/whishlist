const API_URL = "https://script.google.com/macros/s/AKfycbxv5V4C5b5r9vYAKt_qB1Vzd1pwyJ8Mz4lY6XFaQ-VfiCMM_nCwmGESPav4tp57l5hT/exec";
const SECRET_KEY = "КЛЮЧ"; // для admin.html

async function loadWishlist() {
  const response = await fetch(API_URL + "?action=get");
  const items = await response.json();
  const list = document.getElementById('wishlist');
  list.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${item.link}" target="_blank">${item.name}</a> - ${item.booked === 'Да' ? 'Забронировано' : '<button onclick="bookItem(\''+item.name+'\')">Забронировать</button>'}`;
    list.appendChild(li);
  });
}

async function addItem(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const link = document.getElementById('link').value;

  await fetch(`${API_URL}?action=add&name=${encodeURIComponent(name)}&link=${encodeURIComponent(link)}&key=${SECRET_KEY}`, { method: 'POST' });
  document.getElementById('addForm').reset();
  loadWishlist();
}

async function bookItem(name) {
  await fetch(`${API_URL}?action=book&name=${encodeURIComponent(name)}`, { method: 'POST' });
  loadWishlist();
}
