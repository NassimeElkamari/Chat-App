// Get username and room from URL 
const { username , room} = Qs.parse(location.search , {
    ignoreQueryPrefix: true 
});

document.addEventListener('DOMContentLoaded', function() {
    const roomList = document.getElementById('rooms');

    const socket = io();

    // Emit event to server to join the selected room when a room is clicked
    roomList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const selectedRoom = event.target.textContent;
            socket.emit('joinRoom', { username, room: selectedRoom });
        }
    });

    // Populate the room list
    socket.on('roomList', ({ rooms }) => {
        rooms.forEach(room => {
            const listItem = document.createElement('li');
            listItem.textContent = room;
            roomList.appendChild(listItem);
        });
    });

    // Join the default room when the page loads
    socket.emit('joinRoom', { username, room });

    // Get room and users
    socket.on('roomUsers', ({ room, users }) => {
        outputRoomName(room);
        outputUsers(users);
    });

    // Message from server
    socket.on('message', message => {
        console.log(message);
        outputMessage(message);
        chatMessages.scrollTo = chatMessages.scrollHeight;
    });

    // Message submit 
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = e.target.elements.msg.value;
        socket.emit('chatMessage', msg);
        e.target.elements.msg.value = '';
        e.target.elements.msg.focus();
    });
});

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

    div.innerHTML = `<p class="meta"><span style="display: flex ; justify-content: start ; font-size: smaller ; text-decoration: underline">${message.username} à ${message.time}</span></br>${message.text}</p>
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
          <h4>🟢 ${user.username} </h4>
          <p class="time">10:56</p>
        </div>           
      </div>
  </div>`;
      userList.appendChild(li);
    });
}

// Store userData in localStorage
localStorage.setItem(localStorageKey, JSON.stringify(userData));

// //Prompt the user before leave chat room
// document.getElementById('leave-btn').addEventListener('click', () => {
//     const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
//     if (leaveRoom) {
//       window.location = '../index.html';
//     } else {
//     }
// });
