var testMethod = require('./helpers/test.method.js');
// Returns the requested AppChain adresses on the connecting SCS.
var method = 'getSCSId';

var tests = [{
    result: '0x9d711986ccc8c89db2dfaf0894acadeb5a383ee8',
    formattedResult: '0x9d711986ccc8c89db2dfaf0894acadeb5a383ee8',
    call: 'scs_'+ method
}, {
  result: '0x2328537bc943ab1a89fe94a4b562ee7a7b013634',
  formattedResult: '0x2328537bc943ab1a89fe94a4b562ee7a7b013634',
    call: 'scs_'+ method
}];

testMethod.runTests('scs', method, tests);

