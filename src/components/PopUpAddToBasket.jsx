import '../styles/PopUpAddToBasket.css';

const PopUpAddToBasket = (books) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={books.handleClose}></span>
        {books.content}
      </div>
    </div>
  );
};

export default PopUpAddToBasket;
