import React from 'react';
import {Paper} from "@mui/material";
import {styled} from "@mui/material/styles";

const ShadowBox = styled(Paper)(({ theme , width, minWidth}) => ({
    padding: theme.spacing(1.8),
    boxShadow: theme.customShadows.z1,
    display: 'inline-block',
    borderRadius: '10px',
    maxWidth:minWidth,
    width:width
}));

export default  ShadowBox;