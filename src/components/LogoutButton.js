import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
        <button type="button" class="btn btn-outline-dark p-3" onClick={() => logout()}>
                Logout
        </button>)
    )
}

export default LogoutButton;