import React from 'react'

// Future Task => Add id to each error
// Probably smart to make an Error Component
export default function Error({errors}) {
    const errorList = errors.map(
        error => <li>{error}</li>
    );
    return (
        <ul>
            {errorList}
        </ul>
    )
}
