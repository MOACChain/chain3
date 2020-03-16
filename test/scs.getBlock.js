var testMethod = require('./helpers/test.method.js');
// Returns the block content at the AppChain on the connecting SCS.
var method = 'getBlock';

var blkResult={
    "extraData":"0x",
    "hash":"0xc80cbe08bc266b1236f22a8d0b310faae3135961dbef6ad8b6ad4e8cd9537309",
    "number":"0x1",
    "parentHash":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "receiptsRoot":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "stateRoot":"0x1a065207da60d8e7a44db2f3b5ed9d3e81052a3059e4108c84701d0bf6a62292",
    "timestamp":"0x0",
    "transactions":[],
    "transactionsRoot":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"
};

var blkFormattedResult={
    "extraData":"0x",
    "hash":"0xc80cbe08bc266b1236f22a8d0b310faae3135961dbef6ad8b6ad4e8cd9537309",
    "number":"0x1",
    "parentHash":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "receiptsRoot":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "stateRoot":"0x1a065207da60d8e7a44db2f3b5ed9d3e81052a3059e4108c84701d0bf6a62292",
    "timestamp":"0x0",
    "transactions":[],
    "transactionsRoot":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"
};


var tests = [{
    args: ['dbdbdb2cbd23b783741e8d7fcf51e459b497e4a6',2],
    formattedArgs: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6','0x2',false],
    result: blkResult,
    formattedResult: blkFormattedResult,
    call: 'scs_'+ method + 'ByNumber'
// },{
//     args: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6','0x000000000000000000000000000000000000012d'],
//     formattedArgs: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6','0x000000000000000000000000000000000000012d','latest'],
//     result: blkResult,
//     formattedResult: blkFormattedResult,
//     call: 'scs_'+ method + 'ByNumber'
// },{
//     args: ['0XDBDBDB2CBD23B783741E8D7FCF51E459B497E4A6','0x000000000000000000000000000000000000012d','latest'], 
//     formattedArgs: ['0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6','0x000000000000000000000000000000000000012d', 'latest'],
//     result: blkResult,
//     formattedResult: blkFormattedResult,
//     call: 'scs_'+ method + 'ByNumber'
}];

testMethod.runTests('scs', method, tests);

