import { useEffect } from 'react';
import { useState } from 'react'



const Cart = ({removeCartItem, cartItems, loggedInUser}) => {


  return (
    <section className="main-container">
      <h2>Varukorg</h2>
      {loggedInUser ? (
        <div> {loggedInUser.username} är inloggad.</div>
      ) : (
        <p>Logga in via menyn för att köpa och sälja böcker</p>
      )}
      <div className="book-container">
        <ul className="book">
          {cartItems?.map((book) => (
            <li key={book.id}>
              <h4>{book.title}</h4>
              <h4>{book.price} kr</h4>
              <div className="book-buttons-container">
                <button
                  className="lp-buttons"
                  onClick={() => {
                    console.log(book)
                    removeCartItem(book)
                  }}
                >
                  Ta bort från varukorgen
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
//lista böcker i varukorgen
//böcker ska kunna läggas till och tas bort ut varukorgen
//varukorgen ska kunna skicka user vidare till betalning
export default Cart;
