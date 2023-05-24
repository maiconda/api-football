import { useParams } from "react-router-dom"

function Leagues(){

    let { id } = useParams()

    return(
        <div>{id}</div>
    )
}

export default Leagues