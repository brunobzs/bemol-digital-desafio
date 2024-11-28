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


  /**
   * Search for an address or zip code.
   *
   * @param { Object } param
   * @param { String } param.addressOrZipCode - Enter an Address or Zip Code.
   * @param { String } param.type - Enter the type of ZIP code: Locality/Street, Promotional ZIP Code, Community Post Office Box, Large User, Operational Unit or All.
   */
  searchAddress({ addressOrZipCode, type }) {
    // Expected value
    const address = {
      street: "Rua Miranda Leão" + type !== 'Grande Usuário' ? '' : ', 41Lojas Bemol',
      neighborhood: 'Centro',
      locality: 'Manaus/AM',
      zipCode: tipo !== 'Grande Usuário' ? '69005-040' : '69005-901'
    }

    cy.get(this.address).type(addressOrZipCode)
    cy.get(this.zipCodeType).select(type)
    cy.contains("button", "Buscar").click()

    // Compare the search value with the expected result.
    cy.get(this.pageTitleResult)
      .should('be.visible')
      .and('have.text', 'Resultado da Busca por Endereço ou CEP')
    cy.get('tbody').find("tr").within(() => {
      const {street, neighborhood, locality, zipCode} = address
      const searchResult = [
        {field: street, index: 0},
        {field: neighborhood, index: 1},
        {field: locality, index: 2},
        {field: zipCode, index: 3}
      ]
      searchResult.forEach(({field, index}) => {
        cy.get('td').eq(index).should('contain.text', field)
      })
    })
  }
}

export default SearchZipCodePage;
