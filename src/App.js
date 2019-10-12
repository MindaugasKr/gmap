import React from 'react';
import Map from './googleMaps'
import { markersData } from './fakeData';

function App() {
  return (
    <div style={{
      width: '100%',
      height: '100vh'
    }}>
      <Map markersData={markersData} />
    </div>
  );
}

export default App;
