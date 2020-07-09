import React from "react";
import ccfPin from '../../assets/ccf_pin.png'
import googleMapsPin from '../../assets/google_maps_pin_sm.png'
import styles from './MapMarker.module.css'
import InfoWindow from "../infoWindow/InfoWindow";

export interface IMapMarker {
    lat: number;
    lng: number;
    label: string;
    locationName: string;
}

export const MapMarker: React.FunctionComponent<any> = ({dgroup, isHome, $hover, showWindow}) => {
    return(
        <div>
            { isHome ? (<img src={googleMapsPin} alt={'Your Location'} width={20} />) : (<img src={ccfPin} alt={dgroup ? dgroup.name : 'A dgroup near you'} width={30} className={$hover ? styles.hover : ''}/>) }
            {showWindow && <InfoWindow dgroup={dgroup} />}
        </div>
    );
};

export default MapMarker;