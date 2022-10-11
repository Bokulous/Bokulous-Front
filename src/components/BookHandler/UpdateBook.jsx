import { useState } from 'react';
import config from '../../config.js';
import '../../styles/PopUp.css';
import '../../styles/Form.css';


const UpdateBook = (props) => {
    const books = props.books
    const book = books[props.index]
    const userId = props.user.id
    const username = props.user.username
    const mail = props.user.mail

    const [isbn, setIsbn] = useState(book.isbn);
    const [title, setTitle] = useState(book.title);
    const [joinedCategories, setJoinedCategories] = useState(book.categories.join(", "));
    const [joinedAuthors, setJoinedAuthors] = useState(book.authors.join(", "));   
    const [language, setLanguage] = useState(book.language);
    const [published, setPublished] = useState(book.published);
    const [weight, setWeight] = useState(book.weight);
    const [price, setPrice] = useState(book.price);
    const [inStorage, setInstorage] = useState(book.inStorage);
    const [isUsed, setIsUsed] = useState(book.isUsed);

    async function updateBook() 
    {       
        const categories = joinedCategories.split(", ")
        const authors = joinedAuthors.split(", ")

        let action = "/api/Books/UpdateBook"
        await fetch(config.apiSettings.address + ":" + config.apiSettings.port + action + `/${book.id}`, {
             method: 'PUT',
             headers: {
                 'Accept':'application/json',
                 'Content-Type':'application/json'
             },
             body:JSON.stringify({  
                    id: book.id,                
                    isbn: isbn,
                    title: title,
                    categories: categories,
                    language: language,
                    authors: authors,
                    published: published,
                    weight: weight,
                    price: price,
                    inStorage: inStorage,
                    seller: {
                      id: userId,
                      username: username,
                      mail: mail
                    }
             })
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
      await updateBook();
      props.handleClose();
     }

    return (
        <div className="popup-box-form">
          <div className="box">
          <span className="close-icon" onClick={props.handleClose}>x</span>
            <h2 className='form-header'>Redigera</h2>
            <form>
            <div className='form'>
            <label className='form-label'>ISBN</label>
            <input className='form-input'
              type="text"
              value={isbn}
              placeholder="ISBN"
              onChange={(e) => setIsbn(e.target.value)}
            /></div>
            <div className='form'>
            <label className='form-label'>Titel</label>
            <input className='form-input'
              type="text"
              value={title}
              placeholder="Titel"
              onChange={(e) => setTitle(e.target.value)}
            /></div>
            <div className='form'>
            <label className='form-label'>Kategori</label>
            <input className='form-input'
              type="text"
              value={joinedCategories}
              placeholder="Kategori"
              onChange={(e) => setJoinedCategories(e.target.value)}
            /></div>
            <div className='form'>
            <label className='form-label'>Språk</label>
            <input className='form-input'
              type="text"
              value={language}
              placeholder="Språk"
              onChange={(e) => setLanguage(e.target.value)}
            /></div>
            <div className='form'>
            <label className='form-label'>Författare</label>
            <input className='form-input'
              type="text"
              value={joinedAuthors}
              placeholder="Författare"
              onChange={(e) => setJoinedAuthors(e.target.value)}
            /></div>
            <div className='form'>
            <label className='form-label'>Utgivningsår</label>
            <input className='form-input'
              type="text"
              value={published}
              placeholder="Utgivningsår"
              onChange={(e) => setPublished(e.target.value)}
            /></div>
            <div className='form'>
            <label className='form-label'>Vikt i gram</label>
            <input className='form-input'
              type="text"
              value={weight}
              placeholder="Vikt"
              onChange={(e) => setWeight(e.target.value)}
            /></div>
            <div className='form'>
            <label className='form-label'>Pris</label>
            <input className='form-input'
              type="text"
              value={price}
              placeholder="Pris"
              onChange={(e) => setPrice(e.target.value)}
            /></div>
            <div className='form'>
            <label className='form-label'>Antalet böcker</label>
            <input className='form-input'
              type="text"
              value={inStorage}
              placeholder="Antal böcker"
              onChange={(e) => setInstorage(e.target.value)}
            /></div>< br/>
            <label className='form-label'>Begagnad</label>
            <label> 
                <input type="checkbox" label="Begagnad bok" checked={isUsed} onChange={handleCheck}/>
            </label>
            </form> 
    
            <button className="lp-buttons" onClick={request}>Spara ändringar</button>
          
          </div>
        </div>
    );
  };
  
  export default UpdateBook;