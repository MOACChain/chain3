var chai = require('chai');
var assert = chai.assert;
var u = require('./helpers/test.utils.js');

/*
 * Test the scs package method names
*/
var Scs = require('../packages/chain3-scs');
var scs = new Scs();

describe('scs', function() {
    describe('methods', function() {
        u.methodExists(scs, 'directCall');
        u.methodExists(scs, 'getBalance');
        u.methodExists(scs, 'getBlock');
        u.methodExists(scs, 'getBlockNumber');
        u.methodExists(scs, 'getDappList');
        u.methodExists(scs, 'getDappState');
        u.methodExists(scs, 'getAppChainList');
        u.methodExists(scs, 'getAppChainInfo');
        u.methodExists(scs, 'getNonce');
        u.methodExists(scs, 'getSCSId');        
        u.methodExists(scs, 'getExchangeByAddress');
        u.methodExists(scs, 'getExchangeInfo');        
        u.methodExists(scs, 'getReceiptByNonce');
        u.methodExists(scs, 'getReceiptByHash');
        u.methodExists(scs, 'getTxpool');
        // u.methodExists(scs, 'sendTransaction');
        // u.methodExists(scs, 'call');

        // u.methodExists(scs, 'getTransaction');
        // u.methodExists(scs, 'getBlockTransactionCount');

        // u.methodExists(scs, 'getAccounts');
        // u.methodExists(scs, 'getBlockNumber');

        // u.methodExists(scs, 'getProtocolVersion');

        u.methodExists(scs, 'setProvider');
        // Property tests
        u.propertyExists(scs, 'givenProvider');
        u.propertyExists(scs, 'defaultBlock');
        u.propertyExists(scs, 'defaultAccount');

        // u.propertyExists(scs, 'net');
        // u.methodExists(scs.net, 'getId');
        // u.methodExists(scs.net, 'isListening');
        // u.methodExists(scs.net, 'getPeerCount');

        // u.propertyExists(scs, 'personal');
        // u.methodExists(scs.personal, 'sendTransaction');
        // u.methodExists(scs.personal, 'newAccount');
        // u.methodExists(scs.personal, 'unlockAccount');
    });
});

