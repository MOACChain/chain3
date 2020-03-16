var testMethod = require('./helpers/test.method.js');
// Returns the nonce of the account at the AppChain on the connecting SCS
var method = 'getNonce';

var tests = [{
    args: ['dbdbdb2cbd23b783741e8d7fcf51e459b497e4a6','0xcc2f9fac358ba1c8792a7ad47bccb037a92eb8a3'],
    formattedArgs: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6','0xcc2f9fac358ba1c8792a7ad47bccb037a92eb8a3'],
    result: 230,
    formattedResult: '230',
    call: 'scs_'+ method
},{// Notice the return values will have a block number 
    args: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6','0xcc2f9fac358ba1c8792a7ad47bccb037a92eb8a3'],
    formattedArgs: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6','0xcc2f9fac358ba1c8792a7ad47bccb037a92eb8a3'],
    result: 230,
    formattedResult: '230',
        call: 'scs_'+ method
    },{
    args: ['0XDBDBDB2CBD23B783741E8D7FCF51E459B497E4A6','0xcc2f9fac358ba1c8792a7ad47bccb037a92eb8a3'], 
    formattedArgs: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6','0xcc2f9fac358ba1c8792a7ad47bccb037a92eb8a3'],
    result: '0x31981',
    formattedResult: '203137',
    call: 'scs_'+ method
}];

testMethod.runTests('scs', method, tests);

