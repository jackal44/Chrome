
console.log("Chrome Extension go")
url_entity = "http://localhost:5000/entity"


function spanText(text) {
    y = text.split("");
    return "<span class='char'>" +
        y.join("<\/span><span class='char'>") + "<\/span>";
}

let isPause = false

k = true
chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
    console.log(message);
    if (message != 0 && message != 'question' && k == true) {
        k = false
        if (window.getSelection) {
            let sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = window.getSelection().getRangeAt(0);
                let html = spanText(sel.toString())
                range.deleteContents();
                let el = document.createElement("span");
                el.innerHTML = html;
                let frag = document.createDocumentFragment()
                frag.appendChild(el);
                range.insertNode(frag);
                let offset = 0
                function loop() {
                    let timer = setInterval(function () {
                        if (!isPause) {
                            if ($('.char').length > offset) {
                                $('.char')[offset].style.opacity = 0
                                offset++
                                clearInterval(timer)
                                loop()
                            } else if ($('.char').length == offset) {
                                k = true
                                clearInterval(timer)
                                for (i = 0; i < $('.char').length; i++) {
                                    $('.char')[i].style.opacity = 1
                                }
                                $('span').removeAttr("class")
                            }
                        }
                        chrome.runtime.onMessage.addListener(gotMessage)
                        function gotMessage(message, sender, sendResponse) {
                            if (message == 0) {
                                isPause = true
                            } else if (message != 0 && message != 'question') {
                                x = (1000 / (message / 60 * 4.5))
                                isPause = false
                            }
                        }
                    }, x
                    )
                }
                var x = (1000 / (message / 60 * 4.5))
                loop()
            }
        }
    }
    else if (message == 'question') {
        if (window.getSelection) {
            let sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                const data = sel.toString()
                axios({
                    method: 'post',
                    url: url_entity,
                    data: {
                        text: data
                    }
                })
                    .then(function (response) {
                        console.log(response.data)
                        input = sel.toString()
                        // var answers = response.data
                        array = response.data
                        for (e of array) {
                            input = input.replace(e, '_______')
                        }
                        range = window.getSelection().getRangeAt(0);
                        console.log(input)
                        let html = input
                        range.deleteContents();
                        let el = document.createElement("span");
                        el.innerHTML = html;
                        let frag = document.createDocumentFragment()
                        frag.appendChild(el);
                        range.insertNode(frag);
                    })
                    .catch(function (error) {
                        console.log(error)
                    })

            }
        }
    }
    else if (message == 'answers') {
        console.log(answers)
    }
}





// // return (1000 / (750 / 60 * 4.5))

