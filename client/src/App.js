import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faEnvelope, faTrash, faRedo, faEdit, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

import { Header } from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NotasFiscais from './components/NotasFiscais/NotasFiscais';
import Destinatários from './components/Destinatários/Destinatários';
import NFCeForm from './components/NotasFiscais/NFCeForm/NFCeForm';
import NFeForm from './components/NotasFiscais/NFeForm/NFeForm';
import Login from './components/Login';

//fake auth para testar navegação de login
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
}

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to="/login" />
    )} />
);

class App extends Component {
  constructor(props) {
    super(props);

    library.add([faSearch, faEnvelope, faTrash, faRedo, faEdit, faCalendarAlt]);
  }

  render() {
    return (
      <Router>
        <Switch>
          <div className="App">
            <Route exact path="/(login)" component={LoginContainer} />
            <PrivateRoute component={DefaultContainer} />
          </div>
        </Switch>
      </Router>
    );
  }
}

const LoginContainer = () => (
  <React.Fragment>
    <Route exact path="/" render={() => <Redirect to="/login" />} />
    <Route path="/login" component={Login} authHandler={fakeAuth} />
  </React.Fragment>
)

const DefaultContainer = () => (
  <React.Fragment>
    <Header />
    <main className="container">
      <Switch>
        <Route exact path="/notas" component={NotasFiscais} />
        <Route exact path="/notas/nfce" component={NFCeForm} />
        <Route exact path="/notas/nfe" component={NFeForm} />
        <Route path="/destinatários" component={Destinatários} />
      </Switch>
    </main>
    {/* <Footer /> */}
  </React.Fragment>
)

export default App;
