import {
  getAddressItems,
  getItemPrice,
  getTransactions,
  writeTransactions
} from './blockchain-helpers.js';

import EC from 'elliptic';
const ec = new EC.ec('p192');

const sellerPrivateKey = process.argv[2];
const itemSold = process.argv[3];
// Add your code below

const sellerPUblicKey = ec.keyFromPrivate(sellerPrivateKey).getPublic("hex");
const items = getAddressItems(sellerPUblicKey)
const itemNum = items[itemSold];



if (itemNum < 1) {
  console.log("Don't have enough " + itemSold + "\n" + items);
} else {
  const price = getItemPrice(itemSold) - 5;
  let transactions = getTransactions();

  transactions.push({
    buyerAddress: null,
    sellerAddress: sellerPUblicKey,
    price: price,
    itemSold: itemSold,
    signature: ec.keyFromPrivate(sellerPrivateKey).sign(sellerPUblicKey + price + itemSold).toDER("hex")
  });
  writeTransactions(transactions);
}

