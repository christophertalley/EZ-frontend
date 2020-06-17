import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import Paper from "@material-ui/core/Paper";



const Profile = () => {
    const { loading, user } = useAuth0();

    if (loading || !user) {
        return <div>Loading...</div>;
    }

    return (
        <Paper elevation={3}>
            <img src={user.picture} alt="Profile" />

            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <code>{JSON.stringify(user, null, 2)}</code>
        </Paper>
    );
};

export default Profile;
