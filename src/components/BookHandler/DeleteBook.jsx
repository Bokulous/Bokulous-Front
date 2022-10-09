import '../../styles/PopUp.css';
import config from '../../config.js';

const DeleteBook = (props) => {

  const books = props.books
  const book = books[props.index]

    async function deleteBook() 
    {
      let action = "/api/Books/DeleteBook"
          await fetch(config.apiSettings.address + ":" + config.apiSettings.port + action +"/"+ book.id, {
             method: 'PUT',
             headers: {
                  'Accept':'application/json',
                  'Content-Type':'application/json',
              }
            }).then((result) => {
              result.json().then((resp) => {
                if(result.ok) {
                    console.log(resp)
                  }
                else {
                    console.log("Something went wrong")
                  }
              }).catch(err => {
                console.log(err)
            })
          })
     }  

     async function request() {
      await deleteBook();
      props.handleClose();
     }

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
        <button className="lp-buttons" onClick={request}>Ta bort</button>
      </div>
    </div>
  );
};

export default DeleteBook;