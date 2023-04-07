import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import style from './style.module.scss';

interface Props {
  handleChangePlace: ({
    lat,
    lng,
    address,
  }: {
    lat: number;
    lng: number;
    address?: string;
  }) => void;
  mode?: 'insideMap';
}

function PlacesAutocomplete({ handleChangePlace, mode }: Props) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: 'cb',
    requestOptions: {},
    debounce: 1000,
  });

  const handleInput = (e: any) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }: { description: any }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description }).then((results: google.maps.GeocoderResult[]) => {
        const { lat, lng } = getLatLng(results[0]);
        handleChangePlace({ lat: lat, lng: lng, address: results[0].formatted_address });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion: any) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <div className={style.searchItem} key={place_id} onClick={handleSelect(suggestion)}>
          <div className={style.searchIcon}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <div style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <span style={{ color: '#333333' }}>{main_text}</span>&nbsp;
            <span style={{ color: '#333333' }}>{secondary_text}</span>
          </div>
        </div>
      );
    });

  return (
    <div style={{ position: 'relative', width: '100%' }} className={style.placeAutoComplete}>
      <input
        placeholder='Tìm kiếm'
        value={value}
        onChange={handleInput}
        disabled={!ready}
        style={{
          border: 'none',
          outline: 'none',
          padding: '8px 8px 8px 0px',
          marginLeft: '8px',
          width: '90%',
        }}
      ></input>
      {mode === 'insideMap' ? (
        <div>{renderSuggestions()}</div>
      ) : (
        <div>
          {status === 'OK' && (
            <div
              style={{
                position: 'absolute',
                zIndex: '999999999999999999',
                backgroundColor: 'white',
                width: '300px',
                left: '0',
                top: '105%',
                borderRadius: '6px',
                // boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
              }}
            >
              {renderSuggestions()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PlacesAutocomplete;
