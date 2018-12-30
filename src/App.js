import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faEnvelope, faTrash, faRedo } from '@fortawesome/free-solid-svg-icons'

import { Header } from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NotasFiscais from './components/NotasFiscais/NotasFiscais';
import Destinatários from './components/Destinatários/Destinatários';

class App extends Component {
  constructor(props) {
    super(props);

    library.add([faSearch, faEnvelope, faTrash, faRedo]);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <main className="container">
            <Route exact path="/" component={NotasFiscais} />
            <Route path="/destinatários" component={Destinatários} />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
