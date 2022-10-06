import { useState, useEffect } from 'react';


const ShowBook = (props) => {

    return (
    <div className='bookcard'>
        <h4>{props.book.title}</h4>
        <p className="isUsed">
            Skick: {book.isUsed ? 'Begagnad' : 'Ny'}{' '}
        </p>
        <p>Författare:</p>
        <ul>
            <li>
                {props.book.author}
            </li>
        </ul>
        <p>Kategori:</p>
        <ul>
            <li>
                {props.book.category}
            </li>
        </ul>
    </div>
    );
  };

  export default ShowBook;