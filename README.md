# Secure AI Chat with PII Redaction

## Overview
A full-stack web app that detects and redacts personal info from uploaded images before sending them to OpenAI GPT-4 Vision.

## Tech Stack
- Frontend: React + TailwindCSS
- Backend: FastAPI + pytesseract + Pillow
- AI: OpenAI GPT-4o

## Setup
### Backend
1. cd backend
2. pip install -r requirements.txt
3. uvicorn app:app --reload

### Frontend
1. cd frontend
2. npm install
3. npm start
