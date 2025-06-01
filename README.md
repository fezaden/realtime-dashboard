# Realtime Dashboard

Bu proje, **Angular 20** ile hazırlanmış gerçek zamanlı (realtime) admin dashboard örneğidir.  
Canlı veri, dinamik tablo ve grafik, chat (mock WebSocket), login, ses kaydı gibi modern dashboard fonksiyonları içerir.

---

## 🚀 Özellikler

- **Güvenli Login:** Kriptolu şifre ile demo kullanıcı girişi
- **Canlı DataGrid:** Otomatik güncellenen ürün tablosu (CRUD + filtreleme)
- **Dinamik Grafik:** Gerçek zamanlı, büyüyen satış grafiği
- **Mock WebSocket Chat:** Frontend tabanlı, anlık mesajlaşma ekranı
- **Ses Kaydedici:** Tarayıcı ile ses kaydı & anında oynatma (anons işlemleri demo)
- **Modern Tasarım:** Şık kartlar, responsive menü, sade ve profesyonel görünüm

---

## 🛠️ Kurulum

Projeyi klonladıktan sonra terminalde şu komutları uygulayın:

```bash
npm install
Geliştirme Sunucusu
bash
Kopyala
Düzenle
ng serve
Uygulama http://localhost:4200/ adresinde çalışacaktır.

Demo Giriş Bilgileri
makefile
Kopyala
Düzenle
Kullanıcı adı: admin
Şifre: 123456
Temel Sayfalar ve Bileşenler
Login: /login

DataGrid: /dashboard/data-grid

Charts: /dashboard/charts

Voice Recorder: /dashboard/voice-recorder

Mock WebSocket: /dashboard/mock-websocket

Kod Scaffold'lama
Yeni bir component eklemek için:

bash
Kopyala
Düzenle
ng generate component component-ismi
Derleme
bash
Kopyala
Düzenle
ng build
Test
bash
Kopyala
Düzenle
ng test
📚 Klasör Yapısı (Kısa)
bash
Kopyala
Düzenle
src/
  app/
    auth/                # Login ekranı
    dashboard/
      data-grid/         # Canlı ürün tablosu
      charts/            # Grafikler
      voice-recorder/    # Ses kaydedici
      mock-websocket/    # Anlık chat demo
    shared/              # Ortak servisler
    
🛠️ Kullanılan Teknolojiler
Angular 20

Angular Material

RxJS

Chart.js

CryptoJS

Modern CSS/SCSS

💡 Notlar
Bu proje tamamen mock ve frontend odaklıdır.
Gerçek backend entegrasyonu için servisler kolayca uyarlanabilir.

Ses kaydı ve chat fonksiyonları demo amaçlıdır.

Responsive ve sade dashboard arayüzü içerir.

📄 Kaynaklar
Angular CLI Belgeleri

Angular Material

Chart.js

Kendi projenizde referans olarak kullanabilir, geliştirmeler ve PR’lar gönderebilirsiniz!

yaml
Kopyala
Düzenle

---

**Başka bir dökümantasyon, örnek veya İngilizce istersen de hazırlayabilirim!**  
Dosya ile ilgili başka ihtiyacın olursa hemen yazabilirsin.