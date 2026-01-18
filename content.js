// Eye icon SVG (kapalı göz - password gizliyken)
const EYE_CLOSED_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';

// Eye icon SVG (açık göz - password görünürken)
const EYE_OPEN_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';

// Çeviri metinleri
const translations = {
  en: {
    title: 'Password Toggle',
    toggleAll: 'Show All',
    toggleAllHide: 'Hide All',
    passwordFieldsFound: 'password fields found',
    visible: 'Visible',
    hidden: 'Hidden',
    status: 'Status',
    active: 'Active',
    helpText: 'Show or hide all password fields at once',
    selectLanguage: 'Language',
    openSettings: 'Open password settings',
    close: 'Close'
  },
  de: {
    title: 'Passwort Toggle',
    toggleAll: 'Alle anzeigen',
    toggleAllHide: 'Alle ausblenden',
    passwordFieldsFound: 'Passwort-Felder gefunden',
    visible: 'Sichtbar',
    hidden: 'Versteckt',
    status: 'Status',
    active: 'Aktiv',
    helpText: 'Alle Passwort-Felder auf einmal anzeigen oder ausblenden',
    selectLanguage: 'Sprache',
    openSettings: 'Passwort-Einstellungen öffnen',
    close: 'Schließen'
  },
  fr: {
    title: 'Basculer Mot de Passe',
    toggleAll: 'Afficher Tout',
    toggleAllHide: 'Masquer Tout',
    passwordFieldsFound: 'champs de mot de passe trouvés',
    visible: 'Visible',
    hidden: 'Masqué',
    status: 'Statut',
    active: 'Actif',
    helpText: 'Afficher ou masquer tous les champs de mot de passe à la fois',
    selectLanguage: 'Langue',
    openSettings: 'Ouvrir les paramètres de mot de passe',
    close: 'Fermer'
  },
  tr: {
    title: 'Şifre Toggle',
    toggleAll: 'Tümünü Göster',
    toggleAllHide: 'Tümünü Gizle',
    passwordFieldsFound: 'adet password alanı bulundu',
    visible: 'Görünür',
    hidden: 'Gizli',
    status: 'Durum',
    active: 'Aktif',
    helpText: 'Tüm password alanlarını tek seferde göster veya gizle',
    selectLanguage: 'Dil',
    openSettings: 'Şifre ayarlarını aç',
    close: 'Kapat'
  },
  ar: {
    title: 'تبديل كلمة المرور',
    toggleAll: 'إظهار الكل',
    toggleAllHide: 'إخفاء الكل',
    passwordFieldsFound: 'حقل كلمة مرور موجود',
    visible: 'مرئي',
    hidden: 'مخفي',
    status: 'الحالة',
    active: 'نشط',
    helpText: 'إظهار أو إخفاء جميع حقول كلمة المرور دفعة واحدة',
    selectLanguage: 'اللغة',
    openSettings: 'فتح إعدادات كلمة المرور',
    close: 'إغلاق'
  }
};

// Chrome dilini tespit et
function detectBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  // Desteklenen diller
  const supportedLangs = ['en', 'de', 'fr', 'tr', 'ar'];
  
  if (supportedLangs.includes(langCode)) {
    return langCode;
  }
  
  // Varsayılan: İngilizce
  return 'en';
}

// Mevcut dil (Chrome dilinden veya varsayılan)
let currentLanguage = detectBrowserLanguage();

// Çeviri fonksiyonu
function t(key) {
  return translations[currentLanguage][key] || translations['en'][key] || key;
}

// Processed inputs için set (tekrar işleme yapılmasını engeller)
const processedInputs = new WeakSet();

// Global state - tüm password inputların görünürlüğü
let globalPasswordVisible = false;

// Sayfadaki tüm password inputlarının listesi (type değişse bile hafızada tutulur)
const passwordInputsList = new WeakSet();

// Mevcut tema (varsayılan: light)
let currentTheme = 'light';

/**
 * Sayfada password input var mı kontrol eder (listeye göre)
 * Wrapper varlığına bakarak kontrol eder - çünkü wrapper olan her input 
 * başlangıçta password input'uydu (type text'e dönse bile hafızada password input olarak kalır)
 */
