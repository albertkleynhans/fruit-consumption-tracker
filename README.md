# Fruit Consumption Tracker

A full-stack web application for tracking fruit consumption over time, built with React and FastAPI.

## Features

- Date picker for selecting dates
- Dropdown menu for fruit selection
- Quantity input
- Interactive time series graph showing consumption patterns
- Data persistence using JSON storage

## Tech Stack

### Frontend
- React with TypeScript
- Material-UI components
- Recharts for data visualization
- Vite for build tooling

### Backend
- FastAPI (Python)
- JSON file-based storage

## Prerequisites

- Python 3.11 or later
- Node.js 16 or later
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd [repository-name]
```

2. Set up the backend:
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Unix or MacOS:
source venv/bin/activate

pip install -r requirements.txt
```

3. Set up the frontend:
```bash
cd frontend
npm install
```

## Running the Application

1. Start the backend server (in one terminal):
```bash
cd backend
# On Windows:
.\venv\Scripts\activate
# On Unix or MacOS:
source venv/bin/activate

uvicorn main:app --reload
```

2. Start the frontend development server (in another terminal):
```bash
cd frontend
npm run dev
```

3. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## API Endpoints

- `GET /api/fruits` - Get list of available fruits
- `GET /api/entries` - Get all consumption entries
- `POST /api/entries` - Add a new consumption entry
- `GET /api/summary` - Get consumption summary by date

## Project Structure

```
.
├── backend/
│   ├── main.py           # FastAPI application
│   └── requirements.txt  # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.tsx     # Main application component
│   │   └── main.tsx    # Application entry point
│   ├── package.json    # Node.js dependencies
│   └── vite.config.ts  # Vite configuration
└── data/
    └── fruits.json     # Data storage
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 