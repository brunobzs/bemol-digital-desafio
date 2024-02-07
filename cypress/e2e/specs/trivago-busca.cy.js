import TrivagoBusca from '../page_objects/TrivagoBusca'

const trivagoBusca = new TrivagoBusca()

describe('Etapa III - Automação de Teste Web II', () => {
  it('Deve buscar por "Manaus" e clicar no primeiro resultado', () => {
    cy.visit('http://www.trivago.com.br/').invoke('removeAttr', 'target').click();


    cy.get(trivagoBusca.campoBusca).type('Manaus')
    cy.get(trivagoBusca.botaoPesquisar).click()
    trivagoBusca.selecionaData({ isCheckoutDate: false })
    trivagoBusca.selecionaData({ isCheckoutDate: true })
  })
})