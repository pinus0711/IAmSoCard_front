import React from 'react';

const Modal = ({ onClose, children, className = '' }) => {
    return (
        <>
            <div data-cy="modal-backdrop" className='fixed top-0 left-0 w-full h-full backdrop-blur-md z-10' onClick={onClose}></div>
            <div
                className={`fixed z-20 y-[80%] p-8 m-0 transform -translate-x-1/2 -translate-y-1/2 border-none rounded shadow-xl top-1/2 left-1/2 bg-white ${className}`}
                style={{ minWidth: '30%', maxWidth: '90%' }}
            >
                <span className="absolute top-3 right-3 cursor-pointer text-2xl font-bold" onClick={onClose}>&times;</span>
                {children}
            </div>
        </>
    );
}

export default Modal;
