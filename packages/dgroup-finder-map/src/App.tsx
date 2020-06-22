import React, {useState} from 'react';
import styles from './App.module.css';
import Search from "./components/search/Search";
import ResultsList from "./components/resultsList/ResultsList";
import ResultsMap from "./components/resultsMap/ResultsMap";
import {IMapMarker} from "./components/mapMarker/MapMarker";

export interface IAppState {
    googleServices?: any;
    homeMarker?: IMapMarker;
}
function App() {

    const [appState, setAppState] = useState<IAppState>({});

    const apiHasLoaded = (map: any, maps: any) => {
        setAppState({
            ...appState,
            googleServices: {
                map,
                maps,
                autoCompleteService: new maps.places.AutocompleteService(),
                geoCoderService: new maps.Geocoder(),
                singaporeLatLng: new maps.LatLng(-24.85733, 133.85750)
        }});
    };

  return (
    <div className={styles.container}>
      <div id="search-container" className={styles.search}><Search appState={appState} setAppState={setAppState}/></div>
      <div id="results-list-container" className={styles.list}><ResultsList /></div>
      <div id="results-map-container" className={styles.map}><ResultsMap appState={appState} onApiLoad={apiHasLoaded}/></div>
    </div>
  );
}

export default App;
