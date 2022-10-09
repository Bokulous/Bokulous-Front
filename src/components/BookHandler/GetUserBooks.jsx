import '../../styles/Table.css';
import '../../styles/Landingpage.css';
import { useState, useEffect } from 'react';
import config from '../../config.js';
import AddBook from './AddBook';
import UpdateBook from './UpdateBook';
import DeleteBook from './DeleteBook';

const GetUserBooks = ({loggedInUser}) => {
  const [books, setBooks] = useState(null)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [currentOpenBook, setCurrentOpenBook] = useState(-1)
  const [responseSuccess, setResponseSuccess] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    async function fetchData() {
      
      const userId = loggedInUser.id

      let action = "/api/Books/GetSellerBooks"
      let response = await fetch(config.apiSettings.address + ":" + config.apiSettings.port + action + `/${userId}`)
      let data = await response.json();
      if(response.status === 404)
      {
        setResponseSuccess(false)
      }
      if(response.status === 200)
      console.log(data)
      setBooks(data)
      setResponseSuccess(true)
    }

    fetchData();
  }, [refreshKey]);

  const toggleAddOpen = (e) => {
    setIsAddOpen(!isAddOpen);
  }
  const toggleAddClose = (e) => {
    setIsAddOpen(!isAddOpen);
    setRefreshKey(oldKey => oldKey +1)
  }
  const toggleEditOpen = (i) => {
    setCurrentOpenBook(i);
    setIsEditOpen(!isEditOpen);
  }
  const toggleEditClose = (i) => {
    setCurrentOpenBook(i);
    setIsEditOpen(!isEditOpen);
    setRefreshKey(oldKey => oldKey +1)
  }
  const toggleDeleteOpen = (i) => {
    setCurrentOpenBook(i);
    setIsDeleteOpen(!isDeleteOpen);
  }
  const toggleDeleteClose = (i) => {
    setCurrentOpenBook(i);
    setIsDeleteOpen(!isDeleteOpen);
    setRefreshKey(oldKey => oldKey +1)
  }

  return (
    <section className="main-container">
      <h2>Dina böcker till försäljning</h2>
      <button className="lp-buttons" onClick={toggleAddOpen}>Lägg till bok</button>
              {isAddOpen && (
                <AddBook
                  user = {loggedInUser}                
                  handleClose={toggleAddClose}/>
                )}                
      <div className="list-books-container">
      {responseSuccess ? (
          <table>
            <tr>
                <th>Antal</th>
                <th>Titel</th>
                <th>Författare</th>
                <th>Kategori</th>
                <th>Pris</th>
                <th></th>
            </tr>
          {books?.map((book, i) => (
            <tr key={book.id}>
                <td>{book.inStorage}</td>
                <td>{book.title}</td>
                <td>
                    {book?.authors?.map((author) => (                  
                        <tr>                 
                            <td className='array'>{author}</td>
                        </tr>                   
                ))}
                </td>
                <td>        
                {book?.categories?.map((category) => (               
                   <tr>
                        <td className='array'>{category}</td>  
                    </tr>                                
                ))}   
                </td> 
                <td>{book.price}</td>      
                <tr>
                    <td>
                    <td className='array'>
                    <button className="lp-buttons" onClick={() => toggleEditOpen(i)}>Redigera</button>
                    {isEditOpen && i == currentOpenBook && (
                    <UpdateBook 
                      user = {loggedInUser} 
                      index = {currentOpenBook}
                      books = {books}
                      handleClose={toggleEditClose}
                    />
                    )}                  
                    </td>
                    <td className='array'>
                    <button className="lp-buttons" onClick={() => toggleDeleteOpen(i)}>Ta bort</button> 
                    {isDeleteOpen && i == currentOpenBook && (
                    <DeleteBook 
                      index = {currentOpenBook}
                      books = {books}
                      content={
                        <>
                          <h2>Ta bort en bok</h2>
                          <p>En bok kommer att tas bort från lagret.</p><br/>
                          <p>Är du säker på att du vill minska antalet av {book.title}?</p>
                        </>
                      }
                      handleClose={toggleDeleteClose}
                    />
                    )}                         
                    </td>
                    </td>                  
                </tr>
            </tr>
          ))}          
          </table>
      ) : (<div><p>Du har inga böcker till försäljning</p></div>) }
      </div>
    </section>
  );
};

export default GetUserBooks;