import { renderHtmlCode, removeChild, stringToNode } from './tools/index';
import { toggleFieldGame } from './main__fields/toggle_fields';
import { randomFieldGame, clearFieldGame } from './main__fields/random_clear_fields';
import { gamePage } from './pageTemplate';

const stateApp = {
    headerTabs: document.getElementById('header_tabs'),   
    container: document.getElementById('container'),
    gamePage: document.getElementById('game-page'),
    exitBtn: document.getElementById('exit-btn'),
    fieldGame1: document.getElementById('field-game-1'), 
    fieldGame2: document.getElementById('field-game-2'), 
    showGamePage: true,
    selectPage: 0,
    gamePages: {
        0: {
            activeFieldItem1: [],
            activeFieldItem2: []
        }
    },

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

function renderPageGame() {
    let page = document.getElementById('game-page');
    
    if(page !== null) {
        stateApp.container.removeChild(page);
    }

    //Отрисовывем выбранную страничку
    stateApp.container.appendChild(stringToNode(gamePage(stateApp.gamePages[stateApp.selectPage])));
}

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
        clearFieldGame(stateApp, 1);
        clearFieldGame(stateApp, 2);
        return stateApp.render();
    }
    
    if(e.target.closest('#random-numbers') !== null) {
        randomFieldGame(stateApp, 1);
        randomFieldGame(stateApp, 2);
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
            activeFieldItem2: []
        } 
    }

    renderHeaderTabs(stateApp, value);
    stateApp.render();

});

//Точка входа(Первоначальная отрисовка)
stateApp.render();