import React from "react";
import { Link } from "react-router-dom";
import "../style/css/Homepage.scss";
import Footer from "../components/Footer";
import Donations from "../components/Donations";
import logo from "../style/images/logo.png";

function Home() {
  return (
    <center>
      <div className="home-container">
        <div className="logo">
        <img src={logo} alt='logo'></img>
        </div>
        <div className="title">
          Benvenuto su ZeroGPT
        </div>
        <br></br><br></br>
        <div className="subtitle">
          ZeroGPT è una IA di ultima generazione basata su GPT-3. <br></br> Il più avanzato algoritmo di intelligenza artificiale disponibile oggi.<br></br><br></br>
        </div>
        <div className="subtitle">
          Chattare con ZeroGPT significa avere risposte esaustive e in tempo reale su qualsiasi argomento, dalle tecnologie alla cultura, senza registrazione o pagamento.<br></br><br></br>
        </div>
        <div className="link-container">
          <Link to="/chat"><button className="link-button">CHAT</button></Link>
          <Link to="/images"><button className="link-button">IMAGES</button></Link>
          <Link to="/audio"><button className="link-button">AUDIO</button></Link>
        </div>
        <div className="subtitle">
          Inoltre, su ZeroGPT puoi generare e variare immagini utilizzando l'AI, così da ottenere risultati unici e personalizzati. Offriamo anche il servizio di trascrizione e traduzione audio, che ti consente di ottenere una trascrizione scritta e una traduzione del tuo file audio in pochi istanti.<br></br><br></br>
          Stiamo costantemente lavorando per ampliare e aggiungere nuove funzioni basate sull'AI per migliorare la tua esperienza di ricerca e di apprendimento. <br></br>
          <br></br>
          Visita spesso il nostro sito per scoprire tutte le novità!
        </div>
        
      </div>
      <div className='disclaimer'>
        <div className="disclaimer-txt">
        Si precisa che nessuna informazione o dato personale dell'utente, <br></br>
        inclusi i contenuti delle conversazioni o le immagini generate tramite le API di OpenAI, <br></br>
        vengono in alcun modo memorizzati o salvati sul nostro sito. <br></br> 
        Tuttavia, si prega di fare riferimento alla privacy policy di OpenAI per ulteriori informazioni<br></br> sul trattamento dei dati personali tramite l'utilizzo delle loro API.
        </div>
        </div>
        <Donations />
        <Footer />

    </center>
  )
}

export default Home;