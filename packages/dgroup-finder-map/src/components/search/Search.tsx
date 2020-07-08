import React, {useEffect, useRef, useState} from "react";
import {findDgroup} from "../api/api";
import styles from './Search.module.css';
import { ReactComponent as LocationIcon } from '../../assets/map-pin.svg'

export const Search: React.FunctionComponent<any> = ({
    appState,
    setAppState
}) => {

    const searchInput = useRef<HTMLInputElement>(null);
    const [selectedDistance, setSelectedDistance] = useState(10);
    const { googleServices } = appState;

    const clearSearchBox = () => {
        // @ts-ignore
        searchInput.current.value = '';
    };

    useEffect(() => {
        if (searchInput?.current && searchInput?.current?.value === "" && appState.homeMarker) {
            searchInput.current.value = appState.homeMarker.locationName;
        }
    }, [appState.homeMarker]);

    useEffect(() => {
      if (googleServices && googleServices.maps && googleServices.map) {
          let newSearchBox = new googleServices.maps.places.SearchBox(searchInput.current);
          //TODO: pass a callback function to this instead -> Ideally should be in ResultsMap component
          googleServices.maps.event.addListener(newSearchBox, 'places_changed',  () => {
              const selected = newSearchBox.getPlaces();
              const { 0: place } = selected;
              if (!place.geometry) return;
              if (place.geometry.viewport) {
                  googleServices.map.fitBounds(place.geometry.viewport);
              } else {
                  googleServices.map.setCenter(place.geometry.location);
                  googleServices.map.setZoom(17);
              }

              //TODO: where should this be triggered??
              findDgroup(place.geometry.location.lat(), place.geometry.location.lng(), selectedDistance).then((results) => {
                  setAppState({
                      ...appState,
                      homeMarker: {
                          lat: place.geometry.location.lat(),
                          lng: place.geometry.location.lng(),
                          label: 'TEST LOCATION',
                          locationName: searchInput?.current?.value
                      },
                      results: results
                  })
              });

              if (searchInput?.current && searchInput?.current?.value === "") {
                  searchInput.current.value = "";
              }

              searchInput?.current?.blur();
          });
      }
    }, [googleServices])

    return(
        <div className={styles.searchContainer}>
            <div className="input-container">
                <LocationIcon className="input-icon" />
                <input
                    ref={searchInput}
                    type="text"
                    onFocus={clearSearchBox}
                    placeholder="Enter a location"
                />
            </div>
            {/*<div className="input-container">
                <select name="distance"
                        id="distance"
                        value={selectedDistance}
                        onChange={e => setSelectedDistance(parseInt(e.currentTarget.value))}
                        >
                    <option value="5">5km</option>
                    <option value="10">10km</option>
                    <option value="25">25km</option>
                    <option value="50">5okm</option>
                </select>
            </div>*/}
        </div>

    );
};


export default Search;