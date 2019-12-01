import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Page from '../../utils/layout/index';
import instanciateContract from '../../../functions/instanciateContract';

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


  getEirbmon = (web3, accounts, contract) => {
   
    //Get the value from the contract to prove it worked.
    contract.methods._Eirbmons(1).call().then(res => {
     const response = res

      console.log(response);
      // Update state with the eirbmon result.
      this.setState({ eirbmons: response.name });
      this.setState({ web3 });
      

      console.log(contract.methods);
      //this function must be executed in the register function
      //await contract.methods.initAccount().send({ from: accounts[0] });

    });
  };


  componentDidMount = async () => {
    instanciateContract.then(res=>{
    this.setState({web3:res.web3});
    this.setState({accounts:res.accounts});
    this.getEirbmon(res.web3,res.accounts,res.contract);
  });
  }


  render() {

    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <Page currentPage="Jeux">
        <h1>Eirbmon</h1>
        <h1>Account : {this.state.accounts}</h1>
        <h1> eirbmons : {this.state.eirbmons}  </h1>

      </Page>
    );
  }
}

Connect.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(Connect);
