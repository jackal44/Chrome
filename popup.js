//slider
var slider = document.getElementById('slider')
var val = document.getElementById('value')
val.innerHTML = slider.value
slider.oninput = function () {
    val.innerHTML = this.value
}

let play = document.getElementById('play')
let pause = document.getElementById('pause')

let params = {
    active: true,
    currentWindow: true
}
play.addEventListener("click", disappear)

function disappear() {
    chrome.tabs.query(params, gotTab);
    function gotTab(tabs) {
        let msg = 'play'
        chrome.tabs.sendMessage(tabs[0].id, msg)
    }
}

pause.addEventListener("click", stop)
function stop() {
    chrome.tabs.query(params, gotTab);
    function gotTab(tabs) {
        let msg = "pause"
        chrome.tabs.sendMessage(tabs[0].id, msg)
    }
}

let clickCount = 0;
document.addEventListener("keyup", shortcut, false)
function shortcut(e) {
    if (e.keyCode == 32) {
        if (clickCount % 2 == 0) {
            disappear()
        } else {
            stop()
        }
        clickCount++
    }
}







