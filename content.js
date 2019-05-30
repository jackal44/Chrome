

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
    if (message != 0 && message != 'question' && message != 'answer' && k == true) {
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
                        previous = sel.toString()
                        input = sel.toString()
                        // let randomize = []
                        // // var answers = response.data
                        // for (let i = 0; i < 6; i++) {
                        //     randomize = randomize.push(Math.floor(Math.random() * 6))
                        // }
                        array = response.data
                        // let shuffled_array = []
                        // if (array.length > 8) {
                        //     for (e of randomize) {
                        //         shuffled_array = shuffled_array.push(e)
                        //     }
                        // }
                        // else if (array.lenth <= 7) {
                        //     shuffled_array = array
                        // }

                        console.log()
                        for (e of array) {
                            input = input.replace(e, '__________')
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

                        chrome.runtime.onMessage.addListener(gotMessage)
                        function gotMessage(message, sender, sendResponse) {
                            if (message == 'answer') {
                                for (e of array) {
                                    previous = previous.replace(new RegExp('(' + e + ')'), '<span class="word">$1</span>')
                                }
                                range = window.getSelection().getRangeAt(0);
                                let html1 = previous
                                range.deleteContents();
                                let el1 = document.createElement("span");
                                el1.innerHTML = html1;
                                let frag1 = document.createDocumentFragment()
                                frag1.appendChild(el1);
                                range.insertNode(frag1);
                                $('.word').css('background-color', 'yellow')

                            }
                        }

                    })
                    .catch(function (error) {
                        console.log(error)
                    })

            }
        }
    }
}





// // return (1000 / (750 / 60 * 4.5))

