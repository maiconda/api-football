import axios from "axios"
import React, { Fragment, useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import './countries.css'
import Card from "../../components/card/card";
import Loading from "../../components/loading/loading";
import Search from "../../components/search/search";

function Countries() {

    const navigate = useNavigate();
    const { logged, requestUrl, apiKey, setActualCountry } = useContext(UserContext)
    const [countries, setCountries] = useState([])
    const [input, setInput] = useState('')
    const [lastSearch, setLastSearch] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!logged.status) {
            navigate('/login');
        } else {
            getCountries()
        }
    }, [navigate, logged]);


    const getCountries = () => {
        setLoading(true)
        setLastSearch('')
        axios.get(`${requestUrl}/countries`, {
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
                'x-apisports-key': apiKey
            }
        }).then((res) => {
            setCountries(res.data.response)
            setLoading(false)
        })
    }

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const searchCountry = (e) => {
        e.preventDefault()
        if (input != '') {
            setLoading(true)
            setLastSearch('')
            setInput('')
            axios.get(`${requestUrl}/countries`, {
                params: {
                    search: input
                },
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
                    'x-apisports-key': apiKey
                }
            }).then((res) => {
                setCountries(res.data.response)
                setLastSearch(input)
                setLoading(false)
            })
        }
    }

    return (
        <Fragment>
            <Search
                search={searchCountry}
                input={input}
                handleChange={handleChange}
                lastSearch={lastSearch}
                get={getCountries}
            />

            {lastSearch != '' && <h3 className="results">{lastSearch} - {countries.length} Resultados</h3>}

            {loading == true ?

                <Loading /> :

                <section className="cards-div">

                    {countries.length === 0 ?
                        <div className="no-results">
                            <p>Nenhum resultado encontrado</p>
                        </div>
                        :
                        countries.map((country, index) => {
                            if (country.name != 'World') {
                                return (
                                    <Card
                                        key={index}
                                        name={country.name}
                                        img={country.flag}
                                        onClick={() => {
                                            navigate(`/leagues/${country.code}`)
                                            setActualCountry({
                                                name: country.name,
                                                code: country.code
                                            })
                                        }}
                                        proportion='flag'
                                    />
                                )
                            }
                        })}
                </section>
            }
        </Fragment>
    )
}

export default Countries