import React from "react";
import styles from './LandingPage.module.css';
import Search from "../search/Search";
import ccfLogo from '../../assets/ccf_logo_white_sinlge_sm.png'

export const LandingPage: React.FunctionComponent<any> = ({appState, setAppState}) => {
    return (
        <div className={`${styles.landingPage} ${appState.homeMarker ? styles.hidden : styles.visible}`} >
            <img src={ccfLogo} alt={'Christ\'s Commission Fellowship'} />
            <h1>Find a dgroup</h1>
            <p>Enter your location to find a Dgroup near you...</p>
            <Search appState={appState} setAppState={setAppState}/>
        </div>
    );
};

export default LandingPage;