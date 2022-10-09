import config from '../../../config.js';
import '../../../styles/PopUp.css';

const InactivateUser = (props) => {

  const user = props.users[props.index]
  const admin = props.user

    async function inActivateUser() 
    {
      console.log(admin.password)
      let action = "/api/Admin/InactivateUser"+ `/${user.id}` + `/${admin.id}` + `/${admin.password}`
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

     async function request() {
      await inActivateUser();
      props.handleClose();
     }

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
        <button className="lp-buttons" onClick={request}>Inaktivera</button>
      </div>
    </div>
  );
};

export default InactivateUser;