import { useContext } from "react"
import { UserContext } from "../../UserContext"
import './navbar.css'

function Navbar(){

    const {apiKey, setLogged, logged} = useContext(UserContext)

    const loggout = () => {
      setLogged({staus :false})
    }

    return(
        <nav>
            <div>
                <h1>API - Football</h1>
                {logged.status == true &&
                <button onClick={loggout}>Sair</button>
                }
            </div>
      </nav>
    )
}

export default Navbar