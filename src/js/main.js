import { renderHtmlCode, removeChild, stringToNode } from './tools/index';
import { toggleFieldGame } from './main__fields/toggle_fields';
import { gamePage } from './pageTemplate';

var stateApp = {
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
            activeFieldItem1: [1,20],
            activeFieldItem2: [3,4]
        }
    }
}

stateApp.container.addEventListener('click', e => {
    if(e.target.closest('#exit-btn') !== null) {
        var currentElem = stateApp.container.querySelector(`li[value="${stateApp.selectPage}"]`);
        currentElem.classList.remove('header__tab--active');
        
        stateApp.selectPage = null;

        return stateApp.container.removeChild(document.getElementById('game-page'));
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
    var value = e.target.value;
    //Если страничка уже выбранна то просто выходим
    if(value === stateApp.selectPage) return null;
    
    e.target.classList.add('header__tab--active');

    if(stateApp.selectPage !== null) { 
        var currentElem = e.currentTarget.querySelector(`li[value="${stateApp.selectPage}"]`);
        currentElem.classList.remove('header__tab--active');
    }

    var page = document.getElementById('game-page');

    //Заменяем выбранную страничку на новую
    stateApp.selectPage = value;

    //Если такой странички в нашем объекте еще нету то добавляем
    if(!stateApp.gamePages.hasOwnProperty(value)) {
        stateApp.gamePages[value] =  {
            activeFieldItem1: [],
            activeFieldItem2: []
        } 
    }

    //Удаляем текущую страничку
    if(page !== null) {
        stateApp.container.removeChild(page);
    }

    //Отрисовывем выбранную страничку
    stateApp.container.appendChild(stringToNode(gamePage(stateApp.gamePages[stateApp.selectPage])));

});

stateApp.container.appendChild(stringToNode(gamePage(stateApp.gamePages[stateApp.selectPage])));