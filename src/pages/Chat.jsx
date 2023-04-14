import { useState } from 'react';
import Navbar from "../components/Navbar";
import "../style/css/Chat.scss"
import Footer from '../components/Footer';
import logo from "../style/images/logo.png";

const API_KEY = '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';
const systemMessage = {
  role: 'system',
  content: "Explain things like you're talking to a software professional with 2 years of experience.",
};

function Chat() {
  const [messages, setMessages] = useState([
    {
      message: "Ciao, come posso aiutarti oggi?",
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
          }, 50 * i); // Adjust the delay between each character as needed
        }
      });
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
        <div className="chat-container">
          {messages.map((message, i) => (
            <div key={i} className={`message ${message.sender === 'ChatGPT' ? 'chatgpt' : 'user'}`}>
              {message.message}
            </div>
          ))}
          {isTyping && (
            <div className="message chatgpt">{currentTypingMessage}</div>
          )}
        </div>
        <div className="input-container">
          <input
            className="message-input"
            placeholder="Scrivi qui.."
            onKeyPress={handleKeyPress}
          />
          <button className="send-button" onClick={() => handleSend(document.querySelector('.message-input').value)}>
            Invio
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Chat;
