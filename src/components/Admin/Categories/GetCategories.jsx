import '../../../styles/Table.css';
import { useState, useEffect } from 'react';
import config from '../../../config.js';
import AddCategory from './AddCategory';
import UpdateCategory from './UpdateCategory';
import DeleteCategory from './DeleteCategory';

const GetCategories = () => {
  const [keyword, setKeyword] = useState("");
  const [categories, setCategories] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false); 
  const [isDeleteOpen, setIsDeleteOpen] = useState(false); 
  const [currentCategory, setCurrentCategory] = useState(-1); 
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function fetchData() {
      let action = "/api/Books/GetCategories"
      let response = await fetch(config.apiSettings.address + ":" + config.apiSettings.port + action)
      let data = await response.json();
      console.log(data);
      setCategories(data);
    }

    fetchData();
  }, [keyword, refreshKey]);

  async function searchCategory() {
    let action = "/api/Books/GetCategoriesByKeyword"
    let response = await fetch(config.apiSettings.address + ":" + config.apiSettings.port + action + `/${keyword}`, {
      method: 'GET',
      headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
      }})
    let data = await response.json()
    console.log(data)
    setCategories(data)
}

  const toggleAddOpen = (e) => {
    setIsAddOpen(!isAddOpen);
  }

  const toggleAddClose = (e) => {
    setIsAddOpen(!isAddOpen);
    setRefreshKey(oldKey => oldKey +1)
  }

  const toggleEditOpen = (i) => {
    setCurrentCategory(i);
    setIsEditOpen(!isEditOpen);
  }

  const toggleEditClose = (i) => {
    setCurrentCategory(i);
    setIsEditOpen(!isEditOpen);
    setRefreshKey(oldKey => oldKey +1)
  }

  const toggleDeleteOpen = (i) => {
    setCurrentCategory(i);
    setIsDeleteOpen(!isDeleteOpen);
  }

  const toggleDeleteClose = (i) => {
    setCurrentCategory(i);
    setIsDeleteOpen(!isDeleteOpen);
    setRefreshKey(oldKey => oldKey +1)
  }

  return (
    <section className="main-container">
      <h2>Alla kategorier</h2>
      <div>  
        <input
            type="text"
            value={keyword}
            placeholder="Sök kategori"
            className="search-input"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="lp-buttons" onClick={searchCategory}>Sök</button>
        </div>
      <button className="lp-buttons" onClick={toggleAddOpen}>Lägg till kategori</button>
              {isAddOpen && (
                <AddCategory              
                  handleClose={toggleAddClose}
                />
                )}                
      <div className="list-books-container">
          <table>
            <tr>
                <th>Kategori</th>
                <th></th>
            </tr>
          {categories?.map((category, i) => (
            <tr key={category.id}>
                <td>{category.name}</td>                                 
                    <td>
                        <td className='array'>
                        <button className="table-btn" onClick={() => toggleEditOpen(i)}>Redigera</button>
                        {isEditOpen && i == currentCategory && (
                        <UpdateCategory 
                        index = {currentCategory}
                        categories = {categories}
                        handleClose = {toggleEditClose}
                        />
                        )}
                        </td>
                            <td className='array'>
                            <button className="table-btn" onClick={() => toggleDeleteOpen(i)}>Ta bort</button>
                            {isDeleteOpen && i == currentCategory && (
                            <DeleteCategory 
                            index = {currentCategory}
                            categories = {categories}
                            content={
                                <>
                                <h2>Ta bort en kategori</h2>
                                <p>Kategorin kommer att tas bort.</p><br/>
                                <p>Är du säker på att du vill ta bort {category.name}?</p>
                                </>
                            }
                            handleClose={toggleDeleteClose}
                            />
                            )}                   
                            </td>
                    </td>                  
                </tr>  
              ))} 
          </table>
      </div>
    </section>
  );
};

export default GetCategories;