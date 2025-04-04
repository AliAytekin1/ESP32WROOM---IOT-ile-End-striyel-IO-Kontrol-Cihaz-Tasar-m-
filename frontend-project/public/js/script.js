function registerUser() {
  const name = document.getElementById('username').value;
  localStorage.setItem('username', name);
  alert("Kayıt başarılı!");
  window.location.href = "index.html";
}

function loginUser() {
  const name = localStorage.getItem('username');
  if (name) {
    window.location.href = "home.html";
  } else {
    alert("Kayıt bulunamadı. Lütfen kayıt olun.");
  }
}

function goToDetail(cardId) {
  // Gerçek sistemde ID ile API'den veri çekeriz
  window.location.href = "detail.html";
}