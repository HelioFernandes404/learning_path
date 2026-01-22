from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import date

from app.db.session import get_db
from app.services.card_service import CardService
from app.repositories.study_month_repository import StudyMonthRepository
from app.repositories.weekly_checkin_repository import WeeklyCheckInRepository

router = APIRouter()

class CardCreate(BaseModel):
    question: str
    month_id: Optional[int] = None
    current_stage: Optional[int] = 0

class CardResponse(BaseModel):
    id: int
    question: str
    current_stage: int
    next_review_date: date
    month_id: Optional[int] = None
    
    class Config:
        from_attributes = True

class StudyMonthCreate(BaseModel):
    title: str
    number: Optional[int] = None

class StudyMonthResponse(BaseModel):
    id: int
    title: str
    number: int
    
    class Config:
        from_attributes = True

class CheckInCreate(BaseModel):
    answers: dict

class CheckInResponse(BaseModel):
    id: int
    date: date
    q1: bool
    q2: bool
    q3: bool
    q4: bool
    q5: bool
    
    class Config:
        from_attributes = True

class ReviewRequest(BaseModel):
    success: bool

@router.post("/cards", response_model=CardResponse)
def create_card(card: CardCreate, db: Session = Depends(get_db)):
    service = CardService(db)
    return service.create_card(card.question, card.month_id, card.current_stage)

@router.get("/cards", response_model=List[CardResponse])
def get_cards(db: Session = Depends(get_db)):
    service = CardService(db)
    return service.get_all_cards()

@router.get("/cards/today", response_model=List[CardResponse])
def get_cards_today(db: Session = Depends(get_db)):
    service = CardService(db)
    return service.get_pending_cards()

@router.post("/cards/{card_id}/review", response_model=CardResponse)
def review_card(card_id: int, review: ReviewRequest, db: Session = Depends(get_db)):
    service = CardService(db)
    updated_card = service.process_review(card_id, review.success)
    if not updated_card:
        raise HTTPException(status_code=404, detail="Card not found")
    return updated_card

@router.put("/cards/{card_id}", response_model=CardResponse)
def update_card(card_id: int, card: CardCreate, db: Session = Depends(get_db)):
    service = CardService(db)
    updated_card = service.update_card_question(card_id, card.question)
    if not updated_card:
        raise HTTPException(status_code=404, detail="Card not found")
    return updated_card

@router.delete("/cards/{card_id}")
def delete_card(card_id: int, db: Session = Depends(get_db)):
    service = CardService(db)
    card = service.delete_card(card_id)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    return {"ok": True}

@router.get("/months", response_model=List[StudyMonthResponse])
def get_months(db: Session = Depends(get_db)):
    repo = StudyMonthRepository(db)
    return repo.get_all()

@router.post("/months", response_model=StudyMonthResponse)
def create_month(month: StudyMonthCreate, db: Session = Depends(get_db)):
    repo = StudyMonthRepository(db)
    return repo.create(month.title, month.number)

@router.delete("/months/{month_id}")
def delete_month(month_id: int, db: Session = Depends(get_db)):
    repo = StudyMonthRepository(db)
    success = repo.delete(month_id)
    if not success:
        raise HTTPException(status_code=404, detail="Month not found")
    return {"ok": True}

@router.get("/checkins/today", response_model=Optional[CheckInResponse])
def get_today_checkin(db: Session = Depends(get_db)):
    repo = WeeklyCheckInRepository(db)
    return repo.get_by_date(date.today())

@router.post("/checkins", response_model=CheckInResponse)
def submit_checkin(checkin: CheckInCreate, db: Session = Depends(get_db)):
    repo = WeeklyCheckInRepository(db)
    return repo.create(date.today(), checkin.answers)