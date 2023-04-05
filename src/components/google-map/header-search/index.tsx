import React, { useState } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faHandHoldingDollar,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import style from './style.module.scss';
import { Button, Dropdown, MenuProps } from 'antd';

interface Props {
  handleChangePlace: ({
    lat,
    lng,
    houseType,
  }: {
    lat: number;
    lng: number;
    houseType?: string;
  }) => void;
  mode?: 'insideMap';
  handleClickSearch: () => void;
}

const items: {
  label: JSX.Element;
  icon: JSX.Element;
  key: '1' | '2';
}[] = [
  {
    label: <span style={{ fontSize: '1rem', color: '#00004d' }}>Mua nhà</span>,
    icon: (
      <FontAwesomeIcon icon={faHandHoldingDollar} style={{ fontSize: '1rem', color: '#00004d' }} />
    ),
    key: '1',
  },
  {
    icon: <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: '1rem', color: '#00004d' }} />,
    label: <span style={{ fontSize: '1rem', color: '#00004d' }}>Thuê nhà</span>,
    key: '2',
  },
];

function HeaderSearch({ handleChangePlace, mode, handleClickSearch }: Props) {
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

  const [selectItem, setSelectItem] = useState<'1' | '2'>('1');

  const getLabels = (key: '1' | '2') => {
    const find = items.filter((item) => item.key === key);
    return find[0];
  };

  const handleInput = (e: any) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }: { description: any }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description }).then((results: google.maps.GeocoderResult[]) => {
        const { lat, lng } = getLatLng(results[0]);
        handleChangePlace({ lat: lat, lng: lng, houseType: selectItem });
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

  const handleOnClick: MenuProps['onClick'] = (e: any) => {
    setSelectItem(e.key);
  };

  return (
    <div className={style.placeAutoComplete}>
      <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
        <div className={style.button}>
          <Dropdown
            menu={{ items, onClick: handleOnClick }}
            trigger={['click']}
            className={style.button}
          >
            <div>
              <div style={{ marginRight: '8px' }}>{getLabels(selectItem).icon}</div>
              <div style={{ fontWeight: '500' }}>{getLabels(selectItem).label}</div>
            </div>
          </Dropdown>
        </div>
        <div className={style.searchDivider}></div>
        <input
          placeholder='Search'
          value={value}
          onChange={handleInput}
          disabled={!ready}
          style={{
            border: 'none',
            outline: 'none',
            width: '240px',
            backgroundColor: 'white',
          }}
        ></input>
      </div>
      <Button
        onClick={handleClickSearch}
        type='primary'
        className={style.searchButton}
        icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
      ></Button>
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
                left: '0',
                top: '120%',
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                borderRadius: '6px',
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

export default HeaderSearch;
