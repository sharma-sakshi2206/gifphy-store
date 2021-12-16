import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import GifListings from './containers/gif-listings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<GifListings/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
