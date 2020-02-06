var testMethod = require('./helpers/test.appChainMethod.js');
var Scs = require('../packages/chain3-scs');

var scs = new Scs();

var method = 'getBalance';

var tests = [
{
    args: ['dbdbdb2cbd23b783741e8d7fcf51e459b497e4a6','0x000000000000000000000000000000000000012d', 2],
    formattedArgs: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6','0x000000000000000000000000000000000000012d', '0x2'],
    result: '0x31981',
    formattedResult: '203137',
    call: 'scs_'+ method
},
{
    args: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6','0x000000000000000000000000000000000000012d'],
    formattedArgs: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6','0x000000000000000000000000000000000000012d', 'latest'],
    result: '0x31981',
    formattedResult: '203137',
    call: 'scs_'+ method
},
{
    args: ['0XDBDBDB2CBD23B783741E8D7FCF51E459B497E4A6','0x000000000000000000000000000000000000012d','latest'], 
    formattedArgs: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6','0x000000000000000000000000000000000000012d', 'latest'],
    result: '0x31981',
    formattedResult: '203137',
    call: 'scs_'+ method
}];

testMethod.runTests('scs', method, tests);

