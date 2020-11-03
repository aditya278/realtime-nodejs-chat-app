const socket = io();

let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message-area');

do {
    name = prompt('Please Enter your name: ');
} while (!name);

socket.emit('userJoined', name);

textarea.addEventListener('keyup', (event) => {
    if(event.key === 'Enter') {
        sendMessage(event.target.value);
    }
});

function sendMessage(msg) {
    let payload = {
        user : name,
        message : msg.trim()
    }

    //Append the payload
    appendMessage(payload, 'outgoing');

    //Send to server
    socket.emit('userPayload', payload)
}

function appendMessage(payload, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4>${payload.user}</h4>
        <p>${payload.message}</p>
    `;

    mainDiv.innerHTML = markup;

    messageArea.appendChild(mainDiv);
    textarea.value = '';
}

// Recieve broadcasted messages

socket.on('payloadBroadcast', (payload) => {
    appendMessage(payload, "incoming")
})

socket.on('userJoined', (name) => {
    const payload = {
        user : '',
        message : `${name} has joined the chat`
    };
    appendMessage(payload, 'incoming');
})