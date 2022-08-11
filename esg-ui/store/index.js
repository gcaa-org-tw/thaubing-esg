export const state = () => {
  return {
    isGuanshiyinn: false,
    company: {}
  }
}

export const mutations = {
  setGuanshiyinn (state, isGuanshiyinn) {
    state.isGuanshiyinn = isGuanshiyinn
  },
  setCompany (state, company) {
    state.company = company
  }
}
