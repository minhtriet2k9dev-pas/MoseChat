const http = require("http");
const path = require("path");
const express = require("express");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "..", "frontend/html/index.html"));
});

app.get("/styles/indexStyles.css", (req, res) => {
	res.sendFile(
		path.join(__dirname, "..", "..", "frontend/styles/indexStyles.css")
	);
});

app.get("/js/index.js", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "..", "frontend/js/index.js"));
});

server.listen(3000, () => {
	console.log(`Server is listening on port 3000`);
});

io.on("connection", (socket) => {
	const today = new Date();
	const date =
		today.getFullYear() +
		"-" +
		(today.getMonth() + 1) +
		"-" +
		today.getDate();
	const time =
		today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

	console.log("User connected at " + date + " " + time);

	socket.on("on-chat", (data) => {
		io.emit("user-chat", data);
	});
});
