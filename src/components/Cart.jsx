

const Cart = () => {
  return (
    <section className="main-container">
      <h2>Startsida</h2>
      {loggedInUser ? (
        <div> {loggedInUser.username} är inloggad.</div>
      ) : (
        <p>Logga in via menyn för att köpa och sälja böcker</p>
      )}
      <h3>Här kan man se alla böcker i vårt sortiment!</h3>
      <div className="book-container">
        <ul className="book">
          {books?.map((book, i) => (
            <li key={book.id}>
              <h4>{book.title}</h4>

              <p className="isUsed">
                Skick: {book.isUsed ? 'Begagnad' : 'Ny'}{' '}
              </p>
              <p>Författare:</p>
              {book?.authors?.map((author) => (
                <ul>
                  <li>
                    <p>{author}</p>
                  </li>
                </ul>
              ))}
              <p>Kategori:</p>
              {book?.categories?.map((category) => (
                <ul>
                  <li>
                    <p>{category}</p>
                  </li>
                </ul>
              ))}
              <div className="book-buttons-container">
                <button
                  className="lp-buttons"
                  onClick={() => togglePopUpInfo(i)}
                >
                  Mer info
                  {isInfoOpen && i == currentOpenBook && (
                    <PopUp
                      content={
                        <>
                          <h4>{book.title}</h4>
                          <p>ISBN: {book.isbn}</p>
                          <p>Språk: {book.language}</p>
                          <p>Publicerad: {book.published}</p>
                          <p>Vikt: {book.weight}g</p>
                        </>
                      }
                      handleClose={togglePopUpInfo}
                    />
                  )}
                </button>
                <button
                  className="lp-buttons"
                  onClick={() => {
                    removeCartItem({title, category, author})
                  }}
                >
                  Ta bort från varukorgen
                  {isBasketPopUpOpen && i == currentOpenBook && (
                    <PopUp
                      content={
                        <>
                          <h4>{book.title} är tillagd i varukorgen!</h4>
                          <p>Forsätt handla genom att trycka på krysset.</p>
                          <p>
                            Obs, endast visuellt. Kod för detta är ej skrivet...
                          </p>
                        </>
                      }
                      handleClose={togglePopUpAddToBasket}
                    />
                  )}
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
