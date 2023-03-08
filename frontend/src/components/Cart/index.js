import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { getItemsThunk } from '../../store/item';
import { getCartItemsThunk } from '../../store/cartItem';
import './Cart.css';

export default function Cart() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  // const items = useSelector(state => state.items);
  // const cart_items = useSelector(state => state.cart_items);
  const userId = useSelector(state => state.session.user.id);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      await dispatch(getItemsThunk());
      await dispatch(getCartItemsThunk(userId));
      setIsLoading(false);
    }
    fetchData();
  }, [dispatch]);

  const cartItems = Object.values(cart_items).map(cartItem => {
    const item = items[cartItem.itemId];
    return {
      ...item,
      count: cartItem.count,
    };
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!cartItems || !cartItems.length) {
    return (
      <div className="cart">
        No items in the cart. Start selecting items to purchase.
      </div>
    );
  }

  const onSubmit = e => {
    e.preventDefault();
    window.alert(
      'Purchased the following:\n' +
        `${cartItems.map(item => `${item.count} of ${item.name}`).join('\n')}`
    );
  };

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
