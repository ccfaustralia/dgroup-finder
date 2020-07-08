import React from "react";
import ccfPin from '../../assets/ccf_pin.png'
import googleMapsPin from '../../assets/google_maps_pin_sm.png'

export interface IMapMarker {
    lat: number;
    lng: number;
    label: string;
    locationName: string;
}

export const MapMarker: React.FunctionComponent<any> = ({label, isHome}) => {
    return(
        <div>
            { isHome ? (<img src={googleMapsPin} alt={label} width={20}/>) : (<img src={ccfPin} alt={label} width={30}/>) }
        </div>
    );
};

export default MapMarker;