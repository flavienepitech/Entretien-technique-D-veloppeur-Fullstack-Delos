import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab, Tabs, Form, Button, Nav, Navbar, Container } from 'react-bootstrap';
import './App.css';
import SendLogo from './img/icone_envoyer.png';

function App() {
    const [convData, setConvData] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [activeTab, setActiveTab] = useState("0");

    useEffect(() => {
        callConvDataFromDB();
    }, []);

    const callConvDataFromDB = async () => {
        try {
            const response = await axios.post('http://localost:5000', { acronyms: "" }, {
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
        setConvData([...convData, { messages: [] }]);
        setActiveTab((convData.length).toString());
    };

    const sendMessage = () => {
        if (newMessage.trim() === '') return;

        const updatedConvData = [...convData];
        updatedConvData[activeTab].messages.push(`You: ${newMessage}`);
        setConvData(updatedConvData);
        setNewMessage('');

        axios.post('http://localhost:5000', { message: newMessage })
            .then(response => {
                const botResponse = `Chatbot: ${response.data.response}`;
                const updatedData = [...updatedConvData];
                updatedData[activeTab].messages.push(botResponse);
                setConvData(updatedData);
            })
            .catch(error => console.error("Error communicating with chatbot:", error));
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand hreaf="#home">
                    <div className='App-logo'>APP-LOGO</div>
                </Navbar.Brand>
                <Nav className='App-header'>
                    <Nav.Link className='Accueil-link' href="#accueil">Accueil</Nav.Link>
                    <Nav.Link className='Chatbot-link' href="#chatbot">Chatbot</Nav.Link>
                    <Nav.Link className='Fichiers-link' href="#fichiers">Fichiers</Nav.Link>
                </Nav>
            </Container>
            </Navbar>

            <Container className="mt-3">
                <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} id="chatTabs">
                    {convData.map((conv, index) => (
                        <Tab key={index} eventKey={index.toString()} title={`Chat ${index + 1}`}>
                            <div className="chat-box p-3">
                                {conv.messages.map((message, msgIndex) => (
                                    <div key={msgIndex} className="message">{message}</div>
                                ))}
                            </div>
                        </Tab>
                    ))}
                </Tabs>

                <Button variant="primary" className='newConvButton'
                onClick={startNewConv}>
                    Nouveau chat
                </Button>

                <Form className="d-flex mt-3">
                    <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Bonjour, comment puis-je vous aider ?"
                        className='searchBar'
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button variant="link" className='sendButton'>
                        <img src={SendLogo} alt='Send'/>
                    </Button>
                </Form>
            </Container>
        </div>
    );
}

export default App;
