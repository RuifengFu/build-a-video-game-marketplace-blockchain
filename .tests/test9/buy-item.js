import {
  getAddressBalance,
  getTransactions,
  getItemPrice,
  writeTransactions
} from './blockchain-helpers.js';

import EC from 'elliptic';
const ec = new EC.ec('p192');

const buyerPrivateKey = process.argv[2];
const itemBought = process.argv[3];
// Add your code below
const buyerKeyPair = ec.keyFromPrivate(buyerPrivateKey);
const buyerPublicKey =  buyerKeyPair.getPublic("hex");
const balance = getAddressBalance(buyerPublicKey);
const price = getItemPrice(itemBought);

if (price <= balance) {
  let transaction = getTransactions();
  transaction.push({
    buyerAddress: buyerPublicKey,
    sellerAddress: null,
    itemBought: itemBought,
    price: price,
    signature: buyerKeyPair.sign(buyerPublicKey + price + itemBought).toDER("hex")
  });
  writeTransactions(transaction);
} else {
  console.log("You don't have enough balance.");
  console.log("balance : " + balance);
}