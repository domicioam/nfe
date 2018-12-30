import React, { Component } from 'react';
import './NotaFiscalModal.css';
import NotaFiscalForm from '../NotaFiscalForm/NotaFiscalForm';

export default class NotaFiscalModal extends Component {
  render() {
    return (
      <section className="NotaFiscalForm">
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Enviar Nota Fiscal</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <NotaFiscalForm />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-primary">Enviar</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}