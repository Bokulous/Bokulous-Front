import '../styles/Landingpage.css';
import { useState, useEffect } from 'react';
import PopUp from './PopUp';

const Landingpage = ({ loggedInUser, setLoggedInUser }) => {
  const [books, setBooks] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false); //till popup
  const [isBasketPopUpOpen, setIsBasketPopUpOpen] = useState(false); //till popup
  const [currentOpenBook, setCurrentOpenBook] = useState(-1); //till popup

  useEffect(() => {
    async function fetchData() {
      let response = await fetch('https://localhost:44367/api/Books/GetBooks');
      //'https://bokulous.azurewebsites.net/api/Books/GetBooks' //fungerar endast via main(?)

      let data = await response.json();
      console.log(data);
      setBooks(data);
    }

    fetchData();
  }, []);

  //sätter ruta och bokindex
  const togglePopUpInfo = (i) => {
    setCurrentOpenBook(i);
    setIsInfoOpen(!isInfoOpen);
  };

  const togglePopUpAddToBasket = (i) => {
    setCurrentOpenBook(i);
    setIsBasketPopUpOpen(!isBasketPopUpOpen);
  };

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
                    togglePopUpAddToBasket(i)
                    addCartItem({author})
                  }}
                >
                  Lägg till i varukorgen
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

export default Landingpage;
