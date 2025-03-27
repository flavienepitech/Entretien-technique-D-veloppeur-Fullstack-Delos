import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab, Tabs, Form, Button, Col, Nav, Navbar, Container } from 'react-bootstrap';
import './App.css';
import SendLogo from './img/icone_envoyer.png';

function App() {
    const [convData, setConvData] = useState([]);

    useEffect(() => {
        callConvDataFromDB();
    }, []);

    const callConvDataFromDB = async () => {
        try {
            const response = await axios.post('http://localhost:3080', { acronyms: "" }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    crossorigin: true
                }
            });
            setConvData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const startNewConv = async () => {
//        try {
//            const response = await axios.post('http://localhost:3080/startNewConv', {
//                // datas
//            });
//
//            const startNewConv = response.data;
//            setConvData([...convData, startNewConv]);
//        } catch (error) {
//            console.error(error);
//        }
    };

    return (
        <div>
            <Navbar>
            <Container>
                <Navbar.Brand hreaf="#home">
                    <div className='App-logo'>APP-LOGO</div>
                </Navbar.Brand>
                <Nav className='App-header'>
                    <Nav.Link className='Accueil-link' href="#accueil">
                        Accueil
                    </Nav.Link> <Nav.Link className='Chatbot-link' href="#chatbot">
                        Chatbot
                    </Nav.Link> <Nav.Link className='Fichiers-link' href="#fichiers">
                        Fichiers
                    </Nav.Link>
                </Nav>
            </Container>
            </Navbar>
            <Tabs defaultActiveKey="0" id="chatTabs">
                {convData.map((conv, index) => (
                    <Col key={index} sm={3 + index}>
                    <Tab eventKey={index} title={"Chat" + (index + 1)}>
                        {conv.messages.map((message, messageIndex) => (
                            <div key={messageIndex}>{message}</div>
                        ))}
                    </Tab>
                    </Col>
                ))}
            </Tabs>
            <Button variant="primary" className='newConvButton'
            onClick={startNewConv}>
                Nouveau chat
            </Button>
            <Form>
                <Form.Control size="lg" type="text"
                placeholder="Bonjour, comment puis-je vous aider ?"
                className='searchBar'/>
            </Form>
            <Button variant="link" className='sendButton'>
                <img src={SendLogo} alt='Send Logo'/>
            </Button>
        </div>
    );
}

export default App;
