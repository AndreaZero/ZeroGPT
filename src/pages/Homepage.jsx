import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/css/Homepage.scss";
import Footer from "../components/Footer";
import Donations from "../components/Donations";
import logo from "../style/images/logo.png";

function Home() {
  function Disclaimer() {
    const [showDisclaimer, setShowDisclaimer] = useState(
      localStorage.getItem("showDisclaimer") !== "false"
    );
  
    const handleOkClick = () => {
      setShowDisclaimer(false);
      localStorage.setItem("showDisclaimer", "false");
    };
  
    return (
      <>
        {showDisclaimer && (
          <div className="disclaimer">
            <div className="disclaimer-txt">
              <code>
                Si precisa che nessuna informazione o dato personale dell'utente,
                <br />
                inclusi i contenuti delle conversazioni o le immagini generate
                tramite le API di OpenAI,
                <br />
                vengono in alcun modo memorizzati o salvati sul nostro sito.
                <br />
                Tuttavia, si prega di fare riferimento alla privacy policy di
                OpenAI per ulteriori informazioni sul trattamento dei dati
                personali tramite l'utilizzo delle loro API.
              </code>
            </div>
            <button onClick={handleOkClick}>Accetta e chiudi</button>
          </div>
        )}
      </>
    );
  }
  

  return (
    <center>
      <div className="home-container">
        <div className="logo">
          <img src={logo} alt="logo"></img>
        </div>
        <div className="title">
          Benvenuto su ZeroGPT<br></br>
          <code style={{ fontSize: "14px" }}> Powered by ZeroTech Lab - info@zerotechlab.it</code>
        </div>
        <br></br>
        <div className="subtitle">
          ZeroGPT: l'IA di ultima generazione basata su GPT-3. <br></br>
          Puoi utlizzare il servizio gratis, senza VPN o registrazione.
          <br></br>
          <br></br>
          STRUMENTI:
          <br></br>
          <div className="link-container">
          <Link to="/chat">
            <button class="btn btn-1 btn-sep icon-chat">CHAT</button>
          </Link>
          <Link to="/images">
            <button class="btn btn-4 btn-sep icon-img">IMAGES</button>
          </Link>
          <Link to="/audio">
            <button class="btn btn-3 btn-sep icon-audio">AUDIO</button>
          </Link>
        </div>
          <br></br>
            <li>
              Chattare con ZeroGPT per avere risposte esaustive e in tempo
              reale su qualsiasi argomento.
            </li>
        </div>
        <div className="subtitle">
          <ul>
            <li>
              Generare e variare immagini utilizzando l'AI, così da ottenere
              risultati unici e personalizzati.
            </li>
            <br></br>
            <li>
              AI Audio Tool: carica un file audio e ottieni una trascrizione
              e una traduzione in pochi istanti.
            </li>
            <br></br>
          </ul>
        </div>

        <div className="subtitle">
          Stiamo costantemente ampliando le funzioni basate sull'AI <br></br>
          per migliorare la tua esperienza di ricerca e di apprendimento.
<br></br> Visita spesso il sito per tutte le novità!
</div>
<Footer />
</div>
<Donations />
<Disclaimer />
</center>
);
}

export default Home;
