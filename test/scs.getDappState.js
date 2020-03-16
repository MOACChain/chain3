var testMethod = require('./helpers/test.method.js');
// Returns the AppChain status on the connecting SCS
// 1 - the AppChain has some Dappon it.
// 0 - the AppChain is empty.
var method = 'getDappState';

// Return the AppChain DappState
var tests = [{
    args: ['dbdbdb2cbd23b783741e8d7fcf51e459b497e4a6'],
    formattedArgs: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6'],
    result: 1,
    formattedResult: 1,
    call: 'scs_'+ method
    },{// Notice the return values will have a block number 
        args: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6'],
        formattedArgs: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6'],
        result: '0',
        formattedResult: '0',
        call: 'scs_'+ method
    },{
        args: ['0XDBDBDB2CBD23B783741E8D7FCF51E459B497E4A6'], 
        formattedArgs: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6'],
        result: '1',
        formattedResult: '1',
        call: 'scs_'+ method
}];

testMethod.runTests('scs', method, tests);

