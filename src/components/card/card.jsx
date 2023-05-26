import './card.css'
import { Link } from 'react-router-dom'

function Card(props){
    return(
        <div onClick={props.onClick} className='card'>
            <div className={`card-img-div ${props.proportion}`}>
                <img src={props.img} alt=""/>
            </div>
            <h2>{props.name}</h2>
            <button className='card-button'>Abrir</button>
        </div>
    )
}

export default Card