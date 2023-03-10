import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { getItemsThunk } from '../../store/item';
import { getCartItemsThunk } from '../../store/cartItem';
import { deleteCartItemThunk } from '../../store/cartItem';
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
    return [filteredItem, cartItem];
  }) : [];

  // console.log('filteredItems', filteredItems)

  useEffect(() => {
    dispatch(getItemsThunk());
    dispatch(getCartItemsThunk(userId));
  }, [dispatch, userId]);

  const onSubmit = e => {
    e.preventDefault();

    // delete all cart items
    async function deleteCartItems() {
      cartItemsArray.forEach(cartItem => {
        dispatch(deleteCartItemThunk(cartItem.id));
      });
    }
    deleteCartItems();

    const purchasedItems = cartItemsArray
      .map(cartItem => {
        const item = items[cartItem.itemId];
        return `${cartItem.quantity} of ${item.name}`
      })
      .join('\n');
    window.alert(`Purchased the following:\n${purchasedItems}`);
  };

  // round to 2 decimal places
  const totalCost = filteredItems.reduce((acc, combo) => {
    const [filteredItem, cartItem] = combo;
    return acc + (filteredItem.price * cartItem.quantity);
  }, 0).toFixed(2);

  if (!cartItemsArray.length) {
    return (
      <div className="cart">
        No items in the cart. Start selecting items to purchase.
      </div>
    );
  } else {
    return (
      <>
        {/* <div className="cart-header">Cart</div> */}
          <div className="cart">
          <ul className="cart-items">
            {filteredItems.map((combo, idx) => {
              // console.log('filteredItem', filteredItem);
              // console.log('cartItem', cartItem);
              const [filteredItem, cartItem] = combo;
              return (
                <CartItem key={cartItem.id} item={filteredItem} cartItem={cartItem} />
              );
            })}
          </ul>
          <hr />
          <form onSubmit={onSubmit}>
            <button type="submit">Go To Checkout ${totalCost}</button>
          </form>
        </div>
      </>
    );
  }
}
