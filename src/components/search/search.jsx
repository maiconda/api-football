import './search.css'

function Search(props){
    return(
        <div className="search-div">
            <form onSubmit={props.search} className="search">
                <input value={props.input} placeholder="Pesquise um país:" onChange={props.handleChange} type="text" />
                <button>
                    <svg width="22px" height="22px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                        <path fill="#fff" fill-rule="evenodd" d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z"/>
                    </svg>
                </button>
            </form>
            {props.lastSearch != '' && <button className="clean-button" onClick={props.get}>Limpar Pesquisa</button>}
        </div>
    )
}

export default Search