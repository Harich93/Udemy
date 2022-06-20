import moment from "moment"

export const modEventsDate = ( events = [] ) => (
    events.map( ev => ({
        ...ev,
        end: moment( ev.end ).toDate(),
        start: moment( ev.start ).toDate()
    }))
) 