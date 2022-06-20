import React from 'react'
import { Provider } from 'react-redux'
import { store } from './Store/store'
import { RouterApp } from './Routers/RouterApp'

export const CalendarApp = () => {
    return (
        <div>
            <Provider store={ store }>
                <RouterApp />
            </Provider>
        </div>
    )
}
