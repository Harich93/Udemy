import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { customStyles } from '../../Helpers/modal-custom';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import { closeModal } from '../../Actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { eventRemoveActive,  startEventAddNew, startEventUpdate } from '../../Actions/event';


process.env.NODE_ENV !== 'test' && Modal.setAppElement('#root');

const now = moment().minute(0).second(0).add( 1, 'hours');
const nowPlus = moment( now ).add(1, 'hour');

const initForm = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus.toDate(),
    user: {
        name: '',
        uid: ''
    }
};

export const CalendarModal = () => {

    const dispatch = useDispatch();
    const { modalOpen } = useSelector(state => state.uiR);
    const { activeEvent } = useSelector(state => state.calendarR);
    const [dateStart, setDateStart] = useState( activeEvent? activeEvent.start : now.toDate() );
    const [dateEnd, setDateEnd] = useState( activeEvent? activeEvent.end :nowPlus.toDate() );
    const [titleValid, setTitleValid] = useState( true )
    
    const [formValues, setFormValues] = useState( initForm );

    useEffect(() => {
        activeEvent 
            ?
                setFormValues( activeEvent )
            :
                setFormValues( initForm )

    }, [activeEvent])

    const { title, notes, end, start } = formValues;

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const handleStartDateChange = (e) => {
        setDateStart( e );
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setDateEnd( e );
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const momentStart = moment( start );
        const momentEnd = moment( end );

        if ( momentStart.isSameOrAfter( momentEnd ) ) {
            return Swal.fire( 'Fecha no válida', 'Fecha de fin debe ser mayor a fecha de inicio', 'error' );
        }
        
        if ( title.trim().length < 2 ) {
            return setTitleValid( false )
        }

        !activeEvent 
            ?

                dispatch( startEventAddNew(formValues) )

            :

                dispatch( startEventUpdate( formValues ) )


        setTitleValid( true );
        handleCloseModal();
    }

    const handleCloseModal = () => {
        dispatch( closeModal() );
        dispatch( eventRemoveActive() );
        setFormValues( initForm );
    }


    return (
        <Modal
            isOpen={ modalOpen }
            onRequestClose={ handleCloseModal }
            style={ customStyles }
            closeTimeoutMS={ 200 }
            className='modal'
            overlayClassName='modal-fondo'
            ariaHideApp={ !process.env.NODE_ENV !== 'test'}
        >
            <h1> { activeEvent? 'Editar evento' : 'Nuevo evento' } </h1>
            <hr />
            <form className="container" onSubmit={ handleSubmit }>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ start }
                        className='form-control'
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        value={ dateEnd }
                        minDate={ dateStart }
                        className='form-control'
                        
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={ `form-control ${ !titleValid &&  'is-invalid' }` }
                        placeholder="Título del evento"
                        name="title"
                        value={ title }
                        autoComplete="off"
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
