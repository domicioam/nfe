import React, { Component } from 'react';

import './DestinatárioModal.css';
import DestinatárioForm from '../DestinatárioForm/DestinatárioForm';

class DestinatárioModal extends Component {
  render() {
    return (
      <section className="DestinatárioModal">
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Novo Destinatário</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <DestinatárioForm />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-primary">Salvar</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default DestinatárioModal;