// $.ajax({
//     url: "http://localhost:5000/sentiment",
//     method: "POST",
//     contentType: 'application/json; charset=utf-8',
//     "data": "{\n    \"text\": \"Hello world\"\n}",
//     success: function (resp) {
//         debugger
//         console.log(json.stringify(resp))
//     }
// })

axios({
    method: 'post',
    url: 'http://localhost:5000/api/sentiment',
    data: {
        text: 'hello world'
    }
})
    .then(function (response) {
        // debugger
        console.log(response)
    })
    .catch(function (error) {
        console.log(error)
    })

// console.log("Chrome Extension go")
// url_sentiment = "http://localhost:5000/sentiment"


// function spanText(text) {
//     y = text.split("");
//     return "<span class='char'>" +
//         y.join("<\/span><span class='char'>") + "<\/span>";
// }

// let isPause = false

// k = true
// chrome.runtime.onMessage.addListener(gotMessage);
// function gotMessage(message, sender, sendResponse) {
//     console.log(message);
//     if (message != 0 && message != 'question' && k == true) {
//         k = false
//         if (window.getSelection) {
//             let sel = window.getSelection();
//             if (sel.getRangeAt && sel.rangeCount) {
//                 range = window.getSelection().getRangeAt(0);
//                 var html = spanText(sel.toString())
//                 range.deleteContents();
//                 var el = document.createElement("span");
//                 el.innerHTML = html;
//                 var frag = document.createDocumentFragment()
//                 frag.appendChild(el);
//                 range.insertNode(frag);
//                 let offset = 0
//                 function loop() {
//                     let timer = setInterval(function () {
//                         if (!isPause) {
//                             if ($('.char').length > offset) {
//                                 $('.char')[offset].style.opacity = 0
//                                 offset++
//                                 clearInterval(timer)
//                                 loop()
//                             } else if ($('.char').length == offset) {
//                                 k = true
//                                 clearInterval(timer)
//                                 for (i = 0; i < $('.char').length; i++) {
//                                     $('.char')[i].style.opacity = 1
//                                 }
//                             }
//                         }
//                         chrome.runtime.onMessage.addListener(gotMessage)
//                         function gotMessage(message, sender, sendResponse) {
//                             if (message == 0) {
//                                 isPause = true
//                             } else if (message != 0 && message != 'question') {
//                                 x = (1000 / (message / 60 * 4.5))
//                                 isPause = false
//                             }
//                         }
//                     }, x
//                     )
//                 }
//                 var x = (1000 / (message / 60 * 4.5))
//                 loop()
//             }
//         }
//         else {
//             alert('Please select some text')
//         }
//     }
//     else if (message == 'question') {
//         if (window.getSelection) {
//             let sel = window.getSelection();
//             if (sel.getRangeAt && sel.rangeCount) {
//                 const data = { "text": "hello" }
//                 // $.ajax({
//                 //     "async": true,
//                 //     "crossDomain": true,
//                 //     "url": "http://localhost:5000/",
//                 //     "method": "POST",
//                 //     "headers": {
//                 //         // "Content-Type": "application/json",
//                 //         "Accept": "*/*",
//                 //         "Cache-Control": "no-cache",
//                 //     },
//                 //     "dataType": "json",
//                 //     // "processData": false,
//                 //     // "data": "{\n    \"text\": \"Hello world\"\n}",
//                 //     success: function (resp) {
//                 //         debugger
//                 //     }
//                 // })

//                 fetch("http://localhost:5000/sentiment", {
//                     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//                     mode: 'cors', // no-cors, cors, *same-origin
//                     // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//                     // credentials: 'same-origin', // include, *same-origin, omit
//                     headers: {
//                         "Accept": "*/*"
//                         // 'Content-Type': 'application/json'
//                         // 'Content-Type': 'application/x-www-form-urlencoded',
//                     },
//                     // // redirect: 'follow', // manual, *follow, error
//                     // // referrer: 'no-referrer', // no-referrer, *client
//                     body: JSON.stringify(data), // body data type must match "Content-Type" header
//                 })
//                     .then(response => {
//                         return response.json()
//                     })
//                     .then(result => {
//                         debugger
//                     })
//             }
//         }
//     }
// }





// // return (1000 / (750 / 60 * 4.5))

