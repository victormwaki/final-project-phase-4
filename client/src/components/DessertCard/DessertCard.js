import React from 'react';
import useResponsiveImage from '../../hooks/useResponsiveImage';
import { useCart } from '../../context/cartContext';
import '../../styles/DessertCard.css';

/**
 * Renders a single dessert card with image, name, category, price, and
 * either an "Add to cart" button or increment/decrement buttons.
 * @param {Object} props
 * @param {Object} props.dessert - The dessert object.
 */
export default function DessertCard({ dessert }) {
  const { cart, addItem, removeOneItem } = useCart();
  const responsiveImage = useResponsiveImage(dessert.image);

  // Check if this dessert is currently in the cart
  const cartItem = cart.find(item => item.name === dessert.name);

  return (
    <div className="dessert-card" id={dessert.name.replace(/\s+/g, '-')}>
      {/* Dessert image */}
      <img
        className="dessert-image"
        src={responsiveImage}
        alt={dessert.name}
        style={{
          border: cartItem ? '2px solid hsl(14, 86%, 42%)' : 'none'
        }}
      />

      {/* Conditional rendering of buttons */}
      {cartItem ? (
        <div className="increment-decrement-buttons">
          <button
            className="decrement-button"
            onClick={() => removeOneItem(dessert.name)}
            onMouseOver={e => {
              e.currentTarget.style.backgroundColor = 'hsl(20, 50%, 98%)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <img
              src="/assets/images/icon-decrement-quantity.svg"
              alt="Decrement quantity icon"
            />
          </button>

          <span className="cart-item-quantity">{cartItem.quantity}</span>

          <button
            className="increment-button"
            onClick={() => addItem(dessert)}
            onMouseOver={e => {
              e.currentTarget.style.backgroundColor = 'hsl(20, 50%, 98%)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <img
              src="/assets/images/icon-increment-quantity.svg"
              alt="Increment quantity icon"
            />
          </button>
        </div>
      ) : (
        <button className="add-to-cart-button" onClick={() => addItem(dessert)}>
          <img
            className="add-to-cart-icon"
            src="/assets/images/icon-add-to-cart.svg"
            alt="Add to cart icon"
            onMouseOver={e => {
              e.currentTarget.src = '/assets/images/icon-add-to-cart-light.svg';
            }}
            onMouseOut={e => {
              e.currentTarget.src = '/assets/images/icon-add-to-cart.svg';
            }}
          />
          Add to cart
        </button>
      )}

      {/* Dessert details */}
      <div className="dessert-card-details">
        <p className="dessert-category">{dessert.category}</p>
        <h2 className="dessert-name">{dessert.name}</h2>
        <p className="dessert-price">${dessert.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
