# Chrome Web Store'a Yayınlama Planı

## Genel Bakış

Chrome Web Store'a yayınlamak için gerekli hazırlıklar ve adımlar:

1. **Ön hazırlık:** Privacy policy yayınlama, screenshot'lar, store listing içeriği
2. **Chrome Developer hesabı:** $5 tek seferlik ücret ile hesap oluşturma
3. **ZIP paketi:** Uzantı dosyalarını Chrome Web Store formatında paketleme
4. **Store listing:** Açıklamalar, görseller ve metadata hazırlama
5. **Yayınlama:** Upload ve inceleme süreci

## Adım 1: Privacy Policy URL'i Hazırlama

**Durum:** `privacy-policy.md` dosyası mevcut ancak publicly accessible URL gerekli.

**Seçenekler:**
- GitHub Pages (ücretsiz, otomatik hosting)
- Google Sites (ücretsiz)
- Kendi web sunucunuz (varsa)

**Eylem:**
- Privacy policy'yi public bir URL'e yükleme
- URL'i not etme (store listing'de kullanılacak)

## Adım 2: Store Listing Görselleri

**Gerekli görseller:**

1. **Screenshots (min 1, max 5):**
   - Boyut: 1280x800 veya 640x400 piksel
   - Format: PNG veya JPEG
   - İçerik: Uzantının çalışır durumda screenshot'ları

2. **Promo image (opsiyonel ama önerilen):**
   - Boyut: 440x280 piksel
   - Format: PNG veya JPEG
   - İçerik: Uzantının özelliklerini gösteren görsel

**Eylem:**
- Uzantıyı Chrome'da yükleyip test sayfalarında screenshot alma
- Promo image tasarlama (veya mevcut icon'dan yararlanma)

## Adım 3: Store Listing Metadataları

**Gerekli bilgiler:**

1. **Kısa açıklama (132 karakter):**
   - Mevcut: "Ekranın köşesindeki buton ile drawer'dan tüm password alanlarını göster/gizle"
   - İngilizce versiyonu da hazırlanmalı

2. **Uzun açıklama (132 karakter - 13200 karakter):**
   - README'deki içeriği genişletip store formatına uyarlama
   - Özellikler, kullanım, avantajlar

3. **Kategori:**
   - Productivity veya Developer Tools

4. **Dil:**
   - Türkçe ve İngilizce

5. **Etiketler (keywords):**
   - password, show password, toggle, security, privacy

**Eylem:**
- Store listing açıklamalarını hazırlama dosyası oluşturma

## Adım 4: Manifest.json Kontrolü ve Optimizasyonu

**Kontrol edilecekler:**

1. **Version:**
   - Mevcut: `1.0.0` ✓

2. **Description:**
   - Store listing ile uyumlu olmalı

3. **Permissions:**
   - `activeTab` ve `storage` - minimal ve uygun ✓

4. **Icons:**
   - 16, 48, 128 piksel mevcut ✓

5. **Optional permissions (varsa):**
   - Bildirilmeli

**Eylem:**
- `manifest.json` dosyasını Chrome Web Store standartlarına göre kontrol etme

## Adım 5: Chrome Developer Hesabı

**Gereksinimler:**
- Google hesabı
- $5 tek seferlik ücret (kredi kartı)
- Telefon doğrulama (gerekirse)

**Adımlar:**
1. https://chrome.google.com/webstore/devconsole adresine gitme
2. "Developer Dashboard" linkine tıklama
3. Ücreti ödeme ve hesap oluşturma
4. Hesap bilgilerini onaylama

## Adım 6: ZIP Paketi Oluşturma

**Dahil edilecek dosyalar:**
- `manifest.json`
- `content.js`
- `content.css`
- `options.html`
- `options.js`
- `icons/` klasörü (tüm icon dosyaları ile)

**Dışarıda bırakılacaklar:**
- `.md` dosyaları (README, privacy-policy, vb.)
- `.git/` klasörü
- Herhangi bir development dosyası

**Eylem:**
- Production-ready ZIP dosyası oluşturma script'i hazırlama

## Adım 7: Chrome Web Store'a Yükleme

**Developer Dashboard'da:**
1. "Yeni öğe" (New Item) butonuna tıklama
2. ZIP dosyasını yükleme
3. Store listing bilgilerini doldurma:
   - Başlık
   - Açıklamalar
   - Kategori
   - Dil
   - Privacy policy URL'i
   - Screenshot'lar
   - Promo image
4. İnceleme için gönderme

## Adım 8: İnceleme Süreci

**Beklenen süre:**
- İlk yayınlama: 1-7 gün
- Güncellemeler: 1-3 gün

**İnceleme sırasında kontrol edilenler:**
- Privacy policy erişilebilirliği
- Permissions kullanımı
- Fonksiyonel testler
- Policy uyumluluğu

**Eylem:**
- İnceleme sürecini takip etme
- Gerekirse Google'dan gelen geri bildirimlere yanıt verme

## Hazırlanacak Dosyalar

1. **`STORE_LISTING.md`** - Store listing içerikleri (açıklamalar, etiketler)
2. **`build-package.ps1`** - ZIP paketi oluşturma script'i (PowerShell)
3. **`store-checklist.md`** - Yayınlama öncesi kontrol listesi

## Önemli Notlar

- Privacy policy URL'i yayınlamadan önce hazır olmalı
- Screenshot'lar profesyonel görünmeli
- Açıklamalar SEO için optimize edilmeli
- İlk yayınlamadan sonra kullanıcı geri bildirimlerini takip etme planı

