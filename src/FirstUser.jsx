import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const FirstUser = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        isAuthenticated &&
        (<div>
            {console.log(Object.keys(user).length)}
            <h2>Congrats, you made it to the new page!</h2>
            <p>The current user is: {user.email}</p>
            <ul>The metadata is:
                {Object.keys(user).map((keyName, i) =>
                (<li className="travelcompany-input" key={i}>
                    <span className="input-label">key: {i} {keyName}: {user[keyName]}</span>
                </li>)
                )}
            </ul>
        </div>));
}

export default FirstUser;