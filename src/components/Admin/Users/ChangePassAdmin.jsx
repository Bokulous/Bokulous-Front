import { useState } from 'react';
import config from '../../../config.js';
import '../../../styles/PopUp.css';

const ChangePassAdmin = (props) => {
    const admin = props.user
    const user = props.users[props.index]
    const [newPassword, setNewPassword] = useState(user.password);

    async function changePass() 
    {       
        let action = "/api/Admin/ChangeUserPass"+`/${user.id}` + `/${newPassword}` + `/${admin.id}` + `/${admin.password}`
        await fetch(config.apiSettings.address + ":" + config.apiSettings.port + action, {
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
      await changePass();
      props.handleClose();
     }

    return (
    <div className="popup-box">
      <div className="box">
      <span className="close-icon" onClick={props.handleClose}>x</span>
        <h2>Ändra lösenordet</h2>
        <input
          type="text"
          value={newPassword}
          placeholder="Nytt lösenord"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button className="lp-buttons" onClick={request}>Spara</button>     
      </div>
    </div>
    );
  };
  
  export default ChangePassAdmin;