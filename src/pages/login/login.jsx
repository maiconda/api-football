import axios from "axios"
import { UserContext } from '../../UserContext';
import React, {Fragment, useEffect, useContext, useState} from "react"
import { useNavigate } from 'react-router-dom';

function Login(){

    const {apiKey, setLogged} = useContext(UserContext)
    const [input, setInput] = useState('')
    const navigate = useNavigate();

    console.log(apiKey)

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const verifyLogin = (e) => {
        e.preventDefault()
        if (input === apiKey) {
            setLogged({status : true})
            navigate('/');
        } else {
            setInput('')
        }
    }

    return(
        <div>
            <form onSubmit={verifyLogin}>
                <input type="text" value={input} onChange={handleChange}/>
            </form>
        </div>
    )
}

export default Login