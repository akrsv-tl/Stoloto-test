import { stringToNode } from '../tools/index';
import { gamePage } from '../pageTemplate';

export function toggleFieldGame(state, action, field) {
    if(action.closest('.field__game-item') === null) return null;

    var fieldGame = state.gamePages[state.selectPage]['activeFieldItem'+field];
    var value = Number(action.innerText);

    if(fieldGame.includes(value)) {
        state.gamePages[state.selectPage]['activeFieldItem'+field] = fieldGame
            .filter(el => el !== value);
    } else {
        fieldGame.push(value);
    }

    state.render();
}