import React, { Component } from 'react';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faEnvelope, faTrash, faRedo } from '@fortawesome/free-solid-svg-icons'

import { Header } from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NotasFiscais from './components/NotasFiscais/NotasFiscais';

class App extends Component {
  constructor(props) {
    super(props);

    library.add([faSearch, faEnvelope, faTrash, faRedo]);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <main className="container">
          <NotasFiscais />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
