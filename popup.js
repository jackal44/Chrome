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

play.onclick = function () {
    chrome.tabs.query(params, gotTab);
    function gotTab(tabs) {
        let msg = {
            txt: value.innerText
        }
        chrome.tabs.sendMessage(tabs[0].id, msg)
    }
}

pause.onclick = function () {
    chrome.tabs.query(params, gotTab);
    function gotTab(tabs) {
        let msg = {
            txt: "pause"
        }
        chrome.tabs.sendMessage(tabs[0].id, msg)
    }
}







