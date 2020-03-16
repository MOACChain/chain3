var testMethod = require('./helpers/test.method.js');
// Returns the requested AppChain exchange info with the baseChain on the connecting SCS.
var method = 'getExchangeInfo';

var exchangeInfoResult = {
  "DepositingRecordCount":0,
  "DepositingRecords":null,
  "WithdrawingRecordCount":0,
  "WithdrawingRecords":null,
  "microchain":"0x2e4694875de2a7da9c3186a176c52760d58694e4",
  "scsid":"0x50c15fafb95968132d1a6ee3617e99cca1fcf059"};

var exchangeInfoFormattedResult = {
  "DepositingRecordCount":0,
  "DepositingRecords":null,
  "WithdrawingRecordCount":0,
  "WithdrawingRecords":null,
  "microchain":"0x2e4694875de2a7da9c3186a176c52760d58694e4",
  "scsid":"0x50c15fafb95968132d1a6ee3617e99cca1fcf059"};

var tests = [{
    args: ['dbdbdb2cbd23b783741e8d7fcf51e459b497e4a6'],
    formattedArgs: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6'],
    result: exchangeInfoResult,
    formattedResult: exchangeInfoFormattedResult,
    call: 'scs_'+ method
  }, {
    args: ['dbdbdb2cbd23b783741e8d7fcf51e459b497e4a6'],
    formattedArgs: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6'],
    result: exchangeInfoResult,
    formattedResult: exchangeInfoFormattedResult,
      call: 'scs_'+ method
}];

testMethod.runTests('scs', method, tests);

