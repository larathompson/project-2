# Songify - Hackathon

# Overview

This hackathon was my second project that I completed over the course of 2 days, working with a pair. My pair and I built a React app which consumed the Deezer API in order to create a database which provided albums created by the users artist of choice. 

You can view Songify [here](https://larathompson.github.io/project-2/#/search), or find the GitHub repository [here](https://github.com/larathompson/project-2)

# Brief

Listed below are the requirements that the app had to meet.

The app had to:

- Consume a public API – this could be anything but it must make sense for your project.
- Have several components - At least one classical and one functional.
- The app should include a router - with several "pages".
- Include wireframes - that you designed before building the app.
- Have semantically clean HTML - you make sure you write HTML that makes structural sense rather than thinking about how it might look, which is the job of CSS.
- Be deployed online and accessible to the public.


# Technologies Used

- React
- SCSS
- HTML
- GitHub
- Babel
- Webpack
- Bulma 

# Approach 

In order to set up our app, we created our HTML boilerplate, connected the App component to the DOM and set up Webpack's Dev Server. 

After setting up the app, using ES6 class syntax, we created the components needed to form the funtionality of the app: the 'search' component (where the user searches for playlists produced by an artist of their choice) and the 'songs' component (this displays the playlists and provides a preview of the tracks). 

## Search Page

![searchPage](../search.png)

In order to store the relevant property values to the Search component, I used the `useState` React hook to store the `query` (users search) and also to store the `artistData` (the playlists that correspond to that). To do this, we used a form to gather the information that was inputted by the user. When the form was submitted, we saved the query (`setQuery`) and this query was then used in the `getArtists` function where we passed in the query search into the function as props.

```
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
  }

  function handleSubmit(event) {
    setQuery(event.target.value)
    console.log('this is the query ' + query)
    getArtists(query)
    setQuery('')
  }
```
The `getArtists` function uses a Fetch request to access the public Deezer API, obtaining the albums that feature the users artist search (`query`). Whilst creating this function, we struggled to access the Deezer API. After researching the error messages, we understood that this was due to access control difficulties. To combat this, we used the reverse proxy, `CORS anywhere` to request the access to the Deezer API on behalf of our app. By adding the CORS header to the response, we were able to save the required data in our app. 

Once we had the albums that related to the searched artist, we saved them in state as the JSON `object` returned by the `fetch` request and accessed the appropriate key/value pairs. By accessing the data stored in the JSON object, we were able to utilise Bulma to display the content on the page. 

To display all of the albums related to an artist, we mapped over the `artistsData`, displaying the album title and the cover and utilising the imported React Router link to allow the user to go to the `songs` component and see the tracks in each album. 

![displayAlbums](../display.png)


## Songs page

![searchPage](../tracks.png)

When the user clicked on the album card they are redirected to the songs page - this is where the songs in each album are displayed. In order to pass information between the `search` and the `songs` component, we passed in `props`. 

We used `useEffect` to fetch the albums data from the Deezer API when the page loaded. In order to ensure that we could fetch the information from any album that the user requested, we used a template literal in the URL request, making use of the `id` that was contained within the `props`: 

```
  useEffect(() => {
    const id = props.match.params.id
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/${id}`)
      .then(resp => resp.json())
      .then((data) => {
        updateSongsData(data.tracks.data)
        updateTitle(data.title)
        updateCover(data.cover)
      })
  }, [])
```
This fetch request allowed us to gather the different tracks (`songsData`) on the album, their name (`title`) and the album cover (`cover`). 

By mapping over the `songsData` and researching how to effectively implement AUDIOCONTROLS??, we were able to allow the user to play previews of all of the tracks within an album. 

To style our app, we used Bulma in addition to our own SCSS effects, gaining inspiration from the green and black colour scheme used by Spotify. 

# Potential Features

In the future, I would like to implement a favourites component - this would allow users to select and keep a record of their favourite albums. Additionally, if we had had more time, we would have used the Spotify API as this would allow for the whole song to be played. When building projects later on in the course, I understood how to implement moving carousels - on reflection, I think this project would benefit a moving carousel on the search page which could, for example, display newly released music which the user could explore. 

# Lessons learnt 

Over the course of this hackathon, I became more comfortable with a variety of techical skills. A skill that I developed which became firmly solidified over the duration of my coding course was how best to read the documentation for and collect information from a public API. Additionally, I became confident with transferring information between components and making fetch requests to specific URLS by utilising template literals. Furthermore, I solidifed my understanding of how to access the relevant information stored in JSON objects and how to store this using state. 

In addition to the prgramming skills that I learnt, I became confident in efficient ways to pair-programme whilst meeting strict deadlines- utilising tools such as Git, GitHub, Slack and VSCode Live Sharing to facilitate this. As well as my first project, this gave me and opporunity to vocalise my written code to others and develop my presentation skills. 



