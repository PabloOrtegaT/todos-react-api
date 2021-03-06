import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
        <button type="button" className="btn btn-outline-dark p-3" onClick={() => logout( { returnTo :"http://localhost:3000/"} )}>
                Logout
        </button>)
    )
}

export default LogoutButton;