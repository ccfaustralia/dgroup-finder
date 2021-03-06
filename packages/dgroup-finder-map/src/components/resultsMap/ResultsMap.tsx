import React, {useEffect, useRef, useState} from "react";
import GoogleMapReact from 'google-map-react';
import styles from './ResultsMap.module.css';
import MapMarker from "../mapMarker/MapMarker";

export const ResultsMap: React.FunctionComponent<any> = ({
    appState,
    onApiLoad
}) => {
    const key: string = process.env.REACT_APP_API_KEY as string;
    const { googleServices } = appState;
    const mapElement = useRef<HTMLInputElement>(null);
    const [infoWindowState, setInfoWindowState] = useState<any>({});

    useEffect(() => {
        if (!!googleServices && appState.results && appState.results.length) {
            const bounds = new googleServices.maps.LatLngBounds();

            appState.results.forEach((result: any, index: number) => {
                bounds.extend(new googleServices.maps.LatLng(result.latitude, result.longitude));

                let updateWindowState = {...infoWindowState};
                updateWindowState[index] = false;
                setInfoWindowState(updateWindowState);
            });

            bounds.extend(new googleServices.maps.LatLng(appState.homeMarker.lat, appState.homeMarker.lng));

            googleServices.map.fitBounds(bounds);
        }
    }, [appState.results]);

    // onChildClick callback can take two arguments: key and childProps
    const onChildClickCallback = (key: number) => {
        let updateWindowState = {...infoWindowState};
        Object.keys(updateWindowState).forEach(key => {
           updateWindowState[key] = false;
        });
        updateWindowState[key - 1] = true;
        setInfoWindowState(updateWindowState);
    };

    return(
        <section className={styles.mapContainer} ref={mapElement}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: key,
                    libraries: ['places', 'directions']
                }}
                defaultZoom={4} // Supports DP, e.g 11.5
                defaultCenter={{ lat: -24.85733, lng: 133.85750 }}
                yesIWantToUseGoogleMapApiInternals={true}
                onGoogleApiLoaded={({ map, maps }) => onApiLoad(map, maps)}
                center={appState.homeMarker ? appState.center : undefined}
                zoom={appState.homeMarker ? appState.zoom : undefined}
                onChildClick={onChildClickCallback}
            >
                {appState.homeMarker && (
                    <MapMarker lat={appState.homeMarker.lat} lng={appState.homeMarker.lng} isHome={true} />
                )}
                {appState.results && appState.results.map((result: any, index: number) => (
                    <MapMarker lat={result.latitude} lng={result.longitude} dgroup={result} showWindow={infoWindowState[index]}/>
                ))}
            </GoogleMapReact>
        </section>
    );
}

export default ResultsMap;