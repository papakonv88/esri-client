import React from 'react';
import { Button } from 'jimu-ui';
import './../../index.css'

interface CityButtonProps {
    id: string;
    name: string;
    filename: string;
    lat: number;
    lng: number;
    isActive: boolean;
    clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const CityButton = ({
                               id,
                               name,
                               filename,
                               lat,
                               lng,
                               isActive,
                               clickHandler
                           }: CityButtonProps) => {
    const activeStyle = {
        backgroundColor: '#2A6530',
        color: '#fff',
        borderRadius: '5px',
        width: 'fit-content'
    };
    return (
        <div
            className={`city-item ${isActive ? 'active' : ''}`}
            onClick={clickHandler}
            data-id={id}
            data-name={name}
            data-filename={filename}
            data-lat={lat}
            data-lng={lng}
        >
            {name}
        </div>
    );
};
