# Probability Distribution API & Visualization Tool

A fullstack application for computing, sampling, and visualizing probability distributions.

This project implements several discrete and continuous probability distributions from scratch, exposing them through a REST API and visualizing the results via an interactive frontend.

---

## Features

- Compute probability distributions (PMF/PDF)
- Visualize distributions dynamically
- Generate random samples from distributions
- Compare theoretical vs empirical behavior
- REST API for statistical computations

---

## Supported Distributions

### Discrete
- Binomial
- Poisson
- Negative Binomial

### Continuous
- Normal (Gaussian)
- Exponential
- Gamma

---

## Tech Stack

### Backend
- Python
- Flask
- NumPy / SciPy
- Object-Oriented Design (Factory Pattern)

### Frontend
- React
- Plotly.js

---

## How It Works

### Distribution Mode

Computes the analytical function of a distribution:

- Discrete → P(X = x)
- Continuous → f(x) (PDF)

The frontend queries the API across a range of values and plots the result.

---

### Sampling Mode

Generates random samples using custom algorithms:

- Returns a dataset of size N
- Visualized as a histogram

This allows comparison between:

- Theoretical distribution
- Empirical data

---

## How to Run

### 1. Clone the repository

```bash
git clone https://github.com/Yosshimir/probability-api-engine.git
cd probability-api-engine
```


### 2. Run Backend
```bash
cd backend
pip install -r requirements.txt
python app/main.py
```

Server will run at:
http://localhost:5000

### 3. Run Frontend
```bash
cd frontend
npm install
npm start
```
App will open at:
http://localhost:3000

## API Endpoints

### Compute Distribution

`POST /api/v1/distributions`

Example:
```json
{
  "distribution": "Binomial",
  "n": 10,
  "p": 0.5,
  "x": 3
}
```

### Generate Samples

`POST /api/v1/sampling`

Example:
```json
{
  "distribution": "Normal",
  "mu": 0,
  "sd": 1,
  "N": 1000
}
```
# Author

Yosshio Del Angel Zapata