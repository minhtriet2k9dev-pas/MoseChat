const socket = io();

const chatForm = document.querySelector("#chat-form");

const composeMsgBox = document.querySelector("#compose-msg-box");

const userName = prompt("Choose your username");

var isValid = true;

socket.on("valid", (valid) => {
	if (valid) {
		return;
	}
	alert("Invalid chain");
	alert("The chat has been changed");
	// isValid = false;
});

chatForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const message = composeMsgBox.value;

	if (message == "") {
		return;
	}

	const today = new Date();
	const date =
		today.getFullYear() +
		"-" +
		(today.getMonth() + 1) +
		"-" +
		today.getDate();
	const time =
		today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

	const data = { name: userName, message: message, date: date, time: time };

	composeMsgBox.value = "";

	if (!isValid) {
		alert("You wont allowed to chat anymore");
	} else {
		socket.emit("on-chat", data);
	}
});

const chatBox = document.querySelector("#chat-box");

socket.on("user-chat", (data) => {
	const chatItem = document.createElement("div");
	chatItem.textContent = data.name + ": " + data.message;

	function decordMsg(item) {
		item.setAttribute("style", "margin-left: 10px;");
	}

	decordMsg(chatItem);
	chatBox.appendChild(chatItem);
	var elem = document.querySelector("#chat-box");
	elem.scrollTop = elem.scrollHeight - elem.clientHeight;
});
