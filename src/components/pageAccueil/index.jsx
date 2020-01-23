import { flowRight } from 'lodash/fp';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import PageAccueil from '../utils/layoutAccueil/index';

import exempleJeu from '../../scss/images/exempleJeu.jpg'

const styles = () => ({
    form: {
        display: 'inline',
    },
    page: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    container: {
        position: 'absolute',
        top: 70,
        left: '50%',
        transform: 'translate(-50%, 0%)',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});

const Accueil = ({ classes, accountInfo }) => (
    <PageAccueil currentPage="Accueil">
        <div className={classes.page}>
            <div className={classes.container}>
                <h1>
                    Bienvenue sur le jeu Eirbmon ! 
                </h1>
                <p>L'objectif du projet Eirbmon était de créer un jeu ludique et exploitant la technologie
                     blockchain. Eirbmon est développé par une équipe de 7 élèves-ingénieurs de l'Enseirb-Matmeca :
                     <br/> - Cognet Damien, manager du projet
                     <br/> - Atia Abdessamad
                     <br/> - Deville Jean-Charles
                     <br/> - Malay Valérien
                     <br/> - Martin Lilia
                     <br/> - Micouin-Jorda David
                     <br/> - Rajaona Jean
                </p>
                <p>
                    Eirbmon est un jeu en ligne où l'objectif est de collecter, échanger et faire combattre
                     des petits monstres appelés eirbmon. Ces monstres ont des propriétés les définissan, parmis celles-ci : la filière et
                     des capacités d'attaques. Ces divers attributs sont plus ou moins rares et détermineront la 
                     rareté de chaque eirbmon.
                </p>
                <p>
                    Ces eirbmons ayant une valeur marchande, du fait de leur rareté et de la possibilité d'échange et d'achat 
                     de ces petits monstres, <strong>nous avons pris la sécurité du jeu au sérieux</strong>. Pour la garantir, 
                     nous avons décidé d'utiliser la Blockchain Ethereum pour stocker les données de valeur, à savoir les eirbmons 
                     , leurs caractéristiques ainsi que leurs propriétaires. Une base de donnée Mongo se charge de stocker les autres
                     données.
                </p>
                <p>
                    Nous avons voulu placer l'amusement de l'utilisateur au centre de notre projet. Pour cela, le jeu intègre un 
                    monde 2D qui a été développé avec Unity et intégré directement sur le site internet développé avec React : <br />
                    <center><img src={exempleJeu} alt="Image du jeu" width="50%" /></center>
                    <br />La carte du jeu, dont vous pouvez apercevoir une partie sur l'image ci-dessous, est une carte Proof of 
                     concept qui nous a permis d'expérimenter rapidement nos fonctionnalités implémentées. L'objectif final cependant 
                     est de réaliser une carte représentant notre école, l'Enseirb-Matmeca. Celle-ci est d'ores et déjà en cours de 
                     réalisation.
                    <br />Ainsi avec notre interface de jeu en ligne, nul besoin de télécharger aucun exécutable, 
                    inscrivez-vous et essayez sur le navigateur le jeu dès maintenant !
                </p>

            </div>

        </div>
    </PageAccueil>
);

Accueil.propTypes = {
    classes: PropTypes.shape({
        page: PropTypes.string,
        container: PropTypes.string,
    }).isRequired,
};

export default flowRight([
    withRouter,
    connect((state)=>({
        accountInfo: state.accountInfo
    })),
    withStyles(styles),
])(Accueil);
