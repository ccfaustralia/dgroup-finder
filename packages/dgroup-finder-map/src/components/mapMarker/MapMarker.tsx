import React from "react";

export interface IMapMarker {
    lat: number;
    lng: number;
    label: string;
}

export const MapMarker: React.FunctionComponent<any> = ({label}) => {

    return(
        <div>
            {label}
        </div>
    );
};

export default MapMarker;