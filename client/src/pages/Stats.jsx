import { useEffect, useState } from "react";
import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";
function Stats(){

    const [stats, setStats] = useState(null);
    const [error, setError] = useState('');
     useEffect(()=>{
        let url = 'http://localhost:3000/stats';
        fetch(url).then(res=>res.json()).then(data=> {setStats(data);}).catch(() => { setError("Couldn't reach the server"); });}, []);
        if(error){
            return <p>{error}</p>;
        }
        if(!stats){
            return <p> Loading...</p>;
        }
    return(
        <div>
            <h1>Show stats</h1>
            {stats.mostReplayed && <p>{stats.mostReplayed.title}: {stats.mostReplayed.plays} plays</p>} 
            <h2>Top genres</h2>
            <ul>{stats.topGenres.map(g => <li key={g.genre}>{g.genre}: {g.listen_count} listens</li>)}</ul>   
            <h2>Highest Rated</h2>
            <ul>{stats.topRated.map(a => <li key={a.title}>{a.title}: {a.avg_ratings}</li>)}</ul>   
            <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.monthly}>
                <XAxis dataKey="month" stroke ="#652f50" />
                <YAxis domain={[1, 5]} stroke ="#652f50" />
                <Tooltip />
                <Line dataKey="avg_rating" type ="stepAfter" stroke="#e65d94" />
            </LineChart>
            </ResponsiveContainer>
        </div>
)

}

export default Stats;