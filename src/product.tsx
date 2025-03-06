import React from 'react';
import { useStoreon } from 'storeon/react';
import './css/product.css';
import { CartItem } from './types';

interface ProductProps {
  product: CartItem;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { dispatch } = useStoreon();

  const addToCart = (product: CartItem) => {
    dispatch('cart/add', product);
  };

  return (
    <div className="product-card">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">Цена: {product.price} Рублей</p>
      <button className="add-to-cart-button" onClick={() => addToCart(product)}>
        Добавить в корзину
      </button>
    </div>
  );
};

export default Product;
