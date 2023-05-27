import axios from "axios"
import './login.css'
import { UserContext } from '../../UserContext';
import React, { Fragment, useEffect, useContext, useState } from "react"
import { useNavigate } from 'react-router-dom';

function Login() {

    const { apiKey, setLogged, logged } = useContext(UserContext)
    const [input, setInput] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (logged.status) {
            navigate('/');
        }
    }, [navigate, logged]);

    const handleInputFocus = () => {
        document.querySelector(".input-div").style.borderBottom = '5px solid black'
    };

    const handleInputBlur = () => {
        document.querySelector(".input-div").style.borderBottom = '5px solid transparent'
    };

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const verifyLogin = (e) => {
        e.preventDefault()
        if (input === apiKey) {
            setLogged({ status: true })
            navigate('/');
        } else {
            setInput('')
            document.getElementById('enter-button').style.backgroundColor = 'red'
            document.getElementById('enter-button').innerText = 'Key Inválida'
            document.getElementById('enter-button').disabled = true
            setTimeout(() => {
                document.getElementById('enter-button').style.backgroundColor = 'black'
                document.getElementById('enter-button').innerText = 'Entrar'
                document.getElementById('enter-button').disabled = false
            }, 1000);
        }
    }

    const completeKey = () => {
        setInput(apiKey)
    }

    return (

        <div className="login-container">
            <div className="login">
                <form onSubmit={verifyLogin}>
                    <h1>API Key</h1>
                    <div className="input-div">
                        <svg width="19px" height="19px" viewBox="0 0 24 24">
                            <title />
                            <g id="Complete">
                                <g id="lock">
                                    <g>
                                        <rect fill="none" height="10" rx="2" ry="2" stroke="#aeb1b0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="16" x="4" y="11" />
                                        <path d="M16.5,11V8h0c0-2.8-.5-5-4.5-5S7.5,5.2,7.5,8h0v3" fill="none" stroke="#aeb1b0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <input className="login-input" type={showPassword ? 'text' : 'password'} placeholder="Digite a API key:" onFocus={handleInputFocus} onBlur={handleInputBlur} value={input} onChange={handleChange} />
                        {showPassword ?
                            <svg onClick={() => setShowPassword(false)} className="eye" width="23px" height="23px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M22 12.0002C20.2531 15.5764 15.8775 19 11.9998 19C8.12201 19 3.74646 15.5764 2 11.9998" stroke="#aeb1b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M22 12.0002C20.2531 8.42398 15.8782 5 12.0005 5C8.1227 5 3.74646 8.42314 2 11.9998" stroke="#aeb1b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="#aeb1b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg> :
                            <svg onClick={() => setShowPassword(true)} className="eye" width="23px" height="23px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4L9.87868 9.87868M20 20L14.1213 14.1213M9.87868 9.87868C9.33579 10.4216 9 11.1716 9 12C9 13.6569 10.3431 15 12 15C12.8284 15 13.5784 14.6642 14.1213 14.1213M9.87868 9.87868L14.1213 14.1213M6.76821 6.76821C4.72843 8.09899 2.96378 10.026 2 11.9998C3.74646 15.5764 8.12201 19 11.9998 19C13.7376 19 15.5753 18.3124 17.2317 17.2317M9.76138 5.34717C10.5114 5.12316 11.2649 5 12.0005 5C15.8782 5 20.2531 8.42398 22 12.0002C21.448 13.1302 20.6336 14.2449 19.6554 15.2412" stroke="#aeb1b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                    </div>
                </form>

                <div className="login-buttons">
                    <button id="enter-button" onClick={verifyLogin}>Entrar</button>
                    <button onClick={completeKey}>
                        <svg width="21px" height="21px" viewBox="0 0 20 20" version="1.1">
                            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="Dribbble-Light-Preview" transform="translate(-60.000000, -5199.000000)" fill="#fff">
                                    <g id="icons" transform="translate(56.000000, 160.000000)">
                                        <path d="M17.8962887,5049.16307 C15.6521707,5049.16307 13.8271718,5047.33984 13.8271718,5045.0979 C13.8271718,5042.85596 15.6521707,5041.03274 17.8962887,5041.03274 C20.1404067,5041.03274 21.9654057,5042.85596 21.9654057,5045.0979 C21.9654057,5047.33984 20.1404067,5049.16307 17.8962887,5049.16307 M16.5178754,5039.15057 C14.2646018,5039.64347 12.4497757,5041.45958 11.948257,5043.70863 C11.5352416,5045.55726 11.9726717,5047.29715 12.9329833,5048.63866 L4.29831714,5057.26494 C3.90056095,5057.66129 3.90056095,5058.3046 4.29831714,5058.70197 L4.29831714,5058.70197 C4.69607332,5059.09934 5.34001108,5059.09934 5.73674998,5058.70197 L6.46817375,5057.97126 L7.15890636,5058.66132 C7.55666254,5059.05869 8.2006003,5059.05869 8.5973392,5058.66132 L8.5973392,5058.66132 C8.99509539,5058.26497 8.99509539,5057.62166 8.5973392,5057.22429 L7.9066066,5056.53422 L9.91980221,5054.52298 L10.6308804,5055.23337 C11.0276193,5055.63074 11.6715571,5055.63074 12.0693132,5055.23337 L12.0693132,5055.23337 C12.4660522,5054.83702 12.4660522,5054.19371 12.0693132,5053.79634 L11.3582351,5053.08595 L14.374468,5050.07265 C15.715242,5051.02186 17.4507204,5051.45175 19.2940304,5051.03914 C21.5412002,5050.53709 23.3550091,5048.72504 23.8483896,5046.47802 C24.8219258,5042.04191 20.9582992,5038.18102 16.5178754,5039.15057" id="key-[#678]">

                                        </path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login