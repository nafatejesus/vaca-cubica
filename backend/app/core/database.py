from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base
from app.core.config import settings

engine = create_async_engine(
    settings.database_url,
    echo=False,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=False,
    pool_recycle=3600
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False
)

Base = declarative_base()

async def get_db():
    """
    Dependencia de sesión por petición.
    ANTES: si un commit fallaba (ej. IntegrityError), el 'finally' cerraba la
    sesión sin hacer rollback explícito -> la excepción se propagaba con la
    sesión en estado inconsistente. Ahora cualquier excepción dispara rollback
    antes de cerrar, dejando la conexión limpia para el siguiente request que
    tome esa conexión del pool.
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()