//slider
var slider = document.getElementById('slider')
var val = document.getElementById('value')
val.innerHTML = slider.value
slider.oninput = function () {
    val.innerHTML = this.value
}

let play = document.getElementById('play')
let pause = document.getElementById('pause')
let cancel = document.getElementById('cancel')

play.addEventListener("click", disappear)
pause.addEventListener("click", stop)
cancel.addEventListener("click", refresh)

let params = {
    active: true,
    currentWindow: true
}

function refresh() {
    chrome.tabs.query(params, gotTab);
    function gotTab(tabs) {
        let msg = 'refresh'
        chrome.tabs.sendMessage(tabs[0].id, msg)
    }
}

function disappear() {
    chrome.tabs.query(params, gotTab);
    function gotTab(tabs) {
        let msg = 'play'
        chrome.tabs.sendMessage(tabs[0].id, msg)
    }
}

function stop() {
    chrome.tabs.query(params, gotTab);
    function gotTab(tabs) {
        let msg = "pause"
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







