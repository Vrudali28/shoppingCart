// Import necessary React modules
import React, { useState } from 'react';

// Import styles for the component
import './App.css';

// Product card component
const Product = ({ id, name, description, addToCart, removeFromCart, inCart, price }) => (
  <div className={`product ${inCart ? 'in-cart' : ''}`}>
    {/* Product details */}
    <h3>{name}</h3>
    <p>{description}</p>
    <h4>{price}</h4>

    {/* Conditional rendering for Add to Cart / Remove from Cart buttons */}
    {inCart ? (
      <div>
        <button className="remove" onClick={() => removeFromCart(id)}>
          Remove from Cart
        </button>
      </div>
    ) : (
      <div>
        <button className="add" onClick={() => addToCart(id)}>
          Add to Cart
        </button>
      </div>
    )}
  </div>
);

// Shopping cart component
const ShoppingCart = ({ cart, removeFromCart }) => (
  <div className="shopping-cart">
    {/* Shopping cart header */}
    <h2>Shopping Cart</h2>

    {/* Cart icon with item count */}
    <div className="cart-icon">
      🛒 {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
    </div>

    {/* Display the list of items in the cart */}
    <ul>
      {cart.map((item) => (
        <li key={item.id}>
          {/* Display item name and a Remove button */}
          {item.name} -{' '}
          <button className="remove" onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  </div>
);

// Main App component
const App = () => {
  // State for storing product information
  const [products, setProducts] = useState([
    { id: 1, name: 'SAMSUNG LED TV', description: 'Samsung 80 cm (32 inches) HD Ready Smart LED TV UA32T4380AKXXL (Glossy Black)', price: '300$' },
    { id: 2, name: 'LG LED TV', description: 'LG 108 cm (43 inches) 4K Ultra HD Smart LED TV 43UR7500PSC (Dark Iron Gray)', price: '500$' },
    { id: 3, name: 'SONY LED TV', description: 'Sony Bravia 139 cm (55 inches) 4K Ultra HD Smart LED Google TV KD-55X74K (Black)', price: '560$' }
  ]);

  // State for managing the shopping cart
  const [cart, setCart] = useState([]);
  
  // State for tracking whether the cart is open or not
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Function to add a product to the cart
  const addToCart = (productId) => {
    const productToAdd = products.find((product) => product.id === productId);
    setCart([...cart, productToAdd]);
    updateProductStatus(productId, true);
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
    updateProductStatus(productId, false);
  };

  // Function to update the inCart status of a product
  const updateProductStatus = (productId, inCart) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, inCart } : product
      )
    );
  };

  // Function to toggle the visibility of the shopping cart
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // JSX for the main app structure
  return (
    <div className="app">
      {/* Navbar */}
      <div className="navbar">
        <h1>Online Store</h1>
        {/* Cart icon with item count */}
        <div className="navbar-section" onClick={toggleCart}>
          Cart 🛒
          <span className="cart-count">{cart.length}</span>
        </div>
      </div>
      
      {/* Display shopping cart if it is open */}
      {isCartOpen && <ShoppingCart cart={cart} removeFromCart={removeFromCart} />}
      
      {/* Display the list of products */}
      <div className="product-list">
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            inCart={product.inCart || false}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>
    </div>
  );
};

// Export the App component
export default App;
