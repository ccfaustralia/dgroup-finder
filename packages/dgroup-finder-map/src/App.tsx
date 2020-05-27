import React from 'react';
import styles from './App.module.css';
import Search from "./components/search/Search";
import ResultsList from "./components/resultsList/ResultsList";
import ResultsMap from "./components/resultsMap/ResultsMap";

function App() {
  return (
    <div className={styles.container}>
      <div id="search-container" className={styles.search}><Search /></div>
      <div id="results-list-container" className={styles.list}><ResultsList /></div>
      <div id="results-map-container" className={styles.map}><ResultsMap /></div>
    </div>
  );
}

export default App;
