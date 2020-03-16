var testMethod = require('./helpers/test.method.js');
// Returns the requested AppChain information on the connecting SCS.
var method = 'getAppChainInfo';

var appChainInfoResult = {
  "balance":"0x0",
  "blockReward":"0x1c6bf52634000",
  "bondLimit":"0xde0b6b3a7640000",
  "owner":"0xa8863fc8Ce3816411378685223C03DAae9770ebB",
  "scsList":["0xECd1e094Ee13d0B47b72F5c940C17bD0c7630326",
  "0x50C15fafb95968132d1a6ee3617E99cCa1FCF059",
  "0x1b65cE1A393FFd5960D2ce11E7fd6fDB9e991945"],
  "txReward":"0x174876e800",
  "viaReward":"0x9184e72a000"};

var appChainInfoFormattedResult = {
  "balance":"0x0",
  "blockReward":"0x1c6bf52634000",
  "bondLimit":"0xde0b6b3a7640000",
  "owner":"0xa8863fc8Ce3816411378685223C03DAae9770ebB",
  "scsList":["0xECd1e094Ee13d0B47b72F5c940C17bD0c7630326",
  "0x50C15fafb95968132d1a6ee3617E99cCa1FCF059",
  "0x1b65cE1A393FFd5960D2ce11E7fd6fDB9e991945"],
  "txReward":"0x174876e800",
  "viaReward":"0x9184e72a000"};;

var tests = [{
    args: ['dbdbdb2cbd23b783741e8d7fcf51e459b497e4a6'],
    formattedArgs: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6'],
    result: appChainInfoResult,
    formattedResult: appChainInfoFormattedResult,
    call: 'scs_'+ method
  }, {
    args: ['dbdbdb2cbd23b783741e8d7fcf51e459b497e4a6'],
    formattedArgs: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6'],
    result: appChainInfoResult,
    formattedResult: appChainInfoFormattedResult,
      call: 'scs_'+ method
}];

testMethod.runTests('scs', method, tests);

