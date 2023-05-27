import { useParams, useNavigate } from "react-router-dom"
import React, { Fragment, useEffect, useContext, useState } from 'react'
import { UserContext } from "../../UserContext"
import Loading from "../../components/loading/loading";
import axios from "axios";
import './team.css'
import PlayerCard from "../../components/playerCard/playerCard";

function Team() {

    let { teamId, season, leagueId } = useParams()
    const navigate = useNavigate();
    const { logged, requestUrl, apiKey, actualTeam } = useContext(UserContext)
    const [loading1, setLoading1] = useState(true)
    const [loading2, setLoading2] = useState(true)
    const [players, setPlayers] = useState([])
    const [statistics, setStatiscs] = useState({})
    const [lineup, setLineup] = useState([])

    useEffect(() => {
        if (!logged.status) {
            navigate('/login');
        } else if (actualTeam.teamId != teamId && actualTeam.season != season && actualTeam.leagueId != leagueId) {
            navigate('/');
        } else {
            getPlayers()
            getStatistcs()
        }
    }, [navigate, logged]);

    const getPlayers = () => {
        axios.get(`${requestUrl}/players`, {
            params: {
                season: season,
                team: teamId
            },
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
                'x-apisports-key': apiKey
            }
        }).then((res) => {
            setPlayers(res.data.response)
            setLoading1(false)
        })
    }

    const getStatistcs = () => {

        axios.get(`${requestUrl}/teams/statistics`, {
            params: {
                league: leagueId,
                season: season,
                team: teamId
            },
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
                'x-apisports-key': apiKey
            }
        }).then((res) => {
            if (res.data.response.lineups.length > 0) {
                let string = res.data.response.lineups[0].formation
                setLineup(string.split('-'))
            }
            setStatiscs(res.data.response)
            setLoading2(false)
        })

    }

    return (
        <Fragment>

            {loading1 == true || loading2 == true ?

                <Loading /> :

                <Fragment>
                    <h2 className="description">{actualTeam.name}</h2>
                    <h3 className="player-description">Jogadores:</h3>

                    {players.length == 0 ?
                        <div className="no-results">Lista de Jogadores Indisponível</div>
                        :
                        <section className="cards-div">
                            {players.map((player, index) => (
                                <PlayerCard
                                    key={index}
                                    img={player.player.photo}
                                    name={player.player.name}
                                    country={player.player.birth.country}
                                    age={player.player.age}
                                />
                            ))}
                        </section>
                    }
                    {statistics.fixtures != undefined &&
                        <Fragment>
                            {lineup.length > 0 &&
                                <section>
                                    <h3 className="team-description">Formação mais utilizada: {statistics.lineups[0].formation}</h3>
                                    <div className="field">
                                        <div className="lineup-divisor">
                                            <div className="player-circle"></div>
                                        </div>
                                        {lineup.map((line, index) => (
                                            <div key={index} className={`lineup-divisor`}>
                                                {Array.from({ length: line }, (_, index2) => (
                                                    <div key={index2} className={`player-circle`}></div>
                                                ))}
                                            </div>
                                        ))}

                                    </div>
                                </section>}
                            <section>
                                <h3 className="team-description">Tabela de Resultados:</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Em Casa</th>
                                            <th scope="col">Fora</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Partidas</th>
                                            <td data-label="Em Casa">{statistics.fixtures.played.home}</td>
                                            <td data-label="Fora">{statistics.fixtures.played.away}</td>
                                            <td data-label="Total">{statistics.fixtures.played.total}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Vitórias</th>
                                            <td data-label="Em Casa">{statistics.fixtures.wins.home}</td>
                                            <td data-label="Fora">{statistics.fixtures.wins.away}</td>
                                            <td data-label="Total">{statistics.fixtures.wins.total}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Empates</th>
                                            <td data-label="Em Casa">{statistics.fixtures.draws.home}</td>
                                            <td data-label="Fora">{statistics.fixtures.draws.away}</td>
                                            <td data-label="Total">{statistics.fixtures.draws.total}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Derrotas</th>
                                            <td data-label="Em Casa">{statistics.fixtures.loses.home}</td>
                                            <td data-label="Fora">{statistics.fixtures.loses.away}</td>
                                            <td data-label="Total">{statistics.fixtures.loses.total}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>
                            <section>
                                <h3 className="team-description">Gols Marcados:</h3>
                                <div className="chart">
                                    <div className="chart-numbers">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <div className="chart-container">
                                        <div className="chart-description">
                                            <div>0-15</div>
                                            <div>16-30</div>
                                            <div>31-45</div>
                                            <div>46-60</div>
                                            <div>61-75</div>
                                            <div>76-90</div>
                                            <div>91-105</div>
                                            <div>105-120</div>
                                        </div>
                                        <div className="chart-values">
                                            <div style={{ width: statistics.goals.for.minute["0-15"].percentage != null ? statistics.goals.for.minute["0-15"].percentage : '0' }}></div>
                                            <div style={{ width: statistics.goals.for.minute["16-30"].percentage != null ? statistics.goals.for.minute["16-30"].percentage : '0' }}></div>
                                            <div style={{ width: statistics.goals.for.minute["31-45"].percentage != null ? statistics.goals.for.minute["31-45"].percentage : '0' }}></div>
                                            <div style={{ width: statistics.goals.for.minute["46-60"].percentage != null ? statistics.goals.for.minute["46-60"].percentage : '0' }}></div>
                                            <div style={{ width: statistics.goals.for.minute["61-75"].percentage != null ? statistics.goals.for.minute["61-75"].percentage : '0' }}></div>
                                            <div style={{ width: statistics.goals.for.minute["76-90"].percentage != null ? statistics.goals.for.minute["76-90"].percentage : '0' }}></div>
                                            <div style={{ width: statistics.goals.for.minute["91-105"].percentage != null ? statistics.goals.for.minute["91-105"].percentage : '0' }}></div>
                                            <div style={{ width: statistics.goals.for.minute["106-120"].percentage != null ? statistics.goals.for.minute["106-120"].percentage : '0' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </Fragment>
                    } </Fragment>
            }
        </Fragment>
    )
}

export default Team