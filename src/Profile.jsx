import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const [appMetadata, setAppMetadata] = useState(null);
  const [loginsCount, setLoginsCount] = useState(null);
    
    useEffect(() => {
        const getUserMetadata = async () => {
          const domain = import.meta.env.VITE_AUTH0_DOMAIN;
      
          try {
            const accessToken = await getAccessTokenSilently({
              authorizationParams: {
                audience: `https://${domain}/api/v2/`,
                scope: "read:current_user",
              },
            });
      
            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
      
            const metadataResponse = await fetch(userDetailsByIdUrl, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
      
            const { user_metadata, app_metadata, logins_count } = await metadataResponse.json();
      
            setUserMetadata(user_metadata);
            setAppMetadata(app_metadata);
            setLoginsCount(logins_count);
          } catch (e) {
            console.log(e.message);
          }
        };
      
        getUserMetadata();
      }, [getAccessTokenSilently, user?.sub]);

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )}
         <h3>App Metadata</h3>
                {userMetadata ? (
          <pre>{JSON.stringify(appMetadata, null, 2)}</pre>
        ) : (
          "No app metadata defined"
        )}
        <h4>Number of times logged in: {loginsCount}</h4>
      </div>
    )
  );
};

export default Profile;