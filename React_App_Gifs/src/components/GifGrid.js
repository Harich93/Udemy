import React from 'react'
import { useFetchGifs } from '../hooks/useFetchGifs'
import GifGridItem from './GifGridItem';
import PropTypes from 'prop-types';

const GifGrid = ( { categoria }) => {

    const {data:images, loading} = useFetchGifs( categoria );

    return (
        <>
        <h3 className='animate__animated animate__fadeInTopLeft'> { categoria } </h3>
        
        { loading && <p className='animate__animated animate__flash'>Cargando...</p> }

        <div className='card-grid'>
            
            {
                images.map( img => (
                    <GifGridItem 
                        key={ img.id }
                        { ...img }
                     />
                ))
            }
            
        </div>
        </>
    )
}

GifGrid.propTypes = {
    categoria: PropTypes.string.isRequired
}

export default GifGrid
