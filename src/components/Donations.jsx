import React, { useState } from 'react';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import "../style/css/Donations.scss";
import paypal from "../style/images/paypal.png";

const Donations = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');

  const connectWallet = async () => {
    try {
      let web3;

      if (window.ethereum) {
        // MetaMask è installato
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum);
      } else {
        // Connetti a WalletConnect se MetaMask non è installato
        const wcProvider = new WalletConnectProvider({
          infuraId: 'https://mainnet.infura.io/v3/fed679d327de4db58597d792b3a99fcf', // Inserisci il tuo Infura ID qui
        });
        await wcProvider.enable();
        web3 = new Web3(wcProvider);
      }

      setProvider(web3);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Errore durante la connessione al portafoglio:', error);
    }
  };

  const sendETH = async () => {
    if (!provider || !account || !amount) return;
    const recipient = '0xAa0b841DB58069AE3506b89318F4AfA078225294'; // Inserisci l'indirizzo ETH del ricevente qui
    const weiAmount = provider.utils.toWei(amount, 'ether');

    try {
      await provider.eth.sendTransaction({
        from: account,
        to: recipient,
        value: weiAmount,
      });
    } catch (error) {
      console.error('Errore durante l\'invio di ETH:', error);
    }
  };

  return (
    <div className='container-donation'>
      <div className='line1'></div>
      <h1>Sostieni ZeroGPT</h1>
      <p>
        Se trovi utile il nostro lavoro e desideri contribuire alla sua crescita,
        prendi in considerazione l'idea di fare una donazione. Ogni contributo, grande o piccolo,
        ci aiuta a migliorare e a espandere il nostro progetto.<br>
        </br>Grazie per il tuo sostegno!
      </p>
      <div className='donation-row'>
        <div className='donation-eth'>
          <h2>Donazioni in ETHER</h2>
          {!provider ? (
            <button onClick={connectWallet}>Connetti il tuo portafoglio</button>
          ) : (
            <>
              <p>Indirizzo del portafoglio connesso: {account.slice(0, 5)}...{account.slice(-5)}</p>
              <input
                type="number"
                step="0.005"
                placeholder="Importo in ETH"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button onClick={sendETH}>Invia donazione in ETH</button>
            </>
          )}
        </div>
        <div className='donation-paypal'>
          <h2>Donazioni con PayPal</h2>
          <form action="https://www.paypal.com/donate" method="post" target="_blank">
            <input type="hidden" name="hosted_button_id" value="WMF7Z3B73DK8G" />
            <input type="hidden" name="business" value="andreazero@live.it" />
            <input type="hidden" name="currency_code" value="EUR" />
            <input className='inputt' type="image" src={paypal} name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default Donations;
