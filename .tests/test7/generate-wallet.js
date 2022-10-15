import {
  getTransactions,
  writeTransactions,
  getWallets,
  writeWallets
} from './blockchain-helpers.js';

import EC from 'elliptic';
const ec = new EC.ec('p192');

const newWalletName = process.argv[2];
// Add your code below
let Wallets = getWallets();
const keyPair = ec.genKeyPair();
// "me": {
//   "publicKey": "04e67ecf0a9ee84dd91a63c67be4dea9230c02267713d306cf5cf88f8da5c229e370506764b682be6940f0cd9782c9cd81",
//   "privateKey": "76066ff0788e7176a925f00ca7d7ebada416ee23be2c68ca"
// }
Wallets[newWalletName] = {
  publicKey: keyPair.getPublic("hex"),
  privateKey: keyPair.getPrivate("hex")
};
writeWallets(Wallets);

//add Transactions
let transactions = getTransactions();
// {
//   "buyerAddress": "048b439de98215d534bd1498414754a39c646592abcafea59f04791a1dc20ae20ecbcdeafcb9049a0613c048bd7135b2ab",
//   "sellerAddress": null,
//   "price": 30,
//   "itemBought": "skin",
//   "signature": "3035021900e73cc914b250af25e997fd5d1cfd18d38e8ea90ac77e9dfe02181eebfe37f68d1d0c734283ea7520601f199dbd02d1fc9783"
// }
let item = {
  buyerAddress: null,
  sellerAddress: keyPair.getPublic("hex"),
  price: 40
}
transactions.push(item);
writeTransactions(transactions);




