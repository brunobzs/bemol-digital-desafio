class TrivagoBusca {
  get campoBusca() {
    return '[data-testid="search-form-destination"]'
  }

  get botaoPesquisar() {
    return '[data-testid="search-button-with-loader"]'
  }

  get dataCheckin() {
    return '[data-testid="search-form-calendar-checkin"]'
  }

  get dataCheckout() {
    return '[data-testid="search-form-calendar-checkout"]'
  }


  /**
   * Seleciona a data de check-in ou check-out
   *
   * @param { Object } param
   * @param { Boolean } param.isCheckoutDate - Se falso, seleciona a data de hoje como check-in e se verdadeiro seleciona uma data 3 dias a frente do dia de hoje para a data de check-out
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
   */
  selecionaData({ isCheckoutDate }) {
    let date = new Date();
    if (isCheckoutDate) {
      date.setDate(date.getDate() + 3); // Adiciona 3 dias à data atual
    }
    let ano = date.getFullYear();
    let mes = date.getMonth() + 1;
    let dia = date.getDate();
    if (mes < 10) {
      mes = "0" + mes;
    }
    if (dia < 10) {
      dia = "0" + dia;
    }
    const dataSelecionada = ano + "-" + mes + "-" + dia;

    return cy.get(isCheckoutDate ? this.dataCheckout : this.dataCheckin).select(dataSelecionada)
  }
}

export default TrivagoBusca;