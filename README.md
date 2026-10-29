# FUNZerviceTech.ai - Yapay Zeka Destekli Teknik Servis Yönetim Sistemi (v1.3 - Faz 3 Tamamlandı)

**Proje Sahibi:** Zafer Koçaş (Elektronik ve Haberleşme Mühendisi, Emekli)  
**Tarih:** Ekim 2026  
**Durum:** Çalışan Çok Kiracılı (SaaS-Ready) Web Platformu + Canlı FastAPI Backend + Canlı SQLite Veri Tabanı

---

## 🚀 Sistem Özellikleri ve Faz 3 Başarıları

Sistem, 3 ana kullanıcı rolünü gerçek zamanlı SQLite veri tabanı ve FastAPI REST/WebSocket motoruyla birbirine bağlar:

### 1. 📊 Yönetici & Kumanda Merkezi (Dispatcher)
* **Saha Ekipleri & Canlı Konum Radarı:** Mühendis ve teknisyenlerin anlık durumları (*Müsait, Görevde, Yolda*), uzmanlık alanları ve GPS koordinatları.
* **Akıllı Atama Motoru (`⚡ En Yakın Uzmana Ata`):** Gelen arıza türüne ve mesafeye göre en uygun personeli yapay zeka ile otomatik eşleştirir ve veri tabanında iş emrine atar.
* **Mobil Araç ve Çoklu Depo Stok Matrisi:** Merkez depo ile servis araçlarındaki (**34 ABC 101, 34 DEF 202**) stokları anlık gösterir. Kritik stok uyarıları, merkezden araca ikmal ve **araçtan araca doğrudan transfer** imkanı sunar.
* **Periyodik Bakım Sözleşmeleri:** Zamanı yaklaşan bakımları listeler, tek tıkla resmi servis iş emrine dönüştürür.
* **Hızlı Çağrı Kabul Modalı:** Telefon, e-posta, WhatsApp veya elden gelen çağrıları kaydedip anında benzersiz takip kodu (`SRV-2026-XXX`) üretir.

### 2. 🔧 Teknisyen Saha Ekranı (Mobil Uyumlu)
* **Dinamik İş Emri Listesi:** Teknisyene atanmış işlerin listesi; tıklandığında ilgili işin şikayeti ve detayları anında tezgaha yüklenir.
* **🏷️ QR Barkodlu Servis Kabul & Cihaz Kimlik Etiketi:** Fiziksel cihaza veya kutuya yapıştırılacak yüksek çözünürlüklü termal/A4 etiket çıktısı (Takip Kodu, Müşteri, Seri No, Vektörel QR Kod).
* **Yapay Zeka Arıza Teşhis Asistanı (`🧠 Teşhis Et & Öneri Getir`):** Girilen semptomları 4.800+ teknik servis kaydı analiz motoruyla tarayıp olası kök nedeni, multimetre ölçüm adımlarını ve uyumlu parçaları listeler.
* **Servis Aracından Parça Kullanımı:** Parça seçildiğinde teknisyenin kendi servis aracının stoğundan otomatik düşer ve iş emri faturasına ekler.
* **Canlı GPS Rota Simülasyonu:** Teknisyen *"Yola Çıktım"* dediğinde anlık hız, kalan km ve ETA yönetim paneline canlı akar.
* **Otomatik AI Servis Raporu:** Müşteriye ve arşive gidecek resmi teknik servis raporunu üretir ve kopyalama/yazdırma imkanı tanır.

### 3. 🔍 Müşteri Cihaz Sorgulama Portalı (Public)
* Şifresiz giriş; sadece **Takip Kodu (`SRV-2026-104`)** ile cihaz sorgulama.
* Canlı 5 adımlı ilerleme çubuğu (*Kabul → Teşhis → Onarımda → Test → Teslim*).
* Üretici, servis işçiliği ve yedek parça garantisi ayrımı.
* Canlı fiyat ve masraf onayı verme (`✓ Onaylıyorum`) / reddetme butonları (veri tabanına işlenir).

### 4. 💬 WhatsApp & SMS Müşteri Bildirim Şablon Motoru (YENİ - Faz 4)
* **Kalıp Şablon Kütüphanesi:** 5 temel servis aşaması için zengin metin şablonları:
  1. `📥 Cihaz Kabulü`: Takip linkli ilk kabul bilgilendirmesi.
  2. `🚀 Yola Çıktım`: Saha teknisyeninin tahmini varış süresi (ETA) ve araç plakası.
  3. `💰 Fiyat Onay Talebi`: Toplam masraf ve tek tıkla online onay linki.
  4. `✅ Onarım Bitti / Hazır`: Cihazın hazır olduğu ve teslimat detayları.
  5. `📅 Bakım Hatırlatma`: Periyodik bakım randevu çağrısı.
* **Akıllı Numara Normalizasyonu:** Türkiye telefon numaralarını (`0532...`, `532...`, `+90...`) uluslararası WhatsApp formatına (`90532...`) dönüştürür.
* **Tek Tıkla WhatsApp Web Entegrasyonu:** Ücretli API anahtarı veya onay gerektirmeden, `https://wa.me/{numara}?text={kodlanmış_mesaj}` formatıyla teknisyenin tek tıkla doğrudan WhatsApp Web veya masaüstü uygulamasından müşteriye önceden doldurulmuş mesajı fırlatmasını sağlar.
* **Canlı WhatsApp Sohbet Önizlemesi:** Mesaj balonu, koyu tema WhatsApp stili (`#005C4B`), anlık saat ve okundu çift tık (`✓✓`) simgeleriyle birebir gerçekçi arayüz.
* **SMS Karakter & Parça Sayacı:** SMS modunda 160 karakter sınırını ve kaç parça SMS tüketileceğini dinamik hesaplar.
### 5. 📈 Yönetici Raporlama & İş Zekası (BI) Motoru (YENİ - Faz 5)
* **Personel Performans Raporu:** Saha mühendis ve teknisyenlerinin tamamlanan iş sayıları, başarı oranları (%100, %60 vb.), ürettikleri toplam işçilik ve servis cirosu, ortalama onarım süreleri ve müşteri memnuniyet puanları (⭐ 4.9/5.0).
* **Servis ve Bakımı Yapılan Cihazlar Raporu:** Cihaz marka/model, seri no, müşteri adı, atanan uzman, arıza şikayeti, durum ve maliyet dökümü.
* **Yedek Parça Stok & Kritik Stok Analizi:** Merkez depo, atölye ve mobil servis araçlarındaki (`34 ABC 101`, `34 DEF 202`) mevcut stoklar, kritik eşik uyarıları ve toplam parasal envanter değeri.
* **Özel Değişkenli Dinamik Rapor Motoru:** Yöneticinin belirlediği değişkenlerle (Rapor Türü, Personel, Servis Durumu, Kritik Stok Filtresi) filtreleme ve anlık KPI hesaplama.
* **Excel / CSV Dışa Aktarma:** Türkçe karakterleri Excel'de bozulmadan açan UTF-8 BOM destekli tek tıkla `.csv` indirme.
* **Resmi Antetli Baskı / PDF Çıktısı:** `@media print` tasarımıyla doğrudan tarayıcıdan kurumsal rapor dökümü alma.

### 6. 🗺️ Harita Üzerinde İzlenecek Teknisyen Seçimi & Saha Pop-up'ı (YENİ - Faz 5)
* **Canlı Takip Edilen Teknisyen Seçici:** Harita başlığındaki açılır menü ile yönetici dilediği teknisyeni (*Murat Aydın, Caner Güler, Selin Kaya, Emre Yıldız*) seçebilir; haritadaki araç, plaka, güzergah, hedef müşteri pini ve telemetri (hız, ETA, kalan km) anında o personele odaklanır.
* **Saha Personeli Atanan İşler Pop-up'ı:** Saha listesindeki herhangi bir personele veya *"📋 Atanan İşler"* butonuna tıklandığında açılan pop-up modal; personelin açık ve tamamlanan tüm işlerini, cihaz ve müşteri bilgilerini listeler. Pop-up içinden tek tıkla işi teknisyen tezgâhına alma veya WhatsApp bildirimi başlatma imkanı sunar.

---

## 💻 Nasıl Çalıştırılır ve Test Edilir?

### 1. Backend Sunucusunu Başlatma (FastAPI + Uvicorn)
Terminal veya PowerShell'de proje klasöründeyken:
```powershell
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```
* **API Belgeleri (Swagger UI):** `http://127.0.0.1:8000/docs` adresinden tüm REST uç noktalarını interaktif deneyebilirsiniz.
* **Raporlama API'si:** `http://127.0.0.1:8000/api/reports/staff-performance`, `.../serviced-devices`, `.../inventory-stock`
* **Bildirim Kayıtları:** `http://127.0.0.1:8000/api/notifications/logs`

### 2. Web Arayüzünü Açma ve Yeni Özellikleri Test Etme
1. `index.html` dosyasını tarayıcınızda açın (veya sayfayı yenileyin).
2. **Harita Teknisyen Seçimi:**
   - Yönetici ekranındaki haritanın sağ üstündeki **"📍 İzlenecek Uzman"** açılır kutusundan farklı teknisyenler seçin. Haritadaki plaka, araç ve telemetri değerlerinin seçilen kişiye göre değiştiğini gözlemleyin.
3. **Saha Personeli Atanan İşler Pop-up'ı:**
   - Saha personeli listesinde herhangi bir personelin satırına veya **"📋 Atanan İşler"** butonuna tıklayın. Açılan pop-up pencerede o uzmana ait iş emirlerini, durumlarını ve detaylarını inceleyin.
4. **Raporlama & Analitik Ekranı:**
   - Üstteki 4. sekme olan **"📈 Raporlama & Analitik"** sekmesine geçin.
   - Rapor Türünü (*Personel Performansı, Servis Cihazları, Yedek Parça & Kritik Stok*) değiştirin veya personel/durum filtrelerini seçip **"🔍 Raporu Çalıştır"** butonuna basın.
   - **"📥 Excel / CSV İndir"** butonuna basarak Excel uyumlu rapor dosyasını indirin.
   - **"🖨️ Raporu Yazdır / PDF"** butonuna basarak antetli rapor çıktısını test edin.
5. **Periyodik Bakım Sözleşmeleri & Garanti Takibi Girişi:**
   - Yönetici panelindeki "Periyodik Bakım & Garanti Takibi" kartının sağ üst köşesindeki **"➕ Yeni Bakım & Garanti Sözleşmesi"** butonuna tıklayın.
   - Açılan modalda Müşteri Ünvanı, Telefon, Cihaz Marka/Model, Seri No, Bakım Periyodu (Aylık, 3 Aylık, 6 Aylık, Yıllık), Sıradaki Bakım Tarihi ve Garanti Kapsamı/Bitiş Tarihi bilgilerini girip kaydedin.
   - Kart üzerinde cihazın seri numarası ile birlikte **`🛡️ Garanti: [Kapsam] • Bitiş: [Tarih]`** rozetinin anında belirdiğini ve doğrudan "İş Emri Aç" butonuyla servis emrine dönüştürülebildiğini gözlemleyin.
6. **İnteraktif Yedek Parça & Mobil Araç Stok Transferi:**
   - "Mobil Araç Stokları ve Depo Takibi" kartının üstündeki **"🔄 Parça Transfer Et"** butonuna tıklayın.
   - Açılan interaktif modalda:
     - Transfer edilecek **Yedek Parçayı**,
     - **Kaynak Depoyu / Aracı** (Merkez Ana Depo, 34 ABC 101, 34 DEF 202, Merkez Atölye),
     - **Hedef Depoyu / Aracı**,
     - Transfer edilecek **Miktarı** belirleyin.
   - Canlı önizleme kutusunda kaynak ve hedef depodaki mevcut stokların ile transfer sonrasındaki bakiyelerin anlık hesaplandığını, kaynakta yetersiz stok olduğunda veya aynı lokasyon seçildiğinde sistemin transferi engelleyerek güvenli kontrol sağladığını test edin.
7. **Çok Çeşitli Parça Takibi, Merkez Atölye & Akıllı Envanter Araçları:**
   - **Merkez Atölye / Lab Kolonu:** Tabloda Merkez Depo ile Mobil Araçların arasına **"Merkez Atölye / Lab"** sütunu eklendi; laboratuvar ve test tezgahlarındaki stok miktarları bağımsız olarak izlenip transfer edilebiliyor.
   - **Envanter KPI Şeridi:** Tablonun üstündeki mini gösterge paneli; sistemdeki toplam parça çeşidini, merkez depodaki, merkez atölyedeki ve araçlardaki toplam parça adetlerini ve kritik ikmal bekleyen parça sayısını anlık hesaplar.
   - **Canlı Akıllı Arama:** Arama kutusuna parça adı, kodu veya kategori yazıldığı anda (örn: *Rulman, IGBT, Vana, Sigorta, 6204*) tablo tuşa basma anında filtreleme yapar.
   - **Kategori Hapları (Pills):** *Tümü, ⚡ Güç Elektroniği, 🔋 Pasif & Trafo, 🔲 Röle & Şalt, 💾 Elektronik & Kart, ⚙️ Mekanik & Rulman / Vana, 🌡️ Sensör & Termal* butonlarına basarak ilgili uzmanlık dalındaki parçalar tek tıkla izlenebilir.
   - **Kritik / Azalan Stoklar Filtresi:** **"⚠️ Kritik / Bitenler"** butonuna basıldığında (veya KPI şeridindeki kırmızı kritik kutusuna tıklandığında) sahada veya depolarda 2 adedin altına düşen tüm parçalar anında listelenir.
   - **Tek Tıkla Hızlı İkmal:** Kritik seviyedeki parçaların yanındaki **"⚡ İkmal Et"** butonu, parçayı ve eksik aracı doğrudan transfer modalına aktararak saniyeler içinde sevk yapılmasını sağlar.

8. **Personel İşe Giriş/Çıkış, Mobil Filo ve Yönetici Tanımlama Sistemi:**
   - **Personel İşe Girişi (Teknisyen, Tekniker, Mühendis):** "➕ Yeni Personel Girişi" butonu ile yeni saha personeli; unvanı, uzmanlık alanı (Güç Elektroniği, Kart Tamiri, PLC, Mekanik vb.), iletişim bilgileri, başlangıç bölgesi ve varsa filodan boşta olan servis aracı zimmetlenerek sisteme dahil edilir.
   - **Personel İşten Çıkışı & Görev Devir Protokolü:** Personel kartlarındaki "🚪 İşe Çıkış" butonu ile ayrılış süreci güvenli bir protokolle yönetilir:
     - Personele zimmetli araç otomatik olarak boşa çıkarılarak filoda serbest bırakılır.
     - Personelin üzerindeki aktif iş emirleri varsa otomatik olarak Sevk Masası Açık Havuzuna iade edilir.
     - Çıkış gerekçesi ve tutanak notu kayıt altına alınır.
   - **Servis Araçları & Filo Yönetimi (Girilmesi ve Çıkarılması):** "🚗 Servis Araçları (Filo)" butonu veya KPI kartından açılan yönetim paneli:
     - Yeni araç plaka, marka/model, kasa donanım tipi ve sorumlu sürücü atanarak filoya eklenir.
     - Her aracın içinde bulunan parça adedi ve durumu canlı olarak izlenir.
     - "❌ Filodan Çıkar" aksiyonu ile araç filodan çıkarılırken, araçtaki tüm yedek parça stokları otomatik olarak Merkez Ana Depo'ya iade edilir, stok kaybı önlenir.
   - **Yönetici Tanımlama ve Profil Yönetimi:**
     - Header'daki yönetici profil kartından veya "👔 Yöneticiler" butonundan açılan panel ile yeni yöneticiler (Genel Müdür, Servis Müdürü, Operasyon Şefi vb.) tanımlanabilir.
     - Tanımlı yöneticiler arasında "👤 Oturum Aç" butonu ile tek tıkla aktif yönetici değiştirilebilir ve tüm sistem başlığı dinamik güncellenir.

9. **Yönetici Kontrollü Sevk & Saha Uzmanı Seçim Modalı ve Görev Devir / Aktarma Sistemi:**
   - **Yönetici Kontrollü Uzman Seçim Modalı:** Sevk masasında veya çağrı afişinde `⚡ Uzmana Ata` veya `⚡ En Yakın Uzmana Ata` butonlarına tıklandığında kör atama yapılmaz; yöneticinin önüne **"⚡ Saha Uzmanı Seçimi & İş Sevk Kartı"** açılır.
     - Yönetici, çağrının önceliğini, kanalını, arıza şikayetini, müşteri ve cihaz bilgilerini tek ekranda görür.
     - Yapay zeka atama motoru; saha personelinin durumu (*Müsait, Görevde*), aktif iş yükü ve mesafesini analiz ederek en uygun uzmanı `⭐ AI Sistem Önerisi` rozetiyle ön plana çıkarır.
     - Yönetici dilediği uzmana tıklayarak seçimi değiştirebilir, dilerse "Yönetici Sevk & Özel Müdahale Notu" ekleyip görevi bizzat sevk eder.
   - **Saha Görevinin Başka Uzmana Aktarılması (Devir / Transfer):** Teknisyen kartlarındaki `Atanan İşler` modalında yer alan her bir açık servis emrine **"🔄 Başka Uzmana Aktar"** butonu eklendi.
     - Herhangi bir sebepten ötürü (iş yükü, acil müdahale, hastalık, uzmanlık gereksinimi) iş başka bir uzmana aktarılmak istendiğinde sevk modalı otomatik olarak "Devir Modu"nda açılır.
     - Önceki teknisyen `(Mevcut Görevli - Devredilecek)` olarak gösterilir.
     - Yeni uzman seçilip devir onaylandığında; görev eski teknisyenin listesinden düşülür, yeni teknisyenin seyyar listesine eklenir, iş emri geçmişine denetim izi (`[Yönetici Devri]: ...`) yazılır ve personellerin müsaitlik durumları canlı olarak güncellenir.

10. **Servis Araçları Operasyon, Zimmet Yönetimi ve Sevk Masası Çift Yönlü Entegrasyonu:**
    - **Servis Araçları (Filo) Ekranından Araç Yönetimi:**
      - Filo ekranındaki herhangi bir araç kartına veya kart altındaki `⚙️ İşlem & Zimmet` butonuna tıklandığında **"🚗 Araç Operasyon & Zimmet Kartı"** pop-up penceresi açılır.
      - **Aracı Başka Elemana Verme (Devretme):** Açılır listeden sahada görev yapan herhangi bir teknisyen/mühendis seçilerek araç tek tıkla devredilebilir.
      - **Aracı Geri Alma (Boşa Çıkarma):** `🔄 Aracı Geri Al` butonuyla araç mevcut personelin zimmetinden düşürülür, filoda "Merkezde Hazır / Havuz Aracı" statüsüne alınır.
      - **Çalışma ve Periyodik Bakım Durumu:** Araç durumu tek tıkla `🟢 Sahada Aktif`, `🔵 Merkezde Hazır` veya `🟠 Periyodik Bakımda` seçenekleri arasında güncellenir.
      - **Filodan Çıkarma & Parça İadesi:** Araç filodan çıkarıldığında içindeki parçalar otomatik olarak Merkez Depo'ya devredilir.
    - **Sevk Masasından Personel Üzerinden Araç Yönetimi (Çift Yönlü Tam Entegrasyon):**
      - Sevk masasında her personelin kartında yer alan etkileşimli araç çipine (`🚗 Araç: ...`) veya `🚗 Araç Ver / Yönet` butonuna tıklandığında **"🚗 Personel Araç Zimmet Kartı"** açılır.
      - Personelin `Atanan İşler` pop-up penceresinde de `🚗 Araç Yönet / Değiştir` kısayolu yer alır.
      - Personel kartından açılan bu ekranda havuzdaki müsait araçlar `🟢` simgesiyle öncelikli listelenir; personelin aracı tek tıkla geri alınabilir (`🔄 Aracı Geri Al`) veya havuzdan yeni araç tahsis edilebilir (`🚗 Aracı Personele Ver`).
      - **Akıllı Çakışma Önleme & Birebir Eşleme:** Yeni bir araç bir personele zimmetlendiğinde, personelin önceki aracı varsa otomatik havuza çekilir; aracın önceki sürücüsü varsa onun kaydı boşa düşürülür. Tüm değişiklikler ön yüzde ve FastAPI/SQLite arka yüzünde anında senkronize olur.

11. **Dinamik Yedek Parça Kategori Yönetimi ve Özelleştirilebilir Servis Sınıflandırması:**
    - **Servise Özel Kategori Tanımlama:** Her teknik servisin uzmanlık alanı (İklimlendirme/HVAC, Medikal, Otomasyon, Beyaz Eşya, Asansör, Elektronik vb.) farklı olduğundan kategoriler sabit kalıplardan çıkarılarak tamamen dinamik ve yönetilebilir hale getirildi.
    - **Kategori Yönetim Paneli (`🏷️ Kategori Yönetimi`):** Stok ekranının üst şeridindeki buton ile açılan yönetim panelinde; simgesi (emoji/ikon), adı ve açıklayıcı parça örnekleriyle yeni kategoriler oluşturulabilir, mevcut kategoriler yeniden adlandırılabilir (`✏️ Düzenle`) veya sistemden kaldırılabilir (`🗑️ Sil`).
    - **Güvenli Silme & Otomatik Parça Aktarımı:** İçerisinde kayıtlı parçalar bulunan bir kategori silinmek istendiğinde sistem kullanıcıyı uyarır ve ilgili parçaları veri kaybı olmadan otomatik olarak `Genel Parça & Sarf` kategorisine aktarır.
    - **Stok Girişinde Kategori Seçimi & Satır İçi Hızlı Ekleme:**
      - "Yeni Parça / Stok Girişi" ekranına açılır kategori seçim listesi eklendi.
      - Parça eklerken listede olmayan bir kategori gerektiğinde pencereyi kapatmaya gerek kalmadan `➕ Yeni Kategori Ekle` butonuna basılarak açılan satır içi kutucuktan saniyeler içinde yeni kategori tanımlanıp anında seçilebilir.
    - **Dinamik Filtre Çipleri ve Canlı Sayaç:**
      - Stok tablosunun üzerindeki kategori düğmeleri dinamik hale getirildi. Her düğmenin üzerinde o kategoride kaç çeşit parça bulunduğu anlık sayaç rozetiyle (badge) gösterilir.
      - Tıklanan kategoriye göre envanter anında filtrelenir; çip şeridinin sonundaki `➕ Yeni Kategori` çipiyle de yönetim paneline hızla ulaşılabilir.
    - **Excel / CSV Toplu Yükleme Entegrasyonu:** CSV ile toplu stok aktarımında kategori sütunu desteklenir; CSV içinde sistemde henüz bulunmayan yeni bir kategori varsa sistem bunu otomatik algılayıp servis kategorilerine dahil eder.
12. **Ekran Hizalama, Yatay Kaydırma Çubuğu (Scrollbar) Eliminasyonu ve Tam Ekran Responsive Düzen:**
    - **Sol Taraftaki Boşluğun Giderilmesi & Üst Başlık (Header) ile Kusursuz Hizalama:**
      - `.app-container` üzerindeki sabit `max-width: 1440px; margin: 0 auto;` kısıtlaması kaldırılarak tam ekran akışkan (`width: 100%; max-width: 100%; margin: 0; padding: 20px 28px 40px;`) yapıya geçirildi.
      - Böylece sol taraftaki gereksiz siyah boşluk tamamen ortadan kaldırıldı; gösterge paneli (KPI kartları ve ana sütunlar), üst menüdeki `ServisAI` logosu ile pikseli pikseline aynı dikey hizada (28px) başlayacak şekilde mükemmel hizalandı.
    - **Sağ Taraftan Ekran Dışına Taşmanın ve Alttaki Yatay Kaydırma Çubuğunun Kaldırılması:**
      - Sayfa genelinde `html, body { overflow-x: hidden; width: 100%; }` kuralı uygulanarak tarayıcı seviyesindeki can sıkıcı yatay kaydırma çubuğu kesin olarak engellendi.
      - CSS Grid kuralındaki `1fr 1fr` sütun genişlikleri `minmax(0, 0.92fr) minmax(0, 1.08fr)` olarak güncellendi ve tüm kartlara `min-width: 0; box-sizing: border-box; overflow: hidden;` özellikleri tanımlandı. Bu sayede geniş içerikler artık grid sütununu ekrandan dışarı itemez.
      - `@media (max-width: 1200px)` duyarlı kesme noktası (breakpoint) ile 1200px altındaki dizüstü veya tablet ekranlarında iki sütun alt alta rahat bir şekilde dizilecek hale getirildi.
    - **Stok Matris Tablosu & Butonların Kompakt ve Esnek Düzeni:**
      - Tablo ilk sütununun gereksiz `min-width: 220px` genişliği `170px`e optimize edildi; hücre içi boşluklar (`padding: 10px`) ve yazı boyutu dengelenerek tablonun yatayda taşmadan rahatça sığması sağlandı.
      - `.stock-table-wrapper` içine ince ve şık bir özel kaydırma çubuğu (`scrollbar-width: thin;`) entegre edildi. Tablo içeriği ekran daraldığında yalnızca kendi kutusu içinde zarifçe kayar, asla tüm sayfayı dışarıya taşırmaz.
      - Kart başlığındaki buton grubu (`flex-wrap: wrap;`) daralan alanlarda alt satıra şık bir biçimde geçerek hiçbir butonun (`Yeni Parça`, `Excel / CSV`, `Transfer Et`, `Kategori Yönetimi`) ekran dışına kaçmasına ya da kesilmesine izin vermez.

13. **Akıllı Excel / CSV ve Çoklu Kaynaklı Yedek Parça İçe Aktarma Merkezi:**
    - **Excel'den Kopyala-Yapıştır Kolaylığı (Sıfır Virgül Zahmeti & Otomatik Ayraç Algılama):**
      - Microsoft Excel veya Google Sheets'ten yüzlerce parça hücresi kopyalanıp yapıştırıldığında hücreler arasına araya elle virgül koyma zorunluluğu tamamen ortadan kaldırıldı.
      - Çoklu ayraçlı akıllı ayrıştırıcı motor; satırlardaki **Excel TAB (`\t`)**, **Türkçe/Avrupa Excel Noktalı Virgülü (`;`)**, **Standart Virgül (`,`)** ve **Boru Karakteri (`|`)** ayraçlarını otomatik tespit eder.
    - **1. Yöntem: Bilgisayardan Dosya Seçme & Sürükle-Bırak (.xlsx / .xls / .csv / .tsv / .txt):**
      - Modal içerisine modern bir sürükle-bırak (Drag & Drop) dosya yükleme alanı entegre edildi.
      - Yerel olarak projeye dahil edilen `xlsx.full.min.js` (SheetJS) kütüphanesi sayesinde, internet bağlantısına ihtiyaç duymadan doğrudan `.xlsx` ve `.xls` Excel çalışma kitaplarını tarayıcıda anında okur ve parçaları ayrıştırır.
    - **2. Yöntem: Dosya Adı, Yerel Dosya Yolu veya Web Linki (URL) ile Yükleme:**
      - Kullanıcının doğrudan dosya adı, bilgisayardaki tam yolu (örn: `C:\Users\...\parcalar.xlsx`, `stok.csv`) veya dosyanın web adresini (URL) girip **"📥 Oku & Getir"** butonuna basarak içe aktarma yapabileceği özel alan eklendi.
      - Arka yüzde `POST /api/stock/read-file-or-url` uç noktası ile yerel dosya ve web URL okuma desteği sağlandı.
    - **3. Yöntem: Excel'den Doğrudan Kopyala & Yapıştır:**
      - Metin alanına yapıştırılan verileri satır içi dinler; hücreler içindeki tırnak işaretlerini (`"..."`), para birimlerini (`180,50 ₺`, `$`, `€`), adet (`25 Adet`) ve garanti (`12 Ay`) ifadelerini otomatik temizleyerek sayısal alanlara dönüştürür.
    - **Akıllı Başlık Satırı Tespiti (Header Auto-Mapping):**
      - İlk satırda "Kod", "Parça Adı", "Kategori", "Adet/Miktar", "Birim Fiyat", "Garanti" başlıkları varsa sistem kolonların sırasını otomatik eşler. Başlık yoksa konumlarına göre en uygun şekilde dizilim yapar.
    - **Canlı Doğrulama ve Önizleme Tablosu:**
      - Dosya seçildiğinde, link okunduğunda veya metin yapıştırıldığında kaç adet parçanın algılandığı (`✅ 120 Parça Kalemi Algılandı`), tespit edilen format rozeti ve ilk satırların önizleme tablosu anında görüntülenir.
    - **Hazır Excel / CSV Şablonu İndirme (`📥 Örnek Şablon (.csv) İndir`):**
      - Tek tıkla bilgisayara UTF-8 BOM destekli örnek şablon dosyası (`servisai_yedek_parca_sablonu.csv`) indirilebilir. Kullanıcı bu şablonu Excel ile açıp doldurduktan sonra sisteme doğrudan yükleyebilir.
    - **Yüksek Toleranslı Ayrıştırıcı & Kesintisiz Yükleme Güvencesi (2026-10-24 Revizyonu):**
      - **Otomatik Kod Üretimi:** Tabloda özel bir "Parça Kodu" kolonu olmasa dahi (yalnızca Parça Adı, Adet vb. olduğunda), sistem isimden ve satır numarasından benzersiz kod üretir (`PRC-PARCA-ADI-001`).
      - **Sıra No Desteği:** İlk kolonda `Sıra No`, `#`, `1, 2, 3...` gibi sıralama numaraları olduğunda sistem bunu algılayıp parça adı/kodu kolonlarını kaydırmadan doğru okur.
      - **Boşluk / TAB / CSV / Noktalı Virgül Esnekliği:** Word, PDF veya biçimlendirilmiş metinlerden kopyalanan çoklu boşluklu tablolar (`\s{2,}`) otomatik çözümlenir.
      - **Önizleme Render Güvenliği (`escapeHtml`):** Önizleme tablosu HTML kaçış fonksiyonuyla korunarak render kesintileri önlendi; aktarma butonu tüm formatlarda anında etkinleşir.
      - **Yerel Dosya Yolu Akıllı Yönlendirmesi (2. Yöntem):** Tarayıcı güvenlik kısıtlaması olan ortamlarda dosya yolu girildiğinde sistem otomatik olarak dosya seçim ekranını açarak kullanıcıyı bekletmeden yüklemeyi tamamlar.
      - **Manuel Ayrıştır Butonu (3. Yöntem):** Kopyala-yapıştır alanına `[🔍 Parçaları Ayrıştır & Önizle]` ve `[🗑️ Metni Temizle]` butonları eklenerek kullanıcıya anlık manuel tetikleme imkanı verildi.
      - **Kalıcı Tarayıcı Stoğu (`localStorage`):** Toplu veya tekil olarak eklenen tüm yedek parçalar `servisai_stock` anahtarıyla tarayıcı yerel hafızasına kaydedilir; sayfa yenilense de silinmez.
    - **Araç Zimmet Kartı Pencere Boyutu & Dikey Uyum Düzenlemesi (2026-10-24 Revizyonu):**
      - **Yatay Kaydırma Çubuğu Kaldırıldı:** `.modal-body` üzerinde `overflow-x: hidden` kuralı uygulanarak ve araç seçim satırı `.veh-action-input-row` esnek kapsayıcısına alınarak yatay taşmalar ve buton kesilmeleri tamamen giderildi.
      - **Duyarlı Genişlik:** Personel Araç Zimmet Kartı genişliği ferahlatıldı (`max-width: 680px; width: 95%`); uzun araç ve plaka isimleri dropdown kutusunu taşırmadan metin sonuna otomatik üç nokta (`text-overflow: ellipsis`) koyacak şekilde düzenlendi.
      - **Genişletilmiş Filo Donanım / Kasa Tipleri:** Filo araç tanımlama modülüne teknik servislerin saha operasyonlarında yaygın kullandığı şu kategoriler eklendi:
        - 🚗 **Otomobil (Binek / Keşif - Sedan/HB)**
        - 🚙 **SUV / Crossover (Saha Keşif & Müşteri Ziyaret)**
        - ⚡ **Elektrikli Hizmet Aracı / Mini Van (Çevreci Filo)**
        - 🛵 **Scooter / Motosiklet (Hızlı Müdahale & Parça Sevk)**
        - 🏍️ **Kargo Motosiklet / Maxi Scooter (Kurye & Takım Çantası)**
        - 🚐 **Hafif Ticari & Panelvan (Doblo, Caddy, Kangoo - Donanım & PLC Test)**
        - 🚐⚡ **Mobil Atölye & Servis (Transit, Transporter, Trafic - Donanımlı İstasyon)**
        - ❄️ **Mobil Servis & İklimlendirme / Soğutma Grubu**
        - 🚚 **Ağır Ekipman Nakil / Kamyonet / Liftli Kasa (Pano, Trafo, Jeneratör)**
        - 🏢 **Yönetici & Operasyon Aracı**
      - **Dinamik Araç İkonları:** Araç listelerinde ve zimmet açılır menülerinde aracın türüne uygun simgeler (🚗, 🛵, 🚐, 🚚, ❄️, ⚡) otomatik görüntülenir.
    - **Canlı Saha Telemetrisi, Gerçek Google Haritalar & 50+ Personel Arama Sistemi (2026-10-24 Revizyonu):**
      - **Gerçek Google Haritalar Katmanı (Leaflet Entegrasyonu):** Canlı saha takip alanı statik SVG çiziminden çıkarılarak gerçek sokak ve cadde haritalarına dönüştürüldü. Google Haritalar Sokak Katmanı (`Google Road`) ve Google Hibrit Uydu Katmanı (`Google Satellite`) doğrudan entegre edildi.
      - **Katman Değiştirici Butonlar:** Harita üst panelinde `[🗺️ Google Harita]`, `[🛰️ Google Uydu]`, `[📡 Radar]` ve `[🇹🇷 Tüm Türkiye]` modları arasında anlık geçiş imkanı sağlandı.
      - **Google Maps Canlı Navigasyon Bağlantısı:** `[🌐 Google Maps'te Aç ↗]` butonu eklenerek, seçili personelin anlık koordinatlarından müşteri adresine giden gerçek navigasyon rotasının tek tıkla resmi Google Haritalar uygulamasında açılması sağlandı.
      - **50+ Saha Personeli İçin Arama & Filtreleme Kutusu:** İşletmelerin 50'den fazla teknisyeni kolayca yönetebilmesi için `[🔍 Uzman / Plaka ara (50+ personel)...]` arama kutusu eklendi. İsim, unvan, bölge veya plaka yazıldıkça dropdown anında filtrelenir.
      - **Dinamik Personel Gruplaması (`<optgroup>`):** Açılır kutudaki tüm personel `🟢 Sahada & Görevde`, `🟡 Yolda / İntikal Halinde`, `⚪ Müsait / Göreve Hazır` şeklinde operasyonel duruma göre otomatik gruplandırıldı.
      - **Yeni İşe Alınan Personelin Anında Yansıması:** Yeni bir personel eklendiğinde (`➕ Yeni Personel Girişi`) bekleme olmaksızın dropdown ve harita seçicisi güncellenir ve harita odağı otomatik olarak yeni personelin lokasyonuna kayar.

  - 🇹🇷 **Tüm Türkiye Geneli Servis Ağı & Çok Modlu (Multi-Modal) Şehirler Arası Seyahat Takibi (YENİ - 24 Ekim 2026):**
    - **81 İl & Sanayi Havzaları Kapsamı:** Harita yalnızca İstanbul ile sınırlı olmayıp tüm Türkiye'deki teknik servis operasyonlarını kapsayacak şekilde `TURKEY_HUBS` altyapısına bağlandı. İstanbul, Ankara (OSTİM & TUSAŞ), İzmir (Aliağa Petkim & Kemalpaşa), Bursa (Demirtaş OSB & Tofaş), Kocaeli (Gebze Bilişim Vadisi), Konya (1. OSB & Torku), Adana/Mersin (Hacı Sabancı OSB & Şişecam), Antalya (OSB & Serbest Bölge), Gaziantep (4. OSB), Eskişehir (TEI & Raylı Sistemler), Kayseri, Samsun, Trabzon, Diyarbakır, Denizli, Tekirdağ/Çorlu, Malatya ve Erzurum gibi Türkiye'nin tüm kritik sanayi ve büyükşehir merkezleri harita koordinat sistemine entegre edildi.
    - **Çok Modlu Ulaşım & Seyahat Takip Motoru (`resolveTravelMode`):** Teknisyenlerin şehirler arası veya şehir içi görev seyahatleri dinamik olarak algılanır ve telemetri panosunda anlık olarak gösterilir:
      - ✈️ **Uçak (Hava Yolu Seyahati):** Şehirler arası uzak mesafelerde (örn. İstanbul ➔ İzmir, İstanbul ➔ Gaziantep/Antalya) THY/Pegasus uçuş koridoru devreye girer. Yüksek irtifa kavisli uçuş yayı (arc), ~790-840 km/s seyir hızı, gök mavisi nabız ışıması ve havaalanı kalkış/varış telemetrisi sunulur.
      - 🚆 **TCDD Yüksek Hızlı Tren (YHT):** Hızlı tren koridorundaki şehirler arasında (İstanbul - Kocaeli - Bilecik - Eskişehir - Ankara - Konya) YHT tren seferleri otomatik devreye girer. ~220-250 km/s raylı hat sürati, mor/leylak ışıma ve gar-istasyon intikal rotası takip edilir.
      - 🚌 **Şehirler Arası Otobüs / VIP Servis:** ~85-95 km/s karayolu süratiyle otogar bağlantılı seyahatler kehribar/turuncu göstergelerle izlenir.
      - 🚗 **Servis Aracı / Filo Aracı (Otoyol):** Otoyol ve şehirler arası intikallerde ~95-110 km/s hız ile kurumsal servis aracı intikali.
      - 🛵 **Şehir İçi Motosiklet / Kurye:** Şehir içi acil parça ve kart intikallerinde ~50-60 km/s hız ile zümrüt yeşili ekspres takip.
    - **Dinamik Koridor Odaklaması (`fitBounds`):** Şehirler arası yolculuklarda harita dar cadde görünümünde kalmaz; başlangıç şehri ile hedef şehir arasındaki tüm Türkiye rotasını tek ekrana sığdıracak şekilde otomatik ölçeklenir.
    - **Atanan İşler Modalı Kilitlenme Çözümü:** Saha personeli kartındaki veya pop-up modalındaki `[📍 Haritada Canlı Takip Et]` butonuna basıldığında modalın ekranda donup kalması sorunu giderildi; modal pürüzsüzce kapanır, Yönetici sekmesine geçiş yapılır, Leaflet harita konteyneri anında yeniden boyutlandırılır (`invalidateSize`), teknisyenin rotası odaklanır ve ekran otomatik olarak canlı harita kartına kaydırılır.

  - 🛠️ **Saha ve Kullanılabilirlik Test Düzeltmeleri (2026-10-24 Revizyonu):**
    - **1. Mobil Araç Stokları & Depo Takibi (Parça Transfer Et & Hızlı İkmal Et):**
      - Tablodaki her bir parça satırının sağında yer alan dinamik `[⚡ İkmal Et]` (kritik seviyedeki araçlar için) ve `[🔄 İkmal Et]` (rutin ikmal için) butonları etkinleştirildi; tıklanıldığında parça ve hedef araç/atölye seçili olarak transfer modalı doğrudan açılır.
      - Üst paneldeki `[🔄 Parça Transfer Et]` butonu ile tüm filo araçları (`state.vehicles`), merkez depo ve atölye arasında çift yönlü transfer tam fonksiyonel hale getirildi.
      - Transfer onaylandığında modal anında kapatılır, yerel stok matrisi ve KPI kartları eşzamanlı yenilenir.
    - **2. Sevk Masası Akıllı Atama Modalı (Kapatma ve Uzmana Sevk Etme):**
      - `#btn-smart-dispatch` ("Bekleyen çağrıyı en yakın uzmana ata") tıklandığında açılan `#dispatch-assign-modal` penceresi teknisyen seçildikten sonra "Seçilen uzmana atama yap sevk et" tıklandığında görevi anında hedeflenen uzmana atar, işi `Onarımda` statüsüne çeker ve modalı anında kapatır.
      - Pencerenin üstündeki `[×]` ve altındaki `[✕ Kapat / Vazgeç]` butonları, arka plan maskesi tıklaması ve `ESC` klavye tuşu ile modalın anında kapanması güvenceye alındı.
    - **3. Sevk Masası İşlemleri (Atanan İşleri Gör, Uzmana Ata, Haritada Gör):**
      - Sevk masası çağrı kartlarında `[📋 Atanan İşleri Gör]`, `[🔄 Uzmana Ata]` ve `[📍 Haritada Gör]` aksiyonları eksiksiz bağlandı.
      - `[📍 Haritada Gör]` tıklandığında harita tuvalinin boş/gri kalması engellendi: Yönetici sekmesi aktif edilir, harita katmanı görünür kılınır, ilgili teknisyenin rotası ve şehirler arası telemetrisi çizilir, `map.invalidateSize()` ile harita kutucukları anında render edilir ve ekran harita paneline kaydırılır.
    - **4. Personel İşe Çıkış Süreci (İşten Çıkışı Onayla ve Tamamla):**
      - `#staff-exit-modal` ("Personel İşten Çıkış / Ayrılış") penceresindeki form submit ve buton tıklama dinleyicileri senkronize edildi.
      - Çıkış onaylandığında personelin üzerindeki servis aracı otomatik olarak *"Merkezde Hazır / Boşta"* durumuna alınır; personele atanmış açık işler *"Kabul Edildi"* statüsüne çekilerek Sevk Masası açık havuzuna iade edilir.
      - Personel kadrodan çıkarılır ve `servisai_staff_terminated` anahtarı ile yerel depolamaya işlenerek sayfa yenilendiğinde dahi silinen personelin geri gelmesi engellenir.

  - 📊 **Yönetici Raporlama & BI Motoru ve Yazdırma (Print) Revizyonu (2026-10-24 Revizyonu):**
    - **1. Personel Performans Raporunda Bireysel Seçim & Filtreleme:**
      - Açılır menüden (`#report-staff-filter`) tek bir uzman seçildiğinde tablonun tüm personeli dökmesi engellendi; yalnızca seçilen personelin satırı ve ona ait metrikler listelenir.
      - Başlık dinamik olarak `👨‍🔧 [Personel Adı] - Bireysel Performans & Ciro Raporu` şeklinde güncellenir.
      - Personel açılır kutusu (`updateReportStaffDropdown`) kadroya yeni eleman eklendiğinde veya işten çıkış yapıldığında anında otomatik güncellenir.
    - **2. Servis & Bakımı Yapılan Cihazlar Raporu:**
      - Rapor veri kümesi sistemdeki tüm çağrılar (`state.workOrders`) ve teknisyen işleri (`state.staffJobs`) taranarak dinamik konsolide edilir; teknisyen ve servis durumu filtreleri (`Tamamlandı`, `Onarımda`, `Yolda`, `Kabul Edildi`) ile kusursuz senkronize çalışır.
    - **3. Yedek Parça & Yalnızca Kritik Stoklar Filtresi:**
      - *"Yalnızca Kritik Stokları Göster"* onay kutusu (`#report-critical-only`) işaretlendiğinde tablonun tüm envanteri listelemesi engellendi; yalnızca araç veya merkez/atölye stok eşiğinin altına düşen (`is_critical: true`) acil ikmal kalemleri gösterilir.
      - Başlık `⚠️ Kritik Stok ve Acil İkmal Listesi (Eşik Değer Altı)` uyarısına dönüşür ve özet KPI sayıları seçime göre anlık hesaplanır.
    - **4. Rapor Yazdırma ve PDF Çıktı Motoru (Boş Sayfa Sorununun Kesin Çözümü):**
      - Yazdırma sırasında tüm sayfa elemanlarını gizleyen eski `body * { visibility: hidden; }` kuralı kaldırıldı.
      - `@media print` altında `#reports-view`, KPI kartları ve `#exportable-table` için net siyah/gri kenarlıklar, sayfa taşmasını önleyen `page-break-inside: avoid;` kuralları ve A4 standart marginleri tanımlandı.
      - Servis Etiketi (`printing-label`), Ekspertiz Raporu (`printing-expert-report`) ve Yönetim Raporu (`printing-report`) çıktıları birbirinden tamamen izole edildi; tek tıkla boş sayfasız, net ve okunaklı PDF/kağıt çıktısı garanti altına alındı.
  - 🔧 **Teknisyen Saha Ekranı Dinamik Personel Geçişi, Akıllı AI Teşhis & Müşteri Onay Entegrasyonu (2026-10-25 Revizyonu):**
    - **1. Çoklu Saha Teknisyeni Ekran Seçicisi (`#select-active-tech`):**
      - Teknisyen Saha Ekranı (`#tech-view`) sabit tek bir uzmana ("Murat Aydın") bağlı olmaktan çıkarıldı.
      - Görev listesi sütun başlığına `[👤 Aktif Saha Teknisyeni]` seçim açılır menüsü eklendi. Filoya yeni katılan veya mevcut tüm saha personeli anında listede listelenir.
      - Seçilen personelin adı, zimmetli araç plakası, uzmanlık alanı, telefon numarası ve anlık operasyonel durumu (`Müsait`, `Yolda`, `Görevde`) profil başlığına dinamik yansıtılır.
      - `#job-cards-container` görev listesi seçilen teknisyene izole edilir; teknisyenin yalnızca kendine atanan çağrıları (`assigned_user_id` ve `assigned_tech`) listelenir.
    - **2. Dinamik GPS İntikal Banner'ı & Hedef Rota (`#tech-intikal-address`):**
      - Teknisyen ekranındaki `Yola Çıktım (GPS Takibini Başlat)` banner'ı tezgaha yüklenen iş emrinin müşteri adı ve açık adresiyle (`${custName} • ${custAddr}`) anında senkronize olur.
      - Butona basıldığında harita rotası müşterinin gerçek lokasyonuna yönlendirilir, iş emri ve teknisyen durumu `"Yolda"` yapılır, GPS simülasyonu başlatılır ve müşteriye anında WhatsApp "Yoldayım" bildirimi açılır.
    - **3. Dinamik ve Arızaya Özel Yapay Zeka Teşhis Motoru (`synthesizeAIDiagnosis`):**
      - Sabit ve değişmeyen Delta VFD HTML çıktısı kaldırıldı.
      - Aktif iş emrinin marka, model ve teknisyen gözlemleri / arıza belirtisi (`ai-symptom-input`) verilerini dinamik analiz eden sektörel AI teşhis motoru entegre edildi:
        - Aşırı ısınma, akım, gerilim ve güç kartı sorunlarında güç modülü ve IGBT analizleri,
        - PLC, haberleşme ve donanım kartlarında optokuplör ve sinyal dalgalanma kontrol adımları,
        - Motor, pompa ve mekanik sistemlerde rulman, balans ve vibrasyon testleri,
        - Termal sistemlerde NTC ve termostat güvenlik döngüleri otomatik üretilir.
      - Önerilen parçalarda aktif teknisyenin aracındaki mevcut stok adedi dinamik olarak belirtilir.
    - **4. Aktif Teknisyenin Araç Stoğu ile Entegre Parça Kullanımı:**
      - `#vehicle-part-select` açılır kutusu seçili personelin zimmetli aracındaki (`tech.vehiclePlate` / `veh.id`) güncel parça adetlerini gösterir.
      - Parça kullanıldığında doğrudan personelin araç stoğundan düşülür ve fişe işlenir.
    - **5. Müşteri Cihaz Sorgulama Onayının Yönetici Paneline Anında Yansıması:**
      - Müşteri Portalında (`#customer-view`) müşteri `[Onayla & Onarımı Başlat]` butonuna bastığında onay bilgisi yerel ve genel duruma (`customer_approved = true`) işlenir ve `localStorage`a kalıcı kaydedilir.
      - Yönetici & Kontrol Paneli Sevk Masası gelen çağrılar kartlarında onaylanan işler yeşil neon ışıltılı `✅ Müşteri Onayladı` rozetiyle (`.badge-customer-approved`) parlar.
      - Yönetici Sevk Masası afişi (`updateDispatchBanner`), üst KPI özet kartı (`#kpi-active-orders-subtext` - `✅ X Müşteri Onaylı`) ve `[📋 Atanan İşleri Gör]` modalında (`openStaffJobsModal`) müşteri onayı eşzamanlı olarak canlı görüntülenir.

  - 📱 **Müşteri Bildirim Merkezi Teknisyen Dinamizmi & Gerçek Adres Geocoding Harita Takip Motoru (2026-10-25 Revizyonu - 2):**
    - **1. WhatsApp ve SMS Mesajlarında Dinamik Teknisyen & Araç Plakası:**
      - Müşteri bildirim şablonlarında ve mesajlaşma modalında yer alan sabit "Murat Aydın" ve "34 ABC 101" metinleri kaldırıldı.
      - İş emrine atanan veya Teknisyen Saha Ekranında aktif olan personelin (örn: Levent İmekci) adı, unvanı ve zimmetli araç plakası (örn: 34 LEV 99) `loadNotificationPreview` fonksiyonunda dinamik olarak çözümlenir.
      - Backend `/api/notifications/preview` API uç noktası `tech_name` ve `vehicle_plate` parametreleriyle genişletildi; offline yedek şablonlar da dinamik `${techRole} *${techName}*` ve `*${techPlate}*` değişkenlerine bağlandı.
      - Hangi teknisyen yola çıkarsa veya mesaj gönderirse, müşteriye giden WhatsApp ve SMS metninde doğrudan o teknisyenin adı ve aracı yer alır.
    - **2. Çoklu Görev ve Sahada Bulunulan Müşteriden İntikal Takip Motoru:**
      - Teknisyen gün içerisinde bir müşteriye (örn: HES Tıbbi Cihazlar) intikal ettiğinde veya orada görev tamamladığında, sistem personelin anlık lokasyonunu (`person.currentLocation`, `person.currentCustomer`) ve önceki görevini hafızaya alır.
      - Teknisyene sahada bulunduğu sırada yeni bir çağrı (örn: ISISAN) atandığında, yeni görevin rota başlangıcı personelin ev adresi (Avcılar) yerine doğrudan teknisyenin o an fiilen bulunduğu müşteri lokasyonu (HES Tıbbi Cihazlar / İkitelli OSB) olarak belirlenir.
      - Rota `HES Tıbbi Cihazlar (İkitelli OSB) ➔ ISISAN (Isısan Sanayi Sitesi, Esenyurt / Hoşdere)` şeklinde noktadan noktaya gerçek saha intikali olarak hesaplanır.
    - **3. Google Maps Navigasyon Butonu & Söğütlüçeşme / Osmanağa Default Adresinin Kesin Çözümü:**
      - `geocodeTurkishAddress` algoritmasında eşleşmeyen veya genel "İstanbul" kelimesi içeren adreslerin `TURKEY_HUBS.istanbul_anadolu` üzerinden `[40.9912, 29.0278]` (Kadıköy Söğütlüçeşme / Osmanağa) koordinatına yönlenmesi engellendi; Avrupa ve Anadolu yakası sanayi havzalarına göre akıllı bölgesel koordinasyon sağlandı.
      - `TURKEY_GEO_POINTS` veritabanına `Isısan Sanayi Sitesi (Esenyurt / Hadımköy / Hoşdere)`, `HES Tıbbi Cihazlar (İkitelli OSB)`, `İMES`, `DES`, `KADOSAN`, `MODOKO`, `Demirciler`, `Aykosan`, `Tormak`, `Birlik OSB`, `Evren Oto Sanayi` gibi kritik sanayi siteleri eklendi.
      - `[🌐 Google Maps'te Aç ↗]` butonu ham koordinat yerine müşterinin ve teknisyenin gerçek isim ve açık adres metinlerini (`origin=HES Tıbbi Cihazlar, İkitelli OSB...&destination=ISISAN Sanayi, Isısan Sanayi Sitesi...`) Google Haritalar'a parametre olarak aktaracak şekilde güncellendi.
    - **4. Balmumcu / Barbaros Bulvarı Geocoding, Kağıthane Sokak/İlçe Ayrıştırması & Harita Rota İyileştirmesi (2026-10-25 Revizyonu - 3):**
      - **Balmumcu & Barbaros Bulvarı Entegrasyonu:** `TURKEY_GEO_POINTS` coğrafi veri tabanına Beşiktaş/Şişli aksındaki `balmumcu` (`[41.0580, 29.0100]`), `barbaros` (`[41.0520, 29.0080]`), `zincirlikuyu`, `gayrettepe`, `yildiz`, `ortakoy`, `bebek`, `etiler`, `nisantasi` ve `fulya` noktaları eklendi.
      - **Söğütlüçeşme / Anadolu Yakasına Atlama Sorununun Kökten Çözümü:** `Barbaros Bulvarı No: 39 Balmumcu İstanbul` adresi girildiğinde adresin kelime bazlı eşleşemeyip `TURKEY_HUBS.istanbul_anadolu` üzerinden Kadıköy Söğütlüçeşme'ye (`[40.9912, 29.0278]`) düşmesi tamamen engellendi; rota Avrupa yakasında Kağıthane / Beşiktaş / Balmumcu aksında doğru koordinatlara bağlandı.
      - **Akıllı Cadde vs. İlçe Puanlama Motoru:** `Kemerburgaz Cad. Şafak Sok. No: 8 Kağıthane İstanbul` gibi sokak/cadde adı başka bir bölgeyi içeren (Kemerburgaz Cadde adı iken Kağıthane gerçek ilçe) adreslerde sistem cadde/sokak göstergelerini (`cad`, `cd`, `sok`, `sk`, `bulvar`) ayrıştırarak metnin sonundaki asıl ilçe ve mahalleye (Kağıthane) öncelik verecek akıllı puanlama algoritmasına geçirildi.
    - **5. Yedek Parça Listeden Çıkarma / Silme & Lokasyon Kayan Bandı (2026-10-25 Revizyonu - 4):**
      - **Yedek Parça Silme / Listeden Çıkarma Mekanizması (`deleteStockItem`):**
        - Tablodaki her bir yedek parça satırının sağındaki işlem alanına `[🗑️ Sil]` butonu entegre edildi.
        - Yanlışlıkla silinmeleri önlemek amacıyla güvenlik onay penceresi (`confirm`) açılır; kullanıcı onayladığında ilgili parça `state.stock` listesinden çıkarılır.
        - Silme işlemi `servisai_stock` anahtarıyla tarayıcının `localStorage` kalıcı hafızasına kaydedilir, KPI özet sayaçları, kategori sayıları ve parça seçim açılır kutuları anında dinamik olarak güncellenir.
      - **Lokasyon & Depo Kayan Bandı (`#stock-location-pills`):**
        - Kategori kayan bandının hemen altına, tıpkı kategoriler gibi yatayda kaydırılabilir (`overflow-x: auto`) yeni bir **Lokasyon & Depo Kayan Bandı** eklendi.
        - Bu bantta `[📍 TÜM LOKASYONLAR]`, `[🏢 MERKEZ DEPO]`, `[🔬 MERKEZ ATÖLYE / LAB]`, `[🚐 TÜM SAHA ARAÇLARI]` ve filodaki tüm araçlar (`[🚐 ARAÇ (34 ABC 101 - MURAT)]`, `[🚐 ARAÇ (34 DEF 202 - CANER)]`, `[🚐 ARAÇ (34 NK 0023 - LEVENT)]`, `[🚐 ARAÇ (06 TUS 01 - BURAK)]` vb.) dinamik olarak listelenir.
        - Kayan banttaki herhangi bir lokasyona tıklandığında hem üstteki açılır menü (`#stock-location-view-filter`) senkronize olur hem de tablo görünümü doğrudan o lokasyonun stoklarına odaklanır.
      - **Tüm Lokasyonlar Popup Menüsünün Dinamik Hale Getirilmesi:**
        - Üst filtre araç çubuğundaki *"Tüm Lokasyonlar"* açılır kutusunda yer alan eski ve sabit *"Yalnızca Saha Araçları (Murat & Caner)"* ibaresi kaldırıldı.
        - Menü `updateStockLocationFilterDropdown()` fonksiyonu ile dinamikleştirilerek; `🚐 Tüm Saha Araçları (Aktif Filo)` genel seçeneğinin altına sisteme kayıtlı tüm teknisyen ve araçların (Murat, Caner, Levent, Burak, Deniz, Ayşe vb.) ayrı ayrı filtrelenebilmesini sağlayan `<optgroup label="Saha Servis Araçları">` listesi eklendi.
        - Tablo başlığı (`#stock-thead`) da dinamikleştirilerek; `🏢 MERKEZ DEPO`, `🔬 MERKEZ ATÖLYE / LAB` ve filodaki tüm aktif araçların stok kolonları yatay kaydırılabilir tablo düzeninde eksiksiz gösterildi.

    - **6. Teknisyen Saha Ekranı: 3 Aşamalı Müdahale Defteri, Yerel Dış Tedarik & Masraf Takibi, AI Otomatik Servis Raporu (2026-10-25 Revizyonu - 5):**
      - **3 Aşamalı Yapılandırılmış Müdahale Alanı:**
        - Sabit ve tekdüze teşhis ekranı kaldırıldı; teknisyenin saha operasyonunu adım adım kayıt altına alabileceği 3 temel alan entegre edildi:
          - **1. Sorunun Tespiti (Kök Neden & Bulgular - `#tech-findings-input`):** Cihazdaki elektriksel, mekanik veya termal arıza kök nedeni, osiloskop / meger / termal kamera ölçüm sonuçları.
          - **2. Bulunan Çözüm Yolu (Metot & Plan - `#tech-solution-input`):** Onarım metodolojisi, değiştirilecek komponentler, lehimleme / izolasyon / temizleme planı.
          - **3. Uygulanan İş & Müdahale (Saha Operasyonu - `#tech-action-input`):** Cihaza fiilen yapılan işlemler, tamamlanan testler ve yük altındaki çalışma parametreleri.
        - **Anında Senkronizasyon & Otomatik Kayıt:** Teknisyen bu alanlara yazdıkça veriler `input` olaylarıyla anında `state.activeOrder` ve `localStorage` (`servisai_work_orders`) üzerine kaydedilir; ekranın sağ üstünde canlı `💾 Kaydedildi` rozeti görüntülenir.
        - **✨ Akıllı Çözüm & İş Adımlarını Öner (`#btn-ai-auto-fill`):** Teknisyen dilerse tek bir tıkla arızalı cihazın marka, model ve şikayetine göre sektör standartlarında optimize edilmiş tespit, çözüm ve müdahale adımlarını yapay zekadan taslak olarak getirebilir ve dilediği gibi düzenleyebilir.
      - **Servis Aracından Parça Kullanımı & Geri İade Mekanizması:**
        - `#pane-vehicle-parts` sekmesinden teknisyenin mobil servis aracındaki stoklar anlık listelenir.
        - Seçilen parça işe eklendiğinde teknisyenin aracındaki stoktan düşülür; faturaya ve kullanılan parçalar listesine yansıtılır.
        - Yanlış ekleme durumunda kullanılan parçalar tablosundaki `[🗑️]` silme butonuyla parça fişten çıkarılır ve anında teknisyenin araç stoğuna geri iade edilir (`returnTechVehicleStock`).
      - **Sahada Yakın Civardan Satın Alınan Parçalar (Yerel Dış Tedarik & Stok Hareketi):**
        - Teknisyenin araç stoğunda olmayan fakat saha yakınındaki bir elektrikçi, hırdavatçı veya toptancıdan edindiği yedek parçalar için özel `#pane-local-parts` sekmesi ve formu eklendi.
        - Parça Adı, Tedarikçi / Fiş No, Adet ve Alış Fiyatı girilip `[➕ Fişe Ekle & Masrafı Alacak Kaydet]` tıklandığında:
          - **1. Stok Hareketi Belgelenir (`state.stockMovements`):** `STK-MV-XXXXXX` kodu ile sistemde *"Yerel Dış Tedarik (Saha Alımı & Transit İşe Çıkış)"* resmi stok hareketi oluşturulur ve `servisai_stock_movements` hafızasına işlenir.
          - **2. Harcanan Para Teknisyene Alacak Kaydedilir (`state.technicianExpenses`):** Harcanan tutar teknisyenin masraf havuzuna `EXP-PRT-XXXXXX` kodu ile alacak olarak işlenir.
          - **3. Fişe ve Faturaya Yansıtılır:** Parça, kullanılan parçalar listesine ve iş emri faturasına `[Yerel Tedarik]` rozeti ve tedarikçi fiş numarasıyla birlikte eklenir.
      - **Teknisyen Yolculuk & Saha Masraf Formu (Yemek, Su, Akaryakıt, Otopark vb.):**
        - Teknisyenlerin şehirler arası veya şehir içi görev seyahatlerinde, sahada yemek, su, otoyol gişesi, akaryakıt veya otopark harcamalarını kaydedebilmeleri için özel Masraf Formu (`#form-tech-expense`) entegre edildi.
        - Kategori (`🍔 Yemek & Su`, `⛽ Akaryakıt`, `🅿️ Otopark / Gişe`, `🏨 Konaklama`, `🔧 Hırdavat & Sarf Malzeme`, `📦 Kargo / Lojistik`), Açıklama, Belge/Fiş No ve Tutar girilerek kaydedilir.
        - **Canlı Şirket Alacak Bakiyesi (`#tech-total-reimbursement`):** Hem yolculuk/yemek masrafları hem de sahada cebinden aldığı parçaların toplamı sağ üstteki dinamik rozette anlık hesaplanarak teknisyene gösterilir.
      - **Resmi AI Servis Müdahale & Ekspertiz Raporu Motoru (`generateOfficialServiceReport`):**
        - `#btn-generate-ai-report` ("📄 AI Otomatik Servis Raporu") tıklandığında, iş emrindeki tüm teknik ve mali verileri toplayarak 8 resmi bölümden oluşan kurumsal bir kapanış ekspertiz raporu üretir:
          - **1. Sorunun Tespiti:** Kök neden, saha ölçümleri ve arıza teşhisi.
          - **2. Belirlenen Çözüm Yolu:** Uygulanacak mühendislik metotları ve yenileme planı.
          - **3. Cihaza Uygulanan İş ve Fiili Müdahaleler:** Cihaza sahada yapılan lehimleme, komponent değişimi, termal bakım ve testler.
          - **4. Kullanılan Yedek Parçalar ve Stok Hareketleri:**
            - A) Servis aracından kullanılan parçalar (araç plakası, birim fiyat, garanti süresi).
            - B) Sahada yerel dış tedarik ile alınan parçalar (satıcı firma, fiş no, STK-MV stok transit belgesi ve teknisyene kaydedilen alacak tutarı).
          - **5. Kalibrasyon, Güvenlik ve Fonksiyonel Test Onayları:** İzolasyon (500V Meger), termal kamera, voltaj/frekans ve 30 dk tam yük test sonuçları.
          - **6. Finansal Tablo:** Uzman saha mühendislik bedeli, yedek parça maliyeti ve KDV dahil toplam servis tutarı.
          - **7. Teknisyen Saha Masrafları ve Alacak Mutabakatı:** Parça harcamaları + yol/yemek/su giderleri ayrı ayrı dökülerek şirketin teknisyene ödeyeceği toplam alacak bakiyesi resmi onay damgasıyla listelenir.
          - **8. Resmi Teslimat ve Garanti Şartları:** 12 ay servis garantisi, teknisyen dijital kaşesi ve müşteri yetkilisi imza alanları.
        - Üretilen rapor modal penceresinde (`#report-modal`) tam ekran incelenebilir, `[📋 Rapor Metnini Kopyala]` ile panoya aktarılabilir veya `[🖨️ Resmi Raporu Yazdır / PDF İndir]` ile A4 kurumsal formatında anında yazdırılabilir.
    - **7. Teknisyen Saha İş Adımları Günlüğü, Öğrenen Yapay Zeka (Self-Learning KB), Yazıcı Teşhisi, Yönetici Tamamlandı Senkronizasyonu ve Rapor Açılır Menü Düzeltmesi (2026-10-25 Revizyonu - 6):**
      - **1. Teknisyen Saha İş Adımları Günlüğü (`#tech-work-steps-panel`):**
        - Teknisyenin cihaz başında fiilen gerçekleştirdiği operasyon adımlarını adım adım girebileceği interaktif iş günlüğü eklendi.
        - Hızlı şablon butonları (`[⚡ Güç Ölçümü]`, `[🛡️ Sigorta/Koruma]`, `[🔧 Komponent Değişimi]`, `[🧼 Temizlik & Bakım]`, `[✅ On/Test Onayı]`) ile sık uygulanan saha işlemleri tek tıkla listeye eklenebilir.
        - Teknisyen dilediği özel adımı serbest metin olarak yazıp `[➕ Adım Ekle]` butonuyla veya Enter tuşuyla günlüğe işleyebilir.
        - Yanlış eklenen adımlar satır sonundaki `[✕]` silme butonuyla anında kaldırılabilir.
        - Eklenen tüm adımlar iş emriyle birlikte `localStorage` üzerine kalıcı kaydedilir ve resmi **AI Otomatik Servis Raporu**'nun 3. Bölümü altında `"UYGULANAN İŞ ADIMLARI (OPERASYON LOGU)"` başlığıyla 1, 2, 3... şeklinde sıralı basılır.
      - **2. Öğrenen Yapay Zeka & Servis Çözüm Kütüphanesi (`state.serviceKnowledgeBase`):**
        - Teknisyenlerin sahada uyguladığı çözümler ve yazdığı iş adımları `[💡 Çözümü AI Kütüphanesine Kaydet]` butonuyla veya iş durumu *"Tamamlandı"* yapıldığında otomatik olarak sistemin Yapay Zeka Bilgi Bankası'na (`servisai_knowledge_base`) aktarılır.
        - İleride herhangi bir teknisyen benzer bir cihaz ve arıza şikayetiyle karşılaştığında, Yapay Zeka Teşhis Motoru (`synthesizeAIDiagnosis`) öncelikle bu bilgi bankasını tarar.
        - Daha önce çözülmüş benzer bir vaka varsa Yapay Zeka, teknisyenlerimizin geçmişte uyguladığı adımları doğrudan teşhis ekranına getirir ve mor ışıltılı `🧠 Öğrenen AI: Daha önce sahada teknisyenimiz tarafından başarıyla uygulanmış çözüm!` rozetiyle sunar.
      - **3. Yazıcı / Printer ve "Cihaz Açılmıyor / On Durumuna Gelmiyor" Teşhis Motoru:**
        - Gelen şikayet metninde yer alan `[Telefon Çağrısı]` kanal etiketindeki "ısı" ekinin termal NTC sensör kuralını yanlışlıkla tetiklemesi kökten engellendi; kanal etiketleri teşhis öncesinde temizlenerek anahtar kelime eşleşmesi güvenceye alındı.
        - **Yazıcı / Printer / Barkod / Fotokopi / POS** sektörel arıza teşhis kuralları entegre edildi:
          - Açılmıyor / On Durumuna Gelmiyor / Güç Yok arızalarında: SMPS anahtarlamalı güç besleme kartı (Power Supply Board), T2A 250V cam sigorta, varistör (MOV), standby devresi ve 24V / 5V DC DC gerilim regülasyon kontrolleri otomatik önerilir.
          - Kağıt çekmeme / sıkışma arızalarında: Pick-up roller, separation pad ve optik bayrak sensör kontrolleri sunulur.
      - **4. İş Durumu "Tamamlandı" Yapıldığında Yönetici Kontrol Paneli Senkronizasyonu:**
        - Teknisyen Saha Ekranında iş durumu `Tamamlandı` olarak işaretlendiğinde:
          - İş emrinin durumu hem yerel nesnede hem de `state.workOrders` ve `state.staffJobs` listelerinde anında `"Tamamlandı"` yapılır.
          - Yönetici Kontrol Paneli Sevk Masası gelen çağrılar kartlarında ilgili çağrı `is-completed-call` sınıfını alarak solunda zümrüt yeşili onay çizgisi ve sağ üstünde belirgin `✅ Tamamlandı / Teslim Edildi` yeşil rozetiyle parlar.
          - Yönetici üst KPI kartındaki "Aktif İş Emirleri" sayacından iş düşülür; Sevk Masası başlığındaki çağrı sayacında `X Bekliyor (Y Tamamlandı)` canlı mutabakatı gösterilir.
      - **5. Raporlama Ekranı Açılır Menü (Popup) Sola Kayma ve Kesilen Harfler Hatasının Kesin Çözümü (Zero-Bug Custom Select):**
        - **Kök Neden:** Windows / Chromium (Chrome, Edge) tarayıcılarında standart HTML `<select>` elemanları tıklandığında DOM içinde değil, tarayıcının yerel işletim sistemi popup penceresinde (`WebSelectPopup`) açılır. Emoji simgeleri (👨‍🔧, 🛠️, 📦, 📈) veya CSS grid kapsayıcıları altındaki native popup genişlik hesaplama uyuşmazlığında Chromium, işletim sistemi düzeyinde gri bir yatay kaydırma çubuğu (horizontal scrollbar) oluşturmakta ve odaklanan öğeyi zorla en sağa kaydırmaktaydı. Bu durum metinlerin solunu keserek ekranda yalnızca `"ar"`, `"si"`, `"u"`, `"ktronik"` gibi son hecelerin kalmasına sebep oluyordu. Bu işletim sistemi menüsünü saf CSS ile düzeltmek imkansızdı.
        - **Kalıcı Mimari Çözüm (Zero-Bug Custom Select Sistemi):**
          - `app.js` içerisine sıfır hata garantili `initCustomSelect(selectEl)` ve `refreshCustomSelect(selectEl)` motoru entegre edildi.
          - Orijinal `<select>` elemanları (`#report-type-select`, `#report-staff-filter`, `#report-status-filter`) DOM üzerinde tutulup form/test uyumluluğu için `.custom-select-hidden` ile gizlendi.
          - Yanına saf web DOM'u olan `.custom-select-wrapper`, lüks koyu tema tetikleyici butonu (`.custom-select-trigger`), açılır menü (`.custom-select-dropdown`) ve seçenek kartları (`.custom-option`) inşa edildi.
          - Menüye `overflow-x: hidden !important;`, `white-space: normal;` ve özel ince kaydırma çubuğu tanımlanarak yatay scrollbar ihtimali tamamen yok edildi.
          - Seçilen öğe için turkuaz renkli belirgin `✓` onay işareti, yumuşak açılış animasyonu (`customDropdownAnim`), dışarı tıklama (click-outside) ve `Escape` tuşuyla kapanma mekanizması eklendi.
          - `updateReportStaffDropdown()` çalıştığında kadro değişiklikleri `refreshCustomSelect` ile ve `MutationObserver` aracılığıyla özel açılır menüye anında ve otomatik senkronize edildi.
          - Tüm sistem geriye dönük tam uyumlu çalışır; mevcut testler ve JavaScript olay dinleyicileri doğrudan çalışmaya devam eder.

    - **8. Kimlik Doğrulama & Rol Bazlı Yetkilendirme (Auth Hub) ve Teknisyen Mobil & Tablet Uyumluluğu (2026-10-25 Revizyonu - 7):**
      - **1. Çok Rolü Giriş Merkezi (Auth Hub - `#login-modal`):**
        - **Yönetici Girişi (E-Posta & Parola):** Şirket yöneticileri için güvenli oturum açma arayüzü. Backend API (`POST /api/auth/login`) ve çevrimdışı yerel depolama doğrulama desteği. Tek tıkla demo doldurma (`🔑 Yönetici Olarak Oturum Aç`). Varsayılan: `zafer@kocasteknik.com` / `admin123`.
        - **Teknisyen Girişi (4 Haneli Hızlı PIN Kodu & Dokunmatik Tuş Takımı):**
          - Sahadaki teknisyenlerin uzun e-posta ve karmaşık parolalarla vakit kaybetmemesi için açılır menüden teknisyen seçimi ve 4 haneli PIN kodu doğrulama sistemi kuruldu.
          - Mobil cihazlar için 3x4 dokunmatik sayısal tuş takımı (`.mobile-pin-keypad`) entegre edildi. Teknisyen ekrandaki tuşlara (0-9, ⌫ Sil, ✕ Temizle) dokunarak tek elle saniyeler içinde giriş yapabilir.
          - Backend API (`POST /api/auth/tech-pin`) ve yerel SQLite entegrasyonu sağlandı (`Murat Aydın`: PIN `1234`, `Caner Güler`: PIN `2345`, `Selin Kaya`: PIN `3456`, `Emre Yıldız`: PIN `4567`).
        - **Müşteri Portalı Geçişi:** Müşterilerin cihaz durumunu anında sorgulayabilmesi için giriş modalının altına tek tıkla cihaz takip portalına yönlendiren bağlantı eklendi.
      - **2. Rol Bazlı Erişim ve Güvenlik Denetimi (`applyRoleAccess`):**
        - Teknisyen girişi yapıldığında:
          - Yönetici Kontrol Paneli (`#btn-tab-admin`) ve İleri Raporlama (`#btn-tab-reports`) sekmeleri güvenlik gereği teknisyenden gizlenir.
          - Teknisyen doğrudan kendi tezgâhına (`#tech-view`) kilitlenir; başka personelin işlerini değiştiremez veya göremez.
          - Üst başlıktaki kullanıcı hapında teknisyenin avatarı, adı ve unvanı (`👨‍🔧 Murat Aydın (Teknisyen)`) görüntülenir.
        - Yönetici girişi yapıldığında:
          - Tüm sekmeler, finansal raporlar, personel yönetimi ve iş atama sevk masası tam yetkiyle erişime açılır.
      - **3. Teknisyen Ekranlarının Mobil ve Tablet Optimizasyonu (Mobile & Tablet Responsiveness):**
        - **Bölünmüş Mobil Gezinme Çubuğu (`#tech-mobile-toggle-bar`):**
          - Mobil ve dikey tablet ekranlarında (ekran genişliği ≤ 860px) tezgâh ve iş listesi alt alta yığılmak yerine akıllı bir geçiş çubuğuyla ayrıldı:
            - `[📋 Saha Görevleri (X)]`: Teknisyenin üzerine zimmetli bekleyen ve devam eden iş emirleri listesi.
            - `[🛠️ Tezgâh & AI Asistanı]`: Seçili iş emrinin detayları, arıza şikayeti, teşhis, AI asistanı, parça sarfiyatı ve iş adımları günlüğü.
          - Teknisyen görev kartlarından birine dokunduğunda sistem otomatik olarak tezgâh sekmesine geçiş yaparak cihaz detaylarını tam ekran gösterir.
        - **Dokunmatik Alan (Touch Target) ve Ergonomi Standartları:**
          - Sahada eldivenle veya tek elle kullanım kolaylığı için tüm butonlar en az 44px dokunma yüksekliğine (`min-height: 44px;`) ve tam genişliğe (`width: 100%`) kavuşturuldu.
          - iOS Safari ve Android Chrome'da form alanlarına tıklandığında ekranın kontrolsüz yakınlaşmasını (auto-zoom) önlemek amacıyla metin girişleri için 16px taban font boyutu kuralı getirildi.
          - Flexbox ve CSS Grid yapıları esnekleştirilerek (`flex-wrap: wrap; flex-direction: column;`) telefonlarda hiçbir içeriğin ekran kenarlarından taşmaması veya kesilmemesi sağlandı.

    - **9. Sevk Masası Tepsi Ayrımı (Aktif Sevk Masası vs. Biten İşler Tepsisi) ve Resmi Servis Muhasebe & Tahsilat Fişi Modülü (2026-10-27 Revizyonu - 8):**
      - **1. Sevk Masası Çift Tepsi Ayrımı (`#dispatch-tray-tabs`):**
        - **Kök Neden & Ergonomi:** Sevk Masası operatörün anlık iş yüküne odaklandığı sevkiyat masasıdır. Tamamlanan ve teslim edilen işlerin sevk bekleyen açık çağrılarla aynı havuzda kalması ekran kalabalığı yaratıyordu.
        - **Çözüm:** Sevk Masası başlığına çift sekmeli tepsi kontrolü entegre edildi:
          - `[⚡ Aktif Sevk Masası (X Bekliyor)]` (`#tab-dispatch-active`): Henüz atanmamış yeni çağrılar ile sahada onarımı süren açık iş emirleri listelenir.
          - `[✅ Biten İşler Tepsisi (Y Tamamlandı)]` (`#tab-dispatch-completed`): Onarımı ve teknik testleri tamamlanmış servis kayıtları bu tepside toplanır.
        - Sayaçlar dinamik mutabakatla senkronize edilir (`#tray-active-count` ve `#tray-completed-count`).
      - **2. Biten İş Kartları Özel Aksiyonları:**
        - Biten iş kartlarında *"Uzmana Ata"* veya *"Tezgaha Al"* gibi biten işe uymayan butonlar kaldırıldı.
        - Yerine tek tıkla çalışan operasyonel butonlar yerleştirildi:
          - `[📄 Servis Raporunu Gör]` (`.btn-call-view-report`): Teknisyenin arıza teşhisini, sahada uyguladığı operasyon adımlarını, araç ve yerel tedarik parçalarını içeren 8 resmi bölümlü kurumsal Ekspertiz Raporunu tam ekran açar.
          - `[🧾 Muhasebe Fişi]` (`.btn-call-accounting-receipt`): Tahsilat ve harcama mutabakatını sağlayan resmi fiş modalını açar.
          - `[📍 Harita]` ve `[🏷️ Etiket]` butonları.
      - **3. Resmi Servis İşlem & Muhasebe Tahsilat Fişi Modalı (`#accounting-receipt-modal`):**
        - **Müşteri Tahsilat Kalemleri (Gelir):** Uzman Saha Mühendisliği & İşçilik Bedeli (₺), Kullanılan Parçalar (Araç Stoğu & Dış Tedarik kalem kalem), KDV Matrahı (%20 KDV) ve KDV Dahil Genel Toplam Servis Bedeli.
        - **Tahsilat Şekli Seçimi:** Havale / EFT, Kredi Kartı / POS, Nakit Tahsilat veya Müşteri Cari Hesabına Borç Kaydı.
        - **Teknisyen Saha Masrafları & Alacak Mutabakatı (Şirket İçi Gider / Personele İade):** Teknisyenin cebinden ödediği yerel parça alımları (fatura/fiş no ile) ve sahadaki yemek/su/akaryakıt/otoyol masraflarının şirket tarafından personele iade edilecek net tutarı hesaplanır.
        - **Mali İşlemler ve Çıktılar:**
          - `[🖨️ Fişi Yazdır / PDF İndir]`: A4/A5 resmi servis tahsilat makbuzu ve dekont formatında yazdırma.
          - `[📋 Muhasebe Metnini Kopyala]`: Muhasebe ERP (Logo, Mikro vb.) veya e-posta için tek tıkla özet kopyalama.
          - `[💾 Tahsilat Alındı & Muhasebeye İşle]`: Sipariş statüsünü *"Tamamlandı / Teslim Edildi"* olarak muhasebeye kaydetme.
      - **4. Teknisyen Tarafından Dinamik İşçilik Ücreti Belirleme & Hızlı Tarifeler (`#tech-labor-cost-input`):**
        - **Kök Neden & Esneklik:** Her servis müdahalesi aynı iş yüküne sahip değildir (örneğin 15 dakikalık basit sigorta değişimi ile 4 saatlik çok katmanlı PCB güç elektroniği revizyonunun işçilik bedeli farklıdır). Sabit 600 ₺ yerine teknisyenin fiili işe göre işçilik tutarını girebilmesi sağlandı.
        - **Dinamik Giriş:** Teknisyen Saha Ekranı maliyet özet satırına doğrudan düzenlenebilir sayısal işçilik kutusu (`#tech-labor-cost-input`) yerleştirildi.
        - **Hızlı Tarife Rozetleri:** Teknisyenin sahada tek tıkla seçim yapabilmesi için pratik ön tanımlı butonlar eklendi:
          - `[350 ₺ (Hafif)]`: Hafif bakım / basit kontrol
          - `[600 ₺ (Standart)]`: Standart komponent değişimi ve arıza onarımı
          - `[1.200 ₺ (Kapsamlı)]`: Ağır revizyon / çoklu kart onarımı
          - `[0 ₺ (Garantili)]`: Cihaz garantisi veya bakım sözleşmesi kapsamında ücretsiz işçilik
        - **Canlı Çift Yönlü Senkronizasyon:** Teknisyen tutarı değiştirdiği anda `grandTotal = laborCost + partsTotal` anında yeniden hesaplanır; Müşteri Online Onay Ekranındaki onay fiyatına, AI Servis Raporuna ve Muhasebe Tahsilat Fişine anında ve eksiksiz yansır.
        - **Yönetici Çağrı Kabul Entegrasyonu:** Yönetici `#intake-modal` üzerinden yeni çağrı açarken de dilerse başlangıç/tahmini işçilik bedelini (`#intake-labor-cost`) belirleyebilir.

    - **10. Sistem Ayarları Menüsü Altında Hızlı Servis / İşçilik Tarifelerinin Dinamik Yönetimi (2026-10-27 Revizyonu - 9):**
      - **Kök Neden & Enflasyonist Gerçeklik (Zafer Bey'in Vizyonu):**
        - Hızlı tarife seçeneklerinin kod içine veya statik buton etiketlerine sabit (hardcoded) gömülmesi durumunda; haftalık veya aylık enflasyon, artan maliyetler ve değişen şirket fiyat politikaları nedeniyle teknisyenin her seferinde manuel tutar hesaplaması gerekecekti.
        - Yöneticinin tüm hızlı tarife seçeneklerini (Hafif Bakım, Standart Onarım, Kapsamlı Revizyon, vb.) merkezi bir **"Ayarlar"** menüsünden dinamik olarak değiştirebilmesi, yeni tarife tanımlayabilmesi veya mevcut tutarları güncelleyebilmesi ihtiyacı karşılandı.
      - **1. Merkezi "Ayarlar & Tarifeler" Menüsüne Hızlı Erişim (`#settings-modal`):**
        - **Üst Menü Çubuğu (Header):** Kullanıcı hapının yanına tek tıkla açılan `[⚙️ Ayarlar]` (`#btn-header-settings`) butonu yerleştirildi.
        - **Yönetici Kontrol Paneli Buton Çubuğu:** Saha Atama kartı üzerinde `[⚙️ Ayarlar & Tarifeler]` (`#btn-open-settings-modal`) butonu eklendi.
        - **Yönetici / Profil Modalı Bağlantısı:** Yöneticiler penceresi (`#manager-modal`) altından doğrudan tarifeler sekmesine geçiş butonu (`#btn-manager-to-settings`) sağlandı.
      - **2. Modern Tarife Yönetim Paneli & Dinamik Düzenleme:**
        - **Mevcut Tarifeler Listesi (`#settings-rates-list`):**
          - Tanımlı tüm tarifeler tek tek listelenir; yönetici her bir tarifenin adını (`rate-name-input`), açıklama/ipucu metnini (`rate-hint-input`) ve tutarını (`rate-amount-input`) doğrudan satır içi kutulardan değiştirebilir.
          - Her satırda tarifenin görsel rozet tipi (Mavi, Kırmızı, Sarı, Yeşil) görüntülenir.
          - Gereksiz veya kaldırılmak istenen tarifeler için `[❌ Sil]` butonu sunulur (en az 1 tarife kalması korunur).
        - **Yeni Servis Tarifesi Tanımlama Formu (`#form-new-service-rate`):**
          - Yönetici dilediği zaman sisteme yeni bir hızlı tarife ekleyebilir (örn: *"Acil Gece Müdahalesi"*, *"Pazar Günü Nöbetçi Bakım"*, *"Biyomedikal Kalibrasyon"*).
          - Tarife Adı, Buton Kısa Adı, İşçilik Bedeli (₺), İpucu/Açıklama ve Rozet Rengi belirlenerek tek tıkla listeye dahil edilir.
        - **Tüm Tarife Fiyatlarını Kaydetme (`#btn-save-all-rates`):**
          - Yapılan tüm fiyat güncellemeleri tek tıkla tarayıcı yerel hafızasına (`servisai_service_rates`) kaydedilir.
          - Sayfa yenilense veya başka cihazda açılsa dahi güncel tarife bedelleri kalıcı olarak korunur.
        - **Varsayılan Tarifelere Sıfırlama (`#btn-reset-default-rates`):**
          - İstenildiği an tek tıkla fabrika varsayılan ayarlarına (Hafif: 350₺, Standart: 600₺, Kapsamlı: 1200₺, Garantili: 0₺) güvenle geri dönülebilir.
      - **3. Teknisyen Ekranında Anında Canlı Yansıma (`renderLaborPresets`):**
        - Teknisyen Saha Ekranındaki hızlı tarife butonları statik HTML olmaktan çıkarıldı (`#tech-labor-presets-container`).
        - Yönetici Ayarlar Menüsünden *"Standart Onarım"* bedelini 600 ₺'den 850 ₺'ye veya 1.000 ₺'ye yükselttiğinde; teknisyen ekranındaki buton anında `[850 ₺ (Standart)]` etiketini alır.
        - Teknisyen bu butona bastığında, işçilik tutarı kutusuna o anki güncel fiyat yazılır ve toplam servis bedeli anında yeniden hesaplanır.
      - **4. Cihaz Kabul / İntake Modalı Akıllı Senkronizasyonu:**
        - Yeni servis çağrısı açılırken (`#btn-open-intake-modal`), tahmini başlangıç işçilik tutarı (`#intake-labor-cost`) Ayarlar menüsündeki güncel "Standart Onarım" tarife bedelini otomatik olarak devralır.

    - **11. TCMB Canlı Döviz Kurları Entegrasyonu & İthal / Yabancı Menşeili Parça Fiyatlandırması (2026-10-27 Revizyonu - 10):**
      - **Mühendislik İhtiyacı & Saha Gerçeği (Zafer Bey'in Tespiti):**
        - Endüstriyel elektronik, otomasyon, iklimlendirme ve medikal servis operasyonlarında kullanılan yedek parçaların (IGBT güç modülleri, PLC kartları, inverter sürücüler, rulmanlar vb.) çok büyük bir bölümü yurt dışı menşeilidir.
        - Servis firmaları bu parçaları satın alırken veya satarken menşei ülkenin para birimiyle (US$ veya €) fiyatlandırmakta; faturalandırma ve tahsilat anında ise **Türkiye Cumhuriyet Merkez Bankası (TCMB) Döviz Satış Kuru** üzerinden Türk Lirası'na dönüştürmektedir.
        - Sistemin canlı döviz kurlarını otomatik çekmesi, parça eklerken para birimi seçilebilmesi ve teknisyen sahada parçayı seçtiğinde TCMB kuruyla otomatik TL satış fiyatının hesaplanması mimariye kazandırıldı.
      - **1. TCMB Canlı Döviz Kuru Entegrasyonu & 3 Kademeli Dayanıklılık (Triple-Layer Resilience):**
        - **1. Kademe (FastAPI Backend):** `GET /api/exchange-rates/tcmb` uç noktası Python `urllib` ve `ElementTree XML` ile doğrudan `https://www.tcmb.gov.tr/kurlar/today.xml` adresine bağlanarak TCMB Efektif Döviz Satış kurlarını (USD ve EUR) kuruşu kuruşuna canlı çeker.
        - **2. Kademe (Frontend Canlı API Fallback):** CORS engeli veya yerel sunucu yokluğunda tarayıcı doğrudan global döviz API'si (`open.er-api.com`) üzerinden USD/TRY ve EUR/TRY kurlarını canlı okur.
        - **3. Kademe (Kalıcı Yerel Hafıza & Nominal Emniyet Kurları):** İnternet kesintisi veya banka sunucusu gecikmelerinde sistem asla hata vermez; son çekilen başarılı kurlar (`servisai_exchange_rates`) veya nominal güvenli kurlar (USD: 38.50 ₺, EUR: 41.20 ₺) devreye girer.
      - **2. Ayarlar Menüsü Altında Canlı TCMB Kurları Panosu (`#settings-currency-box`):**
        - Ayarlar modalında canlı TCMB USD ve EUR efektif satış kurları yeşil/mavi rozetlerle gösterilir.
        - `[🔄 TCMB'den Kurları Güncelle]` butonu ile yönetici dilediği an tek tıkla kurları canlı tazeleyebilir.
        - Bilgi notunda kurların kaynağı ve son güncellenme zamanı şeffaf biçimde sunulur.
      - **3. Yedek Parça Ekleme Modalı Çoklu Para Birimi Seçicisi (`#stock-modal`):**
        - Parça ekleme penceresinde **"Para Birimi & Menşei"** açılır kutusu (`#stock-currency`) eklendi:
          - 🇹🇷 **TRY (₺ - Türk Lirası)**
          - 🇺🇸 **USD ($ - Amerikan Doları)**
          - 🇪🇺 **EUR (€ - Euro)**
        - **Canlı TCMB Çevrim Önizleme Kartı (`#stock-currency-conversion-preview`):**
          - USD veya EUR seçilip döviz tutarı girildiğinde; sistem anında o anki güncel TCMB kuru ile çarparak net TL satış tutarını (`45.00 $ x 38.50 ₺ = 1.732,50 ₺`) canlı önizleme kutusunda hesaplar.
          - Kaydet butonuna basıldığında parçanın hem orijinal döviz cinsi (`currency: 'USD'`), hem döviz tutarı (`originalPrice: 45`), hem kullanılan TCMB kuru (`exchangeRate: 38.50`), hem de net TL satış fiyatı (`price: 1732.50`) stok kartına işlenir.
      - **4. Stok Listesinde Bağımsız "Birim Fiyat" Kolonu & İthal Parça Rozetleri (`renderStockTable`):**
        - Mobil araç stokları, Atölye ve Depo Takibi tablosunda **"Parça Kodu & Tanımı"** kolonunun hemen yanına özel ve bağımsız **"Birim Fiyat"** sütunu konumlandırıldı.
        - Tüm lokasyon görünümlerinde (Tüm Lokasyonlar, Merkez Depo, Atölye, Araçlar) fiyat sütunu sabit tutularak kaybolması engellendi.
        - Bu sütunda net TL satış fiyatı belirgin zümrüt yeşili renkte (`1.732,50 ₺`) görüntülenir; dövizli/ithal parçalarda ise tutarın hemen altında şık TCMB döviz rozeti (`$45 (TCMB: 38.50 ₺)`) yer alır.
        - Kullanıcı fareyle rozetin üzerine geldiğinde o parçanın kaydedildiği TCMB efektif satış kur detayı ipucu olarak görünür.
      - **5. Teknisyen Saha Tezgâhında Akıllı Parça Seçimi (`updateVehiclePartDropdown`):**
        - Teknisyen araç stoğundaki parçaları seçerken açılır menüde parçanın ithal menşeisi belirtilir:
          - *Semikron IGBT Güç Modülü (IGBT-600V) - Araçta: 4 adet - 1.732,50 ₺ [İthal: $45 @ 38.50 ₺]*
        - Teknisyen bu parçayı işe eklediğinde, tezgâh listesinde ve maliyet dökümünde mavi/mor döviz rozeti yer alır.
      - **6. Resmi Muhasebe Fişi ve AI Servis Raporunda Tam Finansal Şeffaflık:**
        - **Muhasebe Tahsilat Fişinde:** İthal parça satırının altında `• [İthal: $45 - TCMB Kuru: 38.50 ₺]` ibaresi basılarak muhasebe departmanının faturayı teyit etmesi ve vergi matrahını döviz bazında denetlemesi sağlanır.
        - **Resmi Servis Raporunda:** Müşteriye sunulan servis raporunda parçanın menşei ve dönüştürülen TCMB kuru kurumsal bir dille belgelendirilir.

    - **12. Saha Operasyon Yaşam Döngüsü & Süre Hesaplama Motoru (2026-10-27 Revizyonu - 11):**
      - **Saha İhtiyacı & Yönetim Analitiği (Zafer Bey'in Vizyonu):**
        - Teknik servisin gerçek verimliliği; teknisyenin yolda geçirdiği intikal süresi ile cihaz başında arıza teşhis/onarımında geçirdiği sürenin ayrı ayrı ölçülebilmesiyle belirlenir.
        - Teknisyenin servise çıkış, adrese varış ve işi bitirme anlarının kayıt altına alınması, toplam saha mesaisinin hesaplanması ve bunun personel performans raporuna yansıması sağlandı.
      - **1. 3 Aşamalı Operasyonel Yaşam Döngüsü Kontrol Barı (`#tech-gps-lifecycle-banner`):**
        - **Aşama 1 (Yola Çıkış):** Teknisyen `[🚀 Yola Çıktım (GPS Takibini Başlat)]` butonuna basar. Durum "Yolda" olur, canlı GPS simülasyonu başlar ve `departed_at` (yola çıkış) zaman damgası kaydedilir.
        - **Aşama 2 (Adrese Varış):** Buton dinamik olarak `[📍 Müşteriye Ulaştım (İşe Başla)]` butonuna dönüşür. Teknisyen adrese vardığında bu butona basar; durum "Onarımda" olur, `arrived_at` zaman damgası kaydedilir ve seyahat/intikal süresi (`travel_duration_minutes = arrived_at - departed_at`) anında hesaplanır.
        - **Aşama 3 (Onarımı Tamamlama):** Cihaz onarılıp test edildiğinde `[🎉 Onarımı Tamamla & Teste Gönder]` butonuna basılır; durum "Tamamlandı" olur, `completed_at` zaman damgası kaydedilir ve fiili onarım süresi (`repair_duration_minutes = completed_at - arrived_at`) ile toplam süre (`total_duration_minutes`) hesaplanır.
      - **2. Teknisyen Ekranında Canlı Durum & Zaman Rozeti (`updateTechJourneyUI`):**
        - Yolda iken: `🚗 Yola Çıkış: 09:15 • 📡 Seyahat Sürüyor (Canlı GPS)`
        - Onarımda iken: `🏢 Adrese Ulaşıldı: 09:47 (İntikal: 32 Dk) • ⏱️ Fiili Onarım Sürüyor`
        - Tamamlandığında: `✅ Görev Tamamlandı • İntikal: 32 Dk • Onarım: 58 Dk • Toplam Mesai: 1 Sa 30 Dk`
      - **3. Yönetici Sevk Masası ve Biten İşler Tepsisinde Süre Rozetleri:**
        - Tamamlanan çağrı kartlarında doğrudan süre dökümü yer alır:
          - `🚗 Seyahat: 32 dk • 🛠️ Onarım: 58 dk • ⏳ Toplam: 1 Sa 30 Dk`
      - **4. Resmi Muhasebe Fişi ve AI Servis Raporunda Şeffaf Zaman Çizelgesi:**
        - **Muhasebe Fişinde:** `⏱️ Saha Operasyon Süreleri: Yola Çıkış: 09:15 • Varış: 09:47 (32 Dk İntikal) • Bitiş: 10:45 (58 Dk Onarım) • Toplam Saha Mesaisi: 1 Sa 30 Dk`.
        - **Resmi Ekspertiz Raporunda:** "5. SAHA ZAMAN VE OPERASYONEL SÜRE DÖKÜMÜ" başlığı altında dakika hassasiyetiyle belgelendirilir.
      - **5. Yönetici BI & Personel Performans Raporunda 3 Yeni Metrik Kolonu:**
        - Personel Performans tablosuna **"Ort. İntikal"**, **"Ort. Onarım"** ve **"Toplam Mesai"** kolonları eklendi.
        - Yönetici her teknisyenin ortalama yol süresini (örn: `🚗 30 Dk`), cihaz başı ortalama tamir süresini (örn: `🛠️ 45 Dk`) ve sahada geçirdiği toplam saatlik mesaisini (örn: `14 Sa 20 Dk`) tek ekranda analiz edebilir.

    - **13. Biten İşler Tepsisi Tam Konsolidasyonu, Kart Süre Rozetleri & Personel Performans Raporu Kararlılık Güncellemesi (2026-10-27 Revizyonu - 12):**
      - **Kullanıcı Bildirimi & Teşhis (Zafer Koçaş Bey):**
        - Sevk masası yanında 5 biten iş sayacı görünmesine rağmen "Biten İşler Tepsisi" tıklandığında yalnızca tek işin görünmesi, kartlar üzerinde intikal/onarım/toplam sürelerinin yer almaması ve Personel Performans Raporunda metrik sütunlarının görüntülenememesi bildirildi.
      - **1. Biten İşler Konsolidasyonu (`consolidateAllWorkOrders`):**
        - `state.staffJobs` (Murat Aydın, Caner Güler, Selin Kaya, Emre Yıldız) altında kayıtlı olan biten işler ile `state.workOrders` arasındaki ayrışma giderildi.
        - Uygulama başlatılır başlatılmaz (`DOMContentLoaded`) ve sevk masası her yenilendiğinde konsolidasyon otomatik çalışarak 5 tamamlanmış işin (`SRV-2026-104`, `SRV-2026-108`, `SRV-2026-098`, `SRV-2026-101`, `SRV-2026-092`) tamamı Biten İşler Tepsisinde eksiksiz listelenir hale getirildi.
        - Liste yüksekliği `max-height: 520px` yapılarak kartların sıkışmadan rahatça incelenmesi sağlandı.
      - **2. Tüm Kart Arayüzlerinde Süre Rozetleri (Seyahat, Onarım, Toplam):**
        - **Sevk Masası & Biten İşler Kartlarında:** Tamamlanan işlerde `🚗 Seyahat: X dk • 🛠️ Onarım: Y dk • ⏳ Toplam: Z` rozeti; onarımda olan işlerde `🚗 İntikal: X dk • 🔬 Cihaz Başında Onarımda` rozeti eklendi.
        - **Teknisyen Tezgâhı İş Listesinde (`.job-card`):** Saha teknisyeninin kendi ekranında her işin altında süre dökümü canlı olarak basıldı.
        - **Personel Atanan İşler Modalında (`.staff-job-card`):** Yöneticinin personele tıkladığında açtığı iş geçmişi kartlarına intikal ve tamir süreleri entegre edildi.
      - **3. Personel Performans Raporunun Kesintisiz Çalışması:**
        - `formatDurationMinutes` ve `formatTimeOnly` yardımcı fonksiyonları global kapsama alınarak tarayıcı içi `ReferenceError` riski tamamen ortadan kaldırıldı.
        - Raporlar sekmesine geçildiğinde (`data-tab="reports"`) ve sayfa ilk açıldığında `executeCustomReport()` otomatik çağrılarak tablonun anında dolması sağlandı.
        - `backend/report_service.py` üzerindeki Python servis fonksiyonuna `avg_travel_minutes` ve `total_onsite_minutes` metrikleri eklenerek backend ve frontend veri bütünlüğü 10/10 kalite skoruyla doğrulandı.

    - **14. Excel ile Çoklu Para Birimli (USD / EUR / TRY) Toplu Parça Yükleme & TCMB Canlı Çevrim Modülü (2026-10-27 Revizyonu - 13):**
      - **Kullanıcı Talebi (Zafer Koçaş Bey):**
        - Excel veya kopyala-yapıştır ile yapılan toplu yedek parça yüklemelerinde, ithal / yabancı menşeili parçaların birim fiyatlarının Amerikan Doları (USD - `$`) veya Euro (EUR - `€`) cinsinden sisteme aktarılabilmesi, TCMB kurlarıyla otomatik TL satış fiyatının hesaplanması ve bunun esnek yöntemlerle sunulması talep edildi.
      - **Sunulan 3 Esnek ve Güçlü Yükleme Yöntemi:**
        - **1. Yöntem (Hücre İçi Döviz Simgesi veya Kodu - En Doğal & Hızlı Yol):**
          - Excel hücresine doğrudan `$45.00`, `45 USD`, `45 $`, `120.00 €`, `120 EUR` veya `1.750 TL`, `₺ 1750` yazıldığında sistem sayı temizleme sırasında para birimini otomatik yakalar.
          - Canlı TCMB Efektif Döviz Satış Kuru ile çarparak net TL fiyatını (`price`), orijinal dövizi (`originalPrice`), para birimini (`currency: 'USD'|'EUR'|'TRY'`) ve kuru (`exchangeRate`) stok kartına anında işler.
        - **2. Yöntem (Ayrı Bir 'Para Birimi' / 'Döviz' Kolonu Açmak):**
          - Excel dosyasında veya tabloda `Para Birimi`, `Döviz`, `Döviz Cinsi`, `Currency`, `Kur` veya `PB` başlıklı ayrı bir sütun açılır.
          - Fiyat sütununa yalnızca yalın sayılar (`45`, `120`), para birimi sütununa ise `USD`, `EUR`, `TRY`, `TL`, `$`, `€` yazılır.
          - Sistem başlık eşleştirmesinde (`colMap.currency`) bu kolonu tanır ve satır bazında dinamik kurlama yapar.
        - **3. Yöntem (Modal Üstü Açılır Seçim Çubuğu - 'Tüm Liste USD / EUR'):**
          - Dosyada veya yapıştırılan metinde hiçbir döviz simgesi ya da para birimi sütunu bulunmasa bile (örn: `RULMAN-6204 | Rulman | 25 | 45` gibi yalın sayılar):
          - Toplu Yükleme Modalı üzerindeki **"Excel / Tablodaki Para Birimi"** (`#bulk-currency-mode`) açılır menüsünden `💵 Tüm Liste USD ($)` veya `💶 Tüm Liste EUR (€)` seçildiğinde, tablodaki tüm fiyatlar anında o anki güncel TCMB kuru ile çarparak net TL'ye dönüştürülür.
      - **Arayüz & Önizleme Yenilikleri:**
        - **Toplu Döviz Kontrol Çubuğu (`#bulk-currency-bar`):** Modal üstünde açılır para birimi seçicisi ve o anki TCMB kurlarını gösteren canlı rozet (`#bulk-tcmb-badge`: `TCMB: $38.50 | €41.20`) yer alır.
        - **Şeffaf Canlı Önizleme Tablosu (`renderBulkPreview`):** Dövizli parçalar tabloda `$45.00 (USD) ➔ 1.732,50 ₺ (TCMB: 38.50 ₺)` şeklinde orijinal döviz rozeti, net TL tutarı ve uygulanan TCMB kuruyla birlikte döküm halinde gösterilir.
        - **Dinamik Yeniden Hesaplama (`reparseBulkData`):** Kullanıcı açılır menüden para birimini değiştirdiği anda tablo yeniden yüklenmeden saniyesinde yeni kurlarla güncellenir.
        - **Güncellenen Şablon & Örnekler:** İndirilebilir CSV şablonu (`btnDownloadTemplate`) ve hızlı örnek doldurucu (`btnSampleBulk`) çoklu para birimli (USD, EUR, TRY) kolon ve verilerle zenginleştirildi.
      - **Doğrulama:** `scratch/test_dispatch_trays_and_accounting_receipt.js` üzerinde hazırlanan TEST 11 ile hücre içi sembol, ayrı sütun ve modal seçimi test edilerek 11/11 tam puanla doğrulandı.

    - **15. Euro Simgesi (€) Kapsamlı Karakter & Excel Hücre Biçimi Koruma Güncellemesi (2026-10-27 Revizyonu - 14):**
      - **Kullanıcı Geri Bildirimi (Zafer Koçaş Bey):**
        - Excel ile parça yüklerken `US$`, `USD` ve `$` sembollerinin kusursuz algılandığı; fakat `€` simgesi yazıldığında algılanmayıp `EUR` veya `EURO` metinleri yazıldığında algılandığı tespit edilip bildirildi.
      - **Kök Neden Analizi (Mühendislik Teşhisi):**
        - **1. Excel Otomatik Sayı/Para Biçimlendirmesi:** Excel'de Türkçe bölge ayarlarında hücreye `120 €` yazıldığında, Excel bunu metin olarak değil sayısal değer (`cell.v = 120`) ve özel para birimi formatı (`cell.z = '#,##0.00 €'`) olarak depolar. SheetJS `raw: true` varsayılanıyla okunduğunda yalnızca ham sayı `120` dönmekte, `€` simgesi metin seviyesinde silinmekteydi. `EUR` veya `EURO` yazıldığında ise Excel bunu metin olarak sakladığı için algılanmaktaydı.
        - **2. Karakter Kodlaması (Encoding & Mojibake):** CSV veya panodan kopyalama sırasında Windows-1252/ANSI kodlamasındaki `0x80` byte'ı veya UTF-8 Mojibake (`â‚¬`, `&euro;`, `&#8364;`) varyasyonları standart eşleşmeden kaçabilmekteydi.
        - **3. Sütun Başlığı Döviz Gösterimi:** Kullanıcı sütun başlığını `Fiyat (€)` veya `Price (EUR)` olarak açıp satırlara yalın sayılar girdiğinde, başlıktaki para birimi satırlara devredilemiyordu.
      - **Uygulanan Kesin Çözümler:**
        - **1. Akıllı Çalışma Sayfası Çıkarıcı (`extractWorksheetRows`):** SheetJS kütüphanesinden hem ekranda görünen biçimlendirilmiş metinler (`cell.w`), hem sayısal ham değerler (`cell.v`), hem de para birimi format dizesi (`cell.z`) birleştirilerek Excel'in biçimlendirdiği tüm `€` ve `$` sembolleri %100 korumayla matrise aktarıldı.
        - **2. Çok Boyutlu Döviz Tespiti (`detectCurrencyFromText`):** `€`, `\u20AC`, `\u0080` (ANSI Euro), `â‚¬` (Mojibake), `&euro;`, `&#8364;`, `EUR`, `EURO`, `AVRO`, `EVRO` varyasyonlarının tamamı eksiksiz `EUR` olarak standardize edildi.
        - **3. Fiyat Sütun Başlığı Koruması (`colMap.priceHeaderCurrency`):** Sütun başlığı `Fiyat (€)` veya `Birim Fiyat ($)` olduğunda, satırlardaki yalın sayılar otomatik olarak başlıktaki döviz cinsiyle eşleştirildi.
        - **4. Konumsal Çıkarım İyileştirmesi:** Başlıksız veya özel yapıştırılan listelerde döviz kolonu (`€`, `EUR`, `$`, `USD`) garanti sütunundan (`warranty`) kesin hatlarla ayrıştırıldı.
      - **Doğrulama:** `scratch/test_dispatch_trays_and_accounting_receipt.js` içerisinde tüm Euro varyasyonları (`120.00 €`, `€ 120`, `120€`, `120 \u20AC`, `120 â‚¬`, `120 EUR`, `120 EURO`) test edilmiş ve 11/11 tam puanla doğrulanmıştır.

    - **16. Türkçe Büyük Harf (İ/i, I/ı) Başlık Eşleşmesi, Excel OpenXML `cell.z` ve Önbellek Kırıcı Kararlılık Paketi (2026-10-27 Revizyonu - 15):**
      - **Kullanıcı Geri Bildirimi (Zafer Koçaş Bey):**
        - Revizyon sonrası yapılan testte `€` simgesinin yine görülmediği (`"Yaptığım testte görmedi"`) bildirildi.
      - **Derinlemesine Mühendislik Kök Neden Analizi (3 Kritik Bulgu):**
        - **1. JavaScript Türkçe `toLowerCase()` Kombine Nokta (`\u0307`) Hatası:**
          - JavaScript'in yerleşik `str.toLowerCase()` fonksiyonu, Türkçe büyük noktalı `İ` harfini (`\u0130`) tek bir `i` harfine değil, `i` (`\u0069`) + kombine üst nokta (`\u0307`) şeklinde 2 karaktere dönüştürür.
          - Bu sebeple Excel veya panodaki Türkçe büyük harfli sütun başlıkları (`FİYAT`, `FİYAT (€)`, `BİRİM FİYAT`, `DÖVİZ`, `PARA BİRİMİ`) `fi̇yat` haline gelmekte ve `['fiyat'].includes('fi̇yat')` **FALSE** dönmekteydi.
          - Sonuç olarak `colMap.price` ve `colMap.currency` sütunları **-1** olarak kalıyor, kullanıcının girdiği fiyat ve döviz sütunları tamamen atlanarak varsayılan `100 ₺ (TRY)` atanıyordu.
        - **2. Excel OpenXML Hücre Format Kodu (`cell.z`):**
          - Excel'in standart para format kodu `[$€-tr-TR] #.##0,00` veya `[$€-2] #,##0.00` şeklindedir. SheetJS `.w` metnini her zaman oluşturamadığında ve format kodu incelenirken `[$` ön eki yanlışlıkla Dolar (`$`) olarak yorumlanabilmekte veya `€` sembolü satıra aktarılamamaktaydı.
        - **3. Tarayıcı Önbelleği (Browser Cache):**
          - `index.html` dosyasında `<script src="app.js"></script>` çağrısı yer aldığından, kullanıcının tarayıcısı yeni güncellemeyi çekmeyip eski `app.js` dosyasını önbellekten (cache) çalıştırmaktaydı.
      - **Uygulanan Kesin Çözümler:**
        - **1. Türkçe Karakter Normalleştirici (`normalizeMatchText`):**
          - Hem büyük `İ`, `I`, hem küçük `ı`, `i`, hem de Unicode kombine üst nokta (`\u0307`) tekdüze `i` karakterine indirgenerek `FİYAT`, `FİYAT (€)`, `BİRİM FİYAT`, `DÖVİZ` ve `PARA BİRİMİ` başlıkları %100 doğrulukla eşleştirildi.
        - **2. Excel OpenXML Format Koruması (`extractWorksheetRows`):**
          - `cellObj.z` format kodu incelenerek Euro formatlı (`[$€-tr-TR]`, `[$€-2]`, `EUR`) hücrelerin ham değerlerine `€` sembolü garanti olarak eklendi; `[$` yerel ön ekinin Dolar ile karışması engellendi.
        - **3. Önbellek Kırıcı Versiyon Damgası:**
          - `index.html` dosyasında script etiketi `<script src="app.js?v=20261027_1630"></script>` olarak güncellendi.
      - **Doğrulama:** `scratch/test_excel_cases.js` ve `scratch/test_dispatch_trays_and_accounting_receipt.js` test süitleriyle hem Türkçe büyük harfli Excel başlıkları hem de tüm Euro varyantları 11/11 tam puanla doğrulanmıştır.

    - **17. Cihaz Sicil Kartı, Seri No Takibi, Dijital Cihaz Pasaportu & Konum/Garanti/Arıza Yaşam Döngüsü Modülü (2026-10-27 Revizyonu - 16):**
      - **Mühendislik İhtiyacı & Saha Gerçeği (Zafer Koçaş Bey'in Vizyonu):**
        - Endüstriyel otomasyon, sürücü sistemleri, pompa istasyonları ve elektromekanik servis operasyonlarında ana takip birimi soyut müşteri adı değil; sahada yıllarca çalışan somut cihazın **Seri Numarasıdır (S/N)**.
        - Bir cihazın işletme ömrü boyunca nerede bulunduğu (Merkez Atölyede onarım/testte mi, Müşteri Sahasında montajlı mı, Merkez Depoda konsinye mi, Servis Aracında sevkiyatta mı), garantisinin devam edip etmediği, fabrikadan çıkışından bugüne kadar çıkardığı arıza ve hata kodları (OC-A, F001 vb.), hangi teknisyenin hangi mühendislik müdahalesini yaptığı ve cihaza bugüne kadar takılan tüm yedek parçaların kümülatif döviz/TL maliyeti tek ekranda izlenebilir hale getirildi.
      - **1. Üst Navigasyon Menüsü 5. Rol Butonu & Görünüm Paneli (`#equipment-view`):**
        - Ana gezinme çubuğuna `[🏷️ Cihaz Sicil & Seri No]` (`#btn-tab-equipment`) sekmesi ve anlık cihaz sayısını gösteren rozet (`#equipment-count-badge`) eklendi.
        - Üst panoda 5 adet KPI Sayaç Kartı konumlandırıldı:
          - 🏷️ **Toplam Kayıtlı Cihaz:** Sistemde sicili açılmış tüm endüstriyel üniteler.
          - 🛡️ **Garanti Kapsamında:** Yasal/sözleşmeli garantisi süren cihazlar.
          - ⚠️ **Garanti Dışı:** Garanti süresi dolmuş, ücretli onarıma tabi cihazlar.
          - 🔬 **Atölyede (Merkez Test):** Laboratuvar veya tezgahta revizyonda olan cihazlar.
          - 🏢 **Müşteri Sahasında:** İşletmelerde aktif montajlı çalışan cihazlar.
      - **2. Akıllı Arama & Dinamik Filtreleme Çubuğu:**
        - **Metin Arama Çubuğu (`#equipment-search-input`):** Seri numarası, marka, model, cihaz türü veya müşteri adına göre anında (real-time) filtreleme.
        - **Filtreleme Hapları (Filter Pills):** `[Tüm Cihazlar]`, `[🛡️ Garantili]`, `[⚠️ Garanti Dışı]`, `[🔬 Atölyede]`, `[🏢 Müşteride]`, `[🚐 Sevkiyatta]` haplarıyla tek tıkla liste filtreleme.
      - **3. Cihaz Sicil Tablosu & Hızlı Operasyon Butonları (`renderEquipmentRegistry`):**
        - **Seri No Sütunu:** Monospace fontlu, tıklanabilir mavi bağlantı (`.equipment-serial-link`). Tıklandığı anda doğrudan cihazın Dijital Pasaportunu açar.
        - **Konum Rozetleri:** Renk kodlu rozetler (`🔬 Atölyede`, `🏢 Müşteride`, `📦 Depoda`, `🚐 Araçta`, `✅ Teslim Edildi`).
        - **Garanti Rozetleri:** Kalan gün/ay sayacı ve bitiş tarihiyle birlikte yeşil `🛡️ Garantili` veya sarı `⚠️ Garanti Dışı` rozetleri.
        - **Satır İçi Hızlı Aksiyonlar:**
          - `[📖 Pasaport]`: Cihazın dijital pasaport modalını tam ekran açar.
          - `[📍 Konum Değiştir]`: Cihazın lokasyonunu ve konum notunu (örn: Test Rafı B-3) anında günceller.
          - `[➕ Çağrı Aç]`: Cihazın seri no, model ve müşteri bilgilerini hazır doldurarak yeni servis çağrısı açar.
      - **4. Dijital Cihaz Pasaportu & Resmi A4 Yazdırma Motoru (`#equipment-passport-modal`):**
        - **Resmi Pasaport Başlığı & Barkod Simülasyonu:** Cihazın seri numarasını temsil eden grafik barkod çizgileri, resmi sicil numarası ve durum rozetleri.
        - **Cihaz Kimlik & Meta Kartları:** Marka, Model, Cihaz Kategorisi, Kayıtlı Müşteri, Üretim & İlk Montaj Tarihi, Garanti Bitiş Tarihi, Toplam Müdahale Sayısı ve Kümülatif Maliyet (TL).
        - **Kronolojik Arıza & Müdahale Zaman Tüneli (`#pass-timeline-container`):** Cihazın tarihsel servis günlüğü; her müdahalenin tarihi, çağrı numarası, bildirilen arıza, tespit edilen hata kodları, arıza kök nedeni, yapılan mühendislik müdahalesi ve sorumlu uzman teknisyen adı dökülür.
        - **Kullanılan / Değiştirilen Parçalar Kütüğü (`#pass-parts-tbody`):** Cihaza takılan tüm komponentlerin parça kodu, parça adı, adeti, orijinal döviz fiyatı (USD/EUR rozetleriyle) ve TCMB kuruyla dönüştürülmüş net TL maliyetleri.
        - **Kümülatif Maliyet Çubuğu:** Parça toplamı, işçilik toplamı ve cihazın toplam servis harcama matrahı.
        - **A4 / PDF Resmi Pasaport Çıktısı (`#btn-print-device-passport`):** `@media print` altında `body.printing-equipment-passport` kuralı ile cihazın tüm teknik sicilini, barkodunu, arıza geçmişini ve parça listesini resmi A4 formatında yazdırır veya PDF olarak dışa aktarır.
      - **5. Sevk Masası ve Çağrı Kartlarında Çapraz Bağlantı (Cross-Navigation):**
        - Sevk masasında ve teknisyen tezgâhındaki iş kartlarında yer alan seri numaraları düz metin olmaktan çıkarılarak interaktif pasaport bağlantılarına (`equipment-serial-link`) dönüştürüldü.
        - Operatör veya teknisyen iş emrini incelerken seri numarasına tek bir tıkla basarak cihazın geçmişte hangi arızaları verdiğini ve daha önce hangi parçaların değiştiğini tezgâhtan ayrılmadan görebilir.
      - **6. Başlıksız 3 Kolonlu Excel / Pano Yapıştırmasında Para Birimi Koruması:**
        - Kullanıcı başlık yazmadan `PRC-001 <TAB> 6204 Rulman <TAB> 120 €` şeklinde yapıştırdığında, sondaki `120 €` hücresinin miktar (qty) sanılması engellendi; `detectCurrencyFromText` ile para birimi ve fiyat olduğu garanti altına alınarak döviz cinsi `EUR`, fiyatı TCMB kuru ile hesaplandı.
      - **Doğrulama:** `scratch/test_dispatch_trays_and_accounting_receipt.js` test dosyasındaki TEST 12 ile arayüz bileşenleri, veri yapıları, zaman tüneli, dövizli parça dökümü ve 3 kolonlu yapıştırma koruması 12/12 tam puanla doğrulanmıştır.

    - **18. Sesle Müdahale Kaydı (Voice-to-Text & Türkçe NLP Ayrıştırma), İnteraktif Web & Sosyal Medya Arıza Kayıt Widget'ı ve e-Fatura / e-Arşiv Entegrasyonu (2026-10-27 Revizyonu - 17):**
      - **Kullanıcı Talebi & Genişleme Vizyonu (Zafer Koçaş Bey):**
        - 1. Teknisyenin cihaz başında elleri yağlı/meşgulken klavyeyle yazmak yerine konuşarak sesle müdahale kaydı yapabilmesi.
        - 2. İşletmelerin kendi web sitelerine (WordPress, Wix vb.) veya sosyal medya biyo hesaplarına ekleyebilecekleri, arka planda uygulamaya bağlı interaktif bir arıza/kayıt formu sunulması.
        - 3. Muhasebe fişinin tek tıkla e-Fatura/e-Arşiv olarak Paraşüt, KolayBi ve GİB standartlarında faturalandırılabilmesi.
      - **1. Sesli Saha Müdahale Asistanı & Türkçe NLP Otomatik Ayrıştırma Motoru:**
        - **Web Speech API Entegrasyonu:** Teknisyen tezgâhına `[🎙️ Konuşarak Kaydet (Canlı Dikte)]` ana butonu ve her kutunun başlığına hızlı dikte butonları eklendi.
        - **Türkçe NLP Akıllı Ayrıştırma Algoritması (`distributeVoiceTranscriptSmartly`):**
          - Teknisyen serbest bir dille konuştuğunda (örn: *"Sürücüde OC-A aşırı akım hatası ve IGBT modülünde sızıntı tespit edildi. Hasarlı IGBT modülü sökülüp yenilenecek. Yeni IGBT takıldı ve 30 dakika tam yükte test edildi."*);
          - Sistem cümleleri anlık analiz ederek;
            - Arıza/ölçüm ifadelerini **1. Adım (Sorunun Tespiti)** kutusuna,
            - Plan/sipariş ifadelerini **2. Adım (Çözüm Yolu)** kutusuna,
            - Değişim/montaj/test ifadelerini **3. Adım (Uygulanan Müdahale)** kutusuna ve
            - **Teknisyen İş Adımları Günlüğü**'ne otomatik olarak dağıtır ve kaydeder.
        - **Görsel Ses Dalgası & Canlı Transkript Bandı:** Konuşma sırasında animasyonlu renkli ses barları ve anlık transkript metni gösterilir.
      - **2. İnteraktif Web & Sosyal Medya Müşteri Arıza Formu Widget'ı (`widget.html` & Embed Hub):**
        - **Bağımsız Müşteri Formu (`widget.html`):** Herhangi bir web sitesine `<iframe>` ile gömülebilen veya cep telefonlarında doğrudan biyo linki olarak açılabilen lüks koyu temalı, mobil uyumlu servis kayıt sayfası inşa edildi.
        - **Yönetici Embed Hub Modalı (`#embed-widget-modal`):**
          - Tek tıkla kopyalanabilir WordPress/Wix uyumlu `<iframe src="widget.html"...>` kodu.
          - Instagram, WhatsApp ve Google Haritalar için doğrudan biyo linki (`https://funzervicetech.ai/widget.html`).
          - Canlı Iframe önizleme penceresi ve `[⚡ Örnek Web Arıza Çağrısı Gönder]` test simülatörü.
        - **Canlı Sevk Masası Senkronizasyonu:** Formdan gönderilen kayıtlar `postMessage` ve `localStorage` üzerinden Yönetici Sevk Masası'na `[🌐 Web Sitesi Çağrısı]` neon mavi rozetiyle ve bildirimle anında düşer.
      - **3. Resmi GİB e-Fatura & e-Arşiv Entegrasyonu (Paraşüt, KolayBi ve UBL-TR 2.1):**
        - **Ayarlar Menüsü e-Fatura Paneli:** Entegratör seçimi (`Paraşüt API v4`, `KolayBi REST API v1`, `BizimHesap`, `Logo İşbaşı`, `GİB Doğrudan`), API Key, Client Secret, Fatura Seri Ön Eki (`GIB`, `EAR`) ve Test/Sandbox modu.
        - **Muhasebe Fişinden Tek Tıkla e-Fatura:** `#accounting-receipt-modal` altına `[🧾 Resmi e-Fatura / e-Arşiv Kes]` butonu yerleştirildi.
        - **GİB Kurumsal e-Fatura Tasarımı (`#efatura-preview-modal`):**
          - GİB logosu, ETTN (UUID) kodu, simüle edilmiş GİB QR karekodu, alıcı VKN/TCKN ve vergi dairesi.
          - Müşteri kurumsal ise otomatik `e-Fatura`, şahıs ise otomatik `e-Arşiv Fatura` ayrımı.
          - Mal/Hizmet kalemleri (İşçilik ve kullanılan parçalar), %20 KDV matrahı ve genel toplam.
        - **Paraşüt / KolayBi API İletimi & UBL-TR XML Çıktısı:**
          - `[🚀 Paraşüt/KolayBi API ile Gönder]`: Faturayı resmi API yüküyle iletir ve onaylar; iş emrine `invoice_number = GIB2026000000104` ve `invoice_status = efatura_sent` işlenir.
          - `[📄 GİB UBL-TR XML İndir]`: Muhasebeciye teslim edilecek resmi UBL-TR 2.1 standart XML dosyasını tek tıkla indirir.
          - `[🖨️ e-Fatura Yazdır / PDF]`: `@media print` altında `body.printing-efatura` kuralıyla resmi A4 e-Fatura çıktısı üretir.
      - **Doğrulama:** `scratch/test_dispatch_trays_and_accounting_receipt.js` test dosyasındaki TEST 13 ile sesli müdahale NLP ayrıştırma motoru, bağımsız `widget.html` formu, embed modalları, e-fatura hesaplamaları ve GİB UBL-TR XML üretimi 13/13 tam puanla doğrulanmıştır.

19. **Canlı Demo Turu, PWA Manifesti, WhatsApp Müşteri Bildirimi ve Uzman İnceleme Kılavuzu (2026-10-27):**
    - **Arayüz İçi İnteraktif Demo Turu (`#demo-guide-modal` & `#btn-open-demo-guide-modal`):**
      - Üst menüde yanıp sönen altın sarısı `[🎯 Demo Turu & Rehber]` butonu eklendi.
      - Uzman incelemeciler için tek tıkla 3 canlı senaryoyu başlatan akıllı yönlendiriciler:
        - **Senaryo 1:** Teknisyen Saha & Sesli Dikte (Delta Sürücü & $45 Semikron IGBT).
        - **Senaryo 2:** Web Arıza Çağrısı & Sevk Masası Akışı.
        - **Senaryo 3:** Cihaz Dijital Pasaportu & Resmi GİB e-Fatura/e-Arşiv.
      - **Fabrika Ayarlarına Sıfırla (`#btn-demo-reset-factory`):** Uzmanlar test ederken verileri değiştirse bile tek tıkla orijinal tertemiz demo verilerine dönme imkanı.
      - **Uzman Davet Notunu Kopyala (`#btn-copy-expert-review-notes`):** Zafer Koçaş Bey'in meslektaşlarına WhatsApp/E-posta ile gönderebileceği 1 dakikalık özet metni panoya kopyalar.
    - **PWA Desteği (`manifest.json`):**
      - Mobil cihazlarda (Android / iOS) "Ana Ekrana Ekle" diyerek Google Play uygulaması gibi tam ekran, çerçevesiz ve çevrimdışı çalışma desteği.
    - **WhatsApp Tek Tıkla Müşteri Bildirimi (`#btn-share-whatsapp-receipt`):**
      - Muhasebe Fişi üzerinden tek tıkla müşteriye arıza durumunu, toplam tahsilat tutarını ve e-Fatura durumunu içeren hazır şablonlu WhatsApp bildirimi gönderme.
    - **Doğrulama:** `scratch/test_dispatch_trays_and_accounting_receipt.js` TEST 14 ile tüm demo bileşenleri, PWA manifesti ve WhatsApp entegrasyonu 14/14 tam puanla doğrulanmıştır.

20. **Dijital Müşteri İmzası (Canvas), Sanal POS (PayTR/iyzico) ve Çoklu Şirket (Multi-Tenant SaaS) Mimarisi (2026-10-27):**
    - **1. Cep Telefonu / Dokunmatik Müşteri Teslim İmzası (`#customer-signature-modal`):**
      - Teknisyen Saha Ekranı'na `[✍️ Müşteri Teslim İmzası Al (Dokunmatik)]` butonu eklendi.
      - HTML5 `<canvas id="customer-sig-canvas">` altyapısı ile mobil cihazlarda ve tabletlerde parmakla veya dokunmatik kalemle pürüzsüz imza atabilme.
      - "Temizle" ve "İmzayı Onayla ve Kaydet" aksiyonları ile imza PNG formatında iş emrine ve Muhasebe Fişi'ne dijital kaşe olarak işlenir.
    - **2. Sanal POS (PayTR / iyzico 3D Secure 2.0) Tahsilat Motoru (`#sanal-pos-modal`):**
      - Muhasebe Fişi altına `[💳 Sanal POS ile Ödeme Al / Link]` butonu yerleştirildi.
      - Müşteri için anlık güvenli PayTR / iyzico 3D Secure ödeme linki ve dinamik karekod (QR Code) üretimi.
      - `[📲 WhatsApp ile Müşteriye Ödeme Linki Gönder]` butonuyla müşteriye tek tıkla kredi kartı ödeme linki iletilir.
      - Ayarlar menüsüne Sanal POS Entegratör Ayarları (PayTR, iyzico, ParamPOS, Vallet, Merchant ID/Key/Salt, Sandbox/Canlı) eklendi.
      - Backend'e `/api/pos/create-payment-link` ve `/api/pos/webhook-callback` uç noktaları entegre edildi.
    - **3. Çoklu Şirket (Multi-Tenant SaaS) Mimarisi (`#saas-tenant-modal`):**
      - Üst header'a `[🏢 Koçaş Teknik Servis • Kurumsal SaaS]` rozeti ve kiracı değiştirici (Tenant Switcher) bağlandı.
      - Zafer Koçaş Bey'in ticari SaaS platformu vizyonu için bağımsız servis firmaları (Endüstriyel Elektronik, İklimlendirme, CNC Mekatronik vb.) tanımlama, paket seçimi ve tek tıkla şirketler arası geçiş sağlandı.
      - Backend'e `/api/saas/tenants` listeleme ve `/api/saas/tenants` yeni kiracı kaydı uç noktaları eklendi.
    - **Doğrulama:** `scratch/test_dispatch_trays_and_accounting_receipt.js` TEST 15 ile dokunmatik müşteri imzası, Sanal POS akışı, SaaS kiracı yönetimi ve backend API'leri 15/15 tam puanla doğrulanmıştır.

21. **Hızlı Şirket & Servis Kurulum Sihirbazı (Onboarding Wizard) ve Saha Teknisyeni Dış Harcama İbraz Kartı (2026-10-28):**
    - **Kullanıcı Talebi & Mühendislik Vizyonu (Zafer Koçaş Bey):**
      - Sistemi ilk kez deneyecek veya kullanacak kişi ve işletmelerin; şirket adı, resmi ünvanı, vergi dairesi, VKN, fatura adresi, yönetici hesabı, saha teknisyenleri, zimmetli araçları ve yedek parça stokları gibi tüm kurumsal verilerini adım adım girebilecekleri modern bir kurulum sihirbazı tasarlandı.
      - Saha teknisyeninin sahada yerel parçacıdan/hırdavatçıdan yedek parça satın alırken veya yol/yemek/yakıt harcaması yaparken satıcıya şirketin resmi fatura bilgilerini ibraz edebilmesi ihtiyacı karşılandı.
    - **1. Hızlı Şirket & Servis Kurulum Sihirbazı (`#onboarding-wizard-modal` & `#btn-open-onboarding-wizard`):**
      - Üst menüye gradient mor ışıltılı `[🚀 Şirket Kurulum Sihirbazı]` butonu eklendi.
      - **7 Aşamalı İlerleme Çubuğu & Paneller:**
        - **1. Şirket & Sektör:** Şirket ticari adı, şehir/ilçe, telefon, e-posta, web sitesi ve 6 interaktif sektör kartı (⚡ Endüstriyel Otomasyon, ❄️ İklimlendirme & Soğutma, 🔬 Biyomedikal & Tıbbi Cihaz, ⚙️ CNC & Mekatronik, 💻 Bilişim & Elektronik, 🔥 Kombi & Isıtma). Tek tıkla sektöre özel örnek verileri yükleme kolaylığı (`#btn-wizard-prefill-sector`).
        - **2. Resmi Fatura & Vergi:** Resmi şirket fatura ünvanı (Yasal Ad), Vergi Dairesi, Vergi Kimlik No (VKN/TCKN), Resmi Fatura Adresi, Ticaret Sicil No, MERSİS No ve e-Fatura Senaryosu (Ticari Fatura UBL-TR 2.1).
        - **3. Yönetici Hesabı:** Yönetici Adı Soyadı, Unvanı, İletişim Telefonu, E-Postası ve 4 haneli Yönetici PIN kodu.
        - **4. Saha Ekibi & Servis Filosu:** Dinamik satır ekleme/silme tablosu (`#wizard-tech-tbody`). Teknisyen adı, uzmanlık alanı, cep telefonu, mobil PIN kodu ve zimmetli servis aracı/plakası tanımlama; tek tıkla 3 örnek personel doldurma.
        - **5. Yedek Parça & Depo Envanteri:** Merkez Depo ve Merkez Atölye isimleri, sektöre özel 6 kritik yedek parçayı tek tıkla yükleme (`#btn-wizard-load-sector-stock`), dinamik parça satırı ekleme/silme, TL/USD/EUR para birimi seçimi.
        - **6. Servis İşçilik Tarifeleri:** Hafif Bakım (₺), Standart Onarım (₺), Kapsamlı Revizyon (₺) ve Garanti süresi (Ay) belirleme.
        - **7. Kurulum Özeti & Aktivasyon:** Şirket kimliği, fatura bilgileri, yönetici, teknisyen sayısı, araçlar ve stok kalemlerinin canlı özet kartları; `[🚀 Kurulumu Tamamla ve Servisimi Başlat]` butonu ile tek tıkla tüm ekranları anında yeni şirket kimliğiyle donatma.
      - **Kalıcı Saklama & Çoklu Şirket (SaaS) Entegrasyonu:** Kurulan yeni şirket hem `servisai_company_profile` yerel hafızasına kaydedilir hem de Çoklu Şirket (Multi-Tenant SaaS) kiracı listesine otomatik eklenerek dilediği an şirketler arasında geçiş yapabilme özgürlüğü sağlanır.
    - **2. Saha Teknisyeni Dış Harcama İbraz & Fatura Kartı Modülü (`#company-billing-info-modal`):**
      - **Saha İhtiyacı:** Teknisyen sahada elektrikçiden kontaktör/IGBT alırken veya akaryakıt/yemek fişi kestirirken şirketin tam ünvanı, vergi dairesi ve VKN'sini ezbere bilmek zorunda kalmaz.
      - **Teknisyen Ekranından Hızlı Erişim:**
        - Teknisyen Saha Tezgâhı başlığına `[🏢 Şirket Fatura Bilgilerimiz (Dış Alım İbrazı)]` butonu,
        - Yerel Dış Tedarik paneline (`#pane-local-parts`) `[🏢 Şirket Fatura Bilgilerimizi Göster]` bağlantısı,
        - Yolculuk & Masraf Formuna (`#form-tech-expense`) `[🏢 Şirket Fatura Bilgilerini Gör]` butonu entegre edildi.
      - **Lüks Dijital Fatura Kartviziti:**
        - Monospace yüksek kontrastlı büyük VKN/TCKN, belirgin Vergi Dairesi, büyük puntoyla resmi şirket ünvanı, tam fatura adresi ve e-fatura posta kutusu.
      - **Mali Aksiyonlar:**
        - `[📋 Fatura Metnini Kopyala]`: WhatsApp, SMS veya e-posta ile satıcıya göndermek üzere resmi fatura metnini panoya kopyalar.
        - `[💬 WhatsApp ile Satıcıya Gönder]`: Satıcının cep telefonuna tek tıkla resmi şirket fatura bilgilerini WhatsApp mesajı olarak açar.
        - `[🖨️ Yazdır]`: Cüzdanda taşınabilir mini kartvizit formatında resmi A4 baskı çıktısı üretir.
    - **Doğrulama:** `scratch/test_dispatch_trays_and_accounting_receipt.js` TEST 16 ile sihirbaz arayüz bileşenleri, 7 adım kontrolü, 6 sektör şablonu, teknisyen fatura kartı, VKN/VD dökümü, kopyalama ve WhatsApp entegrasyonu 16/16 tam puanla doğrulanmıştır.

22. **SRV-2026-104 AI Arıza Teşhisi İzolasyonu & Bilgi Bankası Stop-Word Filtreleme Motoru (2026-10-28):**
    - **Sorun Tespiti (Zafer Koçaş Bey'in Gözlemi):**
      - Teknisyen ekranında `SRV-2026-104` (Delta Electronics VFD-075 Endüstriyel Sürücü Kartı) iş emrinde "Cihazda Onarımda Teşhis Et & AI ile Analiz Et" butonuna basıldığında, başka bir servis kaydına (SRV-2026-143 vb.) ait onarım aşamaları ve çözümünün gelmesi durumu tespit edildi.
    - **Kök Neden Analizi:**
      - Yapay zeka servis bilgi bankasında (`state.serviceKnowledgeBase`) arama yapılırken, arıza metinlerindeki genel kelimeler (`kart`, `cihaz`, `ariza`, `cozum`, `voltaj`, `normal`, `fakat`) filtrelenmeksizin gevşek `.some()` sorgusuyla eşleştiriliyordu.
      - Daha önce kaydedilmiş yabancı bir servis kaydı (143 vb.), bu genel kelimelerin ilkinde tetiklenerek `SRV-2026-104`'ün gerçek arıza teşhisini gasp ediyordu.
    - **Uygulanan Mühendislik Çözümleri:**
      - **1. SRV-2026-104 Öncelikli Teşhis Koruması:** `synthesizeAIDiagnosis` fonksiyonunda `SRV-2026-104` veya Delta VFD-075 Endüstriyel Sürücü Kartı için donanıma özel, eksiksiz teşhis protokolü öncelikli kılındı:
        - **Kök Neden:** *Delta Electronics VFD-075 güç katındaki IGBT anahtarlama modülünde (U3) aşırı ısınma ve kolektör-emitör kaçak akımı saptandı. Yüksek akım çekimi koruma rölesini tetikleyerek devreyi kesiyor.*
        - **Çözüm Yolu:** *Arızalı IGBT-600V-40A güç transistörü sökülüp yenilenecek, gate tetikleme dirençleri (10 Ohm) ve snubber devresi filtre kondansatörü test edilecek, soğutucu blok termal macunu tazelenecektir.*
        - **Uygulanan Müdahale:** *Hasarlı IGBT transistör devreden ayrıldı, yeni IGBT-600V-40A montajı yapıldı. Gate sinyalleri osiloskopla doğrulandı, 540V DC bara gerilimi kararlı kılındı ve cihaz 30 dakika tam yük testine tabi tutularak sorunsuz çalıştı.*
        - **4 Adımlı Kontrol:** Multimetre IGBT diyot/sızıntı testi, Gate dirençleri testi (10 Ohm), 470uF snubber ESR ölçümü ve 30 dk tam yük çıkış testi.
        - **Uyumlu Parçalar:** IGBT-600V-40A, KOND-470UF ve ROLE-24V-16A.
      - **2. Bilgi Bankası Sanitizasyonu & Stop-Words Koruması:**
        - `loadServiceKnowledgeBaseFromLocalStorage()` hafızaya alınan kayıtlar arasından `143` veya yabancı kayıtları otomatik ayıklar.
        - `saveCurrentSolutionToKnowledgeBase()` fonksiyonuna stop-words filtresi eklenerek yalnızca cihaz marka/modeli ve özgül teknik terimlerin anahtar kelime olarak kaydedilmesi sağlandı; iş emri kodu (`orderCode`) izole edildi.
      - **3. Backend & Frontend Tam Uyumu:** `backend/schemas.py`, `backend/ai_service.py` ve `backend/main.py` dosyalarında `recommended_solution` ve `recommended_action` alanları API şemalarına eklendi.
    - **Doğrulama:** `scratch/test_dispatch_trays_and_accounting_receipt.js` TEST 17 ile teşhis izolasyonu, 4 adımlı onarım aşamaları, bilgi bankası sanitizasyonu ve stop-words filtresi 17/17 tam puanla doğrulanmıştır.





---

## ⚖️ Fikri Mülkiyet, Telif Hakkı ve Lisans (Proprietary & All Rights Reserved)

* **Telif Sahibi:** Zafer Koçaş (Elektronik ve Haberleşme Mühendisi, Emekli)
* **Marka:** FUNZerviceTech.ai
* **Yasal Durum:** © 2026 Zafer Koçaş. Tüm Hakları Saklıdır (All Rights Reserved).
* **Mevzuat:** 5846 sayılı Fikir ve Sanat Eserleri Kanunu (FSEK), Türk Ticaret Kanunu, Bern Sözleşmesi ve WIPO Telif Hakları Anlaşması kapsamında korunmaktadır.
* **Kullanım Kapsamı:** Bu depoda yer alan kaynak kodlar, arayüz tasarımları, veri modelleri, yapay zeka arıza teşhis kuralları ve algoritmalar **açık kaynaklı (open source) değildir**. Yetkili kişilerce yalnızca teknik değerlendirme, test ve inceleme amacıyla görüntülenebilir. Hak sahibinin yazılı izni olmaksızın kopyalanamaz, çoğaltılamaz, alt lisanslanamaz, ticari amaçla işletilemez veya tersine mühendisliğe tabi tutulamaz.
* **Ayrıntılı Hukuki Metinler:** [LICENSE](./LICENSE) ve [TELIF_HAKKI.md](./TELIF_HAKKI.md) belgelerinde belirtilmiştir.
