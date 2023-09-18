import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../style/css/Chat.scss';
import Footer from '../components/Footer';
import logo from '../style/images/logo.png';
import DOMPurify from 'dompurify';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

const API_KEY = 'YOUR-API-KEY';
const systemMessage = {
  role: 'system',
  content:
    "Explain things like you're talking to a software professional with 2 years of experience.",
};

function Chat() {
  const [messages, setMessages] = useState([
    {
      message: 'Ciao, come posso aiutarti oggi?',
      sentTime: 'just now',
      sender: 'ChatGPT',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingMessage, setCurrentTypingMessage] = useState('');

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: 'user',
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = '';
      if (messageObject.sender === 'ChatGPT') {
        role = 'assistant';
      } else {
        role = 'user';
      }
      return { role: role, content: messageObject.message };
    });
  
    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...apiMessages],
    };
  
    await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        const responseMessage = data.choices[0].message.content;
        setIsTyping(true);
        let typingMessage = '';
  
        for (let i = 0; i < responseMessage.length; i++) {
          setTimeout(() => {
            typingMessage += responseMessage[i];
            setCurrentTypingMessage(typingMessage);
  
            if (i === responseMessage.length - 1) {
              setMessages([...chatMessages, {
                message: typingMessage,
                sender: 'ChatGPT',
              }]);
              setCurrentTypingMessage('');
              setIsTyping(false);
            }
          }, 50 * i); 
        }
      });
  }

  function formatMessageContent(content) {
    const codeBlockRegex = /```([^]+?)```/g;
  
    // Verifica se il messaggio contiene un blocco di codice
    const isCodeBlock = codeBlockRegex.test(content);
  
    if (isCodeBlock) {
      // Estrai il contenuto del blocco di codice
      const codeContent = content.match(codeBlockRegex)[0].slice(3, -3);
      // Restituisci il contenuto del codice come stringa
      return { isCodeBlock: true, content: codeContent };
    } else {
      // Formatta il testo normalmente
      const formattedContent = content.replace(/\n\s*\*\s/g, '<li>').replace(/\n/g, '</li><li>');
  
      return { isCodeBlock: false, content: DOMPurify.sanitize(formattedContent) };
    }
  }
  
  
  

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend(event.target.value);
      event.target.value = '';
    }
  };


  return (
    <div className="container">
            <Navbar />
      <div className="container-sm p-1">
        <center><h1 className="title text-center text-darkGreen">CHAT - ZEROGPT</h1>
        <div className="logo">
        <img src={logo} alt='logo'></img>
        </div>
        <div className='desc'>
        Benvenuto, questa una chat con Intelligenza Artificiale in grado di rispondere alle tue domande, <br></br>
        ma anche svolgere compiti, creare codici e tantissimo altro!<br></br><br></br>
        Scrivi il tuo messaggio nella casella di input e premi Invio o clicca sul pulsante per inviare il messaggio all'IA.<br></br>
         L'IA elaborerà il tuo messaggio e ti risponderà con la sua migliore risposta. <br></br>
        </div></center>
        <MainContainer style={{ borderRadius: '0.5rem', height: 'auto', width: '900px', margin: 'auto', flexBasis: '90%' }}>
          <ChatContainer style={{ padding: 8 }}>
            <MessageList
              style={{ padding: 8 }}
              typingIndicator={
                isTyping ? (
                  <TypingIndicator
                    style={{ padding: '1rem', margin: 1, opacity: 0.5 }}
                    content="ZeroGPT sta scrivendo..."
                  />
                ) : null
              }
            >
             
             {messages.map((msg, i) => {
  const formattedContent = formatMessageContent(msg.message);

  return (
    <Message
      key={i}
      model={{
        ...msg,
        direction: msg.sender === 'ChatGPT' ? 'incoming' : 'outgoing',
      }}
      style={{ marginBlock: 8 }}
    >
      {formattedContent.isCodeBlock ? (
        <SyntaxHighlighter language="javascript" style={docco}>
          {formattedContent.content}
        </SyntaxHighlighter>
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: formattedContent.content,
          }}
        />
      )}
    </Message>
  );
})}


            </MessageList>
            <MessageInput placeholder="Scrivi il messaggio.." onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
        <br></br><br></br><br></br>
      </div>
    </div>
  );
}

export default Chat;
