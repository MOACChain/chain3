var testMethod = require('./helpers/test.method.js');
// Execute the public view functions  AppChain adresses on the connecting SCS.
var method = 'directCall';

var tests = [{
  args: ['dbdbdb2cbd23b783741e8d7fcf51e459b497e4a6', '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'],
  formattedArgs: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6','0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'],
    result: '0x0000000000000000000000000000000000000000000000000000000000000015',
    formattedResult: '0x0000000000000000000000000000000000000000000000000000000000000015',
    call: 'scs_'+ method
}];

testMethod.runTests('scs', method, tests);

