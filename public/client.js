const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    name = prompt('Please enter your name: ')
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name, // passing the name
        message: message.trim()
        //handlin the new line paradox
    }
    // Append the message in outgoing area
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    //textarea going to be blank after entering the message or sending the message 
    scrollToBottom()
    // this is something which will automatically help us to get to the last or the latest part of the conversation or the chat 

    // Send to server which goes by the name of message and msg has both the parts
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')//creating a div 
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = ` 
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `// all those messages that can be seen in a message tab 
    mainDiv.innerHTML = markup // this seems JSX
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    //append message into incoming area
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}
