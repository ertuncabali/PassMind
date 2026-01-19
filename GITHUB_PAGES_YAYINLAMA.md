# GitHub Pages ile Privacy Policy Yayınlama Rehberi

Bu rehber, PassMind Chrome Uzantısı'nın Privacy Policy sayfasını GitHub Pages üzerinden yayınlamak için adım adım talimatları içermektedir.

---

## 📋 Ön Gereksinimler

- GitHub hesabı
- Projenin GitHub'da bir repository'si olması
- `privacy-policy.html` dosyasının hazır olması ✓

---

## 🚀 Yayınlama Adımları

### Adım 1: Repository'yi GitHub'a Push Edin

Eğer henüz yapmadıysanız, projeyi GitHub'a yükleyin:

```bash
# Git repository başlat (eğer henüz yapılmadıysa)
git init

# Dosyaları ekle
git add .

# İlk commit
git commit -m "Initial commit: PassMind Chrome Extension"

# GitHub'da yeni bir repository oluşturun, sonra:
git remote add origin https://github.com/KULLANICI_ADI/REPO_ADI.git
git branch -M main
git push -u origin main
```

### Adım 2: GitHub Pages'i Aktif Edin

1. GitHub'da repository'nize gidin
2. **Settings** (Ayarlar) sekmesine tıklayın
3. Sol menüden **Pages** seçeneğine tıklayın
4. **Source** bölümünde:
   - **Branch** olarak `main` (veya `master`) seçin
   - **Folder** olarak `/ (root)` seçin
   - **Save** butonuna tıklayın

### Adım 3: Privacy Policy HTML Dosyasını Yerleştirin

**Seçenek 1: Root klasörde (Önerilen)**

`privacy-policy.html` dosyasını repository'nin root klasörüne yerleştirin:

```
showmypassord/
├── privacy-policy.html  ← Bu dosya burada olmalı
├── manifest.json
├── content.js
└── ...
```

**Seçenek 2: `docs` klasöründe**

Alternatif olarak, bir `docs` klasörü oluşturup oraya koyabilirsiniz:

```
showmypassord/
├── docs/
│   └── privacy-policy.html  ← Bu dosya burada
├── manifest.json
└── ...
```

Bu durumda GitHub Pages ayarlarında **Folder** olarak `/docs` seçmelisiniz.

### Adım 4: Dosyaları GitHub'a Push Edin

```bash
# Dosyaları ekle
git add privacy-policy.html
git commit -m "Add privacy policy HTML page for GitHub Pages"
git push origin main
```

### Adım 5: GitHub Pages URL'ini Alın

GitHub Pages aktif edildikten ve dosyalar push edildikten sonra:

1. **Settings > Pages** sayfasına tekrar gidin
2. Birkaç dakika bekleyin (genellikle 1-5 dakika)
3. Sayfanın üstünde yeşil bir kutuda URL görünecektir:

```
✅ Your site is live at https://KULLANICI_ADI.github.io/REPO_ADI/
```

**Eğer `privacy-policy.html` root'ta ise:**
- Privacy Policy URL'i: `https://KULLANICI_ADI.github.io/REPO_ADI/privacy-policy.html`

**Eğer `docs` klasöründe ise:**
- Privacy Policy URL'i: `https://KULLANICI_ADI.github.io/REPO_ADI/privacy-policy.html`

### Adım 6: URL'i Test Edin

1. Tarayıcınızda Privacy Policy URL'ine gidin
2. Sayfanın düzgün göründüğünü kontrol edin
3. Türkçe/İngilizce dil değiştirme butonunu test edin
4. Mobil görünümü kontrol edin

---

## 🔧 Özel Domain (Opsiyonel)

GitHub Pages'de özel bir domain kullanmak isterseniz:

1. **Settings > Pages** sayfasına gidin
2. **Custom domain** bölümüne domain'inizi girin (örn: `privacypolicy.yoursite.com`)
3. DNS ayarlarını yapın:
   - **A Record:** `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **CNAME Record:** `KULLANICI_ADI.github.io`

---

## 📝 Chrome Web Store İçin URL Kullanımı

Chrome Web Store listing'de Privacy Policy URL'i olarak şunu kullanın:

```
https://KULLANICI_ADI.github.io/REPO_ADI/privacy-policy.html
```

**Örnek:**
```
https://johndoe.github.io/showmypassord/privacy-policy.html
```

---

## 🎨 HTML Dosyasını Özelleştirme

`privacy-policy.html` dosyasını istediğiniz gibi özelleştirebilirsiniz:

- Renkleri değiştirmek için CSS `:root` değişkenlerini düzenleyin
- Logo eklemek için `<header>` bölümünü güncelleyin
- İletişim bilgilerini ekleyin

---

## ⚠️ Önemli Notlar

1. **Güncelleme Süresi:** GitHub Pages değişikliklerinin yayınlanması 1-10 dakika sürebilir
2. **HTTPS:** GitHub Pages otomatik olarak HTTPS sağlar ✓
3. **İndeksleme:** Sayfa otomatik olarak Google tarafından indekslenecektir
4. **Güncellemeler:** Privacy Policy'yi güncellediğinizde, sadece HTML dosyasını güncelleyip push edin

---

## 🐛 Sorun Giderme

### Sayfa görünmüyor?
- GitHub Pages ayarlarını kontrol edin (Settings > Pages)
- Branch ve folder ayarlarının doğru olduğundan emin olun
- Birkaç dakika bekleyin (deployment zaman alabilir)

### 404 Hatası?
- Dosya adının doğru olduğundan emin olun (`privacy-policy.html`)
- Dosyanın doğru klasörde olduğunu kontrol edin
- GitHub'da repository'nin **public** olduğundan emin olun (private repo'lar için GitHub Pro gerekir)

### Stil/CSS görünmüyor?
- HTML dosyasındaki CSS'in inline olduğundan emin olun (mevcut dosyada ✓)
- Tarayıcı cache'ini temizleyin

---

## ✅ Kontrol Listesi

Yayınlamadan önce:

- [ ] `privacy-policy.html` dosyası repository'de
- [ ] GitHub Pages aktif edildi
- [ ] Branch ve folder ayarları doğru
- [ ] Dosyalar GitHub'a push edildi
- [ ] URL çalışıyor ve test edildi
- [ ] Hem Türkçe hem İngilizce versiyon çalışıyor
- [ ] Mobil görünüm test edildi

---

## 📞 Yardım

Herhangi bir sorun yaşarsanız:
- [GitHub Pages Dokümantasyonu](https://docs.github.com/en/pages)
- [GitHub Community Forum](https://github.community/)

---

**Hazırladığınız URL'i Chrome Web Store listing'inde kullanabilirsiniz! 🎉**
