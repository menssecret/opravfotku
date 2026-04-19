from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
import uuid
import os

from providers.factory import get_ai_provider

# Načtení .env
load_dotenv()

app = FastAPI()

# CORS (pro frontend)
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

# Složky pro soubory
UPLOAD_DIR = "uploads"
RESULT_DIR = "results"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(RESULT_DIR, exist_ok=True)

# Statické cesty
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")
app.mount("/results", StaticFiles(directory=RESULT_DIR), name="results")

# In-memory job storage
jobs = {}

# AI provider
provider = get_ai_provider()


@app.get("/")
def root():
    return {"status": "ok"}


@app.post("/upload")
async def upload(
    file: UploadFile = File(...),
    mode: str = Form("auto")
):
    job_id = str(uuid.uuid4())
    safe_name = file.filename.replace(" ", "_")
    filename = f"{job_id}_{safe_name}"

    upload_path = os.path.join(UPLOAD_DIR, filename)
    result_path = os.path.join(RESULT_DIR, filename)

    content = await file.read()

    with open(upload_path, "wb") as f:
        f.write(content)

    try:
        print("UPLOAD START:", mode)
        print("PROVIDER:", type(provider).__name__)

        provider.process(mode, upload_path, result_path)

    except Exception as e:
        print("UPLOAD ERROR:", str(e))

        jobs[job_id] = {
            "status": "error",
            "mode": mode,
            "error": str(e),
        }

        return {"job_id": job_id}

    jobs[job_id] = {
        "status": "done",
        "mode": mode,
        "original": f"/uploads/{filename}",
        "result": f"/results/{filename}"
    }

    return {"job_id": job_id}


@app.get("/status/{job_id}")
def status(job_id: str):
    return jobs.get(job_id, {"status": "not_found"})