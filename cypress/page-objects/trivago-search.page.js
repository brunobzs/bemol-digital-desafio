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
}

export default TrivagoSearchPage;