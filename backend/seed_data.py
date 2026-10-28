"""
ServisAI - İlk Başlangıç Verilerini Yükleme Betiği (Seed Data)
Zafer Koçaş Bey'in belirlediği personeli, araçları, parçaları ve iş emrini veri tabanına doldurur.
"""

from datetime import datetime, timedelta
from .database import engine, Base, SessionLocal
from . import models

def seed():
    # Tabloları sıfırdan oluştur
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Eğer veri zaten varsa tekrar yükleme
    if db.query(models.Tenant).first():
        print("Bilgi: Veri tabanı zaten dolu, tohumlama atlandı.")
        db.close()
        return

    print("Veri tabanı tabloları hazırlanıyor...")

    # 1. Kiracı (Tenant)
    tenant = models.Tenant(
        name="Koçaş Teknik Servis & Otomasyon Sistemleri",
        phone="0216 555 0101",
        email="info@kocasteknik.com"
    )
    db.add(tenant)
    db.commit()
    db.refresh(tenant)

    # 2. Kullanıcılar (Saha Ekibi)
    user_zafer = models.User(
        tenant_id=tenant.id,
        full_name="Zafer Koçaş",
        email="zafer@kocasteknik.com",
        role="Yönetici",
        specialty="Teknik Servis Yönetimi & Operasyon",
        status="Müsait",
        password_hash="admin123",
        pin_code="9999"
    )
    user_murat = models.User(
        tenant_id=tenant.id,
        full_name="Murat Aydın",
        email="murat@kocasteknik.com",
        role="Saha Mühendisi (Elektronik)",
        specialty="Güç Elektroniği & Kart Tamiri",
        status="Yolda",
        vehicle_plate="34 ABC 101",
        current_lat=40.9912,
        current_lng=29.0278,
        password_hash="murat123",
        pin_code="1234"
    )
    user_caner = models.User(
        tenant_id=tenant.id,
        full_name="Caner Güler",
        email="caner@kocasteknik.com",
        role="Kıdemli Tekniker",
        specialty="Mekanik & İklimlendirme / Pompa",
        status="Müsait",
        vehicle_plate="34 DEF 202",
        current_lat=41.0267,
        current_lng=29.0152,
        password_hash="caner123",
        pin_code="2345"
    )
    user_selin = models.User(
        tenant_id=tenant.id,
        full_name="Selin Kaya",
        email="selin@kocasteknik.com",
        role="Otomasyon & PLC Mühendisi",
        specialty="Sürücü Parametreleri & Yazılım",
        status="Müsait",
        vehicle_plate="34 GHK 303",
        current_lat=40.9833,
        current_lng=29.1167,
        password_hash="selin123",
        pin_code="3456"
    )
    user_emre = models.User(
        tenant_id=tenant.id,
        full_name="Emre Yıldız",
        email="emre@kocasteknik.com",
        role="Teknisyen",
        specialty="Genel Donanım & Sensörler",
        status="Yolda",
        vehicle_plate="34 YTR 404",
        current_lat=40.9234,
        current_lng=29.1350,
        password_hash="emre123",
        pin_code="4567"
    )
    db.add_all([user_zafer, user_murat, user_caner, user_selin, user_emre])
    db.commit()

    # 3. Müşteriler
    cust_termotek = models.Customer(
        tenant_id=tenant.id,
        name="TermoTek Endüstriyel Ltd.",
        phone="0532 999 1122",
        email="servis@termotek.com.tr",
        address="Kadıköy Rıhtım Cd. No:14, Kadıköy, İstanbul",
        lat=40.9905,
        lng=29.0255
    )
    cust_umran = models.Customer(
        tenant_id=tenant.id,
        name="Ümran Çelik Boru A.Ş.",
        phone="0216 555 4411",
        email="teknik@umrancelik.com.tr",
        address="Dudullu OSB 2. Cadde No:15, Ümraniye, İstanbul",
        lat=41.0150,
        lng=29.1550
    )
    cust_marmara = models.Customer(
        tenant_id=tenant.id,
        name="Marmara Ambalaj Sanayi",
        phone="0216 333 7788",
        email="bakim@marmaraambalaj.com",
        address="Bağlarbaşı Cd. No:42, Üsküdar, İstanbul",
        lat=41.0267,
        lng=29.0152
    )
    cust_ekol = models.Customer(
        tenant_id=tenant.id,
        name="Ekol Lojistik Depo Tesisleri",
        phone="0216 666 9900",
        email="tesis@ekol.com",
        address="Samandıra Tesisleri No:8, Sancaktepe, İstanbul",
        lat=40.9750,
        lng=29.2200
    )
    cust_mega = models.Customer(
        tenant_id=tenant.id,
        name="Mega Tekstil A.Ş.",
        phone="0216 777 2233",
        email="otomasyon@megatekstil.com",
        address="Ataşehir Bulvarı No:8, Ataşehir, İstanbul",
        lat=40.9833,
        lng=29.1167
    )
    cust_kartal = models.Customer(
        tenant_id=tenant.id,
        name="Kartal Kimya Sanayi",
        phone="0216 888 5544",
        email="fabrika@kartalkimya.com",
        address="Kartal Sanayi Cd. No:19, Kartal, İstanbul",
        lat=40.9020,
        lng=29.1950
    )
    cust_dogus = models.Customer(
        tenant_id=tenant.id,
        name="Doğuş Medikal Ltd.",
        phone="0216 444 1155",
        email="servis@dogusmedikal.com",
        address="Maltepe Sahil Cd. No:25, Maltepe, İstanbul",
        lat=40.9234,
        lng=29.1350
    )
    cust_borusan = models.Customer(
        tenant_id=tenant.id,
        name="Borusan Lojistik",
        phone="0216 333 2211",
        email="lojistik@borusan.com",
        address="Pendik Güzelyalı Mah. Sanayi Sk., Pendik, İstanbul",
        lat=40.8750,
        lng=29.2800
    )
    db.add_all([cust_termotek, cust_umran, cust_marmara, cust_ekol, cust_mega, cust_kartal, cust_dogus, cust_borusan])
    db.commit()

    # 4. Cihazlar
    dev_vfd = models.Device(
        customer_id=cust_termotek.id,
        brand="Delta Electronics",
        model="VFD-075 Endüstriyel Sürücü Kartı",
        serial_number="DLT-2024-99823",
        qr_code="QR-DLT-99823",
        manufacturer_warranty_end=datetime.utcnow() - timedelta(days=90)
    )
    dev_atv = models.Device(
        customer_id=cust_umran.id,
        brand="Schneider Electric",
        model="Altivar ATV320 Frekans Sürücü",
        serial_number="SCH-2025-44120",
        qr_code="QR-SCH-44120",
        manufacturer_warranty_end=datetime.utcnow() + timedelta(days=120)
    )
    dev_grundfos = models.Device(
        customer_id=cust_marmara.id,
        brand="Grundfos",
        model="CR-15 Endüstriyel Hidrofor Pompası",
        serial_number="GRF-2024-77192",
        qr_code="QR-GRF-77192",
        manufacturer_warranty_end=datetime.utcnow() - timedelta(days=30)
    )
    dev_daikin = models.Device(
        customer_id=cust_ekol.id,
        brand="Daikin",
        model="VRV IV Soğutma Kompresör İnverteri",
        serial_number="DAI-2023-88214",
        qr_code="QR-DAI-88214",
        manufacturer_warranty_end=datetime.utcnow() + timedelta(days=60)
    )
    dev_s7 = models.Device(
        customer_id=cust_mega.id,
        brand="Siemens",
        model="S7-1200 CPU 1214C & SM1223 PLC Modülü",
        serial_number="SIE-2025-1214C",
        qr_code="QR-SIE-1214C",
        manufacturer_warranty_end=datetime.utcnow() + timedelta(days=240)
    )
    dev_omron = models.Device(
        customer_id=cust_kartal.id,
        brand="Omron",
        model="CJ2M-CPU31 Modüler PLC Ünitesi",
        serial_number="OMR-2024-31902",
        qr_code="QR-OMR-31902",
        manufacturer_warranty_end=datetime.utcnow() - timedelta(days=150)
    )
    dev_autonics = models.Device(
        customer_id=cust_dogus.id,
        brand="Autonics",
        model="TK4S Sayısal PID Sıcaklık Kontrolörü",
        serial_number="AUT-2025-45512",
        qr_code="QR-AUT-45512",
        manufacturer_warranty_end=datetime.utcnow() + timedelta(days=180)
    )
    dev_sick = models.Device(
        customer_id=cust_borusan.id,
        brand="Sick",
        model="C4000 Güvenlik Işık Bariyeri",
        serial_number="SCK-2024-40019",
        qr_code="QR-SCK-40019",
        manufacturer_warranty_end=datetime.utcnow() + timedelta(days=90)
    )
    db.add_all([dev_vfd, dev_atv, dev_grundfos, dev_daikin, dev_s7, dev_omron, dev_autonics, dev_sick])
    db.commit()

    # 5. Depolar ve Servis Araçları
    wh_central = models.Warehouse(
        tenant_id=tenant.id,
        name="Merkez Ana Depo (Ataşehir)",
        warehouse_type="Merkez"
    )
    wh_workshop = models.Warehouse(
        tenant_id=tenant.id,
        name="Merkez Atölye / Laboratuvar",
        warehouse_type="Atolye"
    )
    wh_vehicle_murat = models.Warehouse(
        tenant_id=tenant.id,
        name="Servis Aracı (34 ABC 101 - Murat Aydın)",
        warehouse_type="Servis_Araci",
        vehicle_plate="34 ABC 101",
        responsible_user_id=user_murat.id
    )
    wh_vehicle_caner = models.Warehouse(
        tenant_id=tenant.id,
        name="Servis Aracı (34 DEF 202 - Caner Güler)",
        warehouse_type="Servis_Araci",
        vehicle_plate="34 DEF 202",
        responsible_user_id=user_caner.id
    )
    db.add_all([wh_central, wh_workshop, wh_vehicle_murat, wh_vehicle_caner])
    db.commit()

    # 6. Yedek Parçalar
    part_igbt = models.Part(tenant_id=tenant.id, part_code="IGBT-600V-40A", name="600V 40A IGBT Güç Transistörü", unit_price=450.0, warranty_months=12)
    part_kond = models.Part(tenant_id=tenant.id, part_code="KOND-470UF", name="470uF 450V Düşük ESR Kondansatör", unit_price=120.0, warranty_months=6)
    part_role = models.Part(tenant_id=tenant.id, part_code="ROLE-24V-16A", name="24V 16A Güç Rölesi", unit_price=180.0, warranty_months=12)
    part_opto = models.Part(tenant_id=tenant.id, part_code="SMD-OPTO-817", name="PC817 Optokuplör Entegre", unit_price=45.0, warranty_months=12)
    part_ntc = models.Part(tenant_id=tenant.id, part_code="SENS-NTC-10K", name="NTC 10K Sıcaklık Sensörü", unit_price=95.0, warranty_months=6)
    db.add_all([part_igbt, part_kond, part_role, part_opto, part_ntc])
    db.commit()

    # 7. Stok Miktarları (Merkez Depo, Atölye ve Servis Araçları)
    inv_list = [
        # Merkez Ana Depo
        models.Inventory(warehouse_id=wh_central.id, part_id=part_igbt.id, quantity=45),
        models.Inventory(warehouse_id=wh_central.id, part_id=part_kond.id, quantity=120),
        models.Inventory(warehouse_id=wh_central.id, part_id=part_role.id, quantity=60),
        models.Inventory(warehouse_id=wh_central.id, part_id=part_opto.id, quantity=200),
        models.Inventory(warehouse_id=wh_central.id, part_id=part_ntc.id, quantity=30),
        # Merkez Atölye / Laboratuvar
        models.Inventory(warehouse_id=wh_workshop.id, part_id=part_igbt.id, quantity=10, critical_threshold=2),
        models.Inventory(warehouse_id=wh_workshop.id, part_id=part_kond.id, quantity=25, critical_threshold=5),
        models.Inventory(warehouse_id=wh_workshop.id, part_id=part_role.id, quantity=12, critical_threshold=3),
        models.Inventory(warehouse_id=wh_workshop.id, part_id=part_opto.id, quantity=40, critical_threshold=10),
        models.Inventory(warehouse_id=wh_workshop.id, part_id=part_ntc.id, quantity=8, critical_threshold=2),
        # 34 ABC 101 Servis Aracı (Murat Aydın)
        models.Inventory(warehouse_id=wh_vehicle_murat.id, part_id=part_igbt.id, quantity=2, critical_threshold=2),
        models.Inventory(warehouse_id=wh_vehicle_murat.id, part_id=part_kond.id, quantity=5, critical_threshold=2),
        models.Inventory(warehouse_id=wh_vehicle_murat.id, part_id=part_role.id, quantity=3, critical_threshold=2),
        models.Inventory(warehouse_id=wh_vehicle_murat.id, part_id=part_opto.id, quantity=8, critical_threshold=2),
        models.Inventory(warehouse_id=wh_vehicle_murat.id, part_id=part_ntc.id, quantity=1, critical_threshold=2),
        # 34 DEF 202 Servis Aracı (Caner Güler)
        models.Inventory(warehouse_id=wh_vehicle_caner.id, part_id=part_igbt.id, quantity=0, critical_threshold=2),
        models.Inventory(warehouse_id=wh_vehicle_caner.id, part_id=part_kond.id, quantity=8, critical_threshold=2),
        models.Inventory(warehouse_id=wh_vehicle_caner.id, part_id=part_role.id, quantity=1, critical_threshold=2),
        models.Inventory(warehouse_id=wh_vehicle_caner.id, part_id=part_opto.id, quantity=12, critical_threshold=2),
        models.Inventory(warehouse_id=wh_vehicle_caner.id, part_id=part_ntc.id, quantity=4, critical_threshold=2),
    ]
    db.add_all(inv_list)
    db.commit()

    # 8. Personellere Atanmış Saha İş Emirleri
    orders_to_seed = [
        # Murat Aydın (Elektronik & Sürücü)
        models.WorkOrder(
            device_id=dev_vfd.id,
            assigned_user_id=user_murat.id,
            tracking_code="SRV-2026-104",
            status="Onarımda",
            customer_complaint="Cihaz giriş voltajı normal fakat 5 saniye sonra yüksek akım çekerek aşırı ısınıyor ve koruma rölesi devreyi kesiyor.",
            technician_findings="Çıkış güç transistöründe sızıntı tespit edildi. IGBT değişimi yapıldı.",
            ai_diagnosis_notes="Çıkış katı IGBT ve gate dirençleri kontrol edilmeli.",
            labor_cost=600.0,
            parts_cost=450.0,
            total_cost=1050.0,
            customer_approved=False,
            service_warranty_months=6
        ),
        models.WorkOrder(
            device_id=dev_atv.id,
            assigned_user_id=user_murat.id,
            tracking_code="SRV-2026-108",
            status="Tamamlandı",
            customer_complaint="Motor kalkış anında SCF4 kısa devre hatası verip kilitleniyor.",
            technician_findings="DC bara kondansatör bankı ve tetikleme optokuplörleri yenilendi, testler başarıyla geçti.",
            ai_diagnosis_notes="Tetikleme kartı optokuplör izolasyonu kontrol edilmeli.",
            labor_cost=850.0,
            parts_cost=1000.0,
            total_cost=1850.0,
            customer_approved=True,
            service_warranty_months=12
        ),
        # Caner Güler (Mekanik & Pompa)
        models.WorkOrder(
            device_id=dev_grundfos.id,
            assigned_user_id=user_caner.id,
            tracking_code="SRV-2026-112",
            status="Yolda",
            customer_complaint="Mekanik salmastra bölgesinden su sızıntısı var ve basınç şalteri kontaktör çekmiyor.",
            technician_findings="Mekanik salmastra kiti ve 24V kontaktör değişimi için sahaya gidiliyor.",
            ai_diagnosis_notes="Mekanik aşınma ve şalter kontrol gerilimi test edilmeli.",
            labor_cost=700.0,
            parts_cost=700.0,
            total_cost=1400.0,
            customer_approved=True,
            service_warranty_months=6
        ),
        models.WorkOrder(
            device_id=dev_daikin.id,
            assigned_user_id=user_caner.id,
            tracking_code="SRV-2026-098",
            status="Tamamlandı",
            customer_complaint="E4 alçak basınç koruma alarmı veriyor, kompresör devreye girmiyor.",
            technician_findings="NTC sıcaklık sensörü ve genleşme valfi soket korozyonu giderildi, gaz basınçları dengelendi.",
            ai_diagnosis_notes="NTC sensör empedans tablosu kontrol edilmeli.",
            labor_cost=1000.0,
            parts_cost=1200.0,
            total_cost=2200.0,
            customer_approved=True,
            service_warranty_months=12
        ),
        # Selin Kaya (Otomasyon & PLC)
        models.WorkOrder(
            device_id=dev_s7.id,
            assigned_user_id=user_selin.id,
            tracking_code="SRV-2026-115",
            status="İncelemede",
            customer_complaint="PROFINET haberleşme kaybı oluşuyor, SF kırmızı led sürekli yanıp sönüyor.",
            technician_findings="Giriş sinyal kartında aşırı gerilim izleri var; donanım teşhisi ve yazılım yedeklemesi yapılıyor.",
            ai_diagnosis_notes="SM1223 kartındaki giriş opto katı ve 24V bus gerilimi ölçülmeli.",
            labor_cost=950.0,
            parts_cost=800.0,
            total_cost=1750.0,
            customer_approved=False,
            service_warranty_months=6
        ),
        models.WorkOrder(
            device_id=dev_omron.id,
            assigned_user_id=user_selin.id,
            tracking_code="SRV-2026-101",
            status="Tamamlandı",
            customer_complaint="Elektrik kesintisinden sonra PLC programı silindi, ERR ledi yanıyor.",
            technician_findings="Lityum yedekleme pili yenilendi, kaynak kod EEPROM üzerinden geri yüklendi ve I/O testleri yapıldı.",
            ai_diagnosis_notes="Yedekleme pil voltajı ve batarya soket bacakları incelenmeli.",
            labor_cost=1400.0,
            parts_cost=1200.0,
            total_cost=2600.0,
            customer_approved=True,
            service_warranty_months=12
        ),
        # Emre Yıldız (Genel Donanım & Sensörler)
        models.WorkOrder(
            device_id=dev_autonics.id,
            assigned_user_id=user_emre.id,
            tracking_code="SRV-2026-119",
            status="Kabul Edildi",
            customer_complaint="SSR çıkış vermiyor, fırın sıcaklığı 45 derece sapma gösteriyor.",
            technician_findings="PT100 sensör ucu kopukluğu ve röle çıkış katı arızası belirlendi.",
            ai_diagnosis_notes="Sıcaklık transmitter kalibrasyonu ve SSR tetikleme transistörü test edilmeli.",
            labor_cost=450.0,
            parts_cost=400.0,
            total_cost=850.0,
            customer_approved=False,
            service_warranty_months=6
        ),
        models.WorkOrder(
            device_id=dev_sick.id,
            assigned_user_id=user_emre.id,
            tracking_code="SRV-2026-092",
            status="Tamamlandı",
            customer_complaint="Pres hattı güvenlik bariyeri sarı alarm veriyor, reset almıyor.",
            technician_findings="Optik lens temizliği yapıldı, OSSD emniyet rölesi yenilenerek sistem devreye alındı.",
            ai_diagnosis_notes="OSSD çıkış empedansı ve reflektör açısı ayarlanmalı.",
            labor_cost=650.0,
            parts_cost=500.0,
            total_cost=1150.0,
            customer_approved=True,
            service_warranty_months=6
        )
    ]
    db.add_all(orders_to_seed)
    db.commit()

    order_104 = db.query(models.WorkOrder).filter(models.WorkOrder.tracking_code == "SRV-2026-104").first()

    # 9. İş Emrinde Kullanılan Parça
    used_part_entry = models.WorkOrderPart(
        work_order_id=order_104.id,
        part_id=part_igbt.id,
        warehouse_id=wh_vehicle_murat.id,
        quantity=1,
        unit_price=450.0,
        part_warranty="12 Ay Parça Garantisi"
    )
    db.add(used_part_entry)
    db.commit()

    # 10. Periyodik Bakım Sözleşmesi
    maintenance = models.MaintenancePlan(
        device_id=dev_vfd.id,
        period_months=3,
        last_service_date=datetime.utcnow() - timedelta(days=87),
        next_due_date=datetime.utcnow() + timedelta(days=3),
        status="Alarm: 3 Gün Kaldı"
    )
    db.add(maintenance)
    db.commit()

    print("Basarili: Tum baslangic verileri veri tabanina basariyla yazildi!")
    db.close()

if __name__ == "__main__":
    seed()
