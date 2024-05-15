import React from 'react'

const DefaultLayout = ({ children }) => {
    return (
        <div className='mx-auto max-w-7xl h-full bg-white'>
            {children}
        </div>
    )
}

export default DefaultLayout