import React, { useReducer, useEffect } from 'react';
import '../App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'SEARCH_MOVIES_REQUEST': 
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case 'SEARCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case 'SEARCH_REQUEST_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(res => {
        dispatch({
          type: 'SEARCH_MOVIES_SUCCESS',
          payload: res.Search
        });
      })
  }, []);

  const search = searchValue => {
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST'
    })

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(res => {
        if(res.Response === 'True') {
          dispatch({
            type: 'SEARCH_MOVIES_SUCCESS',
            payload: res.Search
          });
        } else {
          dispatch({
            type: 'SEARCH_MOVIES_FAILURE',
            error: res.Error
          });
        }
      });
  }

  const { movies, loading, errorMessage } = state;

  return (
    <div className="App">
      <Header text="MOVIE-DB" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite films</p>
      <div className="movies">
        {
          loading && !errorMessage ? (
            <span>loading...</span>
          ) : errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
          ) : (
            movies.map((movie, index) => (
              <Movie key={`${index}--${movie.Title}`} movie={movie} />
            ))
          )
        }
      </div>
    </div>
  )
}

export default App;
