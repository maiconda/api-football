import './playerCard.css'

function PlayerCard(props){
    return(
        <div className="player-card">
            <div className='player-card-img'>
                <img src={props.img} alt="" />
            </div>
            <h2>{props.name}</h2>
            <div className="player-info">
                <h3>{props.age} Anos</h3>
                <h3>{props.country}</h3>
            </div>
        </div>
    )
}

export default PlayerCard