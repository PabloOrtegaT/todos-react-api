import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (<div>
            <img src={user.picture} alt={'pablo'}></img>
            <h2>Welcome {user.nickname}</h2>
        </div>)
    )
}

export default Profile;