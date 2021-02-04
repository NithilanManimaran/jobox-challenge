import {
    set,
    filterBy,
    add_to,
    set_breeds
} from '../redux_slices/photoSlice';
import { getDogPhotos, getDogPhotosByBreed, getBreedsList } from './apiService';


//Exported usable functions from service to update photos on screen.
export const add = (dispatch, setLoading, filtered = false, current_breed = '') => {
    if (filtered) return addByBreed(current_breed, dispatch, setLoading);
    setLoading(true);
    getDogPhotos().then((data) => {
        dispatch(add_to(data));
        setLoading(false);
        setTimeout(() => {
            if (document.getElementById('gal').clientHeight <= window.innerHeight) add(dispatch, setLoading);
        }, 100);
    });
}

export const addByBreed = (breed, dispatch, setLoading) => {
    setLoading(true);
    getDogPhotosByBreed(breed).then((data) => {
        dispatch(add_to(data));
        setLoading(false);
        setTimeout(() => {
            if (document.getElementById('gal').clientHeight <= window.innerHeight) addByBreed(breed, dispatch, setLoading);
        }, 100);
    });
}

export const getByBreed = (breed, dispatch, setLoading) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (breed === 'All') return dispatch(filterBy({ type: breed }));
    let el = document.getElementById("get_images");
    el.className = 'get_button';
    setLoading(true);
    setTimeout(() => {
        getDogPhotosByBreed(breed).then((data) => {
            dispatch(filterBy({ type: breed }));
            dispatch(add_to(data));
            setLoading(false);
        });
    }, 1000);
    document.getElementById("select").style.visibility = 'visible';
}

export const get = (dispatch, setLoading) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    getBreeds(dispatch);
    setLoading(true);
    setTimeout(() => {
        getDogPhotos().then((data) => {
            dispatch(set(data));
            setLoading(false);
            setTimeout(() => {
                if (document.getElementById('gal').clientHeight <= window.innerHeight) add(dispatch, setLoading);
            }, 200);
        });
    }, 1000);
}

const getBreeds = (dispatch) => {
    getBreedsList().then((data) => {
        dispatch(set_breeds(data));
    })
}