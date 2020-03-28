pragma solidity ^0.6.3;

contract TesterRegistry {
    mapping(address=>bool) public isTester;
    mapping(address=>bool) public isApprovingAuthority;
    mapping(address=>string) public testerId;

    event TesterApproved(address indexed tester, address indexed authority);
    event TesterRevoked(address indexed tester, address indexed authority);

    constructor (address[] memory authorities) public {
        for (uint256 i = 0; i < authorities.length; ++i) {
            isApprovingAuthority[authorities[i]] = true;
        }
    }

    modifier onlyAuthority {
        require(isApprovingAuthority[msg.sender], "TR: Msg.sender must be an approving authority.");
        _;
    }

    function approve(address tester, string memory id) public onlyAuthority {
        require(!isTester[tester], "TR: Already a tester.");
        isTester[tester] = true;
        testerId[tester] = id;
        emit TesterApproved(tester, msg.sender);
    }

    function revoke(address tester) public onlyAuthority {
        require(isTester[tester], "TR: Not a tester.");
        isTester[tester] = false;
        delete testerId[tester];
        emit TesterRevoked(tester, msg.sender);
    }
}
