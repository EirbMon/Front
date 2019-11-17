import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract'

import Page from '../../utils/layout/index';
import Eirbmon from '../../../../build/contracts/Eirbmon';

class Connect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            web3Provider: null,
            web3: null,
            contracts: {},
            account: '0x0',
        };
    }

    getAccounts() {
        this.initWeb3();
        this.web3.eth.getAccounts().then(console.log);
        this.initContract();
    }

    initWeb3() {

        if (typeof this.web3 !== 'undefined') {
            // If a web3 instance is already provided by Meta Mask.
            this.web3Provider = this.web3.currentProvider;
            this.web3 = new Web3(this.web3.currentProvider);
        } else {
            console.log("tesssssssst");
            this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            this.web3 = new Web3(this.web3Provider);
        }
    }

    initContract() {
       
            // Instantiate a new truffle contract from the artifact
            this.state.contracts.Eirbmon = TruffleContract(Eirbmon);
            // Connect provider to interact with contract
            this.state.contracts.Eirbmon.setProvider(this.web3Provider);

            return this.rende();
        
    }

    rende() {
        var eirbmonInstance;

        // Load account data
        this.web3.eth.getCoinbase(function (err, account) {
            if (err === null) {
                this.account = account;
                console.log("account" + account);
            }
        });

        // Load contract data
        this.state.contracts.Eirbmon.deployed().then(function (instance) {
            eirbmonInstance = instance;
            return eirbmonInstance.eirbmonsCount();
        }).then(function (eirbmonsCount) {
            console.log(eirbmonsCount)

        }).catch(function (error) {
            console.warn(error);
        });
    }


    render() {
      
        return (
            <Page currentPage="Jeux">
                <h1>Eirbmon</h1>
                <div>
                    <Button variant="outlined" color="primary" onClick={() => this.getAccounts().bind(this)}>
                        Get Account
                    </Button>
                </div>
                
              </Page>
        );
    }
}

Connect.propTypes = {
    dispatch: PropTypes.func,
};

export default connect()(Connect);
