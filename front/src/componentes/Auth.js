import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios'

import logoProducto from "./IMG COMPONENTES/login.png";

export const Auth = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("firebaseToken")

        if(!token) {
            navigate("/login")
        }
    }, [])

    const signInWithGoogle = async () => {
        try {
            const a = await signInWithPopup(auth, googleProvider)

            localStorage.setItem("firebaseToken", a._tokenResponse.idToken)

            let response = await axios.post('http://localhost:3001/auth/login', {
                firebaseToken: a._tokenResponse.idToken
            })

            if (!response.data.ok) {
                console.error(response)
                logout()
            } else {
                localStorage.setItem("firebaseToken", a._tokenResponse.idToken)
            }

            navigate("/")

        } catch (error) {
            console.error(error)
        }
    }

    const logout = async () => {
        await signOut(auth)

        localStorage.removeItem("firebaseToken")
    }

    return (
        <div className="container">
      <div className="logo-container">
        <img src={logoProducto} alt="Login" className="producto-logo" />
      </div>

      <div className="d-flex justify-content-center align-items-center">
        <button className="btn btn-dark" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
        <button className="btn btn-dark" onClick={logout}>
          Log Out
        </button>
      </div>
    </div>
    );
};