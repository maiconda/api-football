import { useParams, useNavigate } from "react-router-dom"
import React, {Fragment, useEffect, useContext, useState } from 'react'
import { UserContext } from "../../UserContext"
import Loading from "../../components/loading/loading";
import axios from "axios";
import Card from "../../components/card/card";
import './leagues.css'
import Search from "../../components/search/search";

function Leagues(){

    const navigate = useNavigate();
    const {logged, apiKey, requestUrl, actualCountry, setActualLeague, actualLeague} = useContext(UserContext)
    const [leagues, setLeagues] = useState([])
    const [seasons, setSeasons] = useState([])
    const [loading, setLoading] = useState(false)
    const [leagueId, setLeagueId] = useState(0)
    let { id } = useParams()

    useEffect(() => {
        if (!logged.status) {
            navigate('/login');
        } else if(actualCountry.code != id){
            navigate('/');
        } else {
            getLeagues()
        }
      }, [navigate, logged]);

    console.log(id)

    const getLeagues = () => {
        setLoading(true)
        axios.get(`${requestUrl}/leagues/`, {
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
                'x-apisports-key' : apiKey
            },
            params: {code: id}
        }).then((res) => {
            setLeagues(res.data.response)
            setLoading(false)
            console.log(res)
        })
    }

    const openSeasons = (season) => {
        setSeasons(season)
        console.log(season)
        document.querySelector('.seasons-div').style.zIndex = '2'
        document.querySelector('.container').style.zIndex = '1'
        document.querySelector('.seasons-div').style.opacity = '100%'
        document.querySelector('.container').style.opacity = '100%'
    }

    const closeSeasons = () => {
        document.querySelector('.seasons-div').style.opacity = '0'
        document.querySelector('.container').style.opacity = '0'
        setTimeout(() => {
            document.querySelector('.seasons-div').style.zIndex = '-1'
            document.querySelector('.container').style.zIndex = '-1'
        }, 0);
    }

    const redirectPage = (year) => {
        document.querySelector('.container').style.opacity = '0'
        document.querySelector('.container').style.zIndex = '-1'
        setActualLeague({
            name: actualLeague.name,
            id: actualLeague.id,
            season: year
        })
        navigate(`/teams/${leagueId}/${year}`)
    }

    return(
    <Fragment>

        <div className="seasons-div">
            <h2>Escolha uma temporada</h2>
            <div className="seasons">
                {seasons.map((season, index) => (
                    <div onClick={() => redirectPage(season.year)}><p>{season.year}</p></div>
                ))}
            </div>
            <button onClick={closeSeasons}>Fechar</button>
        </div>



        {loading == true ? 

        <Loading/> :

        <Fragment>
        <h2 className="description">Competições de {actualCountry.name}</h2>
        <div className="cards-div">
        {leagues.map((league, index) => (
            <Card
                key={index + league.league.name}
                name={league.league.name}
                img={league.league.logo != null ? league.league.logo : 'https://mrconfeccoes.com.br/wp-content/uploads/2018/03/default.jpg'}
                onClick={() => {
                    openSeasons(league.seasons)
                    setLeagueId(league.league.id)
                    setActualLeague({
                        name: league.league.name,
                        id: league.league.id
                    })
                }}
                proportion='square'
            />
        ))}    
        </div>
        </Fragment>
        }
    </Fragment>
    )
}

export default Leagues