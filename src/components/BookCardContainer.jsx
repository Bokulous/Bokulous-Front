import React from 'react';
import "../styles/BookCard.css"
function BookCardContainer(props) {
    return ( <div className='bookcard-container'>{props.children}</div> );
}

export default BookCardContainer;