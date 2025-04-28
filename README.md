# ZomatoClone - Restaurant Discovery Platform

A modern, full-stack restaurant discovery platform built with React, Node.js, and MongoDB. This application allows users to discover restaurants, search by location, cuisine, and price range, and view detailed restaurant information.

## Features

- 🔍 Advanced search functionality with text, location, and image-based search
- 📍 Geolocation-based restaurant discovery
- 🏷️ Filter restaurants by cuisine, price range, and location
- ⭐ Restaurant ratings and reviews
- 📱 Responsive design for all devices
- 🖼️ Image gallery for restaurants
- 💫 Beautiful UI with smooth animations

## Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - React Router
  - Lucide Icons
  - Axios

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - Multer for file uploads

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/zomato-clone.git
   cd zomato-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Import sample data:
   ```bash
   npm run import-data
   ```

5. Start the development servers:
   ```bash
   npm run dev:all
   ```

The application will be available at `http://localhost:5173`, and the API server will run on `http://localhost:5000`.

## Project Structure

```
zomato-clone/
├── src/                  # Frontend source files
│   ├── components/       # React components
│   ├── pages/           # Page components
│   ├── context/         # React context
│   ├── utils/           # Utility functions
│   └── types/           # TypeScript types
├── server/              # Backend source files
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routes
│   └── uploads/         # Upload directory
├── scripts/             # Utility scripts
└── public/             # Static files
```

## Available Scripts

- `npm run dev` - Start the frontend development server
- `npm run dev:server` - Start the backend development server
- `npm run dev:all` - Start both frontend and backend servers
- `npm run build` - Build the frontend for production
- `npm run import-data` - Import sample restaurant data
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build

## API Endpoints

### Restaurants
- `GET /api/restaurants` - Get all restaurants (with pagination)
- `GET /api/restaurants/:id` - Get restaurant by ID

### Search
- `GET /api/search/text` - Search restaurants by text
- `GET /api/search/nearby` - Search restaurants by location
- `POST /api/search/image` - Search restaurants by food image

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Restaurant images from [Pexels](https://www.pexels.com)
- Icons from [Lucide](https://lucide.dev)
- UI inspiration from Zomato
