import React, { useState } from "react";
import "../style/css/Audio.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../style/images/logo.png"

const API_KEY = "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";

function Audio() {
  const [audioFile, setAudioFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("it");

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    const supportedFormats = [
      "audio/mp3",
      "audio/mp4",
      "audio/mpeg",
      "audio/mpga",
      "audio/m4a",
      "audio/wav",
      "audio/webm",
    ];

    if (!supportedFormats.includes(file.type)) {
      alert("Formato del file audio non supportato.");
      return;
    }

    setAudioFile(file);
  };

  const transcribeAudio = async () => {
    if (!audioFile) {
      alert("Si prega di caricare un file audio.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", audioFile);
    formData.append("model", "whisper-1");
    formData.append("language", language);

    try {
        const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + API_KEY,
          },
          body: formData,
        });
    
        if (!response.ok) {
          const error = await response.text();
          console.error("Errore API:", error);
          alert("Si è verificato un errore durante la trascrizione.");
        } else {
          const data = await response.json();
          const transcriptionText = data.text;
          setTranscription(transcriptionText);
        }
      } catch (error) {
        console.error("Errore di rete:", error);
        alert("Si è verificato un errore di rete durante la trascrizione.");
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="audio-container">
      <Navbar />
      <div className="logo">
        <img src={logo} alt='logo'></img>
        </div>
      <h1 className="title text-darkGreen">AUDIO AI</h1>
      <center>
      <div className='desc'>
    Benvenuto nell'applicazione di trascrizione audio! <br></br><br></br>
    Carica il file audio che vuoi trascrivere scegliendo tra i formati supportati. <br></br>
    Seleziona la lingua in cui vuoi effettuare la trascrizione e premi il pulsante "Trascrivi".<br></br><br></br>
    Puoi caricare un file audio in italiano e trascriverlo/tradurlo in ogni lingua, e viceversa!
</div>
</center>
      <div className="format-container">
            <p>Formati accettati: mp3, mp4, wav, m4a, mpeg, mpga, webm.</p>
        </div>
      <div className="language">
        <p>Trascrivi in:</p>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">Inglese</option>
    <option value="fr">Francese</option>
    <option value="de">Tedesco</option>
    <option value="es">Spagnolo</option>
    <option value="it">Italiano</option>
    <option value="pt">Portoghese</option>
    <option value="nl">Olandese</option>
    <option value="pl">Polacco</option>
    <option value="ru">Russo</option>
    <option value="zh">Cinese</option>
    <option value="ja">Giapponese</option>
    <option value="ko">Coreano</option>
    <option value="ar">Arabo</option>
    <option value="he">Ebraico</option>
    <option value="hi">Hindi</option>
        </select>
        </div>
      <div className="a-input-container">
      <div className="file-container">
  <input className="transcribe-button" type="file" onChange={handleAudioUpload} accept="audio/*" />
</div>

        <button className="transcribe-button" onClick={transcribeAudio} disabled={isLoading}>
          Trascrivi
        </button>
      </div>
      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      {transcription && (
        <div className="transcription-container">
            <div className="result-container">Trascrizione:</div>
          <pre className="transcription">{transcription}</pre>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Audio;
