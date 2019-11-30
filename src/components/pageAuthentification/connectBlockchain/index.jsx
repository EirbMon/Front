import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
//import Web3 from 'web3';
import TruffleContract from 'truffle-contract'
import Page from '../../utils/layout/index';
import Eirbmon from '../../../../build/contracts/Eirbmon.json';
import reducerAccess from '../../../actions/withReducerOnly/index';
import backAccess from '../../../actions/withApi/index';
import generateGetEirbmonUrl from '../../../middleWare/generateGetEirbmonUrl';

class Connect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '0x0',
            loading: false, // Loading button state
            eirbmons: [],
            contracts: {},
            web3Provider: null,
        };
        this.getAccounts = this.getAccounts.bind(this);
        this.initWeb3 = this.initWeb3.bind(this);
        this.rende = this.rende.bind(this);
        this.initContract = this.initContract.bind(this);
    }

    getAccounts() {
        // window.onload;
        // console.log(window.web3);
        this.initWeb3();
        
    }

    initWeb3() {
       
        // handleClick = async () => {
        //     const { onLoggedIn } = this.props;
        
        //     // Check if MetaMask is installed
        //     if (!(window as any).ethereum) {
        //       window.alert('Please install MetaMask first.');
        //       return;
        //     }
        
        //     if (!web3) {
        //       try {
        //         // Request account access if needed
        //         await (window as any).ethereum.enable();
        
        //         // We don't know window.web3 version, so we use our own instance of Web3
        //         // with the injected provider given by MetaMask
        //         web3 = new Web3((window as any).ethereum);
        //       } catch (error) {
        //         window.alert('You need to allow MetaMask.');
        //         return;
        //       }
        //     }

        // if (typeof web3 !== 'undefined') {
        //     // If a web3 instance is already provided by Meta Mask.
        //     this.setState({web3Provider : web3.currentProvider});
        //     web3 = new Web3(web3.currentProvider);
        //     window.ethereum.enable().catch(error => {
        //         // User denied account access
        //         console.log(error)
        //     })
          
        // } else {
        //     web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        //     web3 = new Web3(this.web3Provider);
        // }
    

        web3.eth.getAccounts(accounts=>{
           if (err === null) {
               self.setState({ account });
                console.log("account : " + accounts);
            }
        });
        this.initContract();
    }

    initContract() {

        // Instantiate a new truffle contract from the artifact
        this.eirbmon = TruffleContract(Eirbmon);
        // Connect provider to interact with contract
       this.eirbmon.setProvider(this.web3Provider);

       return this.rende();

    }

    rende() {
        var {dispatch} = this.props;
        self = this;
        // Load account data
        web3.eth.getCoinbase(function (err, account) {
            if (err === null) {
                self.setState({ account });
                dispatch(reducerAccess.SetAccountInfo(account));
                console.log("account : " + account);
            }
        });

        // Load contract data

        self.eirbmon.deployed().then(function (instance) {
            self.eirbmonInstance = instance;
            return self.eirbmonInstance.eirbmonsCount();
        }).then(function (eirbmonsCount) {
            console.log(eirbmonsCount);
            for (var i = 1; i <= eirbmonsCount; i++) {
                self.eirbmonInstance._Eirbmons(i).then((eirbmon) => {
                    const eirbmons = [...self.state.eirbmons]
                   eirbmons.push(eirbmon[1]);
                    self.setState({ eirbmons: eirbmons })

                    console.log(eirbmon);
                });
            }
        }).catch(function (error) {
            console.warn(error);
        });
    }

    getEirbmons(){
        var {dispatch, accountInfo} = this.props;
        
        console.log(accountInfo);
        dispatch(backAccess.GetEirbmon(generateGetEirbmonUrl(accountInfo.accountUrl)));
    }

    render() {

        return (
            <Page currentPage="Jeux">
                <h1>Eirbmon</h1>
                <div>
                    <Button variant="outlined" color="primary" onClick={() => this.getAccounts()}>
                        Connect Blockchain
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => this.getEirbmons()}>
                        Get Eirbmons
                    </Button>
                </div>
                <h1> Account : {this.state.account} </h1>
                <h1> eirbmons : {this.state.eirbmons} </h1>
                <h1> eirbmons from back : {this.props.eirbmonsInfo.eirbmons}  </h1>

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
