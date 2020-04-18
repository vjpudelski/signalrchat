const html = (user, message) => /*html*/`
<div class="msg"><span>${user}: </span>${message}</div>
`;

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("btn-send").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    let messages =  document.querySelector('#messages');
    messages.innerHTML += html(user, msg);
    messages.scrollTop = messages.scrollHeight;
});

connection.start().then(function () {
    document.getElementById("btn-send").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("btn-send").addEventListener("click", function (event) {
    var user = document.getElementById("user").value;
    var message = document.getElementById("msg").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    document.getElementById("msg").value = '';
    event.preventDefault();
});
