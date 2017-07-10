import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import BookShelf from './BookShelf'
import Search from './Search'

class BooksApp extends React.Component {
  state = {

    books: []
     
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })   
  }

  updateList = (book,shelf) => {
    BooksAPI.update(book,shelf)
    const bookId = book.id
    const newShelf = shelf
    let books = this.state.books
    for (book of books) {
      if (book.id === bookId){
        book.shelf = newShelf
      } 
    }
    this.setState({books})  
  }

  addBook = (book,shelf) => {
    BooksAPI.update(book,shelf).then(()=>
      BooksAPI.getAll().then((books) => {
          this.setState({books})
        })  
    )
   
  } 

  render() {
    return (
      <div className="app">
          <Route path='/search' render={()=>(
            <Search
              addBook={this.addBook}    
            /> 
          )}/>  
          <Route exact  path='/'  render={()=>(
            <BookShelf
              books={this.state.books}
              updateList={this.updateList}
            /> 
          )}/>        
       </div>      
    )
  }
      
}

export default BooksApp
