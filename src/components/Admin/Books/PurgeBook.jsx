import '../../../styles/PopUp.css';
import config from '../../../config.js';

const PurgeBook = (props) => {
  const books = props.books
  const book = books[props.index]
  const adminId = props.user.id
  const password = props.user.password

    async function purgeBook() 
    {
      console.log(book.id)
      let action = "/api/Admin/PurgeBook"
          await fetch(config.apiSettings.address + ":" + config.apiSettings.port + action + `/${book.id}` + `/${adminId}` + `/${password}`, {
             method: 'DELETE',
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
      await purgeBook();
      props.handleClose();
     }

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
        <button className="lp-buttons" onClick={request}>Radera</button>
      </div>
    </div>
  );
};

export default PurgeBook;