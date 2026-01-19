# Chrome Web Store Listing Görselleri Rehberi

Bu rehber, PassMind Chrome Uzantısı için Chrome Web Store'a yüklenmesi gereken görsellerin nasıl hazırlanacağını açıklar.

---

## 📋 Gerekli Görseller

Chrome Web Store için iki tür görsel gereklidir:

### 1. Screenshots (Ekran Görüntüleri)
- **Minimum:** 1 adet
- **Maksimum:** 5 adet
- **Boyutlar:** 
  - **1280x800 piksel** (önerilen)
  - **640x400 piksel** (alternatif)
- **Format:** PNG veya JPEG
- **İçerik:** Uzantının çalışır durumda screenshot'ları

### 2. Promo Image (Tanıtım Görseli)
- **Zorunlu mu?** Hayır, ama **kesinlikle önerilir**
- **Boyut:** **440x280 piksel**
- **Format:** PNG veya JPEG
- **İçerik:** Uzantının özelliklerini gösteren görsel

---

## 🎯 Screenshot Hazırlama Adımları

### Adım 1: Uzantıyı Chrome'a Yükleyin

1. Chrome'u açın ve `chrome://extensions/` adresine gidin
2. Sağ üst köşedeki **"Geliştirici modu"** (Developer mode) seçeneğini aktifleştirin
3. **"Paketlenmemiş uzantı yükle"** (Load unpacked) butonuna tıklayın
4. Proje klasörünü seçin

### Adım 2: Test Sayfaları Hazırlayın

Uzantıyı göstermek için şu sayfaları kullanabilirsiniz:

**Önerilen Test Sayfaları:**
- GitHub Login: `https://github.com/login`
- Google Login: `https://accounts.google.com/signin`
- Facebook Login: `https://www.facebook.com/login`
- Kendi test sayfanız (HTML dosyası oluşturabilirsiniz)

**Kendi Test Sayfanızı Oluşturma:**

Aşağıdaki HTML kodunu bir dosyaya kaydedin (`test-page.html`):

```html
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PassMind Test Sayfası</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            max-width: 500px;
            margin: 100px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .login-form {
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            margin-bottom: 30px;
            color: #333;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            color: #666;
            font-weight: 500;
        }
        input[type="password"],
        input[type="text"] {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
            box-sizing: border-box;
        }
        button {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="login-form">
        <h1>🔒 Giriş Yap</h1>
        <form>
            <div class="form-group">
                <label>E-posta</label>
                <input type="text" placeholder="ornek@email.com">
            </div>
            <div class="form-group">
                <label>Şifre</label>
                <input type="password" placeholder="Şifrenizi girin">
            </div>
            <div class="form-group">
                <label>Şifre Tekrar</label>
                <input type="password" placeholder="Şifrenizi tekrar girin">
            </div>
            <button type="submit">Giriş Yap</button>
        </form>
    </div>
</body>
</html>
```

### Adım 3: Screenshot Senaryoları

Her screenshot farklı bir özelliği veya kullanım senaryosunu göstermelidir:

#### Screenshot 1: Temel Kullanım (Zorunlu)
**Ne Göstermeli:**
- Bir login formu
- Password input alanı görünür
- Sağ üst köşede PassMind drawer toggle butonu (🔒 ikonu)
- Drawer açık durumda (opsiyonel)

**Nasıl Hazırlanır:**
1. Test sayfasını açın
2. Password alanına bir şifre yazın
3. Sağ üst köşedeki 🔒 butonuna tıklayarak drawer'ı açın
4. Tarayıcı penceresini 1280x800 piksel boyutuna ayarlayın
5. Screenshot alın (Windows: `Win + Shift + S`, Mac: `Cmd + Shift + 4`)

#### Screenshot 2: Drawer Panel Detayı
**Ne Göstermeli:**
- Drawer panel açık durumda
- İstatistikler görünür (Visible: X, Hidden: Y)
- "Show All" veya "Hide All" butonu
- Dil seçici ve tema toggle butonu

**Nasıl Hazırlanır:**
1. Drawer'ı açın
2. Pencerenin sağ tarafını gösteren bir açıyla screenshot alın
3. Drawer içeriğinin net göründüğünden emin olun

#### Screenshot 3: Çoklu Password Alanları
**Ne Göstermeli:**
- Birden fazla password input alanı olan bir form
- Örneğin: Kayıt formu (şifre + şifre tekrar)
- Ekranın köşesinde 🔒 butonu görünür
- Drawer açık ve tüm password alanlarını göster/gizle kontrolü

**Nasıl Hazırlanır:**
1. Birden fazla password alanı olan bir sayfa açın
2. Ekranın köşesindeki 🔒 butonuna tıklayarak drawer'ı açın
3. Drawer içinde "Show All" butonu ile tüm şifreleri görünür yapın
4. Tüm alanların göründüğünden emin olun
5. Screenshot alın

#### Screenshot 4: Dark Theme
**Ne Göstermeli:**
- Dark tema aktif
- Drawer dark modda açık
- Modern ve profesyonel görünüm

**Nasıl Hazırlanır:**
1. Drawer'ı açın
2. Tema toggle butonuna tıklayarak dark moda geçin
3. Screenshot alın

#### Screenshot 5: Farklı Renk Şemaları
**Ne Göstermeli:**
- Farklı renk şemalarından birini gösterin
- Örneğin: Blue, Green veya Orange tema
- Ayarlar sayfasından renk şemasını değiştirin

**Nasıl Hazırlanır:**
1. `chrome://extensions/` → PassMind → "Ayrıntılar" → "Uzantı seçenekleri" açın
2. Renk şemasını değiştirin
3. Bir sayfada drawer'ı açın
4. Screenshot alın

---

## 🎨 Promo Image Hazırlama

Promo image, Chrome Web Store'da uzantınızın kart görünümünde gösterilir. Bu görsel çok önemlidir çünkü kullanıcıların ilk dikkatini çeker.

### Boyut ve Format
- **Boyut:** 440x280 piksel (kesinlikle bu boyutta olmalı)
- **Format:** PNG (şeffaf arka plan için) veya JPEG
- **Çözünürlük:** En az 72 DPI

### İçerik Önerileri

**Seçenek 1: Minimalist Tasarım**
- PassMind logosu/ikonu
- "PassMind" yazısı
- "Show/Hide Passwords" gibi kısa bir açıklama
- Gradient arka plan (uzantının renk şemasına uygun)

**Seçenek 2: Özellik Odaklı**
- 🔒 butonu ve drawer simgesi
- "🔒 PassMind" başlık
- "Password Toggle for All Websites" alt başlık
- Modern gradient arka plan

**Seçenek 3: Ekran Görüntüsü Özeti**
- Küçük bir login formu mockup'ı
- PassMind drawer'ın küçük bir görüntüsü
- "PassMind" branding

### Promo Image Tasarım Araçları

**Ücretsiz Araçlar:**
- **Canva** (https://www.canva.com) - Hazır şablonlar
- **Figma** (https://www.figma.com) - Profesyonel tasarım
- **GIMP** (https://www.gimp.org) - Ücretsiz Photoshop alternatifi
- **Photopea** (https://www.photopea.com) - Tarayıcı tabanlı Photoshop

**Hızlı Promo Image Oluşturma (Canva ile):**

1. Canva'ya gidin ve hesap oluşturun
2. "Özel boyut" seçin: 440x280 piksel
3. Gradient arka plan ekleyin (mor-mavi tonları)
4. Metin ekleyin:
   - Başlık: "🔒 PassMind" (büyük, kalın)
   - Alt başlık: "Password Toggle Extension" (küçük)
5. İkon veya görsel ekleyin
6. PNG olarak indirin

---

## 📸 Screenshot Alma Teknikleri

### Windows'ta Screenshot Alma

**Yöntem 1: Ekran Alıntısı Aracı**
1. `Win + Shift + S` tuşlarına basın
2. İstediğiniz alanı seçin
3. Screenshot otomatik olarak panoya kopyalanır
4. Paint veya başka bir editörde yapıştırın ve kaydedin

**Yöntem 2: Snipping Tool**
1. Başlat menüsünde "Ekran Alıntısı" arayın
2. "Yeni" butonuna tıklayın
3. İstediğiniz alanı seçin
4. Kaydet butonuna tıklayın

**Yöntem 3: Tarayıcı Eklentileri**
- **Awesome Screenshot** Chrome eklentisi
- **Nimbus Screenshot** Chrome eklentisi
- Bu eklentiler tam sayfa veya seçili alan screenshot'ı alabilir

### Mac'te Screenshot Alma

**Yöntem 1: Komut Satırı**
1. `Cmd + Shift + 4` tuşlarına basın
2. İstediğiniz alanı seçin
3. Screenshot masaüstüne kaydedilir

**Yöntem 2: Tam Ekran**
1. `Cmd + Shift + 3` - Tüm ekran
2. `Cmd + Shift + 4` - Seçili alan
3. `Cmd + Shift + 4 + Space` - Pencere

### Tarayıcı Penceresini Boyutlandırma

**Chrome Developer Tools ile:**
1. `F12` tuşuna basın (Developer Tools'u açın)
2. `Ctrl + Shift + M` (Windows) veya `Cmd + Shift + M` (Mac) - Responsive mode
3. Boyutu 1280x800 olarak ayarlayın
4. Screenshot alın

**Manuel Boyutlandırma:**
1. Chrome penceresini yeniden boyutlandırın
2. Tarayıcı çubuğunda boyutu kontrol edin
3. Tam ekran moduna geçmeyin (sadece pencereyi büyütün)

---

## ✂️ Screenshot Düzenleme

Screenshot'ları aldıktan sonra düzenlemeniz gerekebilir:

### Düzenleme Adımları

1. **Boyutlandırma:**
   - Screenshot'ı 1280x800 piksele getirin
   - Oranları koruyun (aspect ratio)

2. **Kırpma:**
   - Gereksiz alanları kaldırın
   - Önemli kısımları ortada tutun

3. **İyileştirme:**
   - Parlaklık/contrast ayarları
   - Keskinleştirme (gerekirse)
   - Gereksiz bilgileri gizleme (örneğin kişisel bilgiler)

4. **Markalama (Opsiyonel):**
   - Küçük bir watermark ekleyebilirsiniz
   - Ancak çok belirgin olmamalı

### Düzenleme Araçları

- **Paint** (Windows) - Temel düzenleme
- **Photoshop** - Profesyonel düzenleme
- **GIMP** - Ücretsiz alternatif
- **Photopea** - Tarayıcı tabanlı Photoshop
- **Canva** - Online düzenleme

---

## 📁 Dosya Organizasyonu

Screenshot'ları organize etmek için şu klasör yapısını öneriyoruz:

```
PassMind/
├── store-assets/
│   ├── screenshots/
│   │   ├── screenshot-1-basic-usage.png
│   │   ├── screenshot-2-drawer-panel.png
│   │   ├── screenshot-3-multiple-fields.png
│   │   ├── screenshot-4-dark-theme.png
│   │   └── screenshot-5-color-schemes.png
│   └── promo/
│       └── promo-image-440x280.png
```

---

## ✅ Kontrol Listesi

Screenshot'ları hazırladıktan sonra kontrol edin:

### Screenshot Kontrol Listesi
- [ ] En az 1 screenshot hazır
- [ ] Maksimum 5 screenshot
- [ ] Boyut: 1280x800 veya 640x400 piksel
- [ ] Format: PNG veya JPEG
- [ ] Her screenshot farklı bir özelliği gösteriyor
- [ ] Kişisel bilgiler gizlenmiş (e-posta, şifre vb.)
- [ ] Görüntü kalitesi yüksek (net ve keskin)
- [ ] Uzantı özellikleri açıkça görünüyor

### Promo Image Kontrol Listesi
- [ ] Boyut: Tam olarak 440x280 piksel
- [ ] Format: PNG veya JPEG
- [ ] Marka/logo görünür
- [ ] Metin okunabilir
- [ ] Renkler çekici ve profesyonel
- [ ] Küçük boyutta da okunabilir (thumbnail olarak gösterilecek)

---

## 🚀 Sonraki Adımlar

Screenshot'ları hazırladıktan sonra:

1. **Dosyaları kaydedin:** `store-assets/` klasörüne yerleştirin
2. **Adım 3'e geçin:** Store listing metadatalarını hazırlayın (STORE_LISTING.md)
3. **Chrome Web Store'a yükleyin:** Developer Dashboard'da screenshot'ları ekleyin

---

## 💡 İpuçları

1. **Profesyonel Görünüm:** Screenshot'larınız uzantınızın kalitesini yansıtmalı
2. **Çeşitlilik:** Her screenshot farklı bir özellik veya kullanım senaryosu göstermeli
3. **Netlik:** Görüntüler net ve okunabilir olmalı
4. **Gizlilik:** Kişisel bilgileri (e-posta, gerçek şifreler) göstermeyin
5. **Test:** Screenshot'ları küçük boyutta da kontrol edin (thumbnail görünümü)

---

## 📞 Yardım

Screenshot hazırlama konusunda sorun yaşarsanız:
- Chrome Web Store Developer Dokümantasyonu: https://developer.chrome.com/docs/webstore/images/
- Canva Şablonları: Chrome Web Store promo image şablonları arayın

---

**Hazırladığınız görselleri Chrome Web Store'a yüklerken kullanabilirsiniz! 🎉**