function hasPasswordInput() {
  // Wrapper'lar var mı kontrol et (en güvenilir yöntem)
  // Eğer .show-password-wrapper varsa, demek ki en az bir password input işlenmiş
  const wrapperCount = document.querySelectorAll('.show-password-wrapper').length;
  if (wrapperCount > 0) {
    return true;
  }
  
  // Henüz işlenmemiş ama mevcut password input var mı kontrol et
  const activePasswordInputs = document.querySelectorAll('input[type="password"]').length;
  return activePasswordInputs > 0;
}

/**
 * Input'u her zaman güvenilir bir wrapper ile sarar
 * Bu yaklaşım tüm sitelerde çalışır
 */
function wrapInput(passwordInput) {
  // Eğer zaten wrapped edilmişse, mevcut wrapper'ı bul
  if (passwordInput.parentElement && passwordInput.parentElement.classList.contains('show-password-wrapper')) {
    return passwordInput.parentElement;
  }

  const inputStyle = window.getComputedStyle(passwordInput);
  
  // Yeni wrapper oluştur
  const wrapper = document.createElement('div');
  wrapper.className = 'show-password-wrapper';
  
  // Wrapper style'ları - input'un stilini koruyarak
  wrapper.style.position = 'relative';
  wrapper.style.display = inputStyle.display === 'inline' || inputStyle.display === 'inline-block' 
    ? 'inline-block' 
    : 'block';
  
  // Input'un genişliğini koru
  if (inputStyle.width && inputStyle.width !== 'auto' && inputStyle.width !== '100%') {
    wrapper.style.width = inputStyle.width;
  } else if (inputStyle.display === 'block' || inputStyle.width === '100%') {
    wrapper.style.width = '100%';
  }
  
  wrapper.style.maxWidth = '100%';
  wrapper.style.verticalAlign = inputStyle.verticalAlign || 'middle';
  
  // Input'un mevcut margin'lerini wrapper'a aktar
  const marginTop = inputStyle.marginTop;
  const marginBottom = inputStyle.marginBottom;
  const marginLeft = inputStyle.marginLeft;
  const marginRight = inputStyle.marginRight;
  
  wrapper.style.marginTop = marginTop;
  wrapper.style.marginBottom = marginBottom;
  wrapper.style.marginLeft = marginLeft;
  wrapper.style.marginRight = marginRight;
  
  // Input'un margin'lerini sıfırla (wrapper artık margin'i yönetiyor)
  passwordInput.style.marginTop = '0';
  passwordInput.style.marginBottom = '0';
  passwordInput.style.marginLeft = '0';
  passwordInput.style.marginRight = '0';
  
  // Wrapper'ı DOM'a ekle ve input'u içine taşı
  passwordInput.parentNode.insertBefore(wrapper, passwordInput);
  wrapper.appendChild(passwordInput);
  
  // Input'un genişliğini %100 yap (wrapper genişliği kontrol edecek)
  passwordInput.style.width = '100%';
  passwordInput.style.boxSizing = 'border-box';
  
  return wrapper;
}

/**
 * Password input'a toggle butonu ekler
 */
function addToggleButton(passwordInput) {
  // Eğer bu input zaten işlendiyse, tekrar işleme
  if (processedInputs.has(passwordInput)) {
    return;
  }

  // Password input listesine ekle (type değişse bile hafızada tutulur)
  passwordInputsList.add(passwordInput);

  // Input'u wrapper ile sar (sadece istatistikler için, buton eklenmiyor)
  const wrapper = wrapInput(passwordInput);
  
  // Buton artık eklenmiyor - sadece wrapper ile sarılıyor
  
  // İşlendi olarak işaretle
  processedInputs.add(passwordInput);
}

/**
 * Sayfadaki tüm password inputlarını bulur ve buton ekler
 */
function processPasswordInputs() {
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  passwordInputs.forEach(input => {
    if (!processedInputs.has(input)) {
      addToggleButton(input);
    }
  });
}

// Sayfa yüklendiğinde çalıştır
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', processPasswordInputs);
} else {
  processPasswordInputs();
}

// MutationObserver ile dinamik olarak eklenen password inputları izle
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    mutation.addedNodes.forEach(function(node) {
      if (node.nodeType === 1) { // Element node
        // Yeni eklenen node bir password input mu?
        if (node.tagName === 'INPUT' && node.type === 'password') {
          addToggleButton(node);
        }
        // Yeni eklenen node içinde password input var mı?
        const passwordInputs = node.querySelectorAll && node.querySelectorAll('input[type="password"]');
        if (passwordInputs) {
          passwordInputs.forEach(input => {
            if (!processedInputs.has(input)) {
              addToggleButton(input);
            }
          });
        }
      }
    });
  });
});

// Document body'yi izlemeye başla
observer.observe(document.body, {
  childList: true,
  subtree: true
});

/**
 * Tüm password inputlarını göster/gizle (global toggle)
 */
function toggleAllPasswords(show) {
  // Tüm password wrapper'larını bul
  const wrappers = document.querySelectorAll('.show-password-wrapper');
  
  wrappers.forEach(wrapper => {
    const input = wrapper.querySelector('input');
    
    if (input && processedInputs.has(input)) {
      // Input type'ını değiştir
      if (show) {
        if (input.type === 'password') {
          input.type = 'text';
        }
      } else {
        if (input.type === 'text') {
          input.type = 'password';
        }
      }
    }
  });
  
  globalPasswordVisible = show;
  
  // Drawer içeriğini güncelle
  updateDrawerContent();
}

/**
 * Password input sayısını hesapla
 */
function getPasswordInputCount() {
  return document.querySelectorAll('.show-password-wrapper').length;
}

/**
 * Drawer içeriğini güncelle
 */
function updateDrawerContent() {
  const drawer = document.getElementById('show-password-drawer');
  if (!drawer) return;
  
  const count = getPasswordInputCount();
  const detailText = drawer.querySelector('.show-password-detail-text');
  
  if (detailText) {
    const visibleCount = document.querySelectorAll('.show-password-wrapper input[type="text"]').length;
    const hiddenCount = count - visibleCount;
    
    detailText.innerHTML = `
      <div class="show-password-stat-item">
        <span class="stat-label">${t('visible')}:</span>
        <span class="stat-value">${visibleCount}</span>
      </div>
      <div class="show-password-stat-item">
        <span class="stat-label">${t('hidden')}:</span>
        <span class="stat-value">${hiddenCount}</span>
      </div>
      <div class="show-password-stat-action">
        <button id="global-toggle-btn" class="show-password-global-toggle-btn">
          ${globalPasswordVisible ? t('toggleAllHide') : t('toggleAll')}
        </button>
      </div>
    `;
    
    // Butonu yeniden bağla
    const newButton = detailText.querySelector('#global-toggle-btn');
    if (newButton) {
      // Önce eski event listener'ları temizle (eğer varsa)
      const clonedButton = newButton.cloneNode(true);
      newButton.parentNode.replaceChild(clonedButton, newButton);
      
      clonedButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        globalPasswordVisible = !globalPasswordVisible;
        toggleAllPasswords(globalPasswordVisible);
      });
    }
  }
}

/**
 * Drawer'daki tüm metinleri güncelle (dil değiştiğinde)
 */
function updateDrawerTexts() {
  const drawer = document.getElementById('show-password-drawer');
  if (!drawer) return;
  
  // Başlık - sabit kalır (extension adı)
  // title.textContent değiştirilmiyor, çünkü "Show My Password" sabit kalmalı
  
  // Kapat butonu
  const closeBtn = drawer.querySelector('#drawer-close-btn');
  if (closeBtn) {
    closeBtn.setAttribute('aria-label', t('close'));
  }
  
  // Toggle butonu
  const toggleBtn = drawer.querySelector('#show-password-drawer-toggle');
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-label', t('openSettings'));
  }
  
  // Global toggle butonu
  const globalToggleBtn = drawer.querySelector('#global-toggle-btn');
  if (globalToggleBtn) {
    globalToggleBtn.textContent = globalPasswordVisible ? t('toggleAllHide') : t('toggleAll');
  }
  
  // Status label
  const statusLabel = drawer.querySelector('.status-label');
  if (statusLabel) {
    statusLabel.textContent = `${t('status')}:`;
  }
  
  const statusValue = drawer.querySelector('.status-value');
  if (statusValue) {
    statusValue.textContent = t('active');
  }
  
  // Dil seçici label yok - kompakt görünüm
  
  // İçeriği güncelle
  updateDrawerContent();
}

/**
 * Dil değiştir
 */
function changeLanguage(langCode) {
  if (translations[langCode]) {
    currentLanguage = langCode;
    updateDrawerTexts();
  }
}

/**
 * Tema ayarlarını yükle ve uygula
 */
function loadAndApplyTheme() {
  chrome.storage.sync.get(['theme', 'togglePosition', 'drawerWidth', 'colorScheme'], function(result) {
    const theme = result.theme || 'light';
    const togglePosition = result.togglePosition || 'top-right';
    const drawerWidth = result.drawerWidth || 380;
    const colorScheme = result.colorScheme || 'purple';
    applyTheme(theme);
    applyTogglePosition(togglePosition);
    applyDrawerWidth(drawerWidth);
    applyColorScheme(colorScheme);
  });
}

/**
 * Renk şemasını uygula
 */
function applyColorScheme(scheme) {
  const drawer = document.getElementById('show-password-drawer');
  const toggleBtn = document.getElementById('show-password-drawer-toggle');
  
  // Tüm renk şeması class'larını kaldır
  const schemes = ['purple', 'blue', 'green', 'orange', 'red', 'dark'];
  schemes.forEach(s => {
    if (drawer) {
      drawer.classList.remove(`show-password-color-scheme-${s}`);
    }
    if (toggleBtn) {
      toggleBtn.classList.remove(`show-password-color-scheme-${s}`);
    }
  });
  
  // Yeni renk şeması class'ını ekle
  if (drawer) {
    drawer.classList.add(`show-password-color-scheme-${scheme}`);
  }
  if (toggleBtn) {
    toggleBtn.classList.add(`show-password-color-scheme-${scheme}`);
  }
}

/**
 * Drawer genişliğini uygula
 */
function applyDrawerWidth(width) {
  const drawer = document.getElementById('show-password-drawer');
  if (!drawer) return;
  
  // Drawer genişliğini ayarla
  drawer.style.width = width + 'px';
  
  // Kapalı durum için right değerini ayarla
  // Eğer drawer açık değilse, right değerini güncelle
  if (!drawer.classList.contains('show-password-drawer-open')) {
    drawer.style.right = `-${width + 20}px`;
  }
  // Drawer açıkken right: 0 olacak (CSS class ile), bu yüzden şimdi ayarlamıyoruz
}

/**
 * Toggle butonu pozisyonunu uygula
 */
function applyTogglePosition(position) {
  const toggleBtn = document.getElementById('show-password-drawer-toggle');
  if (!toggleBtn) return;
  
  // Önce tüm pozisyon class'larını kaldır
  toggleBtn.classList.remove(
    'show-password-toggle-top-right',
    'show-password-toggle-top-left',
    'show-password-toggle-bottom-right',
    'show-password-toggle-bottom-left'
  );
  
  // Yeni pozisyon class'ını ekle
  toggleBtn.classList.add(`show-password-toggle-${position}`);
}

/**
 * Tema uygula (light/dark/auto)
 */
function applyTheme(theme) {
  currentTheme = theme;
  
  // Auto modda sistem tercihini kontrol et
  let actualTheme = theme;
  if (theme === 'auto') {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    actualTheme = prefersDark ? 'dark' : 'light';
  }
  
  // Drawer varsa tema class'ını uygula
  const drawer = document.getElementById('show-password-drawer');
  const toggleBtn = document.getElementById('show-password-drawer-toggle');
  
  if (drawer) {
    if (actualTheme === 'dark') {
      drawer.classList.add('show-password-dark-theme');
    } else {
      drawer.classList.remove('show-password-dark-theme');
    }
  } 
  
  if (toggleBtn) {
    if (actualTheme === 'dark') {
      toggleBtn.classList.add('show-password-dark-theme');
    } else {
      toggleBtn.classList.remove('show-password-dark-theme');
    }
  }
  
  // Tema toggle buton icon'unu güncelle
  updateThemeToggleIcon();
}

/**
 * Tema toggle buton icon'unu güncelle
 */
function updateThemeToggleIcon() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (!themeToggleBtn) return;
  
  const themeIcon = themeToggleBtn.querySelector('.theme-icon');
  if (!themeIcon) return;
  
  // Mevcut temaya göre icon göster
  chrome.storage.sync.get(['theme'], function(result) {
    const theme = result.theme || 'light';
    let actualTheme = theme;
    
    if (theme === 'auto') {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      actualTheme = prefersDark ? 'dark' : 'light';
    }
    
    // Dark moddaysa güneş, light moddaysa ay ikonu göster
    if (actualTheme === 'dark') {
      themeIcon.textContent = '☀️';
    } else {
      themeIcon.textContent = '🌙';
    }
  });
}

/**
 * Tema toggle (light <-> dark arasında geçiş)
 */
function toggleTheme() {
  chrome.storage.sync.get(['theme'], function(result) {
    const currentStoredTheme = result.theme || 'light';
    let newTheme;
    
    // Eğer auto moddaysa, mevcut sistem temasına göre değiştir
    if (currentStoredTheme === 'auto') {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      newTheme = prefersDark ? 'light' : 'dark';
    } else if (currentStoredTheme === 'dark') {
      newTheme = 'light';
    } else {
      newTheme = 'dark';
    }
    
    // Yeni temayı kaydet
    chrome.storage.sync.set({ theme: newTheme }, function() {
      applyTheme(newTheme);
      
      // Tüm sekmelere bildirim gönder
      chrome.tabs.query({}, function(tabs) {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, { action: 'themeChanged', theme: newTheme }).catch(() => {
            // Hata olursa sessizce geç
          });
        });
      });
    });
  });
}

/**
 * Drawer'ı oluştur (sağ üstte buton + sağdan açılan panel)
 */
function createDrawer() {
  // Zaten varsa oluşturma
  if (document.getElementById('show-password-drawer-toggle')) {
    return;
  }
  
  // Sayfada password input var mı kontrol et
  if (!hasPasswordInput()) {
    return;
  }
  
  // Toggle butonu (pozisyon ayarı ile)
  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'show-password-drawer-toggle';
  toggleBtn.className = 'show-password-drawer-toggle show-password-toggle-top-right'; // Varsayılan
  toggleBtn.innerHTML = '🔒';
  toggleBtn.setAttribute('aria-label', t('openSettings'));
  
  // Drawer panel (sağdan açılan)
  const drawer = document.createElement('div');
  drawer.id = 'show-password-drawer';
  drawer.className = 'show-password-drawer';
  
  const count = getPasswordInputCount();
  
  drawer.innerHTML = `
    <div class="show-password-drawer-header">
      <h3 class="show-password-drawer-title">🔒 Show My Password</h3>
      <button id="drawer-close-btn" class="show-password-drawer-close" aria-label="${t('close')}">×</button>
    </div>
    <div class="show-password-drawer-content">
      <div class="show-password-info-section">
        <div class="show-password-detail-text">
          <div class="show-password-stat-item">
            <span class="stat-label">${t('visible')}:</span>
            <span class="stat-value">0</span>
          </div>
          <div class="show-password-stat-item">
            <span class="stat-label">${t('hidden')}:</span>
            <span class="stat-value">${count}</span>
          </div>
          <div class="show-password-stat-action">
            <button id="global-toggle-btn" class="show-password-global-toggle-btn">
              ${globalPasswordVisible ? t('toggleAllHide') : t('toggleAll')}
            </button>
          </div>
        </div>
      </div>
      
      <div class="show-password-status-section">
        <div class="show-password-status-item">
          <span class="status-label">${t('status')}:</span>
          <span class="status-value">${t('active')}</span>
        </div>
      </div>
      
      <div class="show-password-language-section">
        <button id="theme-toggle-btn" class="theme-toggle-btn" aria-label="Toggle theme">
          <span class="theme-icon">🌙</span>
        </button>
        <div class="language-select-wrapper">
          <span class="language-icon">🌐</span>
          <select id="language-select" class="language-select-compact">
            <option value="en" ${currentLanguage === 'en' ? 'selected' : ''}>English</option>
            <option value="de" ${currentLanguage === 'de' ? 'selected' : ''}>Deutsch</option>
            <option value="fr" ${currentLanguage === 'fr' ? 'selected' : ''}>Français</option>
            <option value="tr" ${currentLanguage === 'tr' ? 'selected' : ''}>Türkçe</option>
            <option value="ar" ${currentLanguage === 'ar' ? 'selected' : ''}>العربية</option>
          </select>
        </div>
      </div>
    </div>
  `;
  
  // Body'ye ekle
  const insertElements = () => {
    if (document.body) {
      document.body.appendChild(toggleBtn);
      document.body.appendChild(drawer);
      
      // Drawer içeriğini güncelle
      updateDrawerContent();
      
      // Tema yükle ve uygula
      loadAndApplyTheme();
    }
  };
  
  if (document.body) {
    insertElements();
  } else {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', insertElements);
    }
  }
  
  // Toggle butonu click event
  toggleBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    const isOpening = !drawer.classList.contains('show-password-drawer-open');
    drawer.classList.toggle('show-password-drawer-open');
    
    // Drawer açılıyorsa inline right style'ını kaldır (CSS class right: 0 uygulansın)
    // Drawer kapanıyorsa right değerini tekrar ayarla
    if (isOpening) {
      drawer.style.right = '';
    } else {
      // Drawer genişliğini al ve right değerini ayarla
      const drawerWidth = parseInt(drawer.style.width) || 380;
      drawer.style.right = `-${drawerWidth + 20}px`;
    }
    
    updateDrawerContent();
  });
  
  // Drawer kapat butonu
  const closeBtn = drawer.querySelector('#drawer-close-btn');
  closeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    drawer.classList.remove('show-password-drawer-open');
    
    // Drawer genişliğini al ve right değerini ayarla
    const drawerWidth = parseInt(drawer.style.width) || 380;
    drawer.style.right = `-${drawerWidth + 20}px`;
  });
  
  // Drawer dışına tıklanınca kapat
  drawer.addEventListener('click', function(e) {
    if (e.target === drawer) {
      drawer.classList.remove('show-password-drawer-open');
      
      // Drawer genişliğini al ve right değerini ayarla
      const drawerWidth = parseInt(drawer.style.width) || 380;
      drawer.style.right = `-${drawerWidth + 20}px`;
    }
  });
  
  // Global toggle butonu
  const globalToggleBtn = drawer.querySelector('#global-toggle-btn');
  globalToggleBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    globalPasswordVisible = !globalPasswordVisible;
    toggleAllPasswords(globalPasswordVisible);
    this.textContent = globalPasswordVisible ? t('toggleAllHide') : t('toggleAll');
  });
  
  // Dil seçici (drawer içinde)
  const languageSelect = drawer.querySelector('#language-select');
  languageSelect.addEventListener('change', function(e) {
    changeLanguage(this.value);
  });
  
  // Tema toggle butonu
  const themeToggleBtn = drawer.querySelector('#theme-toggle-btn');
  if (themeToggleBtn) {
    // İlk yüklemede icon'u güncelle
    setTimeout(() => updateThemeToggleIcon(), 100);
    themeToggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleTheme();
    });
  }
}

