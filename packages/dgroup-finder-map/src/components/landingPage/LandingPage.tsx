import React from "react";
import styles from './LandingPage.module.css';
import Search from "../search/Search";

export const LandingPage: React.FunctionComponent<any> = ({appState, setAppState}) => {
    return (
        <div className={`${styles.landingPage} ${appState.homeMarker ? styles.hidden : styles.visible}`} >
            <h1>Find a dgroup</h1>
            <p>Enter your location to find a Dgroup near you...</p>
            <Search appState={appState} setAppState={setAppState}/>
        </div>
    );
};

export default LandingPage;