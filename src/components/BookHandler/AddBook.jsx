import { useState } from 'react'
import config from '../../config.js'
import '../../styles/PopUp.css'

const AddBook = (props) => {
    const id = props.user.id
    const username = props.user.username
    const mail = props.user.mail

    const [isbn, setIsbn] = useState("")
    const [title, setTitle] = useState("")
    const [joinedCategories, setJoinedCategories] = useState("")
    const [joinedAuthors, setJoinedAuthors] = useState("")  
    const [language, setLanguage] = useState("")
    const [published, setPublished] = useState()
    const [weight, setWeight] = useState()
    const [price, setPrice] = useState()
    const [inStorage, setInstorage] = useState()
    const [isUsed, setIsUsed] = useState(false)

    async function addBook() 
    {
      const categories = joinedCategories.split(", ")
      const authors = joinedAuthors.split(", ")

        let newBook = {
          isbn: isbn,
          title: title,
          categories: categories,
          lanuage: language,
          authors: authors,
          published: published,
          weight: weight,
          price: price,
          inStorage: inStorage,
          seller: {
            id: id,
            username: username,
            mail: mail
          }
         }
        
        let action = "/api/Books/AddBook"
        await fetch(config.apiSettings.address + ":" + config.apiSettings.port + action, {
             method: 'POST',
             headers: {
                 'Accept':'application/json',
                 'Content-Type':'application/json',
             },
             body: JSON.stringify(newBook)
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

     function handleCheck() {
      setIsUsed(prev => !prev);
     }

     async function request() {
      await addBook();
      props.handleClose();
     }

    return (
    <div className="popup-box-form">
      <div className="box">
      <span className="close-icon" onClick={props.handleClose}>x</span>
        <h2>Lägg till en bok till försäljning</h2>
        <form>
        <input
          type="text"
          value={isbn}
          placeholder="ISBN"
          onChange={(e) => setIsbn(e.target.value)}
        />
        <input
          type="text"
          value={title}
          placeholder="Titel"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={joinedCategories}
          placeholder="Kategori"
          onChange={(e) => setJoinedCategories(e.target.value)}
        />
        <input
          type="text"
          value={language}
          placeholder="Språk"
          onChange={(e) => setLanguage(e.target.value)}
        />
        <input
          type="text"
          value={joinedAuthors}
          placeholder="Författare"
          onChange={(e) => setJoinedAuthors(e.target.value)}
        />
        <input
          type="text"
          value={published}
          placeholder="Utgivningsår"
          onChange={(e) => setPublished(e.target.value)}
        />
        <input
          type="text"
          value={weight}
          placeholder="Vikt"
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="text"
          value={price}
          placeholder="Pris"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          value={inStorage}
          placeholder="Antal böcker"
          onChange={(e) => setInstorage(e.target.value)}
        />< br/>
        <label className='popup-label'>Begagnad</label>
        <label> 
            <input type="checkbox" label="Begagnad bok" checked={isUsed} onChange={handleCheck}/>
        </label>
        </form> 

        <button className="lp-buttons" onClick={request}>Lägg till bok</button>
      
      </div>
    </div>
    );
  };
  
  export default AddBook;