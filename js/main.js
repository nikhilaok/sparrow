var form = document.getElementById('chat-box');
var submit = document.getElementById('chat-submit');
var input = document.getElementById('chat-user');
var container = document.getElementById('dialogue-container');
var reply;

form.addEventListener("submit", function (event) {
    event.preventDefault();
    create_bubble_user();
});

function create_bubble_user() {
    if (input.value != '') {
        var append_data='<div class="d-flex align-items-center text-right justify-content-end py-lg-3 py-2">'+
                    '<div class="pr-2 talk-bubble tri-right btm-right">'+
                    '<div class="talktext">'+
                    '<p class="msg questn">'+input.value+'</p>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
        container.innerHTML += append_data ;
        container.scrollTop = container.scrollHeight;
        input.value = '';
        reply = get_advice();
        setTimeout(function () {
            create_bubble_bot(reply);
        }, 1000);
    }
    else{
        console.log("wrong");
    }
}


function create_bubble_bot(str) {
    var append_data2='<div class="d-flex align-items-center pt-3">'+
                     '<div class="text-left pr-1"><img src="https://img.icons8.com/color/40/000000/guest-female.png" width="30" class="img1" /></div>'+
                     '<div class="pr-2 pl-1 talk-bubble tri-right btm-left">'+
                     '<div class="talktext">'+
                     '<p class="msg response-msg">'+str+'</p>'+
                     '</div>'+
                     '</div>'+
                     '</div>';
    container.innerHTML += append_data2;
    container.scrollTop = container.scrollHeight;
}


function get_advice() {
    var url = "https://api.adviceslip.com/advice";

    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', url);
    ourRequest.onload = function () {
        if (ourRequest.status === 200 && ourRequest.readyState === 4) {
            var data = JSON.parse(ourRequest.responseText);
            reply = data.slip.advice;
            return reply;
        } else {
            return "Oops, something's wrong!";
        }
    };
    ourRequest.onerror = function () {
        return "Oops, Chatbot unavailabe!";
    };

    ourRequest.send();
}
