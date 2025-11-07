from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, ImageDraw
import pytesseract, io, re, openai, os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Regex patterns ---
EMAIL_REGEX = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
PHONE_REGEX = r"\+?\d[\d -]{8,12}\d"
NAME_REGEX = r"\b([A-Z][a-z]+(?: [A-Z][a-z]+)?)\b"

@app.post("/detect_pii/")
async def detect_pii(file: UploadFile = File(...)):
    image = Image.open(io.BytesIO(await file.read()))
    text = pytesseract.image_to_string(image)
    pii_found = {
        "emails": re.findall(EMAIL_REGEX, text),
        "phones": re.findall(PHONE_REGEX, text),
        "names": re.findall(NAME_REGEX, text)
    }
    return {"text": text, "pii": pii_found}

@app.post("/chat/")
async def chat_with_ai(prompt: str = Form(...)):
    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    return {"response": response.choices[0].message.content}
