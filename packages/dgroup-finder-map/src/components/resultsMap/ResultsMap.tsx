import React, {useEffect} from "react";
import GoogleMapReact from 'google-map-react';
import styles from './ResultsMap.module.css';
import MapMarker from "../mapMarker/MapMarker";

export const ResultsMap: React.FunctionComponent<any> = ({
    appState,
    onApiLoad
}) => {
    const key: string = process.env.REACT_APP_API_KEY as string;
    useEffect(() => {
        //Do something here..
        //Add Marker to the map here based on searchedLocation
    },[appState.searchedLocation]);

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
                center={appState.homeMarker ? { lat: appState.homeMarker.lat, lng: appState.homeMarker.lng} : undefined}
            >
                {appState.homeMarker && (
                    <MapMarker lat={appState.homeMarker.lat} lng={appState.homeMarker.lng} label={appState.homeMarker.label} isHome={true} />
                )}
                {appState.results && appState.results.map((result: any) => (
                    <MapMarker lat={result.latitude} lng={result.longitude} label={result.name} />
                ))}
            </GoogleMapReact>
        </section>
    );
}

export default ResultsMap;