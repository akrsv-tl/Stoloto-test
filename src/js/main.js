import { renderHtmlCode, removeChild, stringToNode } from './tools/index';
import { toggleFieldGame } from './main__fields/toggle_fields';
import { randomFieldGame, clearFieldGame } from './main__fields/random_clear_fields';
import { gamePage } from './pageTemplate';
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

const moment = require('moment');

function renderDateStr(state) {
    let dateStr = document.getElementById('date-str');
    let circulation = state.gamePages[state.selectPage].circulation;
    let date = moment().lang('ru').add(7 * circulation, 'days').format('DD MMMM 10:30');
    
    dateStr.innerText = date;
}

function renderCirculationSelector(state) {
    var circulationSelector = document.getElementById('circulation-selector')
    circulationSelector.value = state.gamePages[state.selectPage].circulation;
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

function renderQuantitySelect(state) {
    var quantitySelector = document.getElementById('quantity-selector');
    quantitySelector.value = state.gamePages[state.selectPage].quantity;
}

function renderBetValue(state) {
    document.getElementById('bet-value').innerText = state.betValue;
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

function confirmBet() {
    alert('Ставка принята');
}

function statusBet(state) {
    let lengthActiveFieldItem1 = state.gamePages[state.selectPage].activeFieldItem1.length;
    let lengthActiveFieldItem2 = state.gamePages[state.selectPage].activeFieldItem2.length;
    let checkLength = lengthActiveFieldItem1 >= 4 && lengthActiveFieldItem2 >= 4;
    let checkMinBetValue = lengthActiveFieldItem1 === 4 && lengthActiveFieldItem2 === 4;
    let lengthActiveFields = lengthActiveFieldItem1 + lengthActiveFieldItem2;
    
    if(!checkLength) {
        stateApp.gamePages[stateApp.selectPage].betValue = 0;
    }

    if(checkMinBetValue) {
        stateApp.gamePages[stateApp.selectPage].betValue = 100;
    }

    state.apply = checkLength;
    countBetValue(state);
}

function countBetValue(state) {
    var betValue = 0;

    for( let key in state.gamePages) {
        betValue += state.gamePages[key].betValue * state.gamePages[key].quantity;
    }

    state.betValue = betValue;
}

//Точка входа(Первоначальная отрисовка)
stateApp.render();