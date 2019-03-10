export function renderDateStr(state) {
    const moment = require('moment');

    let dateStr = document.getElementById('date-str');
    let circulation = state.gamePages[state.selectPage].circulation;
    let date = moment().locale('ru').add(7 * circulation, 'days').format('DD MMMM 10:30');
    
    dateStr.innerText = date;
}