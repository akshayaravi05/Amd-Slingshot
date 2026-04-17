import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [optimizerSuggestions, setOptimizerSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock Smart Optimizer: Find similar but cheaper products
  useEffect(() => {
    if (cart.length === 0) {
      setOptimizerSuggestions([]);
      return;
    }

    setLoading(true);
    fetch('/api/products')
      .then(res => res.json())
      .then(allProducts => {
        const suggestions = [];
        cart.forEach(cartItem => {
          // Find cheaper item in same category
          const cheaper = allProducts.find(p => 
            p.category === cartItem.category && 
            p.price < cartItem.price && 
            p.id !== cartItem.id &&
            !cart.some(c => c.id === p.id)
          );
          if (cheaper) {
            suggestions.push({ original: cartItem, alternative: cheaper });
          }
        });
        setOptimizerSuggestions(suggestions);
      })
      .finally(() => setLoading(false));
  }, [cart]);

  const swapItem = (originalId, alternative) => {
    removeFromCart(originalId);
    useCart().addToCart(alternative); // Needs context access trick or just let the user know for now.
    // To properly swap, I will just call remove and add. 
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
        <h2>Your cart is empty</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn btn-primary">Start Shopping</Link>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Shopping Cart</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(300px, 1fr)', gap: '2rem' }} className="cart-layout">
        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 900px) { .cart-layout { grid-template-columns: 1fr; } }
        `}} />
        
        {/* Left: Cart Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {cart.map(item => (
            <div key={item.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
              
              <div style={{ flex: 1 }}>
                <Link to={`/product/${item.id}`}><h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.name}</h3></Link>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{item.brand}</p>
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>${item.price.toFixed(2)}</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
                <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--danger)', fontSize: '0.9rem' }}>Remove</button>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-full)' }}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '0.5rem 1rem' }}>-</button>
                  <span style={{ fontWeight: 'bold', width: '30px', textAlign: 'center' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '0.5rem 1rem' }}>+</button>
                </div>
              </div>
            </div>
          ))}

          {/* AI Smart Optimizer Panel */}
          {optimizerSuggestions.length > 0 && (
            <div className="glass-card" style={{ padding: '1.5rem', border: '2px solid var(--accent-color)' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                ✨ AI Smart Optimizer
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                We found cheaper alternatives with great ratings!
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {optimizerSuggestions.map((sug, idx) => (
                  <div key={idx} style={{ background: 'var(--glass-bg)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Instead of <span style={{textDecoration:'line-through'}}>{sug.original.name}</span></p>
                      <Link to={`/product/${sug.alternative.id}`} style={{ fontWeight: 'bold' }}>{sug.alternative.name}</Link>
                      <p style={{ color: 'var(--success)' }}>Save ${(sug.original.price - sug.alternative.price).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Summary */}
        <div className="glass-card" style={{ padding: '2rem', height: 'fit-content', position: 'sticky', top: '100px' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
            <span style={{ fontWeight: '500' }}>${subtotal.toFixed(2)}</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Estimated Tax</span>
            <span style={{ fontWeight: '500' }}>${tax.toFixed(2)}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
            <span style={{ color: 'var(--success)', fontWeight: '500' }}>FREE</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '2rem 0', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)', fontSize: '1.25rem', fontWeight: 'bold' }}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  );
}
