import '../styles/Landingpage.css';
import { useState, useEffect } from 'react';
import PopUpInfo from './PopUpInfo';
import PopUpAddToBasket from './PopUpAddToBasket';

const Landingpage = () => {
  const [books, setBooks] = useState(null);
  const [isOpen, setIsOpen] = useState(false); //till popup

  useEffect(() => {
    async function fetchData() {
      let response = await fetch('https://localhost:7204/api/Books/GetBooks');
      //'https://bokulous.azurewebsites.net/api/Books/GetBooks' //fungerar endast via main(?)

      let data = await response.json();
      console.log(data);
      setBooks(data);
    }

    fetchData();
  }, []);

  const togglePopUpInfo = () => {
    setIsOpen(!isOpen);
  };

  const togglePopUpAddToBasket = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="main-container">
      <h2>Startsida</h2>
      <h3>Här kan man se alla böcker i vårt sortiment!</h3>
      <div className="book-container">
        <ul className="book">
          {books?.map((book) => (
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
                <button className="lp-buttons" onClick={togglePopUpInfo}>
                  Mer info
                  {isOpen && (
                    <PopUpInfo
                      content={
                        <>
                          <b>{book.title}</b>
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
                <button className="lp-buttons" onClick={togglePopUpAddToBasket}>
                  Lägg till i varukorgen
                  {isOpen && (
                    <PopUpAddToBasket
                      content={
                        <>
                          <b>{book.title} är tillagd i varukorgen!</b>
                          <p>Forsätt handla genom att trycka på krysset.</p>
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
