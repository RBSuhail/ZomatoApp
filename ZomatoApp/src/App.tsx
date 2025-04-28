import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RestaurantDetails from './pages/RestaurantDetails';
import Search from './pages/Search';
import Header from './components/Header';
import Footer from './components/Footer';
import { RestaurantProvider } from './context/RestaurantContext';

function App() {
  return (
    <RestaurantProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/restaurant/:id" element={<RestaurantDetails />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </RestaurantProvider>
  );
}

export default App;