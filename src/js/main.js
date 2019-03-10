import { renderHtmlCode, removeChild, stringToNode } from './tools/index';
import { toggleFieldGame } from './main__fields/toggle_fields';
import { randomFieldGame, clearFieldGame } from './main__fields/random_clear_fields';
import { confirmBet, statusBet, countBetValue, renderBetValue } from './main__control/bets';
import { renderCirculationSelector, renderQuantitySelect } from './main__control/selectors';
import { renderDateStr } from './main__control/date';
import gamePage from './pageTemplate';
import { lang } from 'moment';

const stateApp = {
    headerTabs: document.getElementById('header_tabs'),   
    container: document.getElementById('container'),
    applyBtn: () => document.getElementById('apply-btn'),
    apply: false,
    showGamePage: true,
    selectPage: 0,
    gamePages: {
        0: {
            activeFieldItem1: [],
            activeFieldItem2: [],
            betValue: 0,
            quantity: 1,
            circulation: 1
        }
    },
    betValue: 0,
    render: renderPageGame
}

function renderHeaderTabs(state, action) {
    if(action !== undefined && action !== null) {
        state.headerTabs.querySelector(`li[value="${action}"]`)
        .classList.add('header__tab--active');
    }

    if(stateApp.selectPage !== null) { 
        state.headerTabs.querySelector(`li[value="${stateApp.selectPage}"]`)
            .classList.remove('header__tab--active');
    }

    state.selectPage = action;
}

function renderApplyBtn(state) {
    statusBet(state);
    const applyBtn = state.applyBtn();
    if(state.apply) {
        applyBtn.disabled = false;
        applyBtn.style.cursor = '';
    } else {
        applyBtn.disabled = true;
        applyBtn.style.cursor = 'not-allowed';
    }
}

function renderPageGame() {
    let page = document.getElementById('game-page');
    
    if(page !== null) {
        stateApp.container.removeChild(page);
    }

    //Отрисовывем выбранную страничку
    stateApp.container.appendChild(stringToNode(gamePage(stateApp.gamePages[stateApp.selectPage])));
    renderApplyBtn(stateApp);
    renderBetValue(stateApp);
    renderQuantitySelect(stateApp);
    renderCirculationSelector(stateApp);
    renderDateStr(stateApp);
}

stateApp.container.addEventListener('change', e => {
    if(e.target.closest('#quantity-selector') !== null) {
        stateApp.gamePages[stateApp.selectPage].quantity = e.target.value;
    }

    if(e.target.closest('#circulation-selector') !== null) {
        stateApp.gamePages[stateApp.selectPage].circulation = e.target.value;
    }

    stateApp.render();
});

stateApp.container.addEventListener('click', e => {
    if(e.target.closest('#exit-btn') !== null) {
        renderHeaderTabs(stateApp, null);
        let page = document.getElementById('game-page');
        stateApp.container.removeChild(page);
        return null;
    }

    if(e.target.closest('#field-game-1') !== null) {
        return toggleFieldGame(stateApp, e.target, 1);
    }

    if(e.target.closest('#field-game-2') !== null) {
        return toggleFieldGame(stateApp, e.target, 2);
    }

    if(e.target.closest('#clear-numbers') !== null) {
        clearFieldGame(stateApp);
    }
    
    if(e.target.closest('#random-numbers') !== null) {
        randomFieldGame(stateApp, 1);
        randomFieldGame(stateApp, 2);
        return null;
    }
    if(e.target.closest('#apply-btn') !== null) {
        confirmBet(stateApp);
        return null;
    }
    if(e.target.closest('#rules-btn') !== null) {
        toggleShowHelp();
    }
});

stateApp.headerTabs.addEventListener('click', e => {
    if(e.target.tagName !== 'LI') return null;
    let value = e.target.value;
    //Если страничка уже выбранна, то просто выходим
    if(value === stateApp.selectPage) return null;
    
    //Если такой странички нет, то добавляем
    if(!stateApp.gamePages.hasOwnProperty(value)) {
        stateApp.gamePages[value] =  {
            activeFieldItem1: [],
            activeFieldItem2: [],
            betValue: 0,
            quantity: 1,
            circulation: 1
        } 
    }

    renderHeaderTabs(stateApp, value);
    stateApp.render();
});

let modal = document.getElementById('modal-window');
let closeBtn = document.getElementsByClassName('modal__close')[0];

function toggleShowHelp() {
    modal.style.display = 'block';
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}


//Точка входа(Первоначальная отрисовка)
stateApp.render();