import './search.css'
import { Fragment } from 'react'

function Search(props){
    return(
        <div className="search-div">
            <form onSubmit={props.search} className="search">
                <input value={props.input} placeholder="Pesquise um país:" onChange={props.handleChange} type="text" />
                <button>
                    <svg width="22px" height="22px" viewBox="0 0 20 20" fill="none">
                        <path fill="#fff" fillRule="evenodd" d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z"/>
                    </svg>
                </button>
            </form>
            {props.lastSearch != '' && 
            <Fragment>
                <button className="clean-button" onClick={props.get}>Limpar Pesquisa</button>
                <button className='clean-button-mobile' onClick={props.get}>
                    <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none">
                    <path d="M16 8L8 16M8.00001 8L16 16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </Fragment>
            }
        </div>
    )
}

export default Search