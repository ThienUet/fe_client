import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

interface Props {
  handleChangePlace: ({ lat, lng }: { lat: number; lng: number }) => void;
}

function PlacesAutocomplete({ handleChangePlace }: Props) {
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

      getGeocode({ address: description }).then((results: any) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log('📍 Coordinates: ', { lat, lng });
        handleChangePlace({ lat: lat, lng: lng });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion: any) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <div
          style={{
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
            paddingLeft: '8px',
          }}
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <div style={{ fontSize: '2rem' }}>
            <FontAwesomeIcon icon={faCoffee} />
          </div>
          <div style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <span style={{ color: '#333333' }}>{main_text}</span>&nbsp;
            <span style={{ color: '#333333' }}>{secondary_text}</span>
          </div>
        </div>
      );
    });

  return (
    <div style={{ position: 'relative', width: '300px' }}>
      <Input placeholder='Search' value={value} onChange={handleInput} disabled={!ready}></Input>
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
          }}
        >
          {renderSuggestions()}
        </div>
      )}
    </div>
  );
}

export default PlacesAutocomplete;
