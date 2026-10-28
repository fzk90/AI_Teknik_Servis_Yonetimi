"""
ServisAI - Veri Tabanı Bağlantısı ve Oturumu (SQLAlchemy)
Bu modül yerelde SQLite, canlı sunucuda (SaaS) ise PostgreSQL ile çalışacak şekilde tasarlanmıştır.
"""

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Canlıda PostgreSQL ortam değişkeni varsa onu alır, yoksa yerel SQLite dosyasını kullanır
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./servisai.db")

# SQLite özel ayarı: check_same_thread=False (FastAPI'nin asenkron yapısıyla uyum için)
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """Her API isteğinde güvenli bir veri tabanı oturumu açar ve istek bitince otomatik kapatır."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
