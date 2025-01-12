import React from "react";
import { MovieSearch } from "./MovieSearch";
import "./style.css";

var App = () => {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [movies, setMovies] = React.useState([])
  const [response, setResponse] = React.useState()
  console.log(movies)
  console.log(response)

  const api_url = "http://www.omdbapi.com/?i=tt3896198&apikey=464205bf"
  var SearchMovies = (title) => {
    fetch(api_url + "&s=" + title)
    .then((response) => response.json())
    .then((data) => {
      setMovies(data.Search)
      setResponse(data.Response)
  })
    }
    
    React.useEffect(() => {
      var randomList = ["hunt","kill", "dance", "grey", "bat", "love", "gossip", "music", "lost", "monster"]
      var randomIndex = Math.floor(Math.random() *randomList.length)
      console.log(randomIndex)
    SearchMovies(randomList[randomIndex])
  }, [])
  var displayMovie = () => {
    if (response === "True") {
      return(
        <div className="movies">
        {movies.map((movie) => {
            return (
                <div key = {movie.imdbID} className="movie-card">
                <p className="movie-year">{movie.Year}</p>
                 <img src={movie.Poster === "N/A"? "https://via.placeholder.com/400" : movie.Poster} alt={`${movie.Title} image`}  />
                 <div className="movie-description">
                   <h5 className="movie-type">{movie.Type === "movie"? "Movie" : "Series"}</h5>
                   <h5 className="movie-title">{movie.Title}</h5>
                 </div>
              </div>
            )
          })}
      </div>  
      )
    }

    else if (response === "False") {
      return (
        <h2 className="no-movie">No Movies Found😓</h2>
      )
    }

    else  {
      return (
        <h2 className="no-movie">❗No Internet Connection❗</h2>
      )
    }
  }
    return (
        <>
        <div className="flex">
          <div className="container">
            <MovieSearch
            searchTerm = {searchTerm}
            setSearchTerm = {setSearchTerm}
            setMovies = {setMovies}
            SearchMovies = {() => SearchMovies(searchTerm)}
            />
            {displayMovie()}
          </div>
        </div>
        </>
    )
}
export default App;