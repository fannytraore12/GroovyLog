import {useState} from 'react'
import { useEffect } from 'react';

function LogListen(){
    function handleSubmit(e){
        e.preventDefault();
        fetch('http://localhost:3000/listens', {method: 'POST', headers:{'Content-Type': 'application/json'},body:JSON.stringify({album_id: albumId, date, rating, note})}).then(res => res.json()).then(data =>{ if (data.error) { setError(data.error); setSuccess('');} else { setSuccess('Listen Logged!'); setError(''); setDate(''); setRating(''); setNote('');} }).catch(()=>{setError("Couldn't reach the server");});}
    const [success, setSuccess] =useState('');
    const [error, setError]= useState('');
    const [albumId, setId] = useState('');
    const [date, setDate] = useState('');
    const [rating, setRating] = useState('');
    const [note, setNote] = useState('');
    const [albums, setAlbums] = useState([]);
    useEffect(()=>{
        let url = 'http://localhost:3000/albums';
        fetch(url).then(res=>res.json()).then(data=> {setAlbums(data);}).catch(() => { setError("Couldn't reach the server"); });}, []);
    return(
    <div>
        <h1>Log a listen</h1>
        {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Album</label>
                <select value={albumId} onChange={(e)=> setId(e.target.value)}>
                    <option value ="">Pick an ALbum</option>
                    {albums.map(album => <option key ={album.id} value={album.id}>{album.title}</option>)}
                </select>
                <label>Date</label>
                <input type="date" value={date} onChange={(e)=> setDate(e.target.value)}></input>
                <label>Rating</label>
                <input type="number"  min="1" max="5" step="0.25" value={rating} onChange={(e)=> setRating(e.target.value)}></input>
                <label>Notes</label>
                <textarea value={note} onChange={(e)=> setNote(e.target.value)}></textarea>
                <button type="submit">
                    Log it
                </button>
            </form>
            {success && <p>{success}</p>}
        </div>
    )

}

export default LogListen;