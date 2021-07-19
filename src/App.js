import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
const pushServerPublicKey = "BL9mTXkxuYardoFD2ZwnynR_XhLxgWyp_z2N1vaNDLTA-mwPXXMfHDfPVhuFuJp1KJn26obMnOW5EcNZ5WKRtoE" 
function App() {
  Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
});
  if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js').then(function(reg) {
    console.log('Service Worker Registered!', reg);

    navigator.serviceWorker.ready.
    then(function(ready) {
      ready.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: pushServerPublicKey
    }).
    then(function() {
    ready.pushManager.getSubscription().then(function(sub) {
      if (sub === null) {
        // Update UI to ask user to register for Push
        console.log('Not subscribed to push service!');
      } else {
        axios.post('https://33d3d4c4f754.ngrok.io/subscription', {
          data:JSON.stringify(sub)
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
        // We have a subscription, update the database
        // console.log('Subscription object: ', sub.getKey('p256dh'));

      }
    });
  })
    })
    
  })
   .catch(function(err) {
    console.log('Service Worker registration failed: ', err);
  });
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function displayNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      reg.showNotification('Hello world!');
    });
  }
}

export default App;
