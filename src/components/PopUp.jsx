import '../styles/PopUp.css';

const PopUp = (books) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={books.handleClose}></span>
        {books.content}
      </div>
    </div>
  );
};

export default PopUp;
