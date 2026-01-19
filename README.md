# PassMind Chrome Extension

Ekranın köşesindeki buton ile drawer üzerinden password alanlarını göster/gizle özelliği sunan basit Chrome extension.

## Özellikler

- Tüm web sayfalarında otomatik çalışır
- Sayfada password input alanı olduğunda ekranın köşesinde 🔒 butonu görünür
- Drawer panel ile tüm password alanlarını tek seferde göster/gizle
- Buton pozisyonu ayarlanabilir (sağ üst/alt, sol üst/alt)
- Dinamik olarak eklenen password inputları da destekler
- Hiçbir veri saklamaz veya API çağrısı yapmaz

## Kurulum

1. Chrome'u açın ve `chrome://extensions/` adresine gidin
2. Sağ üst köşedeki "Geliştirici modu" (Developer mode) seçeneğini aktifleştirin
3. "Paketlenmemiş uzantı yükle" (Load unpacked) butonuna tıklayın
4. Bu klasörü seçin

## Kullanım

Extension yüklendikten sonra herhangi bir web sayfasında password input alanı olduğunda ekranın köşesinde (varsayılan: sağ üst) 🔒 butonu görünecektir. Butona tıklayarak drawer panelini açın ve tüm şifreleri tek seferde göster/gizle yapabilirsiniz.

- Drawer açık: Tüm password alanlarını göster/gizle kontrolü
- Drawer kapalı: Buton köşede gizli durumda

## Geliştirme

### Dosya Yapısı

```
PassMind/
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
3. Ekranın köşesinde (varsayılan: sağ üst) 🔒 butonunu kontrol edin
4. Butona tıklayarak drawer'ı açın ve "Show All" / "Hide All" butonlarıyla şifre göster/gizle fonksiyonunu test edin

## Lisans

Bu proje özgürce kullanılabilir.

