import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { DialogActions } from '@material-ui/core';

//import theme from '../theme';
import GoogleIcon from './GoogleIcon';
import useStyles from './styles';
import { signIn } from '../../redux/actions/authActions';

import { GoogleLogin } from 'react-google-login';


const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',        
    });

    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
  

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }


    const googleSuccess = async (res) => {
        const result = res?.profileObj; //Wil return undefined, if reject response
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } })//type is ActionType, data is payload
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = (error) => {
        console.log(error)
        console.log("Google Sign In was unseccessful. Try again!")
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        dispatch(signIn(values, history))

    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant='h6' className={classes.title}>
                    Sign In
                </Typography>
                <TextField id='email' type='email' label='Email' className={classes.textFiled} value={values.email}
                    onChange={handleChange('email')} margin='normal' />
                <br />
                <TextField id='password' type='password' label='Password' className={classes.textField} value={values.password}
                    onChange={handleChange('password')} margin='normal' />
                <br />
                {values.error && (
                    <Typography component='p' color='error'>
                        <Icon color='error' className={classes.error}>error</Icon>{values.error}
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                <Button color='primary' variant='contained' onClick={clickSubmit}
                    className={classes.submit}>Submit</Button>
            </CardActions>
            <DialogActions>
            <Typography className={classes.signup} >You don't have Account?<Link to='/signup'> Sign Up </Link></Typography>
            
                    {/* <Button color='primary' autoFocus='autoFocus' >Sign Up</Button> */}
               
            </DialogActions>
            <GoogleLogin clientId='24223075297-4e0h3k84nv2pb162pmobu5c0g5rs92ch.apps.googleusercontent.com' render={(renderProps) => (
                <Button className={classes.googleButton} color='primary' fullwith='true' onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<GoogleIcon />} variant='contained' >
                    Google Sing In
                </Button>
            )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy='single_host_origin'
            />
        </Card>
    )
}


export default Signin;