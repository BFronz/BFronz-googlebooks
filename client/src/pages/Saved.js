import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Container from "../components/Container";
import Row from "../components/Row";
import Column from "../components/Column";
import Card from "../components/Card";
import { removeBook, getSavedBooks} from "../utils/API";

class Saved extends Component {
  state = {  
    bookList : []
  }
  
  handleGetSavedBooks = () => {
    getSavedBooks().then(({ data: bookList }) => {
      console.log("getSavedBooks",bookList);
      this.setState({bookList})
    }).catch(err => console.log(err)) 
  }

  componentDidMount() {
    this.handleGetSavedBooks()
  }

  handleRemoveBook = bookId => {
    console.log("removeBook",bookId)
    removeBook(bookId)
    .then(this.handleGetSavedBooks)
    .catch(err => console.log(err))       
  }


  render() { 
    return ( 
      <>
        <Jumbotron
          fluid
          bg={'dark'}
          color={'light'}
          pageTitle={'Viewing Saved Books'}
        />
        <Container>
          <Row>
            {!this.state.bookList.length ? (
              <h2 className="text-center">No Saved Books, yet... </h2>
            ) : ( 
              this.state.bookList.map(book   => {
                return (
                  <Column key ={book._id} md={4}>
                    <Card 
                      bg={'light'}
                      color={'dark'}
                      title={book.title}
                      image={book.image ? book.image : undefined}  
                    >
                     <small className="text-muted">
                     {`By: ${book.authors.length ? book.authors.join(', ') : null }  `}                  
                       </small>    
                       <p>{book.description}</p>

                      <button  onClick={() => this.handleRemoveBook(book._id)  }
                       className="btn btn-danger btn-sm">
                         Remove Book
                      </button>
                    </Card>
                  </Column>
                )}
              ))    
            }
          </Row>
        </Container>        
      </>
     );
  }
}
 



export default Saved;
