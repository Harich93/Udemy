import React, { useState } from 'react'
import AddCategory from './components/AddCategory';
import GifGrid from './components/GifGrid';

const GifExpertApp = ( { defaulCategoria = [] }) => {

    const [categorias, setCategoria] = useState( defaulCategoria );

    return (
        <>
            <h1>GifExpertApp</h1>
            <AddCategory setCategoria={ setCategoria } />
            <hr />
            
            <ol>
                {
                    categorias.map( cats => (
                        <GifGrid 
                            key={ cats }
                            categoria={ cats }
                        />
                    ) )
                }
            </ol>
        </>
    )
}

export default GifExpertApp
