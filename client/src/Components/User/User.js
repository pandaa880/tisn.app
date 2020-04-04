import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Style from '../Style/Style';

const User = () => {
  const style = Style();

  return (
    <Grid container spacing={1} direction="column" className={style.grow}>
      <Grid item className={style.center}>
        <Typography variant="h1">
          User
        </Typography>
      </Grid>
    </Grid>
  );
};

export default User;
