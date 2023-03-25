import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
        <div style={{ minWidth: '50px' }}>
          <h2>Welcome {user.name}</h2>
                <img src={user.picture} alt={user.name} style={{width:'50px', height: '50px'}} />
            </div>
        )
    );
};

export default Profile;
