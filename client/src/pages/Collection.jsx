import AlbumCard from "../components/AlbumCard.jsx";
import {useState} from 'react'
import {useEffect} from 'react'
function Collection() {
  const [albums, setAlbums] = useState([]);
  const [genre, setGenre] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError]= useState('');

  useEffect(()=>{
    setLoading(true);
    setError('');
    let url = 'http://localhost:3000/albums';
    if(genre){
      url = url + '?genre=' + encodeURIComponent(genre);
    }
    fetch(url).then(res=>res.json()).then(data=> {setAlbums(data);setLoading(false);}).catch(()=>{setError("Couldn't reach the server"); setLoading(false)})

  }, [genre]);
  return(
  <div>
    <p>Albums: {albums.length}</p>
    <select value={genre} onChange={(e) => setGenre(e.target.value)}>      
      <option value ="">All</option>
      <option value ="Pop">Pop</option>
      <option value ="K-Pop">K-Pop</option>
      <option value ="R&B">R&B</option>
    </select>
    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}
    { !loading && !error && albums.map(album => <AlbumCard title ={album.title} artist={album.artist} key={album.id} cover={album.cover_url} rating={album.avg_rating} listens={album.listen_count}></AlbumCard>)}
  </div>
  )
};

export default Collection;
