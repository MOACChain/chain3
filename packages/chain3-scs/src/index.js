/*
 This file is part of chain3.js.

 web3.js is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 web3.js is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Lesser General Public License for more details.

 You should have received a copy of the GNU Lesser General Public License
 along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * @file index.js
 * @author moac tech
 * @date 2019
 * Used to connect with SCS server to provide RPC methods
 * 2020/01/20, the follow methods are implemented in SCS RPC methods
    scs_directCall
    scs_getBalance
    scs_getBlock
    scs_getBlockNumber
    scs_getDappList
    scs_getDappState
    scs_getAppChainInfo
    scs_getAppChainList
    scs_getNonce
    scs_getSCSId
    scs_getTransactionByHash
    scs_getTransactionByNonce
    scs_getReceiptByHash
    scs_getReceiptByNonce
    scs_getExchangeByAddress
    scs_getExchangeInfo
    scs_getTxpool

Major changes comparing with mc:
1. Use AppChain object to replace the Contract object(TODO);
2. 
 */

"use strict";

var _ = require('underscore');
var core = require('web3-core');
var helpers = require('web3-core-helpers');
// var Subscriptions = require('web3-core-subscriptions').subscriptions;
var Method = require('../../chain3-core-method'); 
var utils = require('web3-utils');
var Net = require('web3-net');

var Personal = require('web3-eth-personal');
var BaseContract = require('../../chain3-mc-contract');//

// var abi = require('web3-eth-abi');

var getNetworkType = require('./getNetworkType.js');
var formatter = helpers.formatters;
var Accounts = require('../../chain3-mc-accounts');

// SCS block rom number or hash, notice args[0] should be the AppChain address
var blockCall = function (args) {
    return (_.isString(args[1]) && args[1].indexOf('0x') === 0) ? "scs_getBlockByHash" : "scs_getBlockByNumber";
};

var transactionFromBlockCall = function (args) {
    return (_.isString(args[1]) && args[1].indexOf('0x') === 0) ? 'scs_getTransactionByBlockHashAndIndex' : 'scs_getTransactionByBlockNumberAndIndex';
};

var getTransactionCall = function (args) {
    // console.log("args[1]", args[1], args.length);
    return (_.isString(args[1]) && args[1].indexOf('0x') === 0) ? 'scs_getTransactionByHash' : 'scs_getTransactionByNonce';
};

var getReceiptCall = function (args) {
    return (_.isString(args[1]) && args[1].indexOf('0x') === 0) ? 'scs_getReceiptByHash' : 'scs_getReceiptByNonce';
};

// Object constructor for the SCS server
var Scs = function SCSServer() {
    var _this = this;

    // sets _requestmanager
    // 
    core.packageInit(this, arguments);

    // overwrite setProvider
    var setProvider = this.setProvider;
    this.setProvider = function () {
        setProvider.apply(_this, arguments);
        _this.net.setProvider.apply(_this, arguments);
        _this.personal.setProvider.apply(_this, arguments);
        _this.accounts.setProvider.apply(_this, arguments);
        // _this.Contract.setProvider(_this.currentProvider, _this.accounts);
    };

    // For SCS, default account is the SCSId
    // Default AppChain is the first AppChain on the SCS server
    var defaultAccount = null;
    var defaultBlock = 'latest';
    var defaultAppChain = null; 

    Object.defineProperty(this, 'defaultAccount', {
        get: function () {
            return defaultAccount;
        },
        set: function (val) {
            if(val) {
                defaultAccount = utils.toChecksumAddress(formatter.inputAddressFormatter(val));
            }

            // also set on the AppChain object
            // _this.Contract.defaultAccount = defaultAccount;
            _this.personal.defaultAccount = defaultAccount;

            // update defaultBlock
            methods.forEach(function(method) {
                method.defaultAccount = defaultAccount;
            });

            return val;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'defaultBlock', {
        get: function () {
            return defaultBlock;
        },
        set: function (val) {
            defaultBlock = val;
            // also set on the Contract object
            // _this.Contract.defaultBlock = defaultBlock;
            _this.personal.defaultBlock = defaultBlock;

            // update defaultBlock
            methods.forEach(function(method) {
                method.defaultBlock = defaultBlock;
            });

            return val;
        },
        enumerable: true
    });


    // this.clearSubscriptions = _this._requestManager.clearSubscriptions;

    // add net
    this.net = new Net(this.currentProvider);
    // add chain detection
    this.net.getNetworkType = getNetworkType.bind(this);

    // add accounts
    this.accounts = new Accounts(this.currentProvider);

    // add personal
    this.personal = new Personal(this.currentProvider);
    this.personal.defaultAccount = this.defaultAccount;

    // create a proxy Contract type for this instance, as a Contract's provider
    // is stored as a class member rather than an instance variable. If we do
    // not create this proxy type, changing the provider in one instance of
    // chain3-scs would subsequently change the provider for _all_ contract
    // instances!
    var self = this;
    // The following methods have been 
    // scs_directCall
    // scs_getBalance
    // scs_getBlock
    // scs_getBlockNumber
    // scs_getDappList
    // scs_getDappState
    // scs_getAppChainInfo
    // scs_getAppChainList
    // scs_getNonce
    // scs_getSCSId
    // scs_getTransactionByHash
    // scs_getTransactionByNonce
    // scs_getReceiptByHash
    // scs_getReceiptByNonce
    // scs_getExchangeByAddress
    // scs_getExchangeInfo
    // scs_getTxpool

    var methods = [
        new Method({
            name: 'directCall',
            call: 'scs_directCall',
            params: 2,
            inputFormatter: [formatter.inputAddressFormatter, null]
         }),
        new Method({
            name: 'getAppChainInfo',
            call: 'scs_getAppChainInfo',
            params: 1,
            inputFormatter: [formatter.inputAddressFormatter]
         }),
        new Method({
            name: 'getDappState',
            call: 'scs_getDappState',
            params: 1,
            inputFormatter: [formatter.inputAddressFormatter]
         }),
         new Method({
            name: 'getPastLogs',
            call: 'scs_getLogs',
            params: 1,
            inputFormatter: [formatter.inputLogFormatter],
            outputFormatter: formatter.outputLogFormatter
         }),
        new Method({
            name: 'protocolVersion',
            call: 'scs_protocolVersion',
            params: 0
        }),
        new Method({
            name: 'getSCSId',
            call: 'scs_getSCSId',
            params: 0
        }),
        new Method({
            name: 'getDatadir',
            call: 'scs_datadir',
            params: 0
        }),
        new Method({
            name: 'getDappAddrList',
            call: 'scs_getDappAddrList',
            params: 0,
            outputFormatter: utils.toChecksumAddress
        }),
        new Method({//to be compatible with old RPC method, will be removed in later version
            name: 'getMicroChainList',
            call: 'scs_getMicroChainList',
            params: 0,
            outputFormatter: utils.toChecksumAddress
        }),
        new Method({
            name: 'isSyncing',
            call: 'scs_syncing',
            params: 0,
            outputFormatter: formatter.outputSyncingFormatter
        }),
        new Method({
            name: 'getDappList',
            call: 'scs_getDappList',
            params: 1,
            inputFormatter: [formatter.inputAddressFormatter],
            outputFormatter: utils.toChecksumAddress
        }),
        new Method({
            name: 'getAppChainList',// depreted getMicroChainList
            call: 'scs_getAppChainList',
            params: 0,
            outputFormatter: utils.toChecksumAddress
        }),
        new Method({
            name: 'getBlockNumber',
            call: 'scs_getBlockNumber',
            params: 1,
            inputFormatter: [formatter.inputAddressFormatter],
            outputFormatter: utils.hexToNumber
        }),
        new Method({
            name: 'getNonce',
            call: 'scs_getNonce',
            params: 2,
            inputFormatter: [formatter.inputAddressFormatter, formatter.inputAddressFormatter],
            outputFormatter: formatter.outputBigNumberFormatter
        }),
        new Method({
            name: 'getBalance',
            call: 'scs_getBalance',
            params: 3,
            inputFormatter: [formatter.inputAddressFormatter, formatter.inputAddressFormatter, formatter.inputDefaultBlockNumberFormatter],
            outputFormatter: formatter.outputBigNumberFormatter
        }),
        new Method({
            name: 'getBlock',
            call: blockCall,
            params: 3,
            inputFormatter: [formatter.inputAddressFormatter, formatter.inputBlockNumberFormatter, function (val) { return !!val; }],
            // outputFormatter: formatter.outputBlockFormatter
        }),
        new Method({
            name: 'getBlockByNumber',
            call: 'scs_getBlockByNumber',
            params: 2,
            inputFormatter: [formatter.inputAddressFormatter, formatter.inputBlockNumberFormatter]
            // outputFormatter: formatter.outputBlockFormatter
        }),
        new Method({
            name: 'getTransactionByNonce',
            call: 'scs_getTransactionByNonce',
            params: 3,
            inputFormatter: [formatter.inputAddressFormatter, formatter.inputAddressFormatter, null],
            // outputFormatter: formatter.outputTransactionFormatter
        }),
        new Method({
            name: 'getTransactionByHash',
            call: 'scs_getTransactionByHash',
            params: 2,
            inputFormatter: [formatter.inputAddressFormatter, null]
            // outputFormatter: formatter.outputTransactionFormatter
        }),
        new Method({
            name: 'getTransactionFromBlock',
            call: transactionFromBlockCall,
            params: 3,
            inputFormatter: [formatter.inputAddressFormatter, formatter.inputBlockNumberFormatter, utils.numberToHex],
            outputFormatter: formatter.outputTransactionFormatter
        }),
        new Method({
            name: 'getReceiptByHash',
            call: 'scs_getReceiptByHash',
            params: 2,
            inputFormatter: [formatter.inputAddressFormatter, null],
            // outputFormatter: formatter.outputTransactionReceiptFormatter
        }),
        new Method({
            name: 'getReceiptByNonce',
            call: 'scs_getReceiptByNonce',
            params: 3,
            inputFormatter: [formatter.inputAddressFormatter, formatter.inputAddressFormatter,utils.numberToHex],
            // outputFormatter: formatter.outputTransactionReceiptFormatter
        }),
        new Method({
            name: 'getTxpool',
            call: 'scs_getTxpool',
            params: 1,
            inputFormatter: [formatter.inputAddressFormatter]
        }),
        // AppChain address + account address
        new Method({
            name: 'getExchangeByAddress',
            call: 'scs_getExchangeByAddress',
            params: 2,
            inputFormatter: [formatter.inputAddressFormatter,formatter.inputAddressFormatter]
        }),
        new Method({
            name: 'getExchangeInfo',
            call: 'scs_getExchangeInfo',
            params: 1,
            inputFormatter: [formatter.inputAddressFormatter]
        }),
        new Method({
            name: 'getTransactionCount',
            call: 'scs_getTransactionCount',
            params: 3,
            inputFormatter: [formatter.inputAddressFormatter, formatter.inputAddressFormatter, formatter.inputDefaultBlockNumberFormatter],
            outputFormatter: utils.hexToNumber
        })

    ];

    // Attach the deafult properties to the methods
    methods.forEach(function(method) {
        method.attachToObject(_this);
        method.setRequestManager(_this._requestManager, _this.accounts); // second param means is accounts (necessary for wallet signing)
        method.defaultBlock = _this.defaultBlock;
        method.defaultAccount = _this.defaultAccount;
        method.defaultAppChain = _this.defaultAppChain;// Address of the AppChain, default is the 1st in the list
    });

};

core.addProviders(Scs);

module.exports = Scs;

