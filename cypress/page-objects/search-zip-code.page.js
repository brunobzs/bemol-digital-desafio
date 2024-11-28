class SearchZipCodePage {
  get pageTitle() {
    return '#titulo_tela > h2'
  }
  get address() {
    return '#endereco';
  }

  get zipCodeType() {
    return '#tipoCEP';
  }

  get pageTitleResult() {
    return '#mensagem-resultado'
  }
}

export default SearchZipCodePage;
