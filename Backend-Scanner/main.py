from fastapi import FastAPI
from core.context import scan_url
# from scanner.models.schemas import ScanRequest

app = FastAPI()

@app.get("/scanning")
async def static_HTML():
    return '''Html page'''

@app.post("/scan")
async def scan(data):
    result = await scan_url(data)
    return result