/**
 * Bildirim bar'ı oluştur (artık drawer kullanılıyor, bu fonksiyon drawer oluşturuyor)
 */
function createNotificationBar() {
  createDrawer();
}

// Bildirim bar'ı oluştur (password input bulunduktan sonra)
function initNotificationBar() {
  // Önce tema yükle
  loadAndApplyTheme();
  
  // Sonra password inputları işle, sonra bildirim bar'ı oluştur
  processPasswordInputs();
  
  // Password input var mı kontrol et (listeye göre)
  if (hasPasswordInput()) {
    createNotificationBar();
  }
}

// Tema değişikliklerini dinle (options sayfasından gelen mesajlar)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'themeChanged') {
    applyTheme(request.theme);
  } else if (request.action === 'settingsChanged') {
    if (request.theme !== undefined) {
      applyTheme(request.theme);
    }
    if (request.togglePosition !== undefined) {
      applyTogglePosition(request.togglePosition);
    }
    if (request.drawerWidth !== undefined) {
      applyDrawerWidth(request.drawerWidth);
    }
    if (request.colorScheme !== undefined) {
      applyColorScheme(request.colorScheme);
    }
  }
});

// Sistem tema tercihini dinle (auto mod için)
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
    if (currentTheme === 'auto') {
      applyTheme('auto');
    }
  });
}

// Sayfa yüklendiğinde veya password input bulunduğunda bildirim bar'ı oluştur
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNotificationBar);
} else {
  initNotificationBar();
}

// MutationObserver ile yeni password input eklendiğinde bildirim bar'ı kontrol et
const notificationObserver = new MutationObserver(function(mutations) {
  const hasNotification = document.getElementById('show-password-notification');
  
  // Bildirim yok ama password input varsa oluştur
  if (!hasNotification && hasPasswordInput()) {
    createNotificationBar();
  }
  // Bildirim var ama password input yoksa kaldır
  else if (hasNotification && !hasPasswordInput()) {
    const notification = document.getElementById('show-password-notification');
    if (notification) {
      notification.remove();
      if (document.body) {
        document.body.classList.remove('show-password-notification-visible');
      }
    }
  }
});

// Document body'yi izle (bildirim kontrolü için)
if (document.body) {
  notificationObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    notificationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}
