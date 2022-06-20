import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../Actions/auth';
import { useForm } from '../../Hooks/useForm'
import { useViewPass } from '../../Hooks/useViewPass';
import '../../Style/login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ isView, handleChangeViewPass ] = useViewPass();
    const [ isViewLogin, handleChangeViewPassLogin ] = useViewPass();


    const [ formLoginValues, handleLoginInputChange ] = useForm({
        lEmail: '',
        lPassword: ''
    });
    
    const { lEmail, lPassword } = formLoginValues;

    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        rName: '',
        rEmail: '',
        rPassword: '',
        rPassword2:''
    });

    const { rName, rEmail, rPassword, rPassword2 } = formRegisterValues;


    const handleLogin = (e) => {
        e.preventDefault();
        dispatch( startLogin( lEmail, lPassword ) );
    }

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(rPassword, rPassword2)
        if( rPassword !== rPassword2 )
            return Swal.fire('Error','The passwords must be equal','error')
        
        dispatch( startRegister( rEmail, rPassword, rName ) );
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='lEmail'
                                onChange={ handleLoginInputChange }
                                value={ lEmail }
                            />
                        </div>
                        <div className="form-group">
                            <div className='input-group'>
                                <input
                                    type={ isViewLogin ? "text" : "password"}
                                    className="form-control pass"
                                    placeholder="Contraseña" 
                                    name='lPassword'
                                    value={ lPassword }
                                    onChange={ handleLoginInputChange }
                                />
                                <span className='input-group-addon' onClick={ handleChangeViewPassLogin }>
                                    {
                                        isViewLogin
                                            ? <i className="fas fa-eye-slash"></i>
                                            : <i className="fas fa-eye"></i>
                                    }
                                </span>

                            </div>
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='rName'
                                value={ rName }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='rEmail'
                                value={ rEmail }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <div className='input-group'>
                                <input
                                    type={ isView ? "text" : "password"}
                                    className="form-control pass"
                                    placeholder="Contraseña" 
                                    name='rPassword'
                                    value={ rPassword }
                                    onChange={ handleRegisterInputChange }
                                />
                                <span className='input-group-addon' onClick={ handleChangeViewPass }>
                                    {
                                        isView
                                            ? <i className="fas fa-eye-slash"></i>
                                            : <i className="fas fa-eye"></i>
                                    }
                                </span>

                            </div>
                        </div>

                        <div className="form-group">
                            <input
                                type={ isView ? "text" : "password"}
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='rPassword2'
                                value={ rPassword2 }
                                onChange={ handleRegisterInputChange } 
                                />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
