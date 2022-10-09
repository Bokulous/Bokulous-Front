import '../styles/Landingpage.css';
import config from '../config.js';
import { useState, useEffect } from 'react';
import PopUp from './PopUp';
import ShowBook from './ShowBookContainer';
import ShowBookContainer from './ShowBookContainer';

const Landingpage = ({ loggedInUser, setLoggedInUser, addCartItem }) => {
  const [books, setBooks] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false); //till popup
  const [isBasketPopUpOpen, setIsBasketPopUpOpen] = useState(false); //till popup
  const [currentOpenBook, setCurrentOpenBook] = useState(-1); //till popup

  useEffect(() => {
    async function fetchData() {
      let action = '/api/Books/GetBooks';
      let response = await fetch(
        config.apiSettings.address + ':' + config.apiSettings.port + action
      );
      //'https://bokulous.azurewebsites.net/api/Books/GetBooks'

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

  const listBooksInStorage = (
    <div>
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
              <p className="price">Pris: {book.price}kr</p>
              <p>Författare:</p>
              <ul>
                {book?.authors?.map((author) => (
                  <li key={book.id + '_' + author}>
                    <p>{author}</p>
                  </li>
                ))}
              </ul>
              <p>Kategori:</p>
              <ul>
                {book?.categories?.map((category) => (
                  <li key={book.id + '_' + category}>
                    <p>{category}</p>
                  </li>
                ))}
              </ul>
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
                    //togglePopUpAddToBasket(i)
                    addCartItem(book);
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
    </div>
  );

  return (
    <section className="main-container">
      <h2>Startsida</h2>
      {listBooksInStorage}
    </section>
  );
};

export default Landingpage;
