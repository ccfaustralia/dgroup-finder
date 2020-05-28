import React from "react";
import GoogleMapReact from 'google-map-react';
import styles from './ResultsMap.module.css';

export const ResultsMap: React.FunctionComponent<any> = ({
    onApiLoad
}) => {
    const key = 'AIzaSyDzcwstCPNO69m6a84kcXmoaVvb-5wTYqw';
    return(
        <section className={styles.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: key,
                    libraries: ['places', 'directions']
                }}
                defaultZoom={4} // Supports DP, e.g 11.5
                defaultCenter={{ lat: -24.85733, lng: 133.85750 }}
                yesIWantToUseGoogleMapApiInternals={true}
                onGoogleApiLoaded={({ map, maps }) => onApiLoad(map, maps)}
            >
            </GoogleMapReact>
        </section>
    );
}

export default ResultsMap;