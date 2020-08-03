import React from "react";
import styles from './ResultsList.module.css';

export const ResultsList: React.FunctionComponent<any> = ({appState}) => {
    return ( appState.results ? (appState.results.map((result: any, index: number) => (
        <div className={styles.resultsContainer}>
            <h2>{result.name}</h2>
            <i>{result.lifeStage}</i>
            <p>{result.description}</p>
        </div>
    ))) : (<p>No DGroups Found in your area. Try expanding your search.</p>));
};

export default ResultsList;