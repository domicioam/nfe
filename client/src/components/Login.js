import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    this.props.authHandler.authenticate(() => {
      this.setState({redirectToReferrer: true})
    })
  }

  render() {

    const {redirectToReferrer} = this.setState

    if(redirectToReferrer) {
      return <Redirect to="/notas" />
    }

    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center mb-4">Entre suas credenciais</h2>
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="card rounded-0">
                  <div className="card-header">
                    <h3 className="mb-0">Login</h3>
                  </div>
                  <div className="card-body">
                    <form className="form" role="form" autocomplete="off" id="formLogin" novalidate="" method="POST">
                      <div className="form-group">
                        <label for="uname1">Username</label>
                        <input type="text" className="form-control form-control-lg rounded-0" name="uname1" id="uname1" required="" />
                        <div className="invalid-feedback">Oops, you missed this one.</div>
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control form-control-lg rounded-0" id="pwd1" required="" autocomplete="new-password" />
                        <div className="invalid-feedback">Enter your password too!</div>
                      </div>
                      <div>
                        <label className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" />
                          <span className="custom-control-indicator"></span>
                          <span className="custom-control-description small text-dark">Remember me on this computer</span>
                        </label>
                      </div>
                      <button type="submit" className="btn btn-success btn-lg float-right" id="btnLogin">Login</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;