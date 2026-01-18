// Sayfa yüklendiğinde mevcut ayarları yükle
document.addEventListener('DOMContentLoaded', function() {
  loadSettings();
  setupEventListeners();
});

// Mevcut ayarları yükle
function loadSettings() {
  chrome.storage.sync.get(['theme', 'togglePosition', 'drawerWidth', 'colorScheme'], function(result) {
    const theme = result.theme || 'light';
    const togglePosition = result.togglePosition || 'top-right';
    const drawerWidth = result.drawerWidth || 380;
    const colorScheme = result.colorScheme || 'purple';
    setActiveTheme(theme);
    setActivePosition(togglePosition);
    setDrawerWidth(drawerWidth);
    setActiveColorScheme(colorScheme);
  });
}

// Aktif renk şemasını göster
function setActiveColorScheme(scheme) {
  const options = document.querySelectorAll('.color-scheme-option');
  options.forEach(option => {
    option.classList.remove('active');
    if (option.dataset.scheme === scheme) {
      option.classList.add('active');
    }
  });
}

// Drawer genişliğini ayarla
function setDrawerWidth(width) {
  const slider = document.getElementById('drawer-width-slider');
  const valueDisplay = document.getElementById('drawer-width-value');
  if (slider) {
    slider.value = width;
  }
  if (valueDisplay) {
    valueDisplay.textContent = width;
  }
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

  // Renk şeması seçenekleri
  const colorSchemeOptions = document.querySelectorAll('.color-scheme-option');
  colorSchemeOptions.forEach(option => {
    option.addEventListener('click', function() {
      const scheme = this.dataset.scheme;
      setActiveColorScheme(scheme);
    });
  });

  // Drawer genişliği slider
  const drawerWidthSlider = document.getElementById('drawer-width-slider');
  const drawerWidthValue = document.getElementById('drawer-width-value');
  if (drawerWidthSlider && drawerWidthValue) {
    drawerWidthSlider.addEventListener('input', function() {
      drawerWidthValue.textContent = this.value;
    });
  }

  // Kaydet butonu
  const saveButton = document.getElementById('save-button');
  saveButton.addEventListener('click', saveSettings);
}

// Ayarları kaydet
function saveSettings() {
  const activeThemeOption = document.querySelector('.theme-option.active');
  const activePositionOption = document.querySelector('.position-option.active');
  const activeColorSchemeOption = document.querySelector('.color-scheme-option.active');
  const drawerWidthSlider = document.getElementById('drawer-width-slider');
  const theme = activeThemeOption ? activeThemeOption.dataset.theme : 'light';
  const togglePosition = activePositionOption ? activePositionOption.dataset.position : 'top-right';
  const colorScheme = activeColorSchemeOption ? activeColorSchemeOption.dataset.scheme : 'purple';
  const drawerWidth = drawerWidthSlider ? parseInt(drawerWidthSlider.value) : 380;

  chrome.storage.sync.set({ 
    theme: theme, 
    togglePosition: togglePosition,
    drawerWidth: drawerWidth,
    colorScheme: colorScheme
  }, function() {
    showStatusMessage('Ayarlar kaydedildi! Sayfayı yenileyerek değişiklikleri görebilirsiniz.', true);
    
    // Tüm sekmelere bildirim gönder (değişiklikleri uygulasınlar)
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, { 
          action: 'settingsChanged', 
          theme: theme,
          togglePosition: togglePosition,
          drawerWidth: drawerWidth,
          colorScheme: colorScheme
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
