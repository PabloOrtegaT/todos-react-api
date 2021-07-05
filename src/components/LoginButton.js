import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
        <div className='d-flex align-items-center justify-content-between w-100'>
            <h3>Welcome to my Todos App! Please login to continue</h3>
            <button type="button" class="btn btn-outline-dark p-3 m-4" onClick={() => loginWithRedirect()}>
                Login
            </button>
        </div>)
    )
}

export default LoginButton;