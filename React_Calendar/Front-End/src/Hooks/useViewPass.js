import { useState } from "react";

export const useViewPass = ( initialState = false ) => {
    
    const [isView, setView] = useState( initialState );

    const handleChangeViewPass = () => {
        setView( !isView )
    }

    return [ isView, handleChangeViewPass ]
}