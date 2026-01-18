// Options sayfası çevirileri
const optionsTranslations = {
  en: {
    settingsTitle: 'Extension Settings',
    theme: 'Theme',
    themeDescription: 'Select the appearance of the extension',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeAuto: 'Auto',
    togglePosition: 'Toggle Button Position',
    togglePositionDescription: 'Select the position of the drawer toggle button',
    positionTopRight: 'Top Right',
    positionTopLeft: 'Top Left',
    positionBottomRight: 'Bottom Right',
    positionBottomLeft: 'Bottom Left',
    colorScheme: 'Color Scheme',
    colorSchemeDescription: 'Select color theme for drawer and buttons',
    drawerWidth: 'Drawer Width',
    drawerWidthDescription: 'Adjust the width of the drawer panel',
    saveButton: 'Save Settings',
    settingsSaved: 'Settings saved! You can see the changes by refreshing the page.'
  },
  de: {
    settingsTitle: 'Erweiterungseinstellungen',
    theme: 'Design',
    themeDescription: 'Wählen Sie das Erscheinungsbild der Erweiterung',
    themeLight: 'Hell',
    themeDark: 'Dunkel',
    themeAuto: 'Automatisch',
    togglePosition: 'Schaltflächenposition',
    togglePositionDescription: 'Wählen Sie die Position der Schubladen-Schaltfläche',
    positionTopRight: 'Oben Rechts',
    positionTopLeft: 'Oben Links',
    positionBottomRight: 'Unten Rechts',
    positionBottomLeft: 'Unten Links',
    colorScheme: 'Farbschema',
    colorSchemeDescription: 'Wählen Sie ein Farbschema für Schublade und Schaltflächen',
    drawerWidth: 'Schubladenbreite',
    drawerWidthDescription: 'Passen Sie die Breite des Schubladenpanels an',
    saveButton: 'Einstellungen speichern',
    settingsSaved: 'Einstellungen gespeichert! Sie können die Änderungen sehen, indem Sie die Seite aktualisieren.'
  },
  fr: {
    settingsTitle: 'Paramètres de l\'extension',
    theme: 'Thème',
    themeDescription: 'Sélectionnez l\'apparence de l\'extension',
    themeLight: 'Clair',
    themeDark: 'Sombre',
    themeAuto: 'Automatique',
    togglePosition: 'Position du bouton',
    togglePositionDescription: 'Sélectionnez la position du bouton de tiroir',
    positionTopRight: 'Haut Droite',
    positionTopLeft: 'Haut Gauche',
    positionBottomRight: 'Bas Droite',
    positionBottomLeft: 'Bas Gauche',
    colorScheme: 'Schéma de couleurs',
    colorSchemeDescription: 'Sélectionnez le thème de couleur pour le tiroir et les boutons',
    drawerWidth: 'Largeur du tiroir',
    drawerWidthDescription: 'Ajustez la largeur du panneau de tiroir',
    saveButton: 'Enregistrer les paramètres',
    settingsSaved: 'Paramètres enregistrés ! Vous pouvez voir les modifications en actualisant la page.'
  },
  tr: {
    settingsTitle: 'Extension Ayarları',
    theme: 'Tema',
    themeDescription: 'Extension\'ın görünümünü seçin',
    themeLight: 'Açık',
    themeDark: 'Koyu',
    themeAuto: 'Otomatik',
    togglePosition: 'Toggle Butonu Pozisyonu',
    togglePositionDescription: 'Drawer\'ı açan butonun konumunu seçin',
    positionTopRight: 'Sağ Üst',
    positionTopLeft: 'Sol Üst',
    positionBottomRight: 'Sağ Alt',
    positionBottomLeft: 'Sol Alt',
    colorScheme: 'Renk Şeması',
    colorSchemeDescription: 'Drawer ve butonlar için renk temasını seçin',
    drawerWidth: 'Drawer Genişliği',
    drawerWidthDescription: 'Drawer panelinin genişliğini ayarlayın',
    saveButton: 'Ayarları Kaydet',
    settingsSaved: 'Ayarlar kaydedildi! Sayfayı yenileyerek değişiklikleri görebilirsiniz.'
  },
  ar: {
    settingsTitle: 'إعدادات الامتداد',
    theme: 'المظهر',
    themeDescription: 'اختر مظهر الامتداد',
    themeLight: 'فاتح',
    themeDark: 'داكن',
    themeAuto: 'تلقائي',
    togglePosition: 'موضع الزر',
    togglePositionDescription: 'اختر موضع زر الدرج',
    positionTopRight: 'أعلى اليمين',
    positionTopLeft: 'أعلى اليسار',
    positionBottomRight: 'أسفل اليمين',
    positionBottomLeft: 'أسفل اليسار',
    colorScheme: 'نظام الألوان',
    colorSchemeDescription: 'اختر نظام الألوان للدرج والأزرار',
    drawerWidth: 'عرض الدرج',
    drawerWidthDescription: 'اضبط عرض لوحة الدرج',
    saveButton: 'حفظ الإعدادات',
    settingsSaved: 'تم حفظ الإعدادات! يمكنك رؤية التغييرات من خلال تحديث الصفحة.'
  }
};

// Dil tespiti
function detectBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  const langCode = browserLang.split('-')[0].toLowerCase();
  const supportedLangs = ['en', 'de', 'fr', 'tr', 'ar'];
  if (supportedLangs.includes(langCode)) {
    return langCode;
  }
  return 'en';
}

// Mevcut dil (başlangıçta browser dilinden tespit edilir, sonra storage'dan yüklenir)
let currentLanguage = detectBrowserLanguage();

// Çeviri fonksiyonu
function t(key) {
  return optionsTranslations[currentLanguage]?.[key] || optionsTranslations['en'][key] || key;
}

