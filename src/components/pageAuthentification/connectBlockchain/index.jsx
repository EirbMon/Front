import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Page from '../../utils/layout/index';
import EirbmonContract from '../../../build/contracts/Eirbmon.json';
import getWeb3 from '../../../getWeb3'

class Connect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: null, 
            accounts: null,
            contract: null,
            eirbmons: null,
          };
    }



  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      this.setState({ account:accounts[0] });
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = EirbmonContract.networks[networkId];
      const instance = new web3.eth.Contract(
        EirbmonContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.getEirbmon);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };


  getEirbmon = async () => {
    const { accounts, contract } = this.state;

    // Get the value from the contract to prove it worked.
    const response = await contract.methods._Eirbmons(1).call();
  
    console.log(response);
    // Update state with the eirbmon result.
    this.setState({ eirbmons: response.name });
 
    console.log(contract.methods);
    //this function must be executed in the register function
  // await contract.methods.initAccount().send({ from: accounts[0] });
 };
   

    getEirbmons(){
        var {dispatch, accountInfo} = this.props;
        
        console.log(accountInfo);
        dispatch(backAccess.GetEirbmon(generateGetEirbmonUrl(accountInfo.accountUrl)));
    }

    render() {

        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
          }
          return (
            <Page currentPage="Jeux">
                <h1>Eirbmon</h1>
                <h1>Account : {this.state.account}</h1>
                <h1> eirbmons : {this.state.eirbmons}  </h1>

            </Page>
        );
    }
}
function select(state){
    return {
        accountInfo: state.accountInfo,
        eirbmonsInfo: state.eirbmonsInfo
    }
}

Connect.propTypes = {
    dispatch: PropTypes.func,
};

export default connect(select)(Connect);
