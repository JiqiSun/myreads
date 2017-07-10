import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'


class Search extends Component {
	state = {
		books:[],
		book:[],
		notFound:false
	}

	updateQuery = (query) => {
		BooksAPI.search(query).then((books) => {
			if (query===''){
				this.setState({books:[], notFound:false})
			} else if (books.error){
				this.setState({books:[], notFound:true})
			}
			else{
				this.setState({books, notFound:false})
			}
		})		
    } 	

    getBook = (id) => {
		BooksAPI.get(id).then((book) => {
			this.setState ({book})
		})  
    }


	render(){
		const {addBook} = this.props
		return (
				<div className="search-books">
		            <div className="search-books-bar">
		              <Link to='/'  className="close-search">Close</Link>
		              <div className="search-books-input-wrapper">
		               	<input type="text" placeholder="Search by title or author"  onChange={(event) => this.updateQuery(event.target.value)}/>
		              </div>
		            </div>
		            <div className="search-books-results">
		              {this.state.notFound ? (<h3>No books were found</h3>) : (
	              		<ol className="books-grid">
			              	{this.state.books.map((book) => (
			              		<li key={book.id}>
									<div className="book">
										<div className="book-top">
											<div className="book-cover" style={{ width:128, height:193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
												<div className="book-shelf-changer">
													<select value={this.state.book.shelf} onMouseOver={() => this.getBook(book.id)} onChange={(event) => addBook(book,event.target.value)}>
						                                <option value="none" disabled>Move to...</option>					         
						                                <option value="currentlyReading">Currently Reading</option>
						                                <option value="wantToRead">Want to Read</option>
						                                <option value="read">Read</option>
						                                <option value="none">None</option>
					                                </select>
												</div>
										</div>
										<div className="book-title">{book.title}</div>
										<div className="book-authors">{book.authors}</div>
									</div>
								</li>
			              		))}		           
		              	</ol>
		              ) }	  
		            </div>
          		</div>
		)

	}

}

export default Search