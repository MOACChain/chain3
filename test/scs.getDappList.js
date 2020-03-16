var testMethod = require('./helpers/test.method.js');
// Returns the Dapp/Smart Contract running at the AppChain on the connecting SCS.
var method = 'getDappList';

var dappListResult = [ '0x1c4066E7F3F68075eCCD1c2EBcEd4515451f7A13',
  '0xEbA13033Ce17a820B3bB1fb524Ea5e7AaE391253',
  '0xcc2F9fac358ba1C8792a7Ad47BCCB037a92EB8A3' ];
var dappListFormattedResult = [ '0x1c4066E7F3F68075eCCD1c2EBcEd4515451f7A13',
  '0xEbA13033Ce17a820B3bB1fb524Ea5e7AaE391253',
  '0xcc2F9fac358ba1C8792a7Ad47BCCB037a92EB8A3' ];

var tests = [{
    args: ['dbdbdb2cbd23b783741e8d7fcf51e459b497e4a6'],
    formattedArgs: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6'],
    result: dappListResult,
    formattedResult: dappListFormattedResult,
    call: 'scs_'+ method
},{// Notice the return values will have a block number 
    args: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6'],
    formattedArgs: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6'],
    result: dappListResult,
    formattedResult: dappListFormattedResult,
    call: 'scs_'+ method
},{
    args: ['0XDBDBDB2CBD23B783741E8D7FCF51E459B497E4A6'], 
    formattedArgs: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6'],
    result: dappListResult,
    formattedResult: dappListFormattedResult,
    call: 'scs_'+ method
}];

testMethod.runTests('scs', method, tests);

