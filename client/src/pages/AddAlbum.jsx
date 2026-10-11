import {useState} from 'react'
function AddAlbum(){
    function handleSubmit(e){
        e.preventDefault();
        fetch('http://localhost:3000/albums', {method: 'POST', headers:{'Content-Type': 'application/json'},body:JSON.stringify({title, artist, genre, year})}).then(res => res.json()).then(data =>{ if (data.error) { setError(data.error); setSuccess(''); setGenre('');} else { setSuccess('Album Added!'); setError(''); setYear(''); setTitle(''); setArtist('');} }).catch(()=>{setError("Couldn't reach the server");});
    }
    const [success, setSuccess] = useState('');
    const [title, setTitle] =useState('');
    const [artist, setArtist]= useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    return(
        <div>
            <h1>Add a new Album</h1>
            <form  onSubmit={handleSubmit}>
                <label>year</label>
                <input type="number" value={year} onChange={(e)=> setYear(e.target.value)}></input>
                <label>title</label>
                <input type="text"value={title} onChange={(e)=> setTitle(e.target.value)}></input>
                <label>artist</label>
                <input type="text" value={artist} onChange={(e)=> setArtist(e.target.value)}></input>
                <label>genre</label>
                <input type="text" value={genre} onChange={(e)=> setGenre(e.target.value)}></input>
                <button type="submit">
                    add album
                </button>
            </form>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
        </div>
    )
}

export default AddAlbum;