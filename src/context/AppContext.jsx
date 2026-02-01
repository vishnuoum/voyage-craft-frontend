import { createContext, useContext, useEffect, useRef, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);
export const AppProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        // 👇 initialize state from storage
        return localStorage.getItem("token");
    });

    const [userId, setUserId] = useState(() => {
        // 👇 initialize state from storage
        return parseInt(localStorage.getItem("userId"));
    });

    const [groups, setGroups] = useState([]);

    // keep socket in a ref to avoid stale closures and re-renders
    const socketRef = useRef(null);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    useEffect(() => {
        if (userId) {
            localStorage.setItem("userId", userId);
        } else {
            localStorage.removeItem("userId");
        }
    }, [userId]);

    const value = {
        token, setToken, groups, setGroups, userId, setUserId
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}