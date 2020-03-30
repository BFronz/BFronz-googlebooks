import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Container from "../components/Container";
import Row from "../components/Row";
import Column from "../components/Column";
import Card from "../components/Card";
import { searchGoogleBooks, saveBook, getSavedBooks} from "../utils/API";



class Search extends Component {
  state = {
    searchTerm: '',
    bookList: [],
    savedBookIds: [],
    error: null
  }


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  };


  handleFormSubmit = event => {
    event.preventDefault()

    if(this.state.searchTerm === '') {
      return this.setState({error: 'Please put in a title'});
    }

    searchGoogleBooks(this.state.searchTerm)
    .then(res => {
        const { items } = res.data
        console.log("searchGoogleBooks",res.data);
        console.log("searchGoogleBooks",this.state.searchTerm);
        this.setState({ error: null })

        const bookListCleaned = items.map(book => {
          return {
            bookid: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks ?  book.volumeInfo.imageLinks.thumbnail 
            : ''
          };

        });
        console.log("bookListCleaned:",bookListCleaned);
       return this.setState({ bookList: bookListCleaned, searchTerm: ""})
      })
      .then(this.retrieveSavedBooks)
      .catch(err => this.setState({error: err}) )
    };


   

    retrieveSavedBooks = () => {
      getSavedBooks().then(res => {
        const getSavedBookIds = res.data.map(({bookid}) => bookid);
        this.setState({ getSavedBookIds });
      })
      .catch(err => this.setState({ error: err }) )
    }


    handleBookSavedBook = bookId => {
      const book = this.state.bookList.find(book => book.bookid === bookId);
      console.log("handleBookSavedBook",book);
      saveBook(book)
      .then(() => {
         const savedBookIds = [...this.state.savedBookIds, bookId];
         this.setState({ savedBookIds });
      })
      .catch(err =>  this.setState({ error:err }));
    }

    

  
    render() {
      return (
        <>
          <Jumbotron 
            fluid bg={'dark'} 
            color={'light'} 
            pageTitle={'Search for Books'} 
            />

          <Container>
            <Row>
              <Column xs={12} md={4}>

                <Card title={'Search for a book'}>
                  <form onSubmit={this.handleFormSubmit}>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Search for a book'
                      onChange={this.handleInputChange}
                      value={this.state.searchTerm}
                      name='searchTerm'
                    />
                    {this.state.error && 
                    !this.state.searchTerm.lenght && (
                      <div className="alert alert-danger mb-2">
                        {this.state.error}
                      </div>

                     )}
                    <button type='submit' className="btn btn-block btn-dark mt-2">
                      Search for Books
                    </button>
                  </form>
                </Card>
              </Column>
              
              
              {/* <Column  md={4}> */}
                    
                      { !this.state.bookList.length ? (
                        <h2 className="test-center">
                          Search for books to begin
                        </h2>
                      ) : (

                        this.state.bookList.map(book => {
                          return (
                            <Column key={book.bookid} md={4}>
                              <Card  
                                title={book.title}
                                image={book.image ? book.image : undefined} >
                                   <small className="text-muted">
                                  {`By: ${book.authors ? book.authors.join(', ') : null }  `}                  
                                </small>    
                                  <p>{book.description}</p>

                                  <button disabled = {this.state.savedBookIds.includes(book.bookid) ? true : undefined }
                                          className = {'btn btn-success btn-sm'} 
                                          onClick={() => this.handleBookSavedBook(book.bookid)  
                                        }
                                        >

                                      Save Book    
                                  </button>
                              </Card>
                            </Column>
                          )

                        })
                      )}
              {/* </Column> */}
            
            </Row>
          </Container>

        </>
      )}
}

export default Search;