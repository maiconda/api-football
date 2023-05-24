import axios from "axios"
import React, {Fragment, useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import './countries.css'
import Card from "../../components/card/card";

function Countries(){

    const navigate = useNavigate();
    const {logged, requestConfig} = useContext(UserContext)
    const [countries, setCountries] = useState([])
    const [numCountries, setNumCountries] = useState(0)
    const [input, setInput] = useState('')

    console.log(numCountries)

    useEffect(() => {
        if (!logged.status) {
            navigate('/login');
        } else {
            getCountries()
        }
      }, [navigate, logged]);


    const getCountries = () => {
        
        axios.get('https://v3.football.api-sports.io/countries', requestConfig).then((res) => {
            setCountries(res.data.response)
            setNumCountries(res.data.results)
            console.log(res)
        })
    }

    const handleChange = (e) => {
        setInput(e.target.value);
        console.log(input)
    }
    
    const searchCountry = (e) => {
        e.preventDefault()
        axios.get(`https://v3.football.api-sports.io/countries?search=${input}`, requestConfig).then((res) => {
            setCountries(res.data.response)
        })
        setInput('')
    }

    return(
    <Fragment>
        <div>
            <form onSubmit={searchCountry} className="search">
                <p>Pesquisar país:</p>
                <input value={input} onChange={handleChange} type="text" />
            </form>
            {countries.length < numCountries && <button onClick={getCountries}>Limpar Pesquisa</button>}
        </div>
        

        <div className="countries">
        {countries.map((country, index) => (
            <Card
                key={index + country.name}
                name={country.name}
                img={country.flag != null ? country.flag : 'https://mrconfeccoes.com.br/wp-content/uploads/2018/03/default.jpg'}
                url={country.code}
            />
        ))}
        </div>
    </Fragment>
    )
}

export default Countries