import {styled} from "@material-ui/core/styles";
import {Box, Typography} from "@material-ui/core";

export const ProductTitle = styled(Typography)({
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color:'dark'
});

export const ProductDescription = styled(Typography)({
    fontSize: '16px',
    marginBottom: '10px',
});

export const ProductPrice = styled(Typography)({
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: '20px',
});

export const Slide = styled(Box)({
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)',
    padding: '10px',
    margin: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '200px',
    maxHeight: '200px',
});