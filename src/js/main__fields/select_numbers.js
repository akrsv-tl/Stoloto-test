export function fieldGame(selectNumber) {
    let counter = 20;
    let result = '';

    for(let i = 1; i <= counter; i++) {
        let className = (selectNumber.includes(i)) ? 'field__game-item field__game-item--active' : 'field__game-item';  
        result +=  `<div class="${className}">${i}</div>`;
    }    
    return result;                   
};