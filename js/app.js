App = {
    web3Provider: null,
    contracts: {},

    init: function () {
        return App.initWeb3();
    },

    initWeb3: function () {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            // Set the provider you want from Web3.providers
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(App.web3Provider);
        }

        return App.initContract();

    },

    initContract: function () {
        return App.bindEvents();
    },

    bindEvents: function () {
        return;
    },

    handleCreateTeam: function (event) {
        if (document.querySelectorAll('#country1 .notranslate:nth-child(1) > h3')[0] != null) {
            var c1 = document.querySelectorAll('#country1 .notranslate:nth-child(1) > h3')[0].innerHTML.slice(0, -5);
        } else {
            alert('Please select six countries!');
            return;
        }

        if (document.querySelectorAll('#country2 .notranslate:nth-child(1) > h3')[0] != null) {
            var c2 = document.querySelectorAll('#country2 .notranslate:nth-child(1) > h3')[0].innerHTML.slice(0, -5);
        } else {
            alert('Please select six countries!');
            return;
        }

        if (document.querySelectorAll('#country3 .notranslate:nth-child(1) > h3')[0] != null) {
            var c3 = document.querySelectorAll('#country3 .notranslate:nth-child(1) > h3')[0].innerHTML.slice(0, -5);
        } else {
            alert('Please select six countries!');
            return;
        }

        if (document.querySelectorAll('#country4 .notranslate:nth-child(1) > h3')[0] != null) {
            var c4 = document.querySelectorAll('#country4 .notranslate:nth-child(1) > h3')[0].innerHTML.slice(0, -5);
        } else {
            alert('Please select six countries!');
            return;
        }

        if (document.querySelectorAll('#country5 .notranslate:nth-child(1) > h3')[0] != null) {
            var c5 = document.querySelectorAll('#country5 .notranslate:nth-child(1) > h3')[0].innerHTML.slice(0, -5);
        } else {
            alert('Please select six countries!');
            return;
        }

        if (document.querySelectorAll('#country6 .notranslate:nth-child(1) > h3')[0] != null) {
            var c6 = document.querySelectorAll('#country6 .notranslate:nth-child(1) > h3')[0].innerHTML.slice(0, -5);
        } else {
            alert('Please select six countries!');
            return;
        }

        var teamName = document.getElementById('team-name').value;
        console.log(teamName);

        if (teamName == undefined || teamName == null || teamName.length == 0) {
            alert('Please pick a team name.')
            return;
        }

        if (teamName.length > 30) {
            alert("Team name is too long. Team names must be under 30 characters.")
            return;
        }

        var budget = document.getElementById('remainingBudget');
        console.log();

        if (budget.textContent.substr(1) < 0) {
            alert('Stay under the $12,000 budget!')
            return;
        }

        var abi = [
            {
                "constant": true,
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_teamName",
                        "type": "bytes32"
                    },
                    {
                        "name": "_country1",
                        "type": "bytes3"
                    },
                    {
                        "name": "_country2",
                        "type": "bytes3"
                    },
                    {
                        "name": "_country3",
                        "type": "bytes3"
                    },
                    {
                        "name": "_country4",
                        "type": "bytes3"
                    },
                    {
                        "name": "_country5",
                        "type": "bytes3"
                    },
                    {
                        "name": "_country6",
                        "type": "bytes3"
                    }
                ],
                "name": "createTeam",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "teamName",
                        "type": "bytes32"
                    },
                    {
                        "indexed": false,
                        "name": "country1",
                        "type": "bytes3"
                    },
                    {
                        "indexed": false,
                        "name": "country2",
                        "type": "bytes3"
                    },
                    {
                        "indexed": false,
                        "name": "country3",
                        "type": "bytes3"
                    },
                    {
                        "indexed": false,
                        "name": "country4",
                        "type": "bytes3"
                    },
                    {
                        "indexed": false,
                        "name": "country5",
                        "type": "bytes3"
                    },
                    {
                        "indexed": false,
                        "name": "country6",
                        "type": "bytes3"
                    }
                ],
                "name": "newTeamCreated",
                "type": "event"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "payTo",
                        "type": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "withdraw",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "payable": true,
                "stateMutability": "payable",
                "type": "fallback"
            }
        ];

        console.log("Your first country = " + c1);
        console.log("Your second country = " +c2);
        console.log("Your third country = " +c3);
        console.log("Your fourth country  = " +c4);
        console.log("Your fifth country = " +c5);
        console.log("Your sixth country = " +c6);

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                alert('Please connect to the Ethereum mainnet with the MetaMask browser extension!');
            }

            if (accounts.length == 0) {
                alert('Please connect to the Ethereum mainnet with the MetaMask browser extension!');
                return;
            } else {
                var account = accounts[0];
            }

            var newContract = web3.eth.contract(abi);
            var contractInstance = newContract.at('0x3BEBb8b23413088CD120AeBB3d1B88Fb8e394dE9');
            contractInstance.createTeam(teamName, c1, c2, c3, c4, c5, c6, {
                value: web3.toWei(.1, "ether"),
                gas: 43000,
                from: account
            }, function (error, result) {
                if (!error)

                    if (window.confirm('Team submitted to the Ethereum blockchain. Please allow a minute or two for the relevant block to be mined, then check Etherscan for verification - https://etherscan.io/address/0x3BEBb8b23413088CD120AeBB3d1B88Fb8e394dE9'))
                        location.reload();
                    else
                        console.log('');
                else
                    console.error(error);
            });
        });
    }
}

window.onload = function () {
    App.init();

    document.getElementById("createTeamButton").onclick = function() {
        App.handleCreateTeam();
    };
};