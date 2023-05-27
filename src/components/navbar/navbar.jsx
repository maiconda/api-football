import { useContext } from "react"
import { UserContext } from "../../UserContext"
import './navbar.css'

function Navbar(){

    const {setLogged, logged} = useContext(UserContext)

    const loggout = () => {
      setLogged({staus :false})
      document.querySelector('.container').style.opacity = '0'
      document.querySelector('.container').style.zIndex = '-1'
    }

    return(
        <nav>
            <div>
                <h1>Football Site</h1>
                {logged.status == true &&
                <button onClick={loggout}>Sair</button>
                }
            </div>
      </nav>
    )
}

export default Navbar
