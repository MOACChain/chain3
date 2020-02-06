/*
 * Generate a transaction for mc transfer
 * in the MOAC test network
 * for testing MOAC wallet server
 * Test conditions:
 * 1. a pair of address/private key for testing, address need to have some balances.
 *    need to update the transaction nonce after each TX.
 * 2. an address to send to.
 * 
*/

//libraries to generate the Tx

//MOAC chain3 lib
var Chain3 = require('chain3');

var chain3 = new Chain3('Http://gateway.moac.io/testnet');


// Other methods to setup the provider
// chain3.setProvider(new chain3.providers.HttpProvider('http://localhost:8545'));
// chain3.setProvider(new chain3.providers.HttpProvider('Http://gateway.moac.io/testnet'));
// chain3.setProvider(new chain3.providers.HttpProvider('Http://gateway.moac.io/mainnet'));

//The sign of the transaction requires the correct network id
// display the network info 
var networkid = chain3.mc.net.getId();//version.network;
chain3.mc.net.getId().then(function(inId){
console.log("Network id:", inId);});

chain3.mc.net.isListening()
.then(console.log);

//test accounts
//Need to add the addr and private key
var taccts = [{
  "addr": "", 
  "key": ""//put the private key here
},{
  "addr": "", 
  "key": ""
}];


/*
 * value - default is in MC, 
 * in Sha, 1 mc = 1e+18 Sha
*/
function sendTx(src, des, chainid, value){

// var txcount = chain3.mc.getTransactionCount(src["addr"]);
chain3.mc.getTransactionCount("0x7312F4B8A4457a36827f185325Fd6B66a3f8BB8B").then(
  txcount => {

    var rawTx = {
      from: src.addr,
      nonce: chain3.utils.numberToHex(txcount),
      // 1 gwei
      gasPrice: chain3.utils.numberToHex(400000000),//chain3.intToHex(chain3.mc.gasPrice),//chain3.intToHex(400000000),
      gas: chain3.utils.numberToHex(5000000),
      to: des.addr, 
      value: chain3.utils.numberToHex(15000000000), 
      shardingFlag: 0,
      data: '0x00',
      chainId: chainid
    }
    
    chain3.mc.accounts.signTransaction(rawTx, src["key"]).then( 
      value => {
        
        console.log("signed:", value);
        chain3.mc.sendSignedTransaction(value.rawTransaction)
        .once('transactionHash', function(hash){ console.log("Get returned:",hash); });
      }, 
      reason => { console.error("Error with:", reason);});

  },
  reason => { console.error("Error with:", reason);});

}


//Call the function, note the input value is in 'mc'
var src = taccts[0];
var des = taccts[1];

//Send the vaue in mc
//1 mc = 1e+18 Sha
//1 xiao = 1e+9 Xiao

//The sign of the transaction requires the correct network id
// var networkid = chain3.version.network;
// console.log("This TX is on network ", networkid);

var networkid = chain3.mc.net.getId();//version.network;

chain3.mc.net.getId().then(function(inId){
  console.log("This TX is on network:", inId);
  sendTx(src, des, inId, 0.001);
});




