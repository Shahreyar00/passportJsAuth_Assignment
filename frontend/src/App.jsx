import React, { useEffect, useState } from 'react';
import Navbar from "./components/navbar/Navbar";
import Home from './pages/home/Home';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/login/Login';
import Post from './pages/post/Post';
import ScrollToTop from "./components/ScrollToTop";


const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = () => {
            fetch("http://localhost:5000/auth/login/success", {
                method: "GET",
                credentials: "include",
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
                },
            })
            .then((response) => {
                if (response.status === 200) return response.json();
                throw new Error("authentication has been failed!");
            })
            .then((resObject) => {
                setUser(resObject.user);
            })
            .catch((err) => {
                console.log(err);
            });
        };
        getUser();
    }, []);

    return (
        <BrowserRouter>
            <div>
                <Navbar user={user} />
                <ScrollToTop>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/login"
                            element={user ? <Navigate to="/" /> : <Login />}
                        />
                        <Route
                            path="/post/:id"
                            element={user ? <Post /> : <Navigate to="/login" />}
                        />
                    </Routes>
                </ScrollToTop>
            </div>
        </BrowserRouter>
    )
}

export default App