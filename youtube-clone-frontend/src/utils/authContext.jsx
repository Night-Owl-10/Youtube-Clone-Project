import { useState, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [channel, setChannel] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const fetchChannel = async (userId) => {
        if (!userId) {
            setChannel(null);
            return;
        }

        try {
            console.log("Fetching channel for user:", userId);
            const response = await axios.get(`http://localhost:4000/api/channel/user/${userId}`);
            console.log("Channel response:", response.data);
            setChannel(response.data.channel);
        } catch (error) {
            console.log("No channel found for user:", error.message);
            setChannel(null);
        }
    };


    const updateAuthState = (userData) => {
        console.log("Updating auth state with user data:", userData);
        if (userData) {
            setIsSignedIn(true);
            setUser(userData);
            fetchChannel(userData._id);
        } else {
            setIsSignedIn(false);
            setUser(null);
            setChannel(null);
        }
    };


    const signOut = () => {
        console.log("Signing out user");
        localStorage.clear();
        updateAuthState(null);
    };


    const refreshAuthState = async () => {
        try {
            const storedUserId = localStorage.getItem("userId");
            const storedToken = localStorage.getItem("token");
            const storedUserAvatar = localStorage.getItem("userAvatar");

            console.log("Refreshing auth state with stored data:", { storedUserId, storedToken, storedUserAvatar });

            if (storedUserId && storedToken) {

                const userData = {
                    _id: storedUserId,
                    avatar: storedUserAvatar
                };

                setIsSignedIn(true);
                setUser(userData);


                await fetchChannel(storedUserId);
            } else {
                setIsSignedIn(false);
                setUser(null);
                setChannel(null);
            }
        } catch (error) {
            console.error("Error refreshing auth:", error);
            setIsSignedIn(false);
            setUser(null);
            setChannel(null);
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const storedUserId = localStorage.getItem("userId");
                const storedToken = localStorage.getItem("token");
                const storedUserAvatar = localStorage.getItem("userAvatar");

                console.log("Initializing auth with stored data:", { storedUserId, storedToken, storedUserAvatar });

                if (storedUserId && storedToken) {

                    const userData = {
                        _id: storedUserId,
                        avatar: storedUserAvatar
                    };

                    setIsSignedIn(true);
                    setUser(userData);


                    await fetchChannel(storedUserId);
                } else {
                    setIsSignedIn(false);
                    setUser(null);
                    setChannel(null);
                }
            } catch (error) {
                console.error("Error initializing auth:", error);
                setIsSignedIn(false);
                setUser(null);
                setChannel(null);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const contextValue = {
        isSignedIn,
        channel,
        user,
        loading,
        updateAuthState,
        signOut,
        fetchChannel,
        refreshAuthState
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;





