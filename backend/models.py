"""
ServisAI - İlişkisel Veri Modelleri (SQLAlchemy ORM)
Zafer Koçaş Bey ile birlikte tasarlanan çok kiracılı (SaaS-Ready) veri tabanı şeması.
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

# ==================== 1. Kiracı / İşletme (SaaS) ====================
class Tenant(Base):
    __tablename__ = "tenants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False) # Örn: "Koçaş Teknik Servis A.Ş."
    phone = Column(String(20), nullable=True)
    email = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    users = relationship("User", back_populates="tenant")
    customers = relationship("Customer", back_populates="tenant")
    warehouses = relationship("Warehouse", back_populates="tenant")
    parts = relationship("Part", back_populates="tenant")

# ==================== 2. Kullanıcılar & Saha Ekibi ====================
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"), nullable=False)
    full_name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    role = Column(String(50), default="Teknisyen") # Yönetici, Mühendis, Tekniker, Teknisyen
    specialty = Column(String(120), nullable=True) # Güç Elektroniği, Kart Tamiri, Mekanik vb.
    status = Column(String(30), default="Müsait") # Müsait, Görevde, Yolda
    
    # Canlı Saha GPS Koordinatları
    current_lat = Column(Float, nullable=True)
    current_lng = Column(Float, nullable=True)
    last_gps_update = Column(DateTime, nullable=True)

    # Varsa zimmetli servis aracı plakası
    vehicle_plate = Column(String(30), nullable=True)

    # Güvenlik ve Giriş Kimlik Bilgileri
    password_hash = Column(String(255), nullable=True) # Yönetici şifresi
    pin_code = Column(String(10), nullable=True) # Saha teknisyeni hızlı PIN kodu (örn: 1234)

    tenant = relationship("Tenant", back_populates="users")
    assigned_orders = relationship("WorkOrder", back_populates="assigned_user")
    assigned_vehicle = relationship("Warehouse", back_populates="responsible_user", uselist=False)

# ==================== 3. Müşteriler ====================
class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"), nullable=False)
    name = Column(String(150), nullable=False)
    phone = Column(String(30), nullable=False, index=True)
    email = Column(String(100), nullable=True)
    address = Column(Text, nullable=True)
    
    # Harita koordinatı (Teknisyene olan mesafeyi hesaplamak için)
    lat = Column(Float, nullable=True)
    lng = Column(Float, nullable=True)

    tenant = relationship("Tenant", back_populates="customers")
    devices = relationship("Device", back_populates="customer")

# ==================== 4. Cihazlar ====================
class Device(Base):
    __tablename__ = "devices"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    brand = Column(String(80), nullable=False) # Örn: Delta Electronics, Siemens, Vaillant
    model = Column(String(100), nullable=False) # Örn: VFD-075
    serial_number = Column(String(100), unique=True, index=True, nullable=False)
    qr_code = Column(String(100), unique=True, nullable=True)
    manufacturer_warranty_end = Column(DateTime, nullable=True) # Cihazın fabrika garantisi

    customer = relationship("Customer", back_populates="devices")
    work_orders = relationship("WorkOrder", back_populates="device")
    maintenance_plans = relationship("MaintenancePlan", back_populates="device")

# ==================== 5. İş Emirleri (Servis Sürecinin Kalbi) ====================
class WorkOrder(Base):
    __tablename__ = "work_orders"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(Integer, ForeignKey("devices.id"), nullable=False)
    assigned_user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    # Müşterinin sorgulama kodudur (Örn: SRV-2026-104)
    tracking_code = Column(String(50), unique=True, index=True, nullable=False)
    
    # Süreç Durumu: Kabul Edildi, İncelemede, Onay Bekliyor, Parça Bekliyor, Yolda, Onarımda, Test Aşamasında, Tamamlandı
    status = Column(String(40), default="Kabul Edildi")
    
    customer_complaint = Column(Text, nullable=False) # Müşterinin arıza şikayeti
    technician_findings = Column(Text, nullable=True) # Teknisyenin arıza tespiti
    ai_diagnosis_notes = Column(Text, nullable=True) # Yapay zekanın önerdiği teşhis adımları
    
    labor_cost = Column(Float, default=0.0) # İşçilik tutarı
    parts_cost = Column(Float, default=0.0) # Kullanılan parçaların tutarı
    total_cost = Column(Float, default=0.0) # Toplam tutar
    
    customer_approved = Column(Boolean, default=False) # Müşteri masraf onayı
    service_warranty_months = Column(Integer, default=6) # Onarıma verilen garanti (Örn: 6 Ay)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)

    device = relationship("Device", back_populates="work_orders")
    assigned_user = relationship("User", back_populates="assigned_orders")
    used_parts = relationship("WorkOrderPart", back_populates="work_order")

# ==================== 6. Depolar ve Mobil Servis Araçları ====================
class Warehouse(Base):
    __tablename__ = "warehouses"

    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"), nullable=False)
    name = Column(String(100), nullable=False) # "Merkez Depo", "34 ABC 101 - Murat Aracı"
    warehouse_type = Column(String(30), default="Merkez") # Merkez, Şube, Servis_Araci
    vehicle_plate = Column(String(30), nullable=True)
    
    responsible_user_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    tenant = relationship("Tenant", back_populates="warehouses")
    responsible_user = relationship("User", back_populates="assigned_vehicle")
    inventory_items = relationship("Inventory", back_populates="warehouse")

# ==================== 7. Yedek Parça Kataloğu ====================
class Part(Base):
    __tablename__ = "parts"

    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"), nullable=False)
    part_code = Column(String(60), index=True, nullable=False) # Örn: IGBT-600V-40A
    name = Column(String(120), nullable=False)
    category = Column(String(80), default="Genel Parça") # Örn: Yarı İletken & Güç, Mekanik vb.
    unit_price = Column(Float, default=0.0) # Satış Fiyatı (TL)
    warranty_months = Column(Integer, default=12) # Parça Garantisi (Ay)

    tenant = relationship("Tenant", back_populates="parts")
    inventory_records = relationship("Inventory", back_populates="part")

# ==================== 8. Stok Miktarları (Hangi depoda/araçta kaç adet var?) ====================
class Inventory(Base):
    __tablename__ = "inventories"

    id = Column(Integer, primary_key=True, index=True)
    warehouse_id = Column(Integer, ForeignKey("warehouses.id"), nullable=False)
    part_id = Column(Integer, ForeignKey("parts.id"), nullable=False)
    quantity = Column(Integer, default=0) # Stok Adedi
    critical_threshold = Column(Integer, default=2) # Kritik uyarı eşiği

    warehouse = relationship("Warehouse", back_populates="inventory_items")
    part = relationship("Part", back_populates="inventory_records")

# ==================== 9. İş Emrinde Kullanılan Parçalar ====================
class WorkOrderPart(Base):
    __tablename__ = "work_order_parts"

    id = Column(Integer, primary_key=True, index=True)
    work_order_id = Column(Integer, ForeignKey("work_orders.id"), nullable=False)
    part_id = Column(Integer, ForeignKey("parts.id"), nullable=False)
    warehouse_id = Column(Integer, ForeignKey("warehouses.id"), nullable=False) # Hangi araçtan/depodan düşüldü
    quantity = Column(Integer, default=1)
    unit_price = Column(Float, nullable=False)
    part_warranty = Column(String(60), default="12 Ay Parça Garantisi")

    work_order = relationship("WorkOrder", back_populates="used_parts")
    part = relationship("Part")
    source_warehouse = relationship("Warehouse")

# ==================== 10. Periyodik Bakım Sözleşmeleri ====================
class MaintenancePlan(Base):
    __tablename__ = "maintenance_plans"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(Integer, ForeignKey("devices.id"), nullable=False)
    period_months = Column(Integer, default=6) # 3, 6 veya 12 Aylık
    last_service_date = Column(DateTime, nullable=True)
    next_due_date = Column(DateTime, nullable=False) # Sıradaki bakım tarihi
    status = Column(String(40), default="Aktif")

    device = relationship("Device", back_populates="maintenance_plans")

# ==================== 11. Müşteri Bildirim Kayıtları (WhatsApp / SMS) ====================
class NotificationLog(Base):
    __tablename__ = "notification_logs"

    id = Column(Integer, primary_key=True, index=True)
    work_order_id = Column(Integer, ForeignKey("work_orders.id"), nullable=True)
    channel = Column(String(30), default="WhatsApp") # WhatsApp, SMS
    template_type = Column(String(50), nullable=False) # KABUL, YOLDA, ONAY_TALEBI, TAMAMLANDI, BAKIM_HATIRLATMA
    recipient_phone = Column(String(30), nullable=False)
    recipient_name = Column(String(100), nullable=True)
    message_text = Column(Text, nullable=False)
    status = Column(String(30), default="Gönderildi") # Gönderildi, İletildi, Başarısız
    sent_at = Column(DateTime, default=datetime.utcnow)

    work_order = relationship("WorkOrder")
