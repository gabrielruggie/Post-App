import React from 'react'
import Error from './Error'

/**
 * Creates multiple error objects based on list of object values passed to it
 */
export default function ErrorList({errors}) {
    return (
        errors.map(
            error => <Error error={error} />
        )
    )
}
