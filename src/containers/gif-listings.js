import './gif-listings.css';
import React, { useRef, useEffect, useState, useCallback } from "react";
import {  useSelector, useDispatch } from "react-redux";
import {gifActions} from '../redux/services/gif-actions';
import {debounce} from '../helper';
import { ThemeContext } from '../theme-context';

const GifListings = () => {
  const { theme, toggle, dark } = React.useContext(ThemeContext)
  const [searchVal, setSearchVal] = useState('');
  const [isPlay, setIsPlay] = useState({});
  const searchValRef = useRef(searchVal);
  const playPauseRef = useRef(null);
  let offset = 0;
  let gifStore = useSelector((state) => state.gifStore);
  const dispatch = useDispatch();
  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight + 1 >= scrollHeight) {
      offset += 20
      if(searchValRef.current) {
        dispatch(gifActions.searchGif(searchValRef.current, offset))
      } else {
        dispatch(gifActions.getTrendingGif(offset));;
      }
    }
  };
  useEffect(() => {
    dispatch(gifActions.getTrendingGif(0));
    window.addEventListener("scroll", handleScroll);
  }, []);
  const handlePlayPauseOnClick = (id) => {
    let isPlayDummy = isPlay; 
    if(!isPlayDummy[id]) {
      isPlayDummy[id] = true;
      setIsPlay(state => ({...state, isPlayDummy}));
    } else {
      isPlayDummy[id] = false;
      setIsPlay(state => ({...state, isPlayDummy}));
    }
  }

  const getGifs = () => {
    let gifs = [];
    gifStore && gifStore.gifs && gifStore.gifs.forEach((element, index) => {
       gifs.push(<div id={index} key={element.id} ref={playPauseRef} className='container gif-listingd__gif' onClick={() => handlePlayPauseOnClick(element.id)}>
        <img className='gif-image' src={isPlay[element.id] ? element.images.fixed_height_still.url : element.images.fixed_height.url} alt='gif' />
        <div className='play-pause-icon-container'>
          <img className='gif-play-pause' src={isPlay[element.id] ? 'https://assets.codepen.io/128034/play_circle_filled-24px.svg' : "https://assets.codepen.io/128034/pause_circle_filled-24px.svg" } alt='play/pause' />
        </div>
      </div>)
    });
    return gifs;
  }
  const searchGif = (searchVal) => {
    offset = 0;
    if(searchVal) {
      dispatch(gifActions.searchGif(searchVal, 0));
    } else {
      dispatch(gifActions.getTrendingGif(0));
    }
  }
  const optimizedSearch = useCallback(debounce(searchGif), []);
  const searchOnChange = (val) => {
    searchValRef.current = val;
    setSearchVal(val);
    optimizedSearch(val); 
  }
  return (
    <div className='container-grid' style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
      <button
        type="button"
        onClick={toggle}
        className='gif-toggle'
        style={{
          backgroundColor: theme.backgroundColor,
          color: theme.color,
          outline: 'none'
        }}
      >
        Toggle to {!dark ? 'Dark' : 'Light'} theme
      </button>
      <div className='gif-listings__header'>
        Giphy Store
      </div> 
      <div>
          <input className='gif-search__input' type="text" placeholder="Search Gif..." name="searchGif" value={searchVal} onChange={(e) => searchOnChange(e.target.value)}/>
          <button onClick={()=>searchGif(searchVal)} className='gif-search_search-button' type="submit">Search</button>
      </div>
      <div className='gif-listingd__gifs'>
        {getGifs()}
      </div>
    </div>
  );
};

export default GifListings;
