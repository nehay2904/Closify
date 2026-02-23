import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item._id === product._id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
      );

      // If same product + same size + same color exists
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Otherwise add new product
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (_id, size, color) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item._id === _id &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
