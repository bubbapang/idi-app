// Import the necessary dependencies
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import './Cart.css';

function Cart() {
  // Select the cart and items state using the useSelector hook
  const cart = useSelector(state => state.cart);
  const items = useSelector(state => state.items);

  // Use Object.values() and map() to get an array of items in the cart, and merge their info with the items in the items state
  const cartItems = Object.values(cart).map(item => ({
    ...item,
    ...items[item.id],
  }));

  // If there are no items in the cart, display a message to the user
  if (!cartItems || !cartItems.length) {
    return (
      <div className="cart">
        No items in the cart. Start selecting items to purchase.
      </div>
    );
  }

  // Define a function to handle form submission and display the purchased items in an alert
  const onSubmit = e => {
    e.preventDefault();
    window.alert(
      'Purchased the following:\n' +
        `${cartItems.map(item => `${item.count} of ${item.name}`).join('\n')}`
    );
  };

  // Render the cart items as a list of CartItem components
  return (
    <div className="cart">
      <ul>
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <hr />
      <form onSubmit={onSubmit}>
        <button type="submit">Purchase</button>
      </form>
    </div>
  );
}

// Export the Cart component as the default export
export default Cart;
