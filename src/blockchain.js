
const Web3 = require("web3");

const ethEnabled = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
        await window.ethereum.enable();
    }
    catch {
        return false;
    }
    return true;
  }
  return false;
}

window.ethEnabled = ethEnabled;
