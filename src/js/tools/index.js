export function removeChild(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

export function stringToNode(stringHtml) {
    var wrapper= document.createElement('div');
    wrapper.innerHTML= stringHtml;
    return wrapper.firstChild;
}

export function renderHtmlCode(node, html) {

    removeChild(node);

    node.innerHTML = html;
}