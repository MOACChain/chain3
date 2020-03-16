var testMethod = require('./helpers/test.method.js');
// Returns the requested AppChain adresses on the connecting SCS.
var method = 'getAppChainList';

var appChainListResult = [ '0x1c4066E7F3F68075eCCD1c2EBcEd4515451f7A13',
  '0xEbA13033Ce17a820B3bB1fb524Ea5e7AaE391253',
  '0xcc2F9fac358ba1C8792a7Ad47BCCB037a92EB8A3' ];
var appChainListFormattedResult = [ '0x1c4066E7F3F68075eCCD1c2EBcEd4515451f7A13',
  '0xEbA13033Ce17a820B3bB1fb524Ea5e7AaE391253',
  '0xcc2F9fac358ba1C8792a7Ad47BCCB037a92EB8A3' ];

var tests = [{
    result: appChainListResult,
    formattedResult: appChainListFormattedResult,
    call: 'scs_'+ method
}, {
  result: appChainListResult,
  formattedResult: appChainListFormattedResult,
    call: 'scs_'+ method
}];

testMethod.runTests('scs', method, tests);

