class TrivagoBuscaPage {
  get campoBusca() {
    return '[data-testid="search-form-destination"]'
  }

  get listaDeSugetoes() {
    return '[data-testid="search-suggestions"]'
  }

  get resultadoBusca() {
    return '[data-testid="ssg-element"]'
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

  get ordenarPor() {
    return '[data-testid="sorting-selector"]'
  }

  get hotelInfo() {
    return '[data-testid="accommodation-list-element"]'
  }

  get nomeHotel() {
    return '[data-testid="item-name"]'
  }

  get avaliacaoHotel() {
    return '[data-testid="aggregate-rating"] > .space-x-1 > .mt-px > .leading-none > span'
  }

  get precoRecomendado() {
    return '[data-testid="recommended-price"]'
  }


  /**
   * Seleciona a data de check-in ou check-out
   *
   * @param { Object } param
   * @param { Boolean } param.isCheckoutDate - Se falso, seleciona a data de hoje como check-in e se verdadeiro seleciona uma data 3 dias a frente do dia de hoje para a data de check-out
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

    return cy.get(isCheckoutDate ? this.dataCheckout : this.dataCheckin)
      .scrollIntoView()
      .get(`[data-testid="valid-calendar-day-${dataSelecionada}"]`)
      .click()
      .wait(500)
  }
}

export default TrivagoBuscaPage;