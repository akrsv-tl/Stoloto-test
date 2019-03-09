import { renderHtmlCode, removeChild, stringToNode } from './tools/index';
import { toggleFieldGame } from './main__fields/toggle_fields';
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
    //т.к. старые event удалились
    addEventListener(); 
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
});

stateApp.headerTabs.addEventListener('click', e => {
    if(e.target.tagName !== 'LI') return null;
    let value = e.target.value;
    //Если страничка уже выбранна то просто выходим
    if(value === stateApp.selectPage) return null;
    
    //Если такой странички в нашем объекте еще нету то добавляем
    if(!stateApp.gamePages.hasOwnProperty(value)) {
        stateApp.gamePages[value] =  {
            activeFieldItem1: [],
            activeFieldItem2: []
        } 
    }

    renderHeaderTabs(stateApp, value);
    stateApp.render();

});

function addEventListener() {
    let randomBtn = document.getElementById('random-numbers');
    randomBtn.addEventListener('click', () => {
        random(stateApp, 1);
        random(stateApp, 2)
    });
}

function random(state, field) {
    state.gamePages[state.selectPage]['activeFieldItem'+field] = [];
    let fieldGame = state.gamePages[state.selectPage]['activeFieldItem'+field];

    for(let i = 0; i < 4; i++) {
        let random;
        do {
            random = Math.floor(Math.random() * (20 - 1)) + 1;
        } while(fieldGame.includes(random) || !(random > 0));
        
        fieldGame.push(random);
    }
    stateApp.render(); 
}

//Точка входа(Первоначальная отрисовка)
stateApp.render();