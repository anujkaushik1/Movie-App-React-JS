import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Banner extends Component {
  render() {
    let movieResult = movies.results[0];
    return (    
        <>
            {     
                    movieResult == '' ?
                    <div>
                        <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> 
                    
                    :
                    
                    <div className="card banner-card">
                        <img src={`https://image.tmdb.org/t/p/original${movieResult.backdrop_path}`}   alt={movieResult.title} className= 'card-img-top banner-img' />
                        <h1 className="card-title banner-title">{movieResult.original_title}</h1>
                        <p  className="card-text banner-text">{movieResult.overview}</p>
                        
                    </div>
            }
          
        </>
    )
  }
}
