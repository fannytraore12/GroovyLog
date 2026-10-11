import placeholderImg from '../assets/default_cover.png'
function AlbumCard(props){
    return(
        <div>
            <h2>{props.title}</h2>
            <p>{props.artist}</p>
            <img src ={props.cover || placeholderImg} alt = {props.title}></img>
            <p>Listens: {props.listens}<br></br>Rating: {props.rating || "No thoughts!"} </p>
        </div>
    )

}
export default AlbumCard;