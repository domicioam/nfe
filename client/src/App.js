import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faEnvelope, faTrash, faRedo, faEdit, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

import { Header } from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NotasFiscais from './components/NotasFiscais/NotasFiscais';
import Destinatários from './components/Destinatários/Destinatários';
import NFCeForm from './components/NotasFiscais/NFCeForm/NFCeForm';
import NFeForm from './components/NotasFiscais/NFeForm/NFeForm';

class App extends Component {
  constructor(props) {
    super(props);

    library.add([faSearch, faEnvelope, faTrash, faRedo, faEdit, faCalendarAlt]);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <main className="container">
            <Route exact path="/" component={NotasFiscais} />
            <Route exact path="/notas/nfce" component={NFCeForm} />
            <Route exact path="/notas/nfe" component={NFeForm} />
            <Route path="/destinatários" component={Destinatários} />
          </main>
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}

export default App;
