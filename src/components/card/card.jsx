import './card.css'
import { Link } from 'react-router-dom'

function Card(props){
    return(
        <div className='card'>
            <img src={props.img} alt=""/>
            <h2>{props.name}</h2>
            <Link className='card-button' to={'leagues/'+props.url}><button>Abrir</button></Link>
        </div>
    )
}

export default Card