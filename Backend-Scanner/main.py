from fastapi import FastAPI
from core.context import scan_url

app = FastAPI()

@app.post("/scan")
async def scan(url):
    result = await scan_url(url)
    return result
