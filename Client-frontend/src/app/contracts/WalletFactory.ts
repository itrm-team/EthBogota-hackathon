export default { abi:[
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "imp",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "accountHash",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "wallet",
          "type": "address"
        }
      ],
      "name": "WalletAlreadyExists",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "wallet",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "firstOwner",
          "type": "address"
        }
      ],
      "name": "NewWallet",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "WALLET_IMPLEMENTATION",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "accountHash",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "initialOwner",
          "type": "address"
        },
        {
          "internalType": "address[]",
          "name": "initialGuardians",
          "type": "address[]"
        }
      ],
      "name": "newWallet",
      "outputs": [
        {
          "internalType": "address",
          "name": "wallet",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "accountHash",
          "type": "bytes32"
        }
      ],
      "name": "getCounterfactualWallet",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]}