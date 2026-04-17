import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';

import Landing from './pages/Landing';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { RecommendationProvider } from './context/RecommendationContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <RecommendationProvider>
              
              <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar />
                
                <main style={{ flex: 1 }}>
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/shop" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Routes>
                </main>

                <Footer />
                <ChatAssistant />
              </div>

            </RecommendationProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
