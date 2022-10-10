import config from '../../../config.js';
import { useState } from 'react'
import '../../../styles/PopUp.css';

const PromoteUser = (props) => {
  const user = props.users[props.index]
  const admin = props.user

    async function promoteUser() 
    {
      let action = "/api/Admin/Promote"+`/${user.id}` + `/${admin.id}` + `/${admin.password}`
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

     async function demoteUser() 
    {
      let action = "/api/Admin/Demote"+`/${user.id}` + `/${admin.id}` + `/${admin.password}`
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

     async function requestPromote() {
      await promoteUser();
      props.handleClose();
     }
     async function requestDemote() {
      await demoteUser();
      props.handleClose();
     }

  return (
    <div className="popup-box">
      <div className="box">
      <span className="close-icon" onClick={props.handleClose}>x</span>
          {props.content}
          <button className="lp-buttons" onClick={requestPromote}>Uppgradera</button>
          <button className="lp-buttons" onClick={requestDemote}>Nedgradera</button>
      </div>
    </div>
  );
};

export default PromoteUser;