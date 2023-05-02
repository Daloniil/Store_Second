import {styled} from "@mui/material/styles";
import {Box, Card, Typography} from "@mui/material";

export const ButtonsContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: "20px",
});

export const Price = styled(Typography)({
    textAlign: "right",
    fontWeight: 600,
    marginTop: "10px",
    fontSize: "16px",
    lineHeight: "1.5",
});

export const ItemName = styled(Typography)({
    fontSize: "16px",
    fontWeight: 600,
    marginBottom: "10px",
});

export const CardWrapper = styled(Card)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "16px",
    margin: "0px 20px 20px 0",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    minHeight: "400px",
    transition: "all 0.2s ease-out",
    "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.2)",
    },
});

export const CardsWrapper = styled(Box)({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "20px 0 0 25px",
    gap: "10px"
});