
//slider
var slider = document.getElementById('slider')
var val = document.getElementById('value')
value = document.createElement('span')
value.innerHTML = slider.value
val.appendChild(value)
slider.oninput = function () {
    val.innerHTML = this.value
}

let play = document.getElementById('play')
let pause = document.getElementById('pause')

slider.addEventListener("click", disappear)
play.addEventListener("click", disappear)
pause.addEventListener("click", stop)

let params = {
    active: true,
    currentWindow: true
}

function disappear() {
    chrome.tabs.query(params, gotTab);
    function gotTab(tabs) {
        let msg = slider.value
        chrome.tabs.sendMessage(tabs[0].id, msg)
    }
}

function stop() {
    chrome.tabs.query(params, gotTab);
    function gotTab(tabs) {
        let msg = 0
        chrome.tabs.sendMessage(tabs[0].id, msg)
    }
}

let state = true
document.addEventListener("keyup", shortcut, false)
function shortcut(e) {
    if (e.keyCode == 32) {
        if (state) {
            disappear()
            state = !state
        } else {
            stop()
            state = !state
        }
    }
}







