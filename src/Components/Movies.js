import React, { Component } from 'react'
import axios from 'axios';

export default class Movies extends Component {
    
    constructor() {
        console.log("constructor");

        super();
        this.state = {
            hover: '',
            parr: [1],
            currPage: 1,
            movies : []
        }
    }

   async componentDidMount(){   // methods for side effects work
        console.log("mounting done");

        const res = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=5984df98ddb29f07afe65af3db9ac90c&page=${this.state.currPage}`);
        let data = res.data;

        this.setState({
            movies : [...data.results]
        })
        
    }

    mouseEnter = (id) => {
        this.setState({
            hover: id
        })
    }

    mouseLeave = () => {
        this.setState({
            hover: ''
        })

    }

    nextPage = async () => {    

        const res = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=5984df98ddb29f07afe65af3db9ac90c&page=${this.state.currPage + 1}`);
        let data = res.data;        

        this.setState({
            parr: [...this.state.parr, this.state.parr.length + 1],
            currPage : this.state.currPage + 1,
            movies : [...data.results]
        })
    }

    previousPage = () => {
        let newArr = [...this.state.parr];
        newArr.length > 1 && newArr.pop();
        let currPage = this.state.currPage;

        let newPage = currPage > 1 ? currPage - 1 : 1;

        this.setState({
            parr: newArr,
            currPage : newPage
        })


    }


    render() {
        let movieResult = this.state.movies;
        let id = this.state.hover;
        let pagesArr = this.state.parr;
        console.log('render');
        return (

            <>
                {
                    movieResult.length == 0 ?
                        // Spinner

                        <div className='d-flex justify-content-center m-5'>
                            <div className="spinner-border text-primary " role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>

                        :

                        // Movies Cards

                        <div>
                            <h3 style={{ fontWeight: 'bold' }} className='text-center'>Trending</h3>
                            <div className='movies-list'>
                                {
                                    movieResult.map((movie) => (
                                        <div className="card movies-card" onMouseEnter={() => this.mouseEnter(movie.id)} onMouseLeave={this.mouseLeave}>
                                            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} className='card-img-top movies-img' />
                                            <h5 className="card-title movies-title">{movie.original_title}</h5>
                                            {/* <p className="card-text movies-text">{movie.overview}</p> */}
                                            <div className="button-wrapper" style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                                                {
                                                    movie.id === id ?
                                                        <a className="btn btn-primary movies-button">Add to Favourites</a>
                                                        :
                                                        <></>
                                                }

                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            {/* Pagination */}

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li class="page-item"><a class="page-link" onClick={this.previousPage}>Previous</a></li>
                                        {
                                            pagesArr.map((page) => (
                                                <li class="page-item"><a class="page-link" >{page}</a></li>
                                            ))
                                        }
                                        <li class="page-item"><a class="page-link" onClick={this.nextPage}>Next</a></li>
                                    </ul>
                                </nav>
                            </div>


                        </div>

                }

            </>

        )
    }
}
