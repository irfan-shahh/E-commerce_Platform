import {Button,ButtonGroup,styled } from "@mui/material"
import { useState } from "react";

const Component = styled(ButtonGroup)`
    margin-top: 30px;
`;

const StyledButton = styled(Button)`
    border-radius: 50%;
`;
const GroupButton = ({handleDecrement,handleIncrement,quantity}) => {
    
  return (
    
    <Component>
        <StyledButton onClick={handleDecrement} disabled={quantity===1}>-</StyledButton>
        <StyledButton>{quantity}</StyledButton>
        <StyledButton onClick={handleIncrement}>+</StyledButton>
    </Component>
  )
}

export default GroupButton