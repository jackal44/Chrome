
//slider
let slider = document.getElementById('slider')
let val = document.getElementById('value')
value = document.createElement('span')
value.setAttribute("id", "sval")
val.appendChild(value)
value.innerHTML = slider.value
let wpm = document.getElementById('sval')

slider.oninput = function () {
    wpm.innerHTML = this.value
    chrome.storage.sync.set({ key: slider.value })
}

chrome.storage.sync.get('key', data => {
    console.log(data.key)
    let sliderPosition = document.querySelector("input")
    sliderPosition.setAttribute('value', data.key)
    let sliderValue = document.getElementById("sval")
    sliderValue.innerHTML = data.key
})

let play = document.getElementById('play')
let pause = document.getElementById('pause')
let qna = document.getElementById('qna')
let dark_mode = document.getElementById('darkmode')
let answer = document.getElementById('answer')

dark_mode.addEventListener("click", dark)
answer.addEventListener("click", give_answer)
qna.addEventListener("click", api)
slider.addEventListener("click", disappear)
play.addEventListener("click", disappear)
pause.addEventListener("click", stop)

let params = {
    active: true,
    currentWindow: true
}

function dark() {
    chrome.tabs.query(params, gotTab);
    function gotTab(tabs) {
        let msg = 'dark'
        chrome.tabs.sendMessage(tabs[0].id, msg)
    }
}

function give_answer() {
    chrome.tabs.query(params, gotTab);
    function gotTab(tabs) {
        let msg = 'answer'
        chrome.tabs.sendMessage(tabs[0].id, msg)
    }
}

function api() {
    chrome.tabs.query(params, gotTab);
    function gotTab(tabs) {
        let msg = 'question'
        chrome.tabs.sendMessage(tabs[0].id, msg)
    }
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
document.addEventListener("keydown", shortcut, false)
function shortcut(e) {
    if (e.keyCode == 37) {
        slider.value = slider.value - 50
        value.innerHTML = slider.value
        chrome.tabs.query(params, gotTab);
        function gotTab(tabs) {
            let msg = slider.value
            chrome.tabs.sendMessage(tabs[0].id, msg)
        }
    }

    else if (e.keyCode == 39) {
        slider.value = slider.value - (-50)
        value.innerHTML = slider.value
        if (slider.value <= 0) {
            slider.value = 50
        }
        chrome.tabs.query(params, gotTab);
        function gotTab(tabs) {
            let msg = slider.value
            chrome.tabs.sendMessage(tabs[0].id, msg)
        }
    }

    else if (e.keyCode == 32) {
        if (state) {
            disappear()
            state = !state
        } else {
            stop()
            state = !state
        }
    }

    else if (e.keyCode == 68) {
        dark()
    }

    else if (e.keyCode == 81) {
        api()
    }

    else if (e.keyCode == 65) {
        give_answer()
    }
}




