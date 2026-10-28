"""
ServisAI - Pydantic Veri Şemaları (İstek ve Yanıt Modelleri)
API üzerinden gelen ve giden verilerin doğrulanması ve tip kontrolü.
"""

from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel

# ==================== User / Staff Şemaları ====================
class UserBase(BaseModel):
    full_name: str
    email: str
    role: str
    specialty: Optional[str] = None
    vehicle_plate: Optional[str] = None
    status: str = "Müsait"

    pin_code: Optional[str] = None
    pass

class UserCreate(UserBase):
    password: Optional[str] = None
    pin_code: Optional[str] = None

class UserResponse(UserBase):
    id: int
    pin_code: Optional[str] = None
    current_lat: Optional[float] = None
    current_lng: Optional[float] = None
    class Config:
        from_attributes = True

# ==================== Auth Şemaları ====================
class LoginRequest(BaseModel):
    email: str
    password: str

class TechPinRequest(BaseModel):
    staff_id: int
    pin_code: str

class AuthResponse(BaseModel):
    success: bool
    message: str
    token: str
    user: UserResponse

# ==================== Customer Şemaları ====================
class CustomerBase(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    address: Optional[str] = None
    lat: Optional[float] = None
    lng: Optional[float] = None

class CustomerResponse(CustomerBase):
    id: int
    class Config:
        from_attributes = True

# ==================== Device Şemaları ====================
class DeviceBase(BaseModel):
    brand: str
    model: str
    serial_number: str
    qr_code: Optional[str] = None

class DeviceResponse(DeviceBase):
    id: int
    customer_id: int
    class Config:
        from_attributes = True

# ==================== Part & Inventory Şemaları ====================
class PartBase(BaseModel):
    part_code: str
    name: str
    category: Optional[str] = "Genel Parça"
    unit_price: float
    warranty_months: int = 12

class PartResponse(PartBase):
    id: int
    class Config:
        from_attributes = True

class InventoryStockItem(BaseModel):
    warehouse_id: int
    warehouse_name: str
    warehouse_type: str
    part_id: int
    part_code: str
    part_name: str
    category: Optional[str] = "Genel Parça"
    quantity: int
    unit_price: float

class StockEntryCreate(BaseModel):
    part_code: str
    part_name: str
    category: Optional[str] = "Genel Parça"
    warehouse_target: str = "Merkez" # "Merkez", "34 ABC 101", "34 DEF 202"
    quantity: int = 1
    unit_price: float = 0.0
    warranty_months: int = 12
    critical_threshold: int = 2

# ==================== WorkOrder Şemaları ====================
class QuickCallIntake(BaseModel):
    customer_name: str
    customer_phone: str
    customer_address: Optional[str] = "İstanbul"
    device_brand: str
    device_model: str
    serial_number: Optional[str] = None
    complaint: str
    channel: str = "Telefon" # Telefon, E-posta, Elden Teslim, WhatsApp
    priority: str = "Normal" # Normal, Yüksek, Acil

class WorkOrderCreate(BaseModel):
    device_id: int
    assigned_user_id: Optional[int] = None
    customer_complaint: str

class WorkOrderUpdateStatus(BaseModel):
    status: str
    technician_findings: Optional[str] = None

class AddPartToOrder(BaseModel):
    part_id: int
    warehouse_id: int
    quantity: int = 1

class WorkOrderResponse(BaseModel):
    id: int
    tracking_code: str
    status: str
    customer_complaint: str
    technician_findings: Optional[str] = None
    ai_diagnosis_notes: Optional[str] = None
    labor_cost: float
    parts_cost: float
    total_cost: float
    customer_approved: bool
    created_at: datetime
    class Config:
        from_attributes = True

# ==================== AI Arıza Teşhis İstek/Yanıt ====================
class AIDiagnosisRequest(BaseModel):
    device_brand: str
    device_model: str
    symptoms: str

class AIDiagnosisResponse(BaseModel):
    confidence_rate: str
    probable_root_cause: str
    recommended_solution: Optional[str] = None
    recommended_action: Optional[str] = None
    inspection_steps: List[str]
    recommended_parts: List[str]
    estimated_repair_time_minutes: int
