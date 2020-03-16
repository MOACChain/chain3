var testMethod = require('./helpers/test.method.js');
// Returns the AppChain txpool content info on the connecting SCS.
var method = 'getTxpool';

var tests = [{
    args: ['dbdbdb2cbd23b783741e8d7fcf51e459b497e4a6'],
    formattedArgs: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6'],
    result: {"pending":{},"queued":{}},
    formattedResult: {"pending":{},"queued":{}},
    call: 'scs_'+ method
}];

testMethod.runTests('scs', method, tests);

