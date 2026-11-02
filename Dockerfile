FROM python:3.14.4-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# CatBoost requires the OpenMP runtime on Linux.
RUN apt-get update && apt-get install -y --no-install-recommends libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Cache dependency installation independently of application changes.
COPY requirements-api.txt ./
RUN pip install --no-cache-dir -r requirements-api.txt

COPY app.py ./
COPY routes/ ./routes/
COPY src/ ./src/
COPY models/catboost_price_model.pkl models/catboost_production.pkl ./models/
COPY datasets/modeling/price_features.csv ./datasets/modeling/
COPY datasets/processed/production_features.csv ./datasets/processed/

RUN useradd --create-home appuser
USER appuser

EXPOSE 5000

# One worker avoids duplicating the in-memory models and datasets.
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "1", "--timeout", "120", "--access-logfile", "-", "--error-logfile", "-", "app:app"]
