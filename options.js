// Sayfa yüklendiğinde mevcut ayarları yükle
document.addEventListener('DOMContentLoaded', function() {
  loadSettings();
  setupEventListeners();
});

// Mevcut ayarları yükle
function loadSettings() {
  chrome.storage.sync.get(['theme', 'togglePosition'], function(result) {
    const theme = result.theme || 'light';
    const togglePosition = result.togglePosition || 'top-right';
    setActiveTheme(theme);
    setActivePosition(togglePosition);
  });
}

// Aktif temayı göster
function setActiveTheme(theme) {
  const options = document.querySelectorAll('.theme-option');
  options.forEach(option => {
    option.classList.remove('active');
    if (option.dataset.theme === theme) {
      option.classList.add('active');
    }
  });
}

// Aktif pozisyonu göster
function setActivePosition(position) {
  const options = document.querySelectorAll('.position-option');
  options.forEach(option => {
    option.classList.remove('active');
    if (option.dataset.position === position) {
      option.classList.add('active');
    }
  });
}

// Event listener'ları ayarla
function setupEventListeners() {
  // Tema seçenekleri
  const themeOptions = document.querySelectorAll('.theme-option');
  themeOptions.forEach(option => {
    option.addEventListener('click', function() {
      const theme = this.dataset.theme;
      setActiveTheme(theme);
    });
  });

  // Pozisyon seçenekleri
  const positionOptions = document.querySelectorAll('.position-option');
  positionOptions.forEach(option => {
    option.addEventListener('click', function() {
      const position = this.dataset.position;
      setActivePosition(position);
    });
  });

  // Kaydet butonu
  const saveButton = document.getElementById('save-button');
  saveButton.addEventListener('click', saveSettings);
}

// Ayarları kaydet
function saveSettings() {
  const activeThemeOption = document.querySelector('.theme-option.active');
  const activePositionOption = document.querySelector('.position-option.active');
  const theme = activeThemeOption ? activeThemeOption.dataset.theme : 'light';
  const togglePosition = activePositionOption ? activePositionOption.dataset.position : 'top-right';

  chrome.storage.sync.set({ theme: theme, togglePosition: togglePosition }, function() {
    showStatusMessage('Ayarlar kaydedildi! Sayfayı yenileyerek değişiklikleri görebilirsiniz.', true);
    
    // Tüm sekmelere bildirim gönder (değişiklikleri uygulasınlar)
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, { 
          action: 'settingsChanged', 
          theme: theme,
          togglePosition: togglePosition
        }).catch(() => {
          // Hata olursa (mesela content script yüklenmemişse) sessizce geç
        });
      });
    });
  });
}

// Durum mesajı göster
function showStatusMessage(message, isSuccess) {
  const statusMessage = document.getElementById('status-message');
  statusMessage.textContent = message;
  statusMessage.className = 'status-message ' + (isSuccess ? 'success' : '');
  
  // 3 saniye sonra gizle
  setTimeout(() => {
    statusMessage.className = 'status-message';
  }, 3000);
}
