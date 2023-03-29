// 封装获取元素的方法
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}
function $$$(tagName){
    return document.createElement(tagName);
}