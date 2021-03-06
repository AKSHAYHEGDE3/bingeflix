import React from 'react'
import './Home.scss'
import SingleItem from './SingleItem';
import { useState, useEffect,useContext } from 'react';
import { UserContext } from "../../UserContext";


const Lists = () => {
    const { user, setUser } = useContext(UserContext);
    const [movies,setMovies] = useState([])
    const [series,setSeries] = useState([])
    const [animes,setAnimes] = useState([])

    useEffect(()=>{
        // console.log("useeff")
        const fetchTrending = async()=>{
            try{
                // console.log("try")
                const trendingMovies = await fetch("/fetchTrendingVideos?type=movies");
                const trendingSeries = await fetch("/fetchTrendingVideos?type=series");
                const trendingAnimes= await fetch("/fetchTrendingVideos?type=animes");

                const movieLists = await trendingMovies.json();
                const seriesLists = await trendingSeries.json();
                const animeLists = await trendingAnimes.json();
                // console.log(movieLists)
  
                setMovies(movieLists)
                setSeries(seriesLists)
                setAnimes(animeLists)

            } catch(err){
                console.log(err)
            }
         }
         fetchTrending();
    },[])

    // console.log(user)
    // console.log(movies)
    // console.log(series)
    // console.log(animes)
   
    return (
        <div>
            <div className="bar p-2 mt-5 mt-md-0">
                <span className="trending mx-2">Trending</span>
                <button type="button" class="btn ms-4 mb-1"><i className="fa fa-play-circle me-2"></i>Movies</button>
            </div>
            <div class="listContainer p-4">
                {
                    movies.map(movie=>{
                        return <SingleItem data={movie}/>
                    })
                }
            </div>

            <div className="bar p-2 ">
                <span className="trending mx-2">Trending</span>
                <button type="button" class="btn ms-4 mb-1"><i className="fa fa-play-circle me-2"></i>Series</button>
            </div>
            <div class="listContainer p-4">
                {
                    series.map(show=>{
                        return <SingleItem data={show}/>
                    })
                }
            </div>

            <div className="bar p-2 ">
                <span className="trending mx-2">Trending</span>
                <button type="button" class="btn ms-4 mb-1"><i className="fa fa-play-circle me-2"></i>Animes</button>
            </div>
            <div class="listContainer p-4">
                {
                    animes.map(anime=>{
                        return <SingleItem data={anime}/>
                    })
                }
            </div>
        </div>
    )
}

export default Lists
