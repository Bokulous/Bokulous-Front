import '../styles/PopUpInfo.css';

const PopUpInfo = (books) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={books.handleClose}>
          x
        </span>
        {books.content}
      </div>
    </div>
  );
};

export default PopUpInfo;
