import { createSlice } from '@reduxjs/toolkit';

export const photoSlice = createSlice({
    name: 'photos',
    initialState: {
        allPhotos: [],
        currentFilter: [],
        availableBreeds: [],
        filtered: false,
        current_breed: '',
        not_avilable: false
    },
    reducers: {
        filterBy: (state, p) => {
            if (p.payload.type === "All") { state.currentFilter = state.allPhotos; state.filtered = false; state.not_avilable = false; return; }
            let filteredLst = state.allPhotos.filter(x => x.type === p.payload.type);
            state.currentFilter = filteredLst;
            state.current_breed = p.payload.type;
            state.filtered = true;
        },
        set: (state, lst) => {
            state.allPhotos = lst.payload.photos;
            state.currentFilter = lst.payload.photos;
            state.not_avilable = lst.payload.photos.length === 0 || lst.payload.photos.length < 10 ? true : false;
            state.filtered = lst.payload.filter ? true : false;
            state.current_breed = lst.payload.filter ? lst.payload.filter : '';
        },
        add_to: (state, lst) => {
            let additions = get_unique(state.currentFilter, lst.payload.photos, 'src');
            state.allPhotos.push(...additions);
            state.currentFilter.push(...additions);
            state.not_avilable = additions.length === 0 || lst.payload.photos.length < 5 ? true : false;
        },
        set_breeds: (state, p) => {
            state.availableBreeds = p.payload;
        }
    },
});

const get_unique = (current, incoming, primary_key) => {
    let res = []
    let map = new Map();
    for (const item of current) {
        map.set(item[primary_key], true);
    }
    for (const item of incoming) {
        if (!map.get(item[primary_key])) {
            res.push(item);
        }
    }
    return res;
}

export const { filterBy, set, add_to, set_breeds } = photoSlice.actions;

export const selectPhoto = state => state.photo.currentFilter;
export const selectBreeds = state => state.photo.availableBreeds;
export const selectFiltered = state => state.photo.filtered;
export const selectCurrentBreed = state => state.photo.current_breed;
export const selectAvailable = state => state.photo.not_avilable;


export default photoSlice.reducer;