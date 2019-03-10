export function clearFieldGame(state) {
    state.gamePages = {
        [state.selectPage]: {
            activeFieldItem1: [],
            activeFieldItem2: [],
            betValue: 0,
            quantity: 1,
            circulation: 1
        }
    }

    state.render();
}

export function randomFieldGame(state, field) {
    state.gamePages[state.selectPage]['activeFieldItem' + field] = [];
    let fieldGame = state.gamePages[state.selectPage]['activeFieldItem' + field];

    for(let i = 0; i < 4; i++) {
        let random;
        do {
            random = Math.floor(Math.random() * (20 - 1)) + 1;
        } while(fieldGame.includes(random) || !(random > 0));
        
        fieldGame.push(random);
    }
    state.render(); 
}