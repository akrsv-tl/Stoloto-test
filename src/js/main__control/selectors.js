export function renderCirculationSelector(state) {
    let circulationSelector = document.getElementById('circulation-selector')
    circulationSelector.value = state.gamePages[state.selectPage].circulation;
}

export function renderQuantitySelect(state) {
    var quantitySelector = document.getElementById('quantity-selector');
    quantitySelector.value = state.gamePages[state.selectPage].quantity;
}