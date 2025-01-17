from dataclasses                import dataclass
from sqlmodel                   import Session, create_engine, select
from pydantic_core              import MultiHostUrl

from .models                    import User

@dataclass
class PostgresConfigDBReaderConfig:
    db_name: str
    db_user: str
    db_password: str
    db_host: str
    db_port: int

class PSQLConfigDBReader:

    def __init__(self, db_name, db_user, db_password, db_host, db_port):
        self.db_name        = db_name
        self.db_user        = db_user
        self.db_password    = db_password
        self.db_host        = db_host
        self.db_port        = db_port
        self.uri            = MultiHostUrl.build(scheme     = "postgresql+psycopg2",
                                                username    = db_user,
                                                password    = db_password,
                                                path        = db_name,
                                                host        = db_host,
                                                port        = db_port)

        self.engine         = create_engine(str(self.uri))

    @classmethod
    def connect(cls, config: PostgresConfigDBReaderConfig):
        return cls(config.db_name, config.db_user, config.db_password, config.db_host, config.db_port)

    def get_user_by_email(self, email):
        with Session(self.engine) as session:
            query = select(User).where(User.email == email)
            user = session.exec(query).first()
            return user