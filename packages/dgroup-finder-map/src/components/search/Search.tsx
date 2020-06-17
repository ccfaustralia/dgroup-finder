import React from "react";
import { AutoComplete } from 'antd';
import {IMapMarker} from "../mapMarker/MapMarker";

export const Search: React.FunctionComponent<any> = ({
    appState,
    setAppState
}) => {

    const { googleServices } = appState;

    const handleSearch = ((value: any) => {

        // Search only if there is a string
        if (value.length > 5) {
            const searchQuery = {
                input: value,
                location: googleServices.singaporeLatLng, // Search within Singapore
                radius: 30000, // in Meters. 30km
            };
            googleServices.autoCompleteService.getQueryPredictions(searchQuery, ((response: any) => {
                // The name of each GoogleMaps place suggestion is in the "description" field
                if (response) {
                    const dataSource = response.map((resp: any) => resp.description);
                    //Do i need to set in state
                    setAppState({ ...appState, dataSource, suggestions: response });
                }
            }));
        }
    });

    const onSelect = ((value: any) => {
        googleServices.geoCoderService.geocode({ address: value }, ((response: any) => {
            const { location } = response[0].geometry;
            const newMarker: IMapMarker = {
                lat: location.lat(),
                lng: location.lng(),
                label: 'Your Location'
            };
            setAppState({ ...appState, homeMarker: newMarker });
        }))
    });

    const { dataSource } = appState;

    return(
        <AutoComplete
            dataSource={dataSource}
            onSelect={onSelect}
            onSearch={handleSearch}
            placeholder="Address"
        />
    );
};


export default Search;