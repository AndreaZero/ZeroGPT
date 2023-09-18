import { useState } from 'react';
import "../style/css/Images.scss";
import Navbar from "../components/Navbar";
import FileReader from 'react-file-reader';
import Footer from '../components/Footer';
import logo from "../style/images/logo.png";

const API_KEY = 'YOUR API KEY';

function Images() {
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [variatedImageUrl, setVariatedImageUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isVariatingImage, setIsVariatingImage] = useState(false);

  const generateImage = async () => {
    setIsGeneratingImage(true);
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        response_format: "url",
      }),
    });

    const data = await response.json();
    setGeneratedImageUrl(data.data[0].url);
    setIsGeneratingImage(false);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const [uploadedImage, setUploadedImage] = useState(null);

  const generateImageVariation = async () => {
    if (!uploadedImage) {
      alert('Si prega di caricare un\'immagine PNG.');
      return;
    }

    setIsVariatingImage(true);

    const formData = new FormData();
    formData.append('image', uploadedImage);
    formData.append('n', 1);
    formData.append('size', '1024x1024');
    formData.append('response_format', 'url');

    const response = await fetch('https://api.openai.com/v1/images/variations', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + API_KEY,
      },
      body: formData,
    });

    const data = await response.json();
    setVariatedImageUrl(data.data[0].url);
    setIsVariatingImage(false);
  };

  const handleImageUpload = (files) => {
    if (files[0].type !== 'image/png') {
      alert('Si prega di caricare un\'immagine in formato PNG.');
      return;
    }
    setUploadedImage(files[0]);
  };

  return (
    <center>
            <Navbar />
            <br></br><br></br>
      <div className="images-container">
        <div className="container-sm p-1">
          <center><h1 className="title text-center text-darkGreen">Generatore di Immagini</h1>
          <div className="logo">
        <img src={logo} alt='logo'></img>
        </div>
          <div className='desc'>
    Benvenuto nel generatore di immagini con Intelligenza Artificiale! <br></br><br></br>
    Scrivi un prompt nella casella di input e premi il pulsante "Genera Immagine" per generare un'immagine a partire dal prompt. <br></br><br></br>
    In alternativa, puoi generare una variazione di un'immagine caricandola tramite il pulsante "Carica immagine" e premendo il pulsante "Genera Variazione".<br></br><br></br>
    Attendi qualche istante per la generazione dell'immagine o della variazione, e poi ammira il risultato! <br></br>
</div>
          
          </center>
          <div className="input-container">
            <input
              className="prompt-input"
              placeholder="Inserisci un prompt per l'immagine..."
              onChange={handlePromptChange}
            />
            <button className="generate-button" onClick={generateImage} disabled={isGeneratingImage}>
              Genera Immagine
            </button>
          </div>
          {isGeneratingImage && (
            <center>
              <div className="loader-container">
                <div className="loader"></div>
              </div>
              <div className='subtitle'>sto facendo la magia..</div>
            </center>
          )}
          {generatedImageUrl && !isGeneratingImage && (
            <div className="image-container">
              <img          src={generatedImageUrl} alt="Generata" className="generated-image" />
        </div>
      )}
    </div>
    <br></br>
    <div className='line1'></div>
    <div className='variation-container'>
      <div className="container-sm p-1">
        <center><h1 className="title text-center text-darkGreen">Variazione di Immagini</h1></center>
        <div className='desc'>
          Carica un'immagine, l'AI generera' una nuova versione per te!
          </div>
        <div className="v-input-container">
          <FileReader
            fileTypes={[".png"]}
            handleFiles={handleImageUpload}
          >
            <button className="v-generate-button">Carica immagine</button>
          </FileReader>
          <p>l'immagine deve essere in formato .PNG</p><br></br><br></br>
          <button className="generate-button" onClick={generateImageVariation} disabled={isVariatingImage}>
            Genera Variazione
          </button>
        </div>          <br></br>
        {isVariatingImage && (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
        {variatedImageUrl && !isVariatingImage && (
          <div className="image-container">
            <img src={variatedImageUrl} alt="Variazione generata" className="generated-image" />
          </div>
        )}
      </div>
    </div>
    <br></br>
    <div className='line2'></div>
    <Footer />
  </div>
</center>

);
}

export default Images;
