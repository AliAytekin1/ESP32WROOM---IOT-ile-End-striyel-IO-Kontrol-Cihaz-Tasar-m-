// Kullanıcı verilerini saklamak için basit bir simülasyon
let users = [
  { username: 'gorkem', email: 'gorkemgozukara601@gmail.com', password: 'gorkem3', role: 'admin' }
];

// Kartları saklamak için bir dizi
let cards = JSON.parse(localStorage.getItem('cards')) || [
  { id: 'kart1', name: '🟩 Fabrika Kartı', createdBy: 'system', visibleToAll: true, requiresPermission: false, approved: true },
  { id: 'kart2', name: '🟦 Ofis Kartı', createdBy: 'system', visibleToAll: true, requiresPermission: false, approved: true }
];

// Erişim izni isteyen kullanıcıları saklamak için bir dizi
let accessRequests = JSON.parse(localStorage.getItem('accessRequests')) || [];

// Kayıt olma işlemi
function registerUser() {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!username || !email || !password) {
    showAlert('Lütfen tüm alanları doldurun!');
    return;
  }

   // E-posta kontrolü
   if (email === 'gorkemgozukara601@gmail.com') {
    showAlert('Bu e-posta adresi ile kayıt olamazsınız!');
    return;
  }

  // Kullanıcı adı kontrolü
  if (username.toLowerCase() === 'gorkem') {
    showAlert('Bu kullanıcı adı ile kayıt olamazsınız!');
    return;
  }

  // Kullanıcıyı kaydet
  users.push({ username, email, password, role: 'user' });
  localStorage.setItem('username', username);

  // Giriş formuna yönlendirme
  showAlert('Kayıt işlemi başarılı! Giriş yapabilirsiniz.');
  toggleForm();
}

// Giriş yapma işlemi
function loginUser() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    showAlert('Lütfen tüm alanları doldurun!');
    return;
  }

  // Kullanıcı doğrulama
  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    localStorage.setItem('username', user.username);
    localStorage.setItem('email', user.email);
    localStorage.setItem('role', user.role);

    if (user.role === 'admin') {
      showAlert(`Giriş başarılı! Hoş geldiniz, Admin ${user.username}!`);
      setTimeout(() => {
        window.location.href = 'admin.html'; // Admin sayfasına yönlendirme
      }, 1500);
    } else {
      showAlert(`Giriş başarılı! Hoş geldiniz, ${user.username}!`);
      setTimeout(() => {
        window.location.href = 'home.html'; // Ana sayfaya yönlendirme
      }, 1500);
    }
  } else {
    showAlert('E-posta veya şifre hatalı!');
  }
}

// Kart ekleme işlemi
function addCard() {
  const cardName = document.getElementById('cardName').value;
  if (!cardName) {
    showAlert('Kart adı boş olamaz!');
    return;
  }

  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');
  const newCard = {
    id: `kart${cards.length + 1}`,
    name: cardName,
    createdBy: username,
    visibleToAll: role !== 'admin', // Admin eklerse sadece admin görebilir
    requiresPermission: role === 'admin', // Admin eklerse erişim izni gerektirir
    approved: role !== 'admin' // Admin eklerse otomatik onaylanmaz
  };

  cards.push(newCard);
  localStorage.setItem('cards', JSON.stringify(cards));
  renderCards();
  document.getElementById('cardName').value = ''; // Kart adı girişini temizle

  showAlert('Kart başarıyla eklendi.');
}

// Kartları listeleme işlemi
function renderCards() {
  const cardList = document.getElementById('cardList');
  cardList.innerHTML = ''; // Önce listeyi temizle
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  cards.forEach(card => {
    // Kartın görünürlük kontrolü
    if (card.visibleToAll || card.createdBy === username || role === 'admin') {
      const cardDiv = document.createElement('div');
      cardDiv.className = 'card';
      cardDiv.textContent = card.name;

      if (card.requiresPermission && !card.approved) {
        cardDiv.textContent += ' (Erişim İzni Gerekiyor)';
        cardDiv.onclick = () => requestPermission(card.id, card.name);
      } else {
        cardDiv.onclick = () => goToDetail(card.id);
      }

      cardList.appendChild(cardDiv);
    }
  });
}

// Kullanıcıların adminin eklediği kartlara erişim izni istemesi
function requestPermission(cardId, cardName) {
  const username = localStorage.getItem('username');
  accessRequests.push({ cardId, cardName, username });
  localStorage.setItem('accessRequests', JSON.stringify(accessRequests));
  showAlert(`${cardName} kartına erişim izni için admin onayı bekleniyor.`);
}

// Adminin kullanıcıların erişim isteklerini onaylaması
function approveAccessRequest(cardId, username) {
  const requestIndex = accessRequests.findIndex(req => req.cardId === cardId && req.username === username);
  if (requestIndex !== -1) {
    const card = cards.find(c => c.id === cardId);
    if (card) {
      card.approved = true;
      localStorage.setItem('cards', JSON.stringify(cards));
      showAlert(`${card.name} kartına erişim izni verildi.`);
    }
    accessRequests.splice(requestIndex, 1); // İsteği kaldır
    localStorage.setItem('accessRequests', JSON.stringify(accessRequests));
  }
}

// Detay sayfasına yönlendirme
function goToDetail(cardId) {
  alert(`${cardId} detayına yönlendiriliyorsunuz!`);
  // Burada detay sayfasına yönlendirme işlemi yapılabilir
  // Örneğin: window.location.href = `detail.html?card=${cardId}`;
}

// Uyarı mesajı gösterme
function showAlert(message) {
  const alertBox = document.getElementById('customAlert');
  const alertMessage = document.getElementById('alertMessage');

  alertMessage.textContent = `SİSTEM UYARISI! ${message}`;
  alertBox.classList.remove('hidden');
}

// Uyarı mesajını kapatma
function closeAlert() {
  const alertBox = document.getElementById('customAlert');
  alertBox.classList.add('hidden');
}

// Kart ekleme formunu kapatma
function closeCardForm() {
  const cardForm = document.getElementById('cardForm');
  cardForm.classList.add('hidden');
}