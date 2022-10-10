import '../../../styles/Table.css'
import '../../../styles/Landingpage.css'
import { useState, useEffect } from 'react'
import config from '../../../config.js'
import AddBook from '../../BookHandler/AddBook'
import UpdateBook from '../../BookHandler/UpdateBook'
import DeleteBook from '../../BookHandler/DeleteBook'
import PurgeBook from './PurgeBook'

const GetBooksAdmin = ({loggedInUser}) => {
  const [books, setBooks] = useState(null)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false) 
  const [isDeleteOpen, setIsDeleteOpen] = useState(false) 
  const [isPurgeOpen, setIsPurgeOpen] = useState(false)
  const [currentOpenBook, setCurrentOpenBook] = useState(-1) 
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    async function fetchData() {
      let action = "/api/Admin/GetBooksAdmin"
      let response = await fetch(config.apiSettings.address + ":" + config.apiSettings.port + action)
      let data = await response.json()
      if(response.status === 200){
        console.log(data)
        setBooks(data)
      }
      else {
        console.error(err)
      }
    }
    fetchData();
  }, [refreshKey]);

  const toggleAddOpen = (e) => {
    setIsAddOpen(!isAddOpen);
  };
  const toggleAddClose = (e) => {
    setIsAddOpen(!isAddOpen);
    setRefreshKey(oldKey => oldKey +1)
  };
  const toggleEditOpen = (i) => {
    setCurrentOpenBook(i);
    setIsEditOpen(!isEditOpen);
  };
  const toggleEditClose = (i) => {
    setCurrentOpenBook(i);
    setIsEditOpen(!isEditOpen);
    setRefreshKey(oldKey => oldKey +1)
  };
  const toggleDeleteOpen = (i) => {
    setCurrentOpenBook(i);
    setIsDeleteOpen(!isDeleteOpen);
  };
  const toggleDeleteClose = (i) => {
    setCurrentOpenBook(i);
    setIsDeleteOpen(!isDeleteOpen);
    setRefreshKey(oldKey => oldKey +1)
  };
  const togglePurgeOpen = (i) => {
    setCurrentOpenBook(i);
    setIsPurgeOpen(!isPurgeOpen);
  };
  const togglePurgeClose = (i) => {
    setCurrentOpenBook(i);
    setIsPurgeOpen(!isPurgeOpen);
    setRefreshKey(oldKey => oldKey +1)
  }; 

  return (
    <section className="main-container">
      <h2>Alla böcker i lager</h2>
      <button className="lp-buttons" onClick={toggleAddOpen}>Lägg till bok</button>
              {isAddOpen && (
                <AddBook     
                  user = {loggedInUser}   
                  handleClose={toggleAddClose}/>
                )}                
      <div className="list-books-container">
          <table>
            <tr>
                <th>Antal</th>
                <th>Titel</th>
                <th>Författare</th>
                <th>Publiserad</th>
                <th>Kategori</th>
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
                <td>{book.published}</td>
                <td>        
                {book?.categories?.map((category) => (               
                   <tr>
                        <td className='array'>{category}</td>  
                    </tr>                                
                ))}   
                </td>         
                <tr>
                    <td>
                    <td className='array'>
                    <button className="table-btn" onClick={() => toggleEditOpen(i)}>Redigera</button>
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
                    <button className="table-btn" onClick={() => toggleDeleteOpen(i)}> Ta bort</button> 
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
                    
                    <td className='array'>
                    <button className="table-btn" onClick={() => togglePurgeOpen(i)}>Radera</button> 
                    {isPurgeOpen && i == currentOpenBook && (
                    <PurgeBook
                      user = {loggedInUser}
                      index = {currentOpenBook}
                      books = {books}
                      content={
                        <>
                          <h2>Radera bok</h2>
                          <p>Boken kommer att raderas från lagret.</p><br/>
                          <p>Är du säker på att du vill radera {book.title}?</p>
                        </>
                      }
                      handleClose={togglePurgeClose}
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

export default GetBooksAdmin;