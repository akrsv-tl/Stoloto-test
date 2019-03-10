export function confirmBet() {
    alert('Ставка принята');
}

export function statusBet(state) {
    let lengthActiveFieldItem1 = state.gamePages[state.selectPage].activeFieldItem1.length;
    let lengthActiveFieldItem2 = state.gamePages[state.selectPage].activeFieldItem2.length;
    let checkLength = lengthActiveFieldItem1 >= 4 && lengthActiveFieldItem2 >= 4;
    let checkMinBetValue = lengthActiveFieldItem1 === 4 && lengthActiveFieldItem2 === 4;
    let lengthActiveFields = lengthActiveFieldItem1 + lengthActiveFieldItem2;
    
    if(!checkLength) {
        state.gamePages[state.selectPage].betValue = 0;
    }

    if(checkMinBetValue) {
        state.gamePages[state.selectPage].betValue = 100;
    }

    state.apply = checkLength;
    countBetValue(state);
}

export function countBetValue(state) {
    var betValue = 0;

    for( let key in state.gamePages) {
        betValue += state.gamePages[key].betValue * state.gamePages[key].quantity;
    }

    state.betValue = betValue;
}

export function renderBetValue(state) {
    document.getElementById('bet-value').innerText = state.betValue;
}