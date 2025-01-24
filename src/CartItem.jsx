import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const cost = parseFloat(item.cost.replace('$', ''));
      return total + (cost * item.quantity);
    }, 0).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ 
      name: item.name, 
      quantity: item.quantity + 1 
    }));
  };
  
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ 
        name: item.name, 
        quantity: item.quantity - 1 
      }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };
  
  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace('$', ''));
    return (cost * item.quantity).toFixed(2);
  };



  const [totalQuantity, setTotalQuantity] = React.useState(0);

  React.useEffect(() => {
    let total = 0;
    cart.forEach(item => {
      total += item.quantity;
    });
    setTotalQuantity(total);
  }, [cart]);
  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>

{cart.map(item => (
  <div className="cart-item" key={item.name}>
    <img className="cart-item-image" src={item.image} alt={item.name} />
    <span className="cart-quantity">{totalQuantity}</span>

    <div className="cart-item-details">
      <div className="cart-item-name">{item.name}</div>
      <div className="cart-item-cost">{item.cost}</div>
      <div className="cart-item-quantity">
        <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
        <span className="cart-item-quantity-value">{item.quantity}</span>
        <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
      </div>
      <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
      <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
    </div>
  </div>
))}
      </div>
      <div>
        <button onClick={onContinueShopping}>Continue Shopping</button>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;



