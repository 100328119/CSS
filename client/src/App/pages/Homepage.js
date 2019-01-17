import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import { withRouter }from "react-router-dom";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class Homepage extends React.Component {
  constructor(props){
    super(props);
    this.addClick = this.addClick.bind(this);
  }

  addClick(){
    console.log(this.props.history);
    this.props.history.push('/Pre_Calendar');
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container spacing={24}>
         <Grid item xs={10}>
            <h1>My calendar</h1>
          </Grid>
          <Grid item xs={2}>
            <Fab color="primary" aria-label="Add" onClick={this.addClick} >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
        <hr/>
      </div>
    )
  }
}

Homepage.contextTypes = {
  router: PropTypes.object.isRequired
};
// className={classes.fab}
Homepage.propTypes = {
 classes: PropTypes.object.isRequired,
 history: PropTypes.object.isRequired,
}

export default Homepage;
