pragma solidity ^0.6.3;

import "./TesterRegistry.sol";

contract ImmunityCertificate {
    string public description;
    struct Certificate {
        uint256 sampleTimestamp;
        uint256 expiryTimestamp;
        string testKitId;
        address tester;
        bool revoked;
    }

    mapping (bytes32=>Certificate[]) certificates;
    address public registryContract;

    event CertificateIssued(bytes32 indexed personHash, address indexed tester, string indexed testKitId, uint256 expiryTimestamp, uint256 index);
    event CertificateRevoked(bytes32 indexed personHash, address indexed tester, string indexed testKitId, address msgSender, uint256 index);

    constructor (address registry, string memory _description) public {
        registryContract = registry;
        description = _description;
    }

    modifier onlyTester {
        require(TesterRegistry(registryContract).isTester(msg.sender), "IC: Msg.sender must be an approved tester.");
        _;
    }

    modifier onlyAuthority {
        require(TesterRegistry(registryContract).isApprovingAuthority(msg.sender), "IC: Msg.sender must be an approving authority.");
        _;
    }

    function issue(bytes32 personHash, uint256 sampleTimestamp, uint256 expiryTimestamp, string memory testKitId) public onlyTester {
        certificates[personHash].push(Certificate({
            sampleTimestamp: sampleTimestamp,
            expiryTimestamp: expiryTimestamp,
            testKitId: testKitId,
            tester: msg.sender,
            revoked: false
        }));
        emit CertificateIssued(personHash, msg.sender, testKitId, expiryTimestamp, certificates[personHash].length - 1);
    }

    function revoke(bytes32 personHash, uint256 certIndex) public onlyAuthority {
        require(certIndex < certificates[personHash].length, "IC: Certificate does not exist.");
        Certificate storage cert = certificates[personHash][certIndex];
        require(!cert.revoked, "IC: Certificate is already revoked.");
        cert.revoked = true;
        emit CertificateRevoked(personHash, cert.tester, cert.testKitId, msg.sender, certIndex);
    }

    function getLastCertificate(bytes32 personHash) external view
    returns (
        uint256 sampleTimestamp,
        uint256 expiryTimestamp,
        string memory testKitId,
        address tester,
        bool revoked
    ) {
        uint256 length = certificates[personHash].length;
        require(length > 0, "IC: There are no certificates found.");
        Certificate storage cert = certificates[personHash][length - 1];
        sampleTimestamp = cert.sampleTimestamp;
        expiryTimestamp = cert.expiryTimestamp;
        testKitId = cert.testKitId;
        tester = cert.tester;
        revoked = cert.revoked;
    }

    function getCertificate(bytes32 personHash, uint256 certIndex) external view
    returns (
        uint256 sampleTimestamp,
        uint256 expiryTimestamp,
        string memory testKitId,
        address tester,
        bool revoked
    ) {
        uint256 length = certificates[personHash].length;
        require(certIndex < length, "IC: Certificate with given index does not exist.");
        Certificate storage cert = certificates[personHash][certIndex];
        sampleTimestamp = cert.sampleTimestamp;
        expiryTimestamp = cert.expiryTimestamp;
        testKitId = cert.testKitId;
        tester = cert.tester;
        revoked = cert.revoked;
    }

    function getCertificateAmount(bytes32 personHash) external view returns (uint256) {
        return certificates[personHash].length;
    }
}
