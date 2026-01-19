# PassMind - Chrome Web Store ZIP Paketi Oluşturma Script'i
# Adım 6: Production-ready extension paketi

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
if (-not $scriptRoot) { $scriptRoot = Get-Location }

Set-Location $scriptRoot

# .NET Zip sınıfı (PowerShell 5+)
Add-Type -AssemblyName System.IO.Compression.FileSystem

# Manifest'ten sürüm oku
$manifestPath = Join-Path $scriptRoot "manifest.json"
if (-not (Test-Path $manifestPath)) {
    Write-Error "manifest.json bulunamadı: $manifestPath"
}
$manifest = Get-Content $manifestPath -Raw -Encoding UTF8 | ConvertFrom-Json
$version = $manifest.version
$name = $manifest.name -replace "\s+", ""  # Boşlukları kaldır (PassMind)

# Çıktı dizini ve ZIP adı
$distDir = Join-Path $scriptRoot "dist"
$zipName = "${name}-v${version}.zip"
$zipPath = Join-Path $distDir $zipName

# Geçici build dizini
$buildDir = Join-Path $env:TEMP "passmind-build-$(Get-Date -Format 'yyyyMMddHHmmss')"

try {
    Write-Host "`n[*] PassMind ZIP paketi olusturuluyor...`n" -ForegroundColor Cyan

    # Build dizinini olustur
    New-Item -ItemType Directory -Path $buildDir -Force | Out-Null

    # ---- Dahil edilecek dosyalar (manifest.json'a uyumlu) ----
    $includeFiles = @(
        "manifest.json",
        "content.js",
        "content.css",
        "options.html",
        "options.js",
        "options-translations.js"
    )

    foreach ($f in $includeFiles) {
        $src = Join-Path $scriptRoot $f
        if (Test-Path $src) {
            Copy-Item $src -Destination $buildDir -Force
            Write-Host "  + $f" -ForegroundColor Green
        } else {
            Write-Warning "  ! Eksik: $f (atlanıyor)"
        }
    }

    # icons/ klasorunu kopyala
    $iconsSrc = Join-Path $scriptRoot "icons"
    $iconsDst = Join-Path $buildDir "icons"
    if (Test-Path $iconsSrc) {
        New-Item -ItemType Directory -Path $iconsDst -Force | Out-Null
        Copy-Item (Join-Path $iconsSrc "*") -Destination $iconsDst -Recurse -Force
        $iconCount = (Get-ChildItem $iconsDst -File).Count
        Write-Host "  + icons/ ($iconCount dosya)" -ForegroundColor Green
    } else {
        Write-Warning "  ! icons/ klasoru bulunamadi"
    }

    # dist/ olustur
    New-Item -ItemType Directory -Path $distDir -Force | Out-Null

    # Mevcut ZIP varsa sil (CreateFromDirectory ustune yazmaz)
    if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

    # ZIP olustur (build icerigi ZIP kokune yansir)
    [System.IO.Compression.ZipFile]::CreateFromDirectory($buildDir, $zipPath)

    $zipSize = (Get-Item $zipPath).Length / 1KB
    Write-Host "`n[OK] Paket olusturuldu:" -ForegroundColor Green
    Write-Host "     $zipPath" -ForegroundColor White
    Write-Host "     Boyut: $([math]::Round($zipSize, 2)) KB`n" -ForegroundColor Gray

    # Kisa ozet: disarida birakilanlar
    Write-Host "Disarida birakilanlar: .md, .git, photos/, test-page*, promo-*, privacy-policy*`n" -ForegroundColor DarkGray

} finally {
    # Gecici klasoru temizle
    if (Test-Path $buildDir) {
        Remove-Item $buildDir -Recurse -Force -ErrorAction SilentlyContinue
    }
}

Set-Location $scriptRoot
