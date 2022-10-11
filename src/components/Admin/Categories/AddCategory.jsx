import { useState } from 'react';
import config from '../../../config.js';
import '../../../styles/PopUp.css';

const AddCategory = (props) => {
    const [category, setCategory] = useState("");

    async function addCategory() 
    {       
        let action = "/api/Books/AddCategory"
        await fetch(config.apiSettings.address + ":" + config.apiSettings.port + action + `/${category}`, {
             method: 'POST',
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
      await addCategory();
      props.handleClose();
     }

    return (
    <div className="popup-box">
      <div className="box">
      <span className="close-icon" onClick={props.handleClose}>x</span>
        <h2>Lägg till en ny kategori</h2>
        <input
          type="text"
          value={category}
          placeholder="Ny kategori"
          onChange={(e) => setCategory(e.target.value)}
        />
        <button className="lp-buttons" onClick={request}>Spara</button>     
      </div>
    </div>
    );
  };
  
  export default AddCategory;