import { useParams, useNavigate } from "react-router-dom"
import React, { Fragment, useEffect, useContext, useState } from 'react'
import { UserContext } from "../../UserContext"
import Loading from "../../components/loading/loading";
import axios from "axios";
import Card from "../../components/card/card";
import './teams.css'

function Teams() {

    let { leagueId, season } = useParams()
    const navigate = useNavigate();
    const { logged, requestUrl, apiKey, actualLeague, setActualTeam } = useContext(UserContext)
    const [loading, setLoading] = useState(true)
    const [teams, setTeams] = useState([])

    useEffect(() => {
        if (!logged.status) {
            navigate('/login');
        } else if (actualLeague.id != leagueId && actualLeague.season != season) {
            navigate('/');
        } else {
            getTeams()
        }
    }, [navigate, logged]);

    const getTeams = () => {
        setLoading(true)
        axios.get(`${requestUrl}/teams`, {
            params: {
                league: leagueId.toString(),
                season: season.toString()
            },
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
                'x-apisports-key': apiKey
            }
        }).then((res) => {
            setTeams(res.data.response)
            setLoading(false)
        })
    }

    const redirectPage = (team) => {
        navigate(`/team/${leagueId}/${season}/${team}`)
    }

    return (
        <Fragment>

            {loading == true ?

                <Loading /> :
                <Fragment>
                    <h2 className="description">Times da {actualLeague.name}</h2>
                    <div className="cards-div">
                        {teams.map((team, index) => (
                            <Card
                                key={index}
                                name={team.team.name}
                                img={team.team.logo != null ? team.team.logo : 'https://mrconfeccoes.com.br/wp-content/uploads/2018/03/default.jpg'}
                                onClick={() => {
                                    redirectPage(team.team.id)
                                    setActualTeam({
                                        name: team.team.name,
                                        season: season,
                                        teamId: team.team.id,
                                        leagueId: leagueId
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

export default Teams