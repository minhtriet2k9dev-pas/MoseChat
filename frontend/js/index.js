const socket = io();

const chatForm = document.querySelector("#chat-form");

const composeMsgBox = document.querySelector("#compose-msg-box");

const userName = prompt("Choose your username");

chatForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const today = new Date();
	const date =
		today.getFullYear() +
		"-" +
		(today.getMonth() + 1) +
		"-" +
		today.getDate();
	const time =
		today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

	const message = composeMsgBox.value;
	const data = { name: userName, message: message, date: date, time: time };

	composeMsgBox.value = "";

	socket.emit("on-chat", data);
});

const chatBox = document.querySelector("#chat-box");

socket.on("user-chat", (data) => {
	const chatItem = document.createElement("div");
	chatItem.textContent = data.message;

	function decordMsg(item) {
		item.setAttribute("style", "");
	}

	decordMsg(chatItem);
	chatBox.appendChild(chatItem);
});
