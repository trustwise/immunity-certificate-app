immunityCertificateAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "registry",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "personHash",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "tester",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "string",
				"name": "testKitId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "expiryTimestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "CertificateIssued",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "personHash",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "tester",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "string",
				"name": "testKitId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "msgSender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "CertificateRevoked",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "personHash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "sampleTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expiryTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "testKitId",
				"type": "string"
			}
		],
		"name": "issue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "personHash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "certIndex",
				"type": "uint256"
			}
		],
		"name": "revoke",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "description",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "personHash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "certIndex",
				"type": "uint256"
			}
		],
		"name": "getCertificate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "sampleTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expiryTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "testKitId",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "tester",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "revoked",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "personHash",
				"type": "bytes32"
			}
		],
		"name": "getCertificateAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "personHash",
				"type": "bytes32"
			}
		],
		"name": "getLastCertificate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "sampleTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expiryTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "testKitId",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "tester",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "revoked",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "registryContract",
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
];

registryAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tester",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tester",
				"type": "address"
			}
		],
		"name": "revoke",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "authorities",
				"type": "address[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "tester",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "authority",
				"type": "address"
			}
		],
		"name": "TesterApproved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "tester",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "authority",
				"type": "address"
			}
		],
		"name": "TesterRevoked",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isApprovingAuthority",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isTester",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "testerId",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];