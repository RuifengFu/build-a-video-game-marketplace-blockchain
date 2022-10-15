import {
  getBlockchain,
  getTransactions,
  writeBlockchain,
  writeTransactions
} from './blockchain-helpers.js';

import sha256 from 'crypto-js/sha256.js';
// Add your code below

let blockchain = getBlockchain();
let transactions = getTransactions();
const transaction = JSON.stringify(transactions);
const previousHash = blockchain[blockchain.length-1].hash;
let nonce = 0;
let hash = sha256(nonce + previousHash + transaction).toString();
while (!hash.startsWith("00")) {
  nonce++;
  hash = sha256(nonce + previousHash + transaction).toString();
}

 
blockchain.push({
  hash: hash,
  previousHash: previousHash,
  nonce: nonce, 
  transactions: transactions
});
writeBlockchain(blockchain);
writeTransactions([]);