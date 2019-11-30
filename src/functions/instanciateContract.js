import EirbmonContract from '../build/contracts/Eirbmon.json';
import getWeb3 from './getWeb3'

function instanciateContract() {
    const promises = []
    var web3 = null;
    var accounts = null;
    var networkId = null;
    var instance = null;
    return getWeb3().then(res => {
        web3 = res;
        // Use web3 to get the user's accounts.
        return web3.eth.getAccounts().then(res => {
            accounts = res;
            promises.push(accounts);
        }).then(res => {
            return web3.eth.net.getId().then(res => {
                networkId = res;
                const deployedNetwork = EirbmonContract.networks[networkId];
                // Get the contract instance
                instance = new web3.eth.Contract(
                    EirbmonContract.abi,
                    deployedNetwork && deployedNetwork.address,
                );
                  // return web3, accounts, and contract instance the state.
                return { web3, accounts, contract: instance }
            })
        });

    })
      

        .catch((err) => {
            return err;
        });
}



export default instanciateContract();