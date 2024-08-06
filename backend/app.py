from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Define the data model for your form
class ContactForm(BaseModel):
    name: str
    email: str
    message: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # This is a list of URLs. Adjust according to your needs.
    allow_credentials=True,
    allow_methods=["*"],  # Or you can specify methods e.g., ["GET", "POST", "OPTIONS"]
    allow_headers=["*"],
)

@app.post("/contact")
async def receive_contact(form_data: ContactForm):
    print(f"Received message from {form_data.name}, Email: {form_data.email}, Message: {form_data.message}")
    # Echoing back the data received
    return {"message": f"Received your message, {form_data.name}! We will reply to {form_data.email} soon."}

# Optional: Run the server with uvicorn if this file is executed as the main script
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
