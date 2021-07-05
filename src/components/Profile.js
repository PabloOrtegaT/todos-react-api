import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
        <div className='d-flex justify-content-between align-items-end'>
            <span className='p-2'>
                <img src={user.picture} alt={'pablo'}></img>
            </span>
            <span>
                <h2>Welcome {user.nickname}!</h2>
            </span>
            
        </div>)
    )
}

export default Profile;