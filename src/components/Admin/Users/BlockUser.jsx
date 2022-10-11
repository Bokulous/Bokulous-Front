import config from '../../../config.js';
import '../../../styles/PopUp.css';

const BlockUser = (props) => {

  const user = props.users[props.index]
  const admin = props.user

    async function blockUser() 
    {
      let action = "/api/Admin/BlockUser"+`/${user.id}` + `/${admin.id}` + `/${admin.password}`
          await fetch(config.apiSettings.address + ":" + config.apiSettings.port + action, {
             method: 'PUT',
             headers: {
                 'Accept':'application/json',
                  'Content-Type':'application/json',
              },
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

    async function unBlockUser() 
    {
      let action = "/api/Admin/UnBlockUser"+`/${user.id}` + `/${admin.id}` + `/${admin.password}`
          await fetch(config.apiSettings.address + ":" + config.apiSettings.port + action, {
             method: 'PUT',
             headers: {
                 'Accept':'application/json',
                  'Content-Type':'application/json',
                  'Mode':'no-cors'
              },
          }).then((result) => {
              result.json().then((resp) => {
                  console.warn(resp)
                  props.refreshPage
              })
          })
     }  

     async function requestBlock() {
      await blockUser();
      props.handleClose();
     }
     async function requestUnBlock() {
      await unBlockUser();
      props.handleClose();
     }

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
        <button className="lp-buttons" onClick={requestBlock}>Blockera</button>
        <button className="lp-buttons" onClick={requestUnBlock}>Avblockera</button>
      </div>
    </div>
  );
};

export default BlockUser;