import SearchZipCodePage from "../page-objects/search-zip-code.page";

const searchZipCode = new SearchZipCodePage();

describe('Challenge I', () => {
  beforeEach(() => {
    cy.visit('http://www.buscacep.correios.com.br')
    cy.get(searchZipCode.pageTitle).should('be.visible').and('have.text', 'Busca CEP')
  })

  it('Perform the search with the value “69005-040”', () => {
    cy.searchAddress({
      addressOrZipCode: '69005-040',
      type: 'Localidade/Logradouro'
    })
  })

  it('Perform the search with the value “Lojas Bemol”', () => {
    cy.searchAddress({
      addressOrZipCode: 'Lojas Bemol',
      type: 'Grande Usuário'
    })
  })
})
