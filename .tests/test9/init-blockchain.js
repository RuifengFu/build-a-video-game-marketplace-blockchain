import { writeBlockchain, writeTransactions } from './blockchain-helpers.js';
// Add your code below

//create the genesis block
let genesis = {
    hash: "0",
    previousHash: null
};
let blockchain = [genesis];
writeBlockchain(blockchain);

//make transactions empty
let transactions = [];
writeTransactions(transactions);