console.log("Chrome Extension go")

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

    if (message == "play" && k == true) {
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = window.getSelection().getRangeAt(0);

                var html = spanText(sel.toString())
                range.deleteContents();

                var el = document.createElement("span");
                el.innerHTML = html;
                var frag = document.createDocumentFragment()
                frag.appendChild(el);
                range.insertNode(frag);
                k = false
                let offset = 0

                let timer = setInterval(function () {

                    if (!isPause) {
                        if ($('.char').length > offset) {
                            $('.char')[offset].style.opacity = 0
                            offset++
                        }
                        if ($('.char').length == offset) {
                            k = true
                        }
                    }
                    chrome.runtime.onMessage.addListener(gotMessage)
                    function gotMessage(message, sender, sendResponse) {
                        if (message == 'pause') {
                            isPause = true
                        } else if (message = 'play') {
                            isPause = false
                        }

                    }
                }, 1000 / (1000 / 60 * 4.5))
            }
        }
    }
}
