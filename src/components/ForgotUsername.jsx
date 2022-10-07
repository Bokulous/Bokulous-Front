import { useState } from "react";


const ForgotUsername = ({  }) => {

    async function forgotUsername(){
        let response = await fetch('https://localhost:44367/api/Users/ForgotUsername', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
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
export default ForgotUsername;