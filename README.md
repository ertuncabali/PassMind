# Show My Password Chrome Extension

Password input alanlarının yanında şifre göster/gizle toggle butonu ekleyen basit Chrome extension.

## Özellikler

- Tüm web sayfalarında otomatik çalışır
- Password input alanlarının yanında göz ikonu butonu ekler
- Tek tıkla şifre göster/gizle (toggle)
- Dinamik olarak eklenen password inputları da destekler
- Hiçbir veri saklamaz veya API çağrısı yapmaz

## Kurulum

1. Chrome'u açın ve `chrome://extensions/` adresine gidin
2. Sağ üst köşedeki "Geliştirici modu" (Developer mode) seçeneğini aktifleştirin
3. "Paketlenmemiş uzantı yükle" (Load unpacked) butonuna tıklayın
4. Bu klasörü seçin

## Kullanım

Extension yüklendikten sonra herhangi bir web sayfasında password input alanının yanında bir göz ikonu görünecektir. İkona tıklayarak şifreyi görünür/gizli yapabilirsiniz.

- Kapalı göz ikonu: Şifre gizli
- Açık göz ikonu: Şifre görünür

## Geliştirme

### Dosya Yapısı

```
showmypassord/
├── manifest.json       # Extension yapılandırması
├── content.js          # Ana script (password input tespiti ve buton ekleme)
├── content.css         # Buton stilleri
└── icons/              # Extension iconları
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### Teknik Detaylar

- **Manifest V3** formatında yazılmıştır
- Content script tüm URL'lerde (`<all_urls>`) çalışır
- `MutationObserver` ile dinamik içerik değişiklikleri izlenir
- Hiçbir veri saklama mekanizması kullanılmaz

## Test

Extension'ı test etmek için:

1. Extension'ı yükleyin (yukarıdaki kurulum adımlarına bakın)
2. Herhangi bir login sayfasına gidin (örn: GitHub, Google)
3. Password input alanının yanında göz ikonunu kontrol edin
4. İkona tıklayarak şifreyi göster/gizle fonksiyonunu test edin

## Lisans

Bu proje özgürce kullanılabilir.

