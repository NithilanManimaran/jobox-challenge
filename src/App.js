import React from 'react';
import { Nav } from './nav_bar/Nav';
import { Gallery } from './gallery/Gallery';
import './App.css';

function App() {
  return (
    <div>
      <Nav />
      <div style={{height: '60px'}}>
      </div>
      <Gallery />
    </div>
  );
}

export default App;
