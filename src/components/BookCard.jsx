import React, { useEffect } from 'react';
import { useState } from 'react';
import "../styles/BookCard.css"
function BookCard(props) {

    return ( 
        <div className='bookcard'>
            <h1>{props.book.title}</h1>
            <p></p>
            <div className='bookcard-section1'>
                <p>Författare: {props.book.authors.map((author, i) => {
                    if(props.book.authors.length -1 == i)
                        return author;
                     else
                     {
                        return author + ", ";
                     }
                    })}
                </p>
                <p>Språk: {props.book.language}</p>
                <p>Kategori: {props.book.categories.map((category, i) => {
                    if(props.book.categories.length -1 == i)
                        return category;
                     else
                     {
                        return category + ", ";
                     }
                    })}
                </p>
            </div>
            <div className='bookcard-section2'>
                <p>Publicerad: {props.book.published}</p>
                <p>Second hand: {props.book.isUsed ? "Ja" : "Nej"}</p>
                <p className='price'>Pris: {props.book.price} kr</p>
                <button onClick={() => props.addCartItem(props.book)}>Lägg i varukorg</button>
            </div>
            <div className='bookcard-bottom'>
                
            </div>
        </div>
     );
}

export default BookCard;