import React from 'react';
import { useState, useEffect } from 'react';
import "../../styles/Search.css";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { themeOptions } from '../../theme';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import config from '../../config.js';
import BookCard from '../BookCard';
import BookCardContainer from '../BookCardContainer';

function Search() {
    const [books, setBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [price, setPrice] = useState([0, 2000]);
    const [isUsed, setIsUsed] = useState("");
    const [searchString, setSearchString] = useState('');
    const [categories, setCategories] = useState([]);
    const [publishedFrom, setPublishedFrom] = useState('');
    const [publishedTo, setPublishedTo] = useState('');
    const [author, setAuthor] = useState('');
    const theme = createTheme(themeOptions);

    useEffect(() => {
        async function fetchBooks() {
            let action = "/api/Books/GetBooks"
            let response = await fetch(config.apiSettings.address + ":" + config.apiSettings.port + action)
      
            let data = await response.json();

            setBooks(data);
            setAllBooks(data);
          }

        async function fetchCategories() {
            let action = "/api/Books/GetCategories"
            let response = await fetch(config.apiSettings.address + ":" + config.apiSettings.port + action)
      
            let data = await response.json();
            setCategories(data);
        }

        fetchBooks();
        fetchCategories();
    },[])

    useEffect(() => {

        async function filterResults() {
            let tempBooks = allBooks;

            //Title
            if(searchString !== "") {
                tempBooks = allBooks.filter(book => book.title.toLowerCase().includes(searchString.toLowerCase()));
            }

            //Categories
            tempBooks = tempBooks.filter(book =>
                    book.categories.map(category => category)
                .indexOf(selectedCategory) != -1 || selectedCategory == ""
                    
                );

            //Author
            tempBooks = tempBooks.filter(book =>
                    book.authors.map(element => {
                        if(element.toLowerCase().includes(author))
                            return book;
                        }
                     )
                .indexOf(book) != -1 || author == ""              
                );

            //IsUsed
            tempBooks = tempBooks.filter(book => book.isUsed == isUsed || isUsed == "");
            
            //Price
            tempBooks = tempBooks.filter(book => book.price >= price[0] && book.price <= price[1]);

            //Published
            tempBooks = tempBooks.filter(book => (book.published >= publishedFrom  || publishedFrom == "") && (book.published <= publishedTo || publishedTo == ""));
            
            setBooks(tempBooks);

        }

        filterResults();
        
    }, [searchString, selectedCategory, author, publishedFrom, publishedTo, price, isUsed]);

    function valuetext(value) {
        return `${value} kr`;
      }

    const handleChangeCategory = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleChangeSearch = (event) => {
        setSearchString(event.target.value);
    };

    
    const handleChangePrice = (event) => {
        setPrice(event.target.value);
    };

    const handleChangeIsUsed = (event) => {
        setIsUsed(event.target.value);
    }

    return (
        <div>
            
                <input onChange={handleChangeSearch} className='Search' />
                <br /><br />
                <div style={{width:'41vw', margin:'0 auto'}}>
                <ThemeProvider theme={theme}>
            

                    <div style={{display:'inline-block', float:'left'}}>
                        <FormControl style={{maxWidth: 200, minWidth: 50, margin: 5}}>
                            <TextField onChange={(event) => setAuthor(event.target.value)} id="author" label="Författare" variant="outlined" />
                        </FormControl><br />
                        <FormControl style={{maxWidth: 200, minWidth: 100, margin: 5}}>
                            <TextField onChange={(event) => setPublishedFrom(event.target.value)} id="publishedFrom" label="Publicerad från (år)" variant="outlined" />
                        </FormControl><br />
                        <FormControl style={{maxWidth: 200, minWidth: 100, margin: 5}}>
                            <TextField onChange={(event) => setPublishedTo(event.target.value)} id="publishedTo" label="Publicerad till (år)" variant="outlined" />
                        </FormControl>
                    </div>
                        
                    <div style={{display:'inline-block', float:'right'}}>

                        <FormControl style={{minWidth: 200}}>
                            <Box sx={{ width: 200 }}>
                            <Typography style={{textAlign:'left'}} id="input-slider" gutterBottom>
                                Pris
                            </Typography>
                                <Slider
                                    getAriaLabel={() => 'Pris'}
                                    value={price}
                                    onChange={handleChangePrice}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={valuetext}
                                    max={2000}
                                    aria-labelledby="input-slider"
                                />
                            </Box>
                        </FormControl><br />

                        <FormControl style={{minWidth: 120, margin: 5}}>
                            <InputLabel id="isUsed">Begagnad</InputLabel>
                            <Select
                            labelId="isUsed"
                            id="isUsed"
                            value={isUsed}
                            label="Begagnad"
                            onChange={handleChangeIsUsed}
                        >
                            <MenuItem value="">Spelar ingen roll</MenuItem>
                            <MenuItem value={true}>Ja</MenuItem>
                            <MenuItem value={false}>Nej</MenuItem>
                            </Select>
                        </FormControl><br />

                        <FormControl style={{minWidth: 120, margin: 5}}>
                            <InputLabel id="category">Kategori</InputLabel>
                            <Select
                                labelId="category"
                                id="category"
                                value={selectedCategory}
                                label="Kategori"
                                onChange={handleChangeCategory}
                            >
                                <MenuItem key="alla" value="">Alla</MenuItem>
                                {categories.map(category => <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                </ThemeProvider>
            </div>
                <div>
                    <BookCardContainer>
                        {
                            books.map(book => <BookCard key={book.id} book={book} />)
                        }
                    </BookCardContainer>
                </div>
            </div>
        );
}

export default Search;