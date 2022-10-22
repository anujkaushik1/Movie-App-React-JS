import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Movies extends Component {
  render() {

    let movieResult = movies.results;

    return (
        
        <>
            {
                movieResult.length == 0 ? 
                <div>
                    <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>
                </div> 
        
                :

                <div>
                    <h3 style={{fontWeight: 'bold'}} className = 'text-center'>Trending</h3>
                    <div>
                        {
                            movieResult.map((movie) => (
                                <div className="card movies-card">
                                    <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}   alt={movie.title} className= 'card-img-top banner-img' />
                                    <h1 className="card-title banner-title">{movie.original_title}</h1>
                                    <p  className="card-text banner-text">{movie.overview}</p>
                                
                                 </div>
                            ))
                        }
                    </div>

                </div>
                 
            }
       
        </>

    )
  }
}
