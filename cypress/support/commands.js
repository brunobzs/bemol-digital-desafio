import SearchZipCodePage from "../page-objects/search-zip-code.page";
import TrivagoSearchPage from "../page-objects/trivago-search.page";

const searchZipCode = new SearchZipCodePage();
const trivagoSearch = new TrivagoSearchPage()

/**
 * Search for an address or zip code.
 *
 * @param { Object } param
 * @param { String } param.addressOrZipCode - Enter an Address or Zip Code.
 * @param { String } param.type - Enter the type of ZIP code: Locality/Street, Promotional ZIP Code, Community Post Office Box, Large User, Operational Unit or All.
 */
Cypress.Commands.add('searchAddress', ({addressOrZipCode, type }) => {
  // Expected value
  const address = {
    street: "Rua Miranda Leão" + type !== 'Grande Usuário' ? '' : ', 41Lojas Bemol',
    neighborhood: 'Centro',
    locality: 'Manaus/AM',
    zipCode: type !== 'Grande Usuário' ? '69005-040' : '69005-901'
  }

  cy.get(searchZipCode.address).type(addressOrZipCode)
  cy.get(searchZipCode.zipCodeType).select(type)
  cy.contains("button", "Buscar").click()

  // Compare the search value with the expected result.
  cy.get(searchZipCode.pageTitleResult)
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
})

/**
 * Select check-in or check-out date.
 *
 * @param { Object } param
 * @param { Boolean } param.isCheckoutDate - If false, selects today's date as the check-in date and if true, selects a date 3 days ahead of today for the check-out date.
 */
Cypress.Commands.add('selectDate', ({ isCheckoutDate }) => {
  let date = new Date();
  if (isCheckoutDate) {
    date.setDate(date.getDate() + 3); // Add 3 days to the current date
  }
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  const selectedDate = year + "-" + month + "-" + day;

  return cy.get(isCheckoutDate ? trivagoSearch.checkOutDate : trivagoSearch.checkInDate)
    .scrollIntoView()
    .get(`[data-testid="valid-calendar-day-${selectedDate}"]`)
    .click()
    .wait(500)
})