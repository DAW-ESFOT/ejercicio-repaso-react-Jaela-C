import React, { useEffect, useState } from 'react';
import {Layout, Row, Col, Card, Tag, Spin, Modal, Typography, Button} from 'antd';
import 'antd/dist/antd.css';


const { Header, Content } = Layout;
const TextTitle = Typography.Title;
const { Meta } = Card;

function App() {

  const [books, setBooks] = useState([]);
  const [booksDetails, setBooksDetails] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [id, setId] = useState( null );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        "https://stark-spire-22280.herokuapp.com/api/books"
      );
      const json = await response.json();
      console.log("json", json);
      setBooks(json.data);
      return json;
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const getBooksDetails = async () => {
      if(id){
        const response = await fetch(
          `https://stark-spire-22280.herokuapp.com/api/books/${id}`
        );
        const bookJson = await response.json();
        console.log("json", bookJson);
        setBooksDetails(bookJson);
        setIsModalVisible(true);
      }
    };
    getBooksDetails();
  }, [id]);

  return(
    <>
    <Header>
        <div style={{ textAlign: 'center'}}>
          <TextTitle style={{color: '#ffffff'}} level={3}>LISTA DE LIBROS</TextTitle>
        </div>
    </Header>
    {
      books 
      ?
      books.map((book) => {
        return (
          <Card key = {book.id}
            style = { {
              width: 330,
              display: 'inline-block',
              margin: 10
            } } 
          >
          <div style={{display: 'flex'}}>
          <Col className = "gutter-row" span={10}>
              <div>
                <img
                  alt={book.title}
                  src={book.cover_page}
                  style={{ 
                    width: 100,
                    height: 150  
                  }}
                />
              </div>
          </Col>
          <Col className = "gutter-row" span={16}>  
            <div>
              <h3 style={{fontWeight: 'bold'}}>{book.title}</h3>
              <h5>{book.author} - {book.year_edition}</h5>
              <h4>{book.price}</h4>
              <Button type="primary" onClick={() => setId(book.id)}>Ver más</Button>
            </div>
          </Col>
          </div>          
          </Card>
        );
      })
      : 'Loading'
    }
    <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
    <div style={{display: 'flex'}}>
          <Col className = "gutter-row" span={12}>  
            <div>
              <h3 style={{fontWeight: 'bold'}}>{booksDetails.title}</h3>
              <h4><strong>Autor:</strong> {booksDetails.author}</h4>
              <h4><strong>Edición:</strong> {booksDetails.year_edition}</h4>
              <h4><strong>Precio:</strong> ${booksDetails.price}</h4>
              <h4><strong>Editorial:</strong> ${booksDetails.editorial}</h4>
              <h4><strong>Páginas:</strong> {booksDetails.pages}</h4>
              <h4 style={{fontWeight: 'bold'}}>Sinopsis:</h4>
              <p>{booksDetails.synopsis}</p>
              <h4><strong>Disponible?</strong> {booksDetails.available}</h4>
              <h4><strong>Categoría:</strong> {booksDetails.category}</h4>
            </div>
          </Col>
          <Col className = "gutter-row">
              <div>
                <img
                  alt={booksDetails.title}
                  src={booksDetails.cover_page}
                  style={{ 
                    width: 100,
                    height: 150, 
                    margin: 5 
                  }}
                />
              </div>
          </Col>
          <Col className = "gutter-row">
              <div>
                <img
                  alt={booksDetails.title}
                  src={booksDetails.back_cover}
                  style={{ 
                    width: 100,
                    height: 150, 
                    margin: 5   
                  }}
                />
              </div>
          </Col>
    </div>
    </Modal>
    </>
  );
}
export default App;