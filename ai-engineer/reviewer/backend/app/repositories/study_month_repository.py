from sqlalchemy.orm import Session
from app.models.study_month import StudyMonth

class StudyMonthRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, title: str, number: int = None):
        if number is None:
            max_num = self.db.query(StudyMonth).order_by(StudyMonth.number.desc()).first()
            number = (max_num.number + 1) if max_num else 1
        
        # Check if number already exists to avoid crash
        existing = self.db.query(StudyMonth).filter(StudyMonth.number == number).first()
        if existing:
            # If exists, get the next available
            max_num = self.db.query(StudyMonth).order_by(StudyMonth.number.desc()).first()
            number = max_num.number + 1

        month = StudyMonth(title=title, number=number)
        self.db.add(month)
        self.db.commit()
        self.db.refresh(month)
        return month

    def get_all(self):
        return self.db.query(StudyMonth).order_by(StudyMonth.number).all()

    def get_by_id(self, month_id: int):
        return self.db.query(StudyMonth).filter(StudyMonth.id == month_id).first()

    def delete(self, month_id: int):
        month = self.get_by_id(month_id)
        if month:
            self.db.delete(month)
            self.db.commit()
            return True
        return False
