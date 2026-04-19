from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from PIL import Image, ImageEnhance, ImageFilter
import uuid
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
RESULT_DIR = "results"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(RESULT_DIR, exist_ok=True)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")
app.mount("/results", StaticFiles(directory=RESULT_DIR), name="results")

jobs = {}

def simulate_restore(input_path: str, output_path: str):
    image = Image.open(input_path).convert("RGB")

    image = image.filter(ImageFilter.SHARPEN)

    contrast = ImageEnhance.Contrast(image)
    image = contrast.enhance(1.12)

    brightness = ImageEnhance.Brightness(image)
    image = brightness.enhance(1.04)

    color = ImageEnhance.Color(image)
    image = color.enhance(1.08)

    image.save(output_path, quality=95)

@app.get("/")
def root():
    return {"status": "ok"}

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    job_id = str(uuid.uuid4())
    safe_name = file.filename.replace(" ", "_")
    filename = f"{job_id}_{safe_name}"

    upload_path = os.path.join(UPLOAD_DIR, filename)
    result_path = os.path.join(RESULT_DIR, filename)

    content = await file.read()

    with open(upload_path, "wb") as f:
        f.write(content)

    simulate_restore(upload_path, result_path)

    jobs[job_id] = {
        "status": "done",
        "original": f"/uploads/{filename}",
        "result": f"/results/{filename}"
    }

    return {"job_id": job_id}

@app.get("/status/{job_id}")
def status(job_id: str):
    return jobs.get(job_id, {"status": "not_found"})