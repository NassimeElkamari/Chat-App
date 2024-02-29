const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chatbox');
const roomName = document.getElementById('room-name')
const userList = document.getElementById('userList');
const usernamee = document.querySelector('.usernamee');

const userData = JSON.parse(localStorage.getItem('userData'));


// Get username and room from URL 
const { username , room} = Qs.parse(location.search , {
    ignoreQueryPrefix: true 
});

console.log(userData);

const socket = io();

// Join chatroom
socket.emit('joinRoom' , {username, room})

// Get room and users
socket.on('roomUsers' , ({room , users}) => {
    outputRoomName(room);
    outputUsers(users);
})

// Message froms server
socket.on('message' , message => {
    console.log(message);

    outputMessage(message);

    chatMessages.scrollTo = chatMessages.scrollHeight;
})

// Message submit 
chatForm.addEventListener('submit' , (e) => {
    e.preventDefault();

    //Get message text
    const msg = e.target.elements.msg.value;

    //Emit message to server
    socket.emit('chatMessage' , msg);

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

// Output message to DOM 
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');

    // Add a custom class based on whether the message is from the current user or another user
    if (message.username === username) {
        div.classList.add('my_message'); // Class for user's own messages
    } else {
        div.classList.add('his_message'); // Class for other users' messages
    }

    div.innerHTML = `<p class="meta"><span style="display: flex ; justify-content: start ; font-size: smaller ; text-decoration: underline">${userData.displayName} à ${message.time}</span></br>${message.text}</p>
    ` ;
    document.querySelector('.chatbox').appendChild(div);
    usernamee.innerText = `${userData.displayName}`
}


// Add room name to DOM 
function outputRoomName(room){
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = '';
    users.forEach((user) => {
      const li = document.createElement('div');
      li.innerHTML = `<div class="block">    
      <img src="./img/user.png" class="cover"/> 
      <div class="details">
        <div class="listHead">
          <h4>🟢 ${userData.displayName} </h4>
          <p class="time">10:56</p>
        </div>           
      </div>
  </div>`;
      userList.appendChild(li);
    });
}


//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
      window.location = '../index.html';
    } else {
    }
  });

