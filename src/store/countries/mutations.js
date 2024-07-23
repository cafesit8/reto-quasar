export function someMutation (/* state */) {
}

export function setCountries (state, countries) {
  state.listCountries = countries.slice(0, 20)
}
