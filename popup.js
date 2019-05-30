
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
    chrome.storage.sync.set({key:slider.value})
}

chrome.storage.sync.get('key', data=> {
    console.log(data.key)
    let sliderPosition = document.querySelector("input")
    sliderPosition.setAttribute('value', data.key)
    let sliderValue = document.getElementById("sval")
    sliderValue.innerHTML = data.key
})

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

document.addEventListener("keydown", shortcut, false)
function shortcut(e) {
if (e.keyCode == 37) {
        slider.value = slider.value-50
        value.innerHTML = slider.value
        chrome.tabs.query(params, gotTab);
        function gotTab(tabs) {
            let msg = slider.value
            chrome.tabs.sendMessage(tabs[0].id, msg)
        }
    }

else if (e.keyCode == 39) {
        slider.value = slider.value-(-50)
        value.innerHTML = slider.value
        if (slider.value <= 0){
            slider.value=50
        }
        chrome.tabs.query(params, gotTab);
        function gotTab(tabs) {
            let msg = slider.value
            chrome.tabs.sendMessage(tabs[0].id, msg)
        }
    }
}




