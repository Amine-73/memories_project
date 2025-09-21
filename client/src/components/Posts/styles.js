import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    // Correct for MUI v5
    margin: 2,
  },
  actionDiv: {
    textAlign: 'center',
  },
}));

export default useStyles;