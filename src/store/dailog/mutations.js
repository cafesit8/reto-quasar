export function someMutation (/* state */) {
}

export function toggleDialog (state) {
  state.isDialogOpen = !state.isDialogOpen
}

export function setInfo (state, info) {
  state.info = info
}
