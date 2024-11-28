import TrivagoSearchPage from '../page-objects/trivago-search.page'

const trivagoSearch = new TrivagoSearchPage()

describe('Challenge II', () => {
  beforeEach(() => {
    const headers = { 'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',};

    cy.clearAllCookies()
    cy.visit('https://www.trivago.com.br', { headers: headers });
    cy.intercept('https://www.trivago.com.br/graphql?accommodationSearchQuery').as('accommodationSearch')
    cy.intercept('https://www.trivago.com.br/graphql?LogPriceImpression').as('logPriceImpression')
  })

  it('You must search for "Manaus" and click on the first result', () => {
    const hotelInfo = { name: "", price: "", review: "" }

    // Type and select the value “Manaus” in the search field
    cy.get(trivagoSearch.searchField).first().type('Manaus{enter}')
    cy.get(trivagoSearch.suggestionList).should('be.visible').within(() => {
      cy.get(trivagoSearch.searchResult).filter(':contains("Manaus")').first().should('be.visible').wait(200).click()
    })

    trivagoSearch.selectDate({ isCheckoutDate: false }).wait(500)

    cy.get('body').click({ force: true }) // Clicar fora do campo de busca para fechar a lista de sugestões

    // Click the search button and wait for the API response
    cy.get(trivagoSearch.searchButton).focus().click({ force: true})
    cy.wait('@accommodationSearch', { timeout: 15000 }).then(({ response }) => {
      expect(response.statusCode).to.eq(200)
    })

    // Wait for the price log
    cy.wait('@logPriceImpression', { timeout: 20000 })

    // Sort results by rating and suggestions
    cy.get(trivagoSearch.sortBy, { timeout: 20000 }).should('be.visible').find('select').select('Avaliação e sugestões')

    // Get the information of the first hotel
    cy.get(trivagoSearch.hotelInfo).first().within(() => {
      cy.get(trivagoSearch.hotelName).invoke('text').then((name) => {
        hotelInfo.name = name
      })
      cy.get(trivagoSearch.hotelReview).invoke('text').then((review) => {
        hotelInfo.review = review
      })
      cy.get(trivagoSearch.precoRecomendado).invoke('text').then((price) => {
        hotelInfo.price = price.replace(/[^\d.-]/g, '')
      })
    }).then(() => {
      // Compare hotel information
      console.log(hotelInfo)
      expect(hotelInfo.name).to.contain('ibis budget')
      expect(parseFloat(hotelInfo.review)).to.be.greaterThan(8)
      expect(parseFloat(hotelInfo.price)).to.be.lessThan(250)
    })
  })
})