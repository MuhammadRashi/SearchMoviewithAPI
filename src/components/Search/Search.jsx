import React, { Fragment } from 'react'

// import "./Search.css";
import "./Search.css";
import { SearchInput } from './SearchInput/SearchInput';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import { SearchList } from './SearchList/SearchList';
const API_URL =
    "https://api.themoviedb.org/3/search/movie?api_key=d3449ff6ec0c027623bf6b6f5fff78b3&language=en-US&page=1&include_adult=false";


export const Search = () => {

    const [searchInputValue, setSearchInputValue] = useState("");
    const [searchList, setSearchList] = useState([]);

    const handleChange = (event) => {
        setSearchInputValue(event.target.value);
        fetchSearchList();
    }

    const fetchSearchList = async () => {
        try {
            const response = await axios(API_URL, {
                params: {
                    query: searchInputValue,
                },
            });
            // Saving to local array to filter locally
            // setFilteredList(response.data.results);
            setSearchList(response.data.results);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
          if (searchInputValue) {
            fetchSearchList();
          }
        }, 200);
    
        return () => {
          clearTimeout(timeout);
        };
      }, [searchInputValue]);


    // useEffect(() => {
    //     fetchSearchList("movie");
    // }, []);


    const clearSearch = () => {
        setSearchInputValue("");
        setSearchList([]);
      };


    return (
        <Fragment>
            <div className="search-container">
                <div className="heading-section">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3917/3917132.png"
                        alt=""
                    />
                    <h1>Looking for a movie?</h1>
                </div>
                <SearchInput handleChange={handleChange} searchList={searchList} searchInputValue={searchInputValue} clearSearch={clearSearch}/>
                <SearchList searchList={searchList}/>
            </div>

        </Fragment>
    )
}
