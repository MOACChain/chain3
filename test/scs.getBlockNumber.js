var testMethod = require('./helpers/test.method.js');
// Returns the most recent block number of the AppChain on the connecting SCS.
var method = 'getBlockNumber';

var tests = [{
    args: ['dbdbdb2cbd23b783741e8d7fcf51e459b497e4a6'],
    formattedArgs: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6'],
    result: '0xb',
    formattedResult: 11,
    call: 'scs_getBlockNumber'
}];

testMethod.runTests('scs', method, tests);
