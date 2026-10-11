import placeholderImg from '../assets/default_cover.png'
import starActive from '../assets/star_active.png'
import starInactive from '../assets/star_inactive.png'

function AlbumCard(props){
    const filled = Math.round(props.rating || 0);
    return(
        <div className ="card">
            <h2>{props.title}</h2>
            <p>{props.artist}</p>
            <img src ={props.cover || placeholderImg} alt = {props.title}></img>
            {[1,2,3,4,5].map(n => <img key={n} src={n <= filled ? starActive : starInactive} className="star" alt="" />)}
            <p>Listens: {props.listens}<br></br>Rating: {props.rating || "No thoughts!"} </p>
        </div>
    )

}
export default AlbumCard;