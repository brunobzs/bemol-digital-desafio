import TrivagoBusca from '../page_objects/TrivagoBusca'

const trivagoBusca = new TrivagoBusca()

describe('Etapa III - Automação de Teste Web II', () => {
  beforeEach(() => {
    const headers = { 'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',};

    cy.clearAllCookies()
    cy.visit('https://www.trivago.com.br', { headers: headers });
    cy.intercept('https://www.trivago.com.br/graphql?accommodationSearchQuery').as('accommodationSearch')
    cy.intercept('https://www.trivago.com.br/graphql?LogPriceImpression').as('logPriceImpression')
  })

  it('Deve buscar por "Manaus" e clicar no primeiro resultado', () => {
    const hotelInfo = { nome: "", preco: "", avaliacao: "" }

    // Digitar e seleciona o valor “Manaus” no campo de busca
    cy.get(trivagoBusca.campoBusca).first().type('Manaus{enter}')
    cy.get(trivagoBusca.listaDeSugetoes).should('be.visible').within(() => {
      cy.get(trivagoBusca.resultadoBusca).filter(':contains("Manaus")').first().should('be.visible').wait(200).click()
    })

    trivagoBusca.selecionaData({ isCheckoutDate: false }).wait(500)

    cy.get('body').click({ force: true }) // Clicar fora do campo de busca para fechar a lista de sugestões

    // Clicar no botão de pesquisar
    cy.get(trivagoBusca.botaoPesquisar).focus().click({ force: true})

    // Confirma a seleção da cidade de Manaus
    cy.get(trivagoBusca.listaDeSugetoes, { timeout: 10000 }).should('be.visible').within(() => {
      cy.get(trivagoBusca.resultadoBusca).filter(':contains("Manaus")').first().should('be.visible').wait(200).click()
    })

    // Clica novamente no botão pesquisar e Aguarda a resposta da busca
    cy.get(trivagoBusca.botaoPesquisar).focus().click({ force: true})
    cy.wait('@accommodationSearch', { timeout: 15000 }).then(({ response }) => {
      expect(response.statusCode).to.eq(200)
    })

    // Aguarda o log de preço
    cy.wait('@logPriceImpression', { timeout: 20000 })

    // Ordena os resultados por avaliação e sugestões
    cy.get(trivagoBusca.ordenarPor, { timeout: 20000 }).should('be.visible').find('select').select('Avaliação e sugestões')

    // Pega as informações do primeiro hotel
    cy.get(trivagoBusca.hotelInfo).first().within(() => {
      cy.get(trivagoBusca.nomeHotel).invoke('text').then((nome) => {
        hotelInfo.nome = nome
      })
      cy.get(trivagoBusca.avaliacaoHotel).invoke('text').then((avaliacao) => {
        hotelInfo.avaliacao = avaliacao
      })
      cy.get(trivagoBusca.precoRecomendado).invoke('text').then((preco) => {
        hotelInfo.preco = preco.replace(/[^\d.-]/g, '')
      })
    }).then(() => {
      // Compara as informações do hotel
      console.log(hotelInfo)
      expect(hotelInfo.nome).to.contain('ibis budget')
      expect(parseFloat(hotelInfo.avaliacao)).to.be.greaterThan(8)
      expect(parseFloat(hotelInfo.preco)).to.be.lessThan(250)
    })
  })
})