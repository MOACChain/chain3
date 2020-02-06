/*
 This file is part of web3.js.

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
 * @file getNetworkType.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 */

"use strict";

var _ = require('underscore');

var getNetworkType = function (callback) {
    var _this = this,
        id;


    return this.net.getId()
        .then(function (givenId) {

            id = givenId;

            return _this.getBlock(0);
        })
        .then(function (genesis) {
            var returnValue = 'private';

            // MOAC networks
            if (genesis.hash === '0x6b9661646439fab926ffc9bccdf3abb572d5209ae59e3390abf76aee4e2d49cd' &&
                id === 99) {
                returnValue = 'main';
            }
            if (genesis.hash === '0xb44f499ad420fbba3d4a7e05e9485cddc0e70e3e3622919a5d945e9ed4f7699c' &&
                id === 101) {
                returnValue = 'testnet';
            }
            if (_.isFunction(callback)) {
                callback(null, returnValue);
            }

            return returnValue;
        })
        .catch(function (err) {
            if (_.isFunction(callback)) {
                callback(err);
            } else {
                throw err;
            }
        });
};

module.exports = getNetworkType;
