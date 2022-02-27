const hash = require("crypto-js/sha256");

class Block {
	constructor(prevHash, data) {
		this.prevHash = prevHash;
		this.data = data;
		this.timeStamp = new Date();

		this.hash = this.calculateHash();

		this.mineVar = 0;
	}

	calculateHash() {
		return hash(
			this.prevHash +
				JSON.stringify(this.data) +
				this.timeStamp +
				this.mineVar
		).toString();
	}

	mine(diffuculty) {
		while (!this.hash.startsWith(diffuculty)) {
			this.mineVar++;
			this.hash = this.calculateHash();
		}
	}
}

class BlockChain {
	constructor(diffuculty = "0000") {
		const genesisBlock = new Block("22022009", {
			isGenesisBlock: true,
		});
		this.chain = [genesisBlock];

		this.diffuculty = diffuculty;
	}

	getPrevBlock() {
		return this.chain[this.chain.length - 1];
	}

	addBlock(data) {
		const prevBlock = this.getPrevBlock();
		const newBlock = new Block(prevBlock.hash, data);

		console.log("Starting mining...");
		console.time("=> Mine time");
		newBlock.mine(this.diffuculty);
		console.timeEnd("=> Mine time");
		console.log("Mining finished");

		this.chain.push(newBlock);
	}

	isValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const prevBlock = this.chain[i - 1];

			if (currentBlock.hash !== prevBlock.hash) {
				return false;
			}

			if (currentBlock.hash !== prevBlock.calculateHash()) {
				return false;
			}
		}
	}
}

module.exports = {
	BlockChain,
};
