
import Web3 from 'web3';
import './abis';

const ethEnabled = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
        await window.ethereum.enable();
    }
    catch {
        return false;
    }
    onEthEnabled();
    return true;
  }
  return false;
}

const onEthEnabled = () => {
    const registryContract = new web3.eth.Contract(registryAbi, '0x98EBC26814A37148e12eef1C5905Ae1EcB348f8F');
    const certificateContract = new web3.eth.Contract(immunityCertificateAbi, '0xf0037db789d43d93BAfa6Df8e56a3813d4bF367a');

    const getSender = async () => ((await web3.eth.getAccounts())[0]);
    
    const isAuthority = async (address) => (await registryContract.methods.isApprovingAuthority(address).call());
    const isTester = async (address) => (await registryContract.methods.isTester(address).call());
    const getTesterId = async (address) => (await registryContract.methods.testerId(address).call());
    const approveTester = async (testerAddress, testerId) => (await registryContract.methods.approve(testerAddress, testerId).send({from: await getSender()}));
    
    const getLastCertificate = async (address) => {
        try {
            return await certificateContract.methods.getLastCertificate(address).call();
        } catch {
            return null;
        }
    };
    const issueCertificate = async (personHash, sampleTimestamp, expiryTimestamp, testKitId) => (
        await certificateContract.methods.issue(personHash, sampleTimestamp, expiryTimestamp, testKitId).send({from: await getSender()})
    );

    window.isAuthority = isAuthority;
    window.approveTester = approveTester;
    window.isTester = isTester;
    window.getTesterId = getTesterId;
    window.getLastCertificate = getLastCertificate;
    window.issueCertificate = issueCertificate;
};

window.ethEnabled = ethEnabled;
