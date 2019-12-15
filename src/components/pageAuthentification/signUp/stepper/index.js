import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import InstallMetamask from './installMetamask';
import ConfigMetamask from './configMetamask';
import ImportAccount from './importAccount';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

var pages = {
  'Installer Metamask': <InstallMetamask />,
  'Configurer Metamask': <ConfigMetamask />,
  'Importer votre compte de bêta testeur': <ImportAccount />
}

function getSteps() {
  return ['Installer Metamask', 'Configurer Metamask', 'Importer votre compte de bêta testeur'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Veuillez choisir l'installation adaptée à votre navigateur`;
    case 1:
      return "L'objectif ici est de connecter son compte Metamask à notre blockchain";
    case 2:
      return `L'objectif ici est d'obtenir un compte de bêta testeur`;
    default:
      return 'Unknown step';
  }
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              {pages[label]}
              <div className={classes.actionsContainer}>
                <Grid container
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                  spacing={3}>

                  <Grid item>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Précédent
                  </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Fin' : 'Suivant'}
                    </Button>
                  </Grid>

                </Grid>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>Félicitation ! Vous êtes enfin prêt à découvrir le monde merveilleux de EirbMon</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Recommencer le tutorial
          </Button>
          <Button onClick={handleReset} className={classes.button}>
            Terminer
          </Button>
        </Paper>
      )}
    </div>
  );
}
