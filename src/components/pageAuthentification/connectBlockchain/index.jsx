import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract'

import Page from '../../utils/layout/index';
import Eirbmon from '../../../../build/contracts/Eirbmon.json';

class Connect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '0x0',
            eirbmons: [],
            contracts: {},
        };
        this.getAccounts = this.getAccounts.bind(this);
        this.initWeb3 = this.initWeb3.bind(this);
        this.rende = this.rende.bind(this);
        this.initContract = this.initContract.bind(this);
    }

    getAccounts() {
        this.initWeb3();
    }

    initWeb3() {

        if (typeof web3 !== 'undefined') {
            // If a web3 instance is already provided by Meta Mask.
            this.web3Provider = this.web3.currentProvider;
            this.web3 = new Web3(this.web3.currentProvider);
        } else {
            console.log("tessst");
            this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            this.web3 = new Web3(this.web3Provider);
        }
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
        var eirbmonInstance;
        self = this;
        // Load account data
        this.web3.eth.getCoinbase(function (err, account) {
            if (err === null) {
                self.setState({ account });
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


    render() {

        return (
            <Page currentPage="Jeux">
                <h1>Eirbmon</h1>
                <div>
                    <Button variant="outlined" color="primary" onClick={() => this.getAccounts()}>
                        Connect Blockchain
                    </Button>
                </div>
                <h1>Account : {this.state.account}</h1>
                <h1> eirbmons : {this.state.eirbmons}  </h1>

            </Page>
        );
    }
}

Connect.propTypes = {
    dispatch: PropTypes.func,
};

export default connect()(Connect);
