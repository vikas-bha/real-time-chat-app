const socket = io('http://localhost:3000')
//hosting 
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
//prompt will ask for my name 
const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)
//chat-message is event name 
socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})
//singifyin the user is connected 

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  //stop from refreshing 
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  //keeping the record of chat 
  socket.emit('send-chat-message', message)
  //sending info from client to the server 
  messageInput.value = ''
  //messaging box is to be kept epmty
})

//appned at the last 
function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}