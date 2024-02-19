import BuscaCEP from "../page_objects/BuscaCEP";

const buscaCEP = new BuscaCEP();

describe('Desafio I', () => {
  beforeEach(() => {
    cy.visit('http://www.buscacep.correios.com.br')
    cy.get(buscaCEP.tituloPagina).should('be.visible').and('have.text', 'Busca CEP')
  })

  it('Realizar a busca com o valor “69005-040”', () => {
    buscaCEP.buscaEndereco({ enderecoOuCep: '69005-040', tipo: 'Localidade/Logradouro' })
  })

  it('Realizar a busca com o valor “Lojas Bemol”', () => {
    buscaCEP.buscaEndereco({ enderecoOuCep: 'Lojas Bemol', tipo: 'Grande Usuário' })
  })
})
