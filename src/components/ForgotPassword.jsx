import { useState } from "react";


const ForgotPassword = ({  }) => {
    const [ForgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);

    async function forgotPassword(){
        let response = await fetch('https://localhost:44367/api/Users/ForgotPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
        if (response.status === 200) {
            let data = await response.json();
            //setLoggedInUser(data);
            setForgotPasswordSuccess(true);
          }
    }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Användarnamn</label>
          <input
            type="text"
            name="Mail"
            required
            //onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="button-container">
          <input type="submit" onClick={login} />
        </div>
      </form>
    </div>
  );
};
// om det finns en loggedInUser så visas profilalternativet i menyn.
// lista upp användarens info genom loggedInUser.username osv...
// alternativ att CRUD sina uppgifter, koppla till editprofile-endpoint
export default ForgotPassword;