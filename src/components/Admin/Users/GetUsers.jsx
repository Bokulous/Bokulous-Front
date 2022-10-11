import '../../../styles/Table.css'
import '../../../styles/Landingpage.css'
import { useState, useEffect } from 'react'
import config from '../../../config.js'
import BlockUser from './BlockUser'
import InactivateUser from './InactivateUser'
import PromoteUser from './PromoteUser'
import ChangePassAdmin from './ChangePassAdmin'

const GetUsers = ({loggedInUser}) => {
  const [users, setUsers] = useState(null)
  const [keyword, setKeyword] = useState("");
  const [isBlockOpen, setIsBlockOpen] = useState(false)
  const [isInactivateOpen, setIsInactivateOpen] = useState(false) 
  const [isPromoteOpen, setIsPromoteOpen] = useState(false) 
  const [isChangePassOpen, setIsChangePassOpen] = useState(false) 
  const [currentUser, setCurrentUser] = useState(-1) 
  const [refreshKey, setRefreshKey] = useState(0)
  const admin = loggedInUser

  useEffect(() => {
    async function fetchUsers() {
      let action = "/api/Admin/ListUsers"
      let response = await fetch(config.apiSettings.address + ":" + config.apiSettings.port + action+`/${admin.id}` + `/${admin.password}`)
      let data = await response.json();
      console.log(data);
      setUsers(data);
    }

    fetchUsers();
  }, [keyword, refreshKey]);


   async function searchUser() {
       let action = "/api/Admin/FindUser"
       await fetch(config.apiSettings.address + ":" + config.apiSettings.port + action+`/${keyword}`+`/${admin.id}` + `/${admin.password}`, {
         method: 'GET',
         headers: {
             'Accept':'application/json',
             'Content-Type':'application/json'
         }
        }).then((result) => {
          result.json().then((data) => {
               if(result.ok)
               {
                console.log("Success!")
                setUsers(data)
              }
              else {
                console.log("Something went wrong")
              }
           }).catch(err => {
            console.log(err)
        })
       })
   }  

  const toggleBlockOpen = (i) => {
    setCurrentUser(i)
    setIsBlockOpen(!isBlockOpen)
  };
  const toggleBlockClose = (i) => {
    setCurrentUser(i)
    setIsBlockOpen(!isBlockOpen)
    setRefreshKey(oldKey => oldKey +1)
  };

  const toggleInactivateOpen = (i) => {
    setCurrentUser(i)
    setIsInactivateOpen(!isInactivateOpen);
  };

  const toggleInactivateClose = (i) => {
    setCurrentUser(i)
    setIsInactivateOpen(!isInactivateOpen);
    setRefreshKey(oldKey => oldKey +1)
  };

  const togglePromoteOpen = (i) => {
    setCurrentUser(i)
    setIsPromoteOpen(!isPromoteOpen);
  }; 

  const togglePromoteClose = (i) => {
    setCurrentUser(i)
    setIsPromoteOpen(!isPromoteOpen);
    setRefreshKey(oldKey => oldKey +1)
  }; 

  const toggleChangePassOpen = (i) => {
    setCurrentUser(i)
    setIsChangePassOpen(!isChangePassOpen);
  };

  const toggleChangePassClose = (i) => {
    setCurrentUser(i)
    setIsChangePassOpen(!isChangePassOpen);
    setRefreshKey(oldKey => oldKey +1)
  };

  return (
    <section className="main-container">
      <h2>Alla användare</h2>  
      <div>  
        <input
            type="text"
            value={keyword}
            placeholder="Sök användare"
            className="search-input"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="lp-buttons" onClick={searchUser}>Sök</button>
        </div>
      <div>
          <table>
            <tr>
                <th>Användarnamn</th>
                <th>Mejladress</th>
                <th>Blockerad</th>
                <th>Aktiverad</th>
                <th>Admin</th>
                <th></th>
            </tr>
          {users?.map((user, i) => (
            <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.mail}</td>  
                {user.isBlocked ? (<td className='centered'>Ja</td>) : 
                (<td className='centered'>Nej</td>)} 
                {user.isActive ? (<td className='centered'>Ja</td>) : 
                (<td className='centered'>Nej</td>)}   
                {user.isAdmin ? (<td className='centered'>Ja</td>) : 
                (<td className='centered'>Nej</td>)}
                <tr>
                    <td>
                    <td className='array'>
                    <button className="table-btn" onClick={() => toggleBlockOpen(i)}>Blockering</button>
                    {isBlockOpen && i == currentUser && (
                    <BlockUser
                      user = {loggedInUser} 
                      index = {currentUser}
                      users = {users}
                      content={
                        <>
                          <h2>Blockering</h2>
                          <p>Blockera eller avblockera användare.</p>
                          <p>{user.username} är: </p><br/>
                          {user.isBlocked ? (
                            <p>blockerad</p>) : 
                            ( <p>inte blockerad</p> )}
                        </>
                      }
                      handleClose={toggleBlockClose}
                    />
                    )}                  
                    </td>
                    <td className='array'>
                    <button className="table-btn" onClick={() => toggleInactivateOpen(i)}>Inaktivering</button> 
                    {isInactivateOpen && i == currentUser && (
                    <InactivateUser 
                        user = {loggedInUser} 
                        index = {currentUser}
                        users = {users}
                        content={
                        <>
                          <h2>Inaktivering</h2>
                          <p>Inaktivera användare</p>
                          <p>{user.username} är: </p><br/>
                          {user.isActive ? (
                            <p>Aktiverad</p>) : 
                            ( <p>Inaktiverad</p> )}
                        </>
                        }
                        handleClose={toggleInactivateClose}
                    />
                    )}                         
                    </td>                   
                    <td className='array'>
                    <button className="table-btn" onClick={() => togglePromoteOpen(i)}>Gradering</button> 
                    {isPromoteOpen && i == currentUser && (
                    <PromoteUser
                        user = {loggedInUser} 
                        index = {currentUser}
                        users = {users}
                        content={
                        <>
                          <h2>Gradering</h2>
                          <p>Uppgradera eller nedgradera användare:</p>
                          <p>{user.username} är: </p><br/>
                          {user.isAdmin ? (
                            <p>admin</p>) : 
                            ( <p>inte admin</p> )}
                            <br/>
                            <p>Uppgradera ger användaren rättigheter</p>
                            <p>Nedgradera tar bort användarens rättigheter</p>
                        </>
                        }
                        handleClose={togglePromoteClose}
                    />
                    )}                       
                    </td>
                    <td className='array'>
                    <button className="table-btn" onClick={() => toggleChangePassOpen(i)}>Ändra lösenord</button> 
                    {isChangePassOpen && i == currentUser && (
                    <ChangePassAdmin
                        user = {loggedInUser} 
                        index = {currentUser}
                        users = {users}
                        handleClose={toggleChangePassClose}
                    />
                    )}                       
                    </td>
                    </td>                  
                </tr>
            </tr>
          ))}          
          </table>
      </div>
    </section>
  );
};

export default GetUsers;