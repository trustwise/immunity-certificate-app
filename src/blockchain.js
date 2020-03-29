
import Web3 from 'web3';
import './abis';

export const enableEthereum = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
        await window.ethereum.enable();
    }
    catch {
        return false;
    }
    onEthereumEnabled();
    return true;
  }
  return false;
}

const getRegistryContract = () => new web3.eth.Contract(registryAbi, '0x98EBC26814A37148e12eef1C5905Ae1EcB348f8F');
const getCertificateContract = () => new web3.eth.Contract(immunityCertificateAbi, '0xf0037db789d43d93BAfa6Df8e56a3813d4bF367a');

export const isAuthority = async (address) => (await getRegistryContract().methods.isApprovingAuthority(address).call());
export const isTester = async (address) => (await getRegistryContract().methods.isTester(address).call());


const onEthereumEnabled = () => {
    const registryContract = getRegistryContract();
    const certificateContract = getCertificateContract();

    const getSender = async () => ((await web3.eth.getAccounts())[0]);
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
    window.getTesterId = getTesterId;
    window.getLastCertificate = getLastCertificate;
    window.issueCertificate = issueCertificate;
};
