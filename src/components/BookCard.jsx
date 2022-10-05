import React, { useEffect } from 'react';
import { useState } from 'react';
import "../styles/BookCard.css"
function BookCard(props) {

    return ( 
        <div className='bookcard'>
            {props.book.title}
        </div>
     );
}

export default BookCard;