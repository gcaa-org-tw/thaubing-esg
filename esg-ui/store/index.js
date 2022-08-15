export const state = () => {
  return {
    isGuanshiyinn: !process.env.isProd,
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
