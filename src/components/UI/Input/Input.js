import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    let validationError = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    if (props.elementConfig.type === 'email' && props.invalid && props.touched) {
        validationError = <p>Please enter a valid email! format: example@example.com</p>;
    }

    if (props.elementConfig.type === 'password' && props.invalid && props.touched) {
        validationError = <p>Please enter a valid password! (minimum 6 characters)</p>;
    }

    if (props.elementConfig.placeholder === 'ZIP Code' && props.invalid && props.touched) {
        validationError = <p>Please enter a valid ZIP Code! format: 12345</p>;
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;                      // {...props} distributes any default html attributes on input
            break;                                          // therefore you only have to set the inputType prop and the normal attributes for that input type are automatically passed into it
        case ('textarea'):                                  // Reducing complexity
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('select'):                                      
            inputElement = (
            <select 
                className={inputClasses.join(' ')}    // doesn't need config as it only uses the options
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
            );
            break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;
    }   

    return (
    <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
        {validationError}
    </div>
    );
};

export default input;