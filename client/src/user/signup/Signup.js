import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogContent'
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

import { signUp } from "../../redux/actions/authActions";
import useStyles from './styles'

const Signup = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [user, setUser] = useState({
        name: '',
        password: '',
        email: '',
        confirmPassword: ''
        // error: ''
    })
    //const [open, setOpen] = useState(false)

    const handleChange = name => e => {
        setUser({ ...user, [name]: e.target.value })
    }


    const userState = useSelector(state => state?.user)
    console.log(userState)

    const clear = () => {
        setUser({
            name: '',
            password: '',
            confirmPassword: '',
            email: '',
            // error: ''
        })
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        dispatch(signUp(user, history))
        clear()
        //history.push('/')//treba obrisati
        console.log(user)
    }

    return (<div>
        <Card className={classes.card}>
            <form onSubmit={clickSubmit}>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>Sign Up</Typography>
                    <TextField id='name' label='Name' className={classes.textField} value={user.name}
                        onChange={handleChange('name')} margin='normal' />
                    <br />
                    <TextField id='email' type='email' label='Email' className={classes.textField} value={user.email}
                        onChange={handleChange('email')} margin='normal' />
                    <br />
                    <TextField id='password' type='password' label='Password' className={classes.textField} value={user.password}
                        onChange={handleChange('password')} margin='normal' />
                    <br />
                    <TextField id='confirmPassword' type='confirmPassword' label='ConfirmPassword' className={classes.textField} value={user.confirmPassword}
                        onChange={handleChange('confirmPassword')} margin='normal' />
                    <br />


                    {user.error && (
                        <Typography component='p' color='error'>
                            <Icon color='error' className={classes.error}>error</Icon>
                            {user.error}
                        </Typography>
                    )}
                </CardContent>
                <CardActions>
                    <Button color='primary' variant='contained' type='submit'
                        className={classes.submit}>Submit</Button>
                </CardActions>
            </form>
        </Card>

        {/* DIALOG  */}

        {/* {!open && <Dialog >
            <DialogTitle>New Account</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    New account succesfully created.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Link to='/signin'>
                    <Button color='primary' autoFocus='autoFocus' >Sign In</Button>
                </Link>
            </DialogActions>
        </Dialog>} */}
    </div>
    )
}

export default Signup;