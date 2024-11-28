import SearchZipCodePage from "../page-objects/search-zip-code.page";

const searchZipCode = new SearchZipCodePage();

describe('Desafio I', () => {
  beforeEach(() => {
    cy.visit('http://www.buscacep.correios.com.br')
    cy.get(searchZipCode.pageTitle).should('be.visible').and('have.text', 'Busca CEP')
  })

  it('Realizar a busca com o valor “69005-040”', () => {
    searchZipCode.searchAddress({
      addressOrZipCode: '69005-040',
      type: 'Localidade/Logradouro'
    })
  })

  it('Realizar a busca com o valor “Lojas Bemol”', () => {
    searchZipCode.searchAddress({
      addressOrZipCode: 'Lojas Bemol',
      type: 'Grande Usuário'
    })
  })
})
