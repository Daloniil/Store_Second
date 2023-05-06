import {Box, Typography} from "@mui/material";

const WaitOrderPage = () => {
    return (
        <Box sx={{
            backgroundColor: '#1c54b2',
            width: "300px",
            height: '200px',
            borderRadius: '8px',
            color: 'white',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin:'0 auto 0 auto',
        }}>
            <Typography variant="h5" sx={{margin: '20px 0 20px 0', textAlign: 'center'}}>
                Ваше замовлення прийнято !
            </Typography>
            <Typography variant="h6" sx={{margin: '0 5px 20px 5px', textAlign: 'center'}}>
                Очікуйте дзвінка від оператора
            </Typography>
        </Box>
    )
}

export default WaitOrderPage