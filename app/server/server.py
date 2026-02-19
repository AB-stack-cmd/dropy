from fastapi import FastAPI

app = FastAPI()

@app.get("/status")
def create_response():
    return "response given"



