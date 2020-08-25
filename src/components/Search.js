import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Search = () => {

  const [query, setQuery] = useState('')
  const [artistData, updateArtistData] = useState([])

  // useEffect(() => {
  //   fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/album?q=${query}`)
  //     .then(resp => resp.json())
  //     .then((data) => {
  //       updateArtistData(data.data)
  //       console.log(data.data)
  //     })
  // }, [])

  function getArtists(query) {
    console.log('hello')
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/album?q=${query}`)
      .then(resp => resp.json())
      .then((data) => {
        updateArtistData(data.data)
        console.log(data.data)
      
      })
  }



  function handleChange(event) {
    console.log(event.target.value)
    setQuery(event.target.value)
    console.log('query' + query)
  }

  function handleSubmit(event) {
    setQuery(event.target.value)
    console.log('this is the query ' + query)
    getArtists(query)
    setQuery('')
  }

  return <main className="trackList">

  <section className='search'>
    <h1> Songify </h1>
    <div>
      <form onSubmit={handleSubmit} className='form'>
        <input type="text" value={query} placeholder="Search" onChange={handleChange} className='input'>
        </input>
        <button type="submit" className='button'>Search 🔍</button>
      </form>
    </div>
  </section>

  <div className="container">
    <div className="columns is-multiline is-mobile">
      {artistData.map((album, index) => {

        return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
          {/* 1) We create a link that has the album ID in it for each cheese */}
          <Link to={`/search/${album.id}`}>
            <div className="card">
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{album.title}</p>
                  </div>
                </div>
              </div>
              <div className="card-image">
                <figure className="image is-96x96">
                  <img src={album.cover} alt={album.title} />
                </figure>
              </div>
            </div>
          </Link>
        </div>
      })}
    </div>
  </div>



</main>

}

export default Search