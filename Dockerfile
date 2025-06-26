# Use a lightweight Python image as the base
FROM python:3.9-slim-buster

# Set the working directory in the container
WORKDIR /app

# Copy the backend requirements file and install dependencies
COPY backend_requirements.txt .
RUN pip install --no-cache-dir -r backend_requirements.txt

# Copy the rest of the backend code
COPY . .

# Expose the port that FastAPI will run on
EXPOSE 8000

# Command to run the FastAPI application using Uvicorn
CMD ["uvicorn", "backend_app_main_Version2:app", "--host", "0.0.0.0", "--port", "8000"]
