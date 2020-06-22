import React, {useEffect, useRef} from "react";

export const Search: React.FunctionComponent<any> = ({
    appState,
    setAppState
}) => {

    const searchInput = useRef<HTMLInputElement>(null);
    const { googleServices } = appState;

    const clearSearchBox = () => {
        // @ts-ignore
        searchInput.current.value = '';
    }

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

              setAppState({
                  ...appState,
                  homeMarker: {
                      lat: place.geometry.location.lat(),
                      lng: place.geometry.location.lng(), label: 'TEST LOCATION'
                  }
              })

              // @ts-ignore
              searchInput.current.blur();
          });
      }
    }, [googleServices])

    return(
        <input
            ref={searchInput}
            type="text"
            onFocus={clearSearchBox}
            placeholder="Enter a location"
        />
    );
};


export default Search;