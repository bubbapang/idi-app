import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { getItemsThunk } from '../../store/item';
import { getCartItemsThunk } from '../../store/cartItem';
import './Cart.css';

export default function Cart() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser?.id;
  const items = useSelector(state => state.items);
  const cartItems = useSelector(state => state.cartItems);
  const itemsArray = Object.values(items);
  const cartItemsArray = Object.values(cartItems);

  // console.log('items', items)
  // console.log('cartItems', cartItems)

  const filteredItems = itemsArray.length && cartItemsArray.length ? cartItemsArray.map(cartItem => {
    // console.log('cartItem', cartItem);
    const filteredItem = items[cartItem.itemId];
    // console.log('filteredItem', filteredItem);
    return filteredItem;
  }) : [];

  // console.log('filteredItems', filteredItems)

  useEffect(() => {
    dispatch(getItemsThunk());
    dispatch(getCartItemsThunk(userId));
  }, [dispatch, userId]);

  const onSubmit = e => {
    e.preventDefault();
    const purchasedItems = cartItemsArray
      .map(cartItem => {
        const item = items[cartItem.itemId];
        return `${cartItem.quantity} of ${item.name}`
      })
      .join('\n');
    window.alert(`Purchased the following:\n${purchasedItems}`);
  };

  if (!cartItemsArray.length) {
    return (
      <div className="cart">
        No items in the cart. Start selecting items to purchase.
      </div>
    );
  } else {
    return (
      <div className="cart">
        <div className="cart-header">Cart</div>
        <ul className="cart-items">
          {filteredItems.map((filteredItem, idx) => {
            const cartItem = cartItems[idx + 1];
            // console.log('filteredItem', filteredItem);
            // console.log('cartItem', cartItem);
            return (
              <CartItem key={cartItem.id} item={filteredItem} cartItem={cartItem} />
            );
          })}
        </ul>
        <hr />
        <form onSubmit={onSubmit}>
          <button type="submit">Purchase</button>
        </form>
      </div>
    );
  }
}
