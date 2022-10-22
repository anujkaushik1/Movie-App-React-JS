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
                    
                    <div className="card">
                    <img src={`https://image.tmdb.org/t/p/original${movieResult.backdrop_path}`}   alt={movieResult.title} />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                    </div>
            }
          
        </>
    )
  }
}
