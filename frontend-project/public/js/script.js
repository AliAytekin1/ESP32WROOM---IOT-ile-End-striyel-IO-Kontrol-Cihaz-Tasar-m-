// Kullanıcı verilerini saklamak için basit bir simülasyon
let users = [];

// Kayıt olma işlemi
function registerUser() {
  console.log('registerUser fonksiyonu çağrıldı');
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!username || !email || !password) {
    alert('Lütfen tüm alanları doldurun!');
    return;
  }

  // Kullanıcıyı kaydet
  users.push({ username, email, password });
  alert('Kayıt başarıyla oluşturuldu!');

  // Giriş formuna yönlendirme
  toggleForm();
}

// Giriş yapma işlemi
function loginUser() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    alert('Lütfen tüm alanları doldurun!');
    return;
  }

  // Kullanıcı doğrulama
  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    alert(`Giriş başarılı! Hoş geldiniz, ${user.username}!`);
    window.location.href = 'home.html'; // Ana sayfaya yönlendirme
  } else {
    alert('E-posta veya şifre hatalı!');
  }
}

// Formlar arasında geçiş yapma
function toggleForm() {
  const loginBox = document.getElementById('loginBox');
  const registerBox = document.getElementById('registerBox');

  // Giriş ve kayıt formları arasında geçiş yap
  if (loginBox.classList.contains('active')) {
    loginBox.classList.remove('active');
    loginBox.classList.add('hidden');
    registerBox.classList.remove('hidden');
    registerBox.classList.add('active');
  } else {
    registerBox.classList.remove('active');
    registerBox.classList.add('hidden');
    loginBox.classList.remove('hidden');
    loginBox.classList.add('active');
  }
}

//home.html sayfasında kartları oluşturma
function goToDetail(cardId) {
  alert(`${cardId} detayına yönlendiriliyorsunuz!`);
  // Burada detay sayfasına yönlendirme işlemi yapılabilir
  // Örneğin: window.location.href = `detail.html?card=${cardId}`;
}