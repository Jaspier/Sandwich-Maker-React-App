import React from 'react';

import sandwichLogo from '../../assets/images/sandwich-logo.PNG';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={sandwichLogo} alt="MySandwich"/>
    </div>
);

export default logo;