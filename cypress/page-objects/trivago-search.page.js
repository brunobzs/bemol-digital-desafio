class TrivagoSearchPage {
  get searchField() {
    return '[data-testid="search-form-destination"]'
  }

  get suggestionList() {
    return '[data-testid="search-suggestions"]'
  }

  get searchResult() {
    return '[data-testid="ssg-element"]'
  }

  get searchButton() {
    return '[data-testid="search-button-with-loader"]'
  }

  get checkInDate() {
    return '[data-testid="search-form-calendar-checkin"]'
  }

  get checkOutDate() {
    return '[data-testid="search-form-calendar-checkout"]'
  }

  get sortBy() {
    return '[data-testid="sorting-selector"]'
  }

  get hotelInfo() {
    return '[data-testid="accommodation-list-element"]'
  }

  get hotelName() {
    return '[data-testid="item-name"]'
  }

  get hotelReview() {
    return '[data-testid="aggregate-rating"] > .space-x-1 > .mt-px > .leading-none > span'
  }

  get recommendedPrice() {
    return '[data-testid="recommended-price"]'
  }


  /**
   * Select check-in or check-out date.
   *
   * @param { Object } param
   * @param { Boolean } param.isCheckoutDate - If false, selects today's date as the check-in date and if true, selects a date 3 days ahead of today for the check-out date.
   */
  selectDate({ isCheckoutDate }) {
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

    return cy.get(isCheckoutDate ? this.checkOutDate : this.checkInDate)
      .scrollIntoView()
      .get(`[data-testid="valid-calendar-day-${selectedDate}"]`)
      .click()
      .wait(500)
  }
}

export default TrivagoSearchPage;