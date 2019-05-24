console.log("Chrome Extension go")



chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
    console.log(message)
}

function gotMessage(message, sender, sendResponse) {
    console.log(message);
    if (message.txt) {
        function spanText(text) {
            y = text.split("");
            return "<span class='char'>" +
                y.join("<\/span><span class='char'>") + "<\/span>";
        }

        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = window.getSelection().getRangeAt(0);

                var html = spanText(sel.toString())
                console.log("copy of original text with spans inividually")

                range.deleteContents();
                console.log("Deleted the existing words")

                var el = document.createElement("span");
                el.innerHTML = html;
                var frag = document.createDocumentFragment()
                frag.appendChild(el);
                console.log('I have inserted the bold copy back')
                range.insertNode(frag);


                let time = 1000
                $('.char').each((i, ch) => {
                    setTimeout(function () {
                        ch.style.opacity = 0
                    }, time)

                    time += 1000 / (parseInt(message.txt) / 60 * 4.5)
                })

            }
        }

    }
}
