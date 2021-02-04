import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectBreeds } from '../redux_slices/photoSlice';
import Select from 'react-select';
import { get, getByBreed } from '../services/photoService';

import CircularProgress from '@material-ui/core/CircularProgress';
import './nav.css';

export function Nav() {
    const breeds = useSelector(selectBreeds);
    const [curr_select, setSelect] = useState(null);
    var button_label = 'Reset';
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    window.onload = () => {
        get(dispatch, setLoading);
    };
    return (
        <div className="header">
            <button id="get_images" onClick={() => {
                getByBreed('All', dispatch, setLoading);
                setSelect(null);
                }} className="get_button">{button_label}</button>
            <Select
                id="select"
                closeMenuOnSelect={true}
                options={breeds}
                placeholder="Filter by breed..."
                className="select_box"
                value={curr_select}
                onChange={(e) => {
                    getByBreed(e.label, dispatch, setLoading);
                    setSelect(e);
                }}
            />
            {loading ? <div className="center_load">
                <CircularProgress style={{color: 'rgb(25, 72, 173)'}}/>
            </div> : null}
        </div>
    );
}
