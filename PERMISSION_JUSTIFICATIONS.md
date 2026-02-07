# Google Chrome Web Store – İzin Gerekçeleri

Bu dosya, PassMind uzantısını Google’da yayınlarken “Justification” / “Reason” alanlarına yapıştırmak için hazır metinleri içerir.

---

## 1. activeTab

**Kısa (önerilen):**
```
Required so the extension can interact with the current tab when the user clicks the extension icon or uses the corner button. We only use it to find password fields on the page and toggle their visibility locally. No page content or passwords are read, stored, or sent.
```

**Çok kısa:**
```
Needed to access the current tab when the user invokes the extension, so we can show or hide password fields on that page. Used only for local visibility toggling; no data is read or transmitted.
```

---

## 2. storage

**Kısa (önerilen):**
```
Used to save user preferences (language, theme, button position, drawer width, color scheme) so they persist across sessions and devices. Only these settings are stored; no passwords or personal data are ever saved.
```

**Çok kısa:**
```
Stores only the user's settings (language, theme, position, drawer width, color) so preferences are remembered. No passwords or personal data are stored.
```

---

## 3. Host permission / Ana makine izni (<all_urls>)

**Kısa (önerilen):**
```
Required so the extension can run on web pages that contain password fields. Users may log in on any site, so we need access to all URLs to offer show/hide passwords on any login form. We only change the visibility of password input fields in the page; we do not read, store, or transmit any page content or passwords.
```

**Çok kısa:**
```
Needed to work on any webpage where the user has a password field. We only toggle password visibility locally on the page; no content or passwords are read, stored, or sent.
```

---

## 4. Uzak kod kullanıyor musunuz? (Do you use remote code?)

**Cevap: Hayır / No**

Uzantı uzak kod kullanmıyor. Tüm JavaScript ve CSS dosyaları paket içinde yer alıyor; çalışma anında internetten kod yüklenmiyor.

**Formda kullanabileceğiniz İngilizce açıklama (isteğe bağlı):**
```
No. All code is bundled in the extension package. We do not use eval(), we do not load or execute any script from remote URLs, and we do not fetch or inject code at runtime. All behavior comes from content.js, content.css, options.js, and other files included in the extension.
```

**Çok kısa:**
```
No. All code is included in the extension; no scripts are loaded from the internet at runtime.
```

---

## Özet tablo

| İzin | Neden gerekli | Ne yapılmıyor |
|------|----------------|----------------|
| **activeTab** | Kullanıcı uzantıyı tetiklediğinde o sekmedeki sayfaya erişmek (şifre alanlarını göstermek/gizlemek) | Şifre veya sayfa içeriği okunmaz, saklanmaz, gönderilmez |
| **storage** | Dil, tema, buton pozisyonu, drawer genişliği, renk şeması gibi kullanıcı ayarlarını kaydetmek | Sadece bu ayarlar; şifre veya kişisel veri saklanmaz |
| **Host (<all_urls>)** | Her sitedeki giriş sayfalarında çalışabilmek | Sadece şifre alanının görünürlüğü değiştirilir; veri toplanmaz veya gönderilmez |

---

*Google Chrome Web Store yayın formunda her izin için yukarıdaki “Kısa” metinleri kopyalayıp ilgili gerekçe alanına yapıştırabilirsiniz.*
