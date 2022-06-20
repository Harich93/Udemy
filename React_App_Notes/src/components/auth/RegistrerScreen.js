import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { setError, removeError} from '../../actions/ui'
import { startRegisterWhithEmailPassword } from '../../actions/auth';


export const RegistrerScreen = () => {

    const dispatch = useDispatch();

    const { msgError } = useSelector(  state => state.ui )

    const [ values, handleInputChange ] = useForm({ 
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = values;

    const handleRegister = ( e ) => { 
        e.preventDefault();

        if ( isFormValid() ) {
            dispatch( startRegisterWhithEmailPassword( email, password, name ) );
        }
    }

    const isFormValid = () => {

        if( name.trim().length <= 1 ) {
            dispatch( setError('Name is required') )
            return false
        } else if ( !validator.isEmail( email ) ) {
            dispatch( setError('Email is not valid') );
            return false;
        } else if ( password !== password2 || password.length < 5 ) {
            dispatch( setError('Password should be at least 6 characters and match each other') );
            return false;
        }

        dispatch( removeError() );
        return true;
        
    }

    return (

        <>

            <h3 className='auth__title'>Register</h3>

            {
                msgError &&
                (
                    <div className='auth__alert-error'>
                        { msgError }
                    </div>
                )

            }

            <form 
                onSubmit={ handleRegister }
                className='animate__animated animate__fadeIn animate__fast'    
            >

                <input
                    type='text'
                    placeholder='Name'
                    name='name'
                    value={ name }
                    autoComplete='off'
                    className='auth__input'
                    onChange={ handleInputChange }
                    
                />

                <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    value={ email }
                    autoComplete='off'
                    className='auth__input'
                    onChange={ handleInputChange }
                    
                />

                <input 
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={ password }
                    className='auth__input'
                    onChange={ handleInputChange }
                />

                <input 
                    type='password'
                    placeholder='Confirm password'
                    name='password2'
                    value={ password2 }
                    className='auth__input'
                    onChange={ handleInputChange }
                />

                <button
                    type='submit'
                    className='btn btn-primary btn-block mb-5 mt-1'
                >Register</button>

                <Link className='link' to='/auth/login' >
                    Already registered?
                </Link>
            </form>
        </>
    )
}
