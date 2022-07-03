import React from 'react'
import Error from './Error'

// Future Task => Add id to each error
// Probably smart to make an Error Component
export default function ErrorList({errors}) {
    return (
        errors.map(
            error => <Error error={error} />
        )
    )
}
