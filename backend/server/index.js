const http = require("http");
const path = require("path");
const express = require("express");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const blockchain = require(path.join(__dirname, "..", "other/blockchain.js"));

const io = new Server(server);

const PORT = 3000;

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

server.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});

const chatBlock = new blockchain.BlockChain("");

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
		chatBlock.addBlock(data);

		console.log(chatBlock.chain);
	});
});
