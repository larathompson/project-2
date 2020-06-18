import React, { useEffect, useState } from "react"
import { Switch, Route, Link, HashRouter } from 'react-router-dom'


const Songs = (props) => {
  const [songsData, updateSongsData] = useState([])
  const [title, updateTitle] = useState('')
  const [cover, updateCover] = useState('')


  console.log(songsData.title)
  useEffect(() => {
    const id = props.match.params.id
    console.log(id)
    console.log(props)
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/${id}`)
      .then(resp => resp.json())
      .then((data) => {
        //changed this coz there is only one object in the array so dont think need 0
        updateSongsData(data.tracks.data)
        updateTitle(data.title)
        updateCover(data.cover)

        // console.log(data.tracks.data[0].preview)

      })
  }, [])


  

    
  

  

  return <section className='songsPage'>
    <div className="albumCard">
      <h1 className='albumTitle'>{title}</h1>
      <img src={cover} alt={title} />
    </div>
    {songsData.map((music, index) => {
      return <div className='song' key={index}><p className='song-title'>{music.title}</p>
        <audio controls className='song-play' >
          <source src={music.preview} type="audio/mpeg" />
        </audio>
      </div>
    })}
  </section>

}
export default Songs