//service functions for fetching api data

export const getDogPhotos = () => {
    return fetch(`${process.env.REACT_APP_API_LINK}breeds/image/random/10`)
        .then(async (res) => {
            let data = await res.json()
            let ret = createReturnObj(data.message);
            ret['filter'] = false;
            return ret;
        })
}

export const getDogPhotosByBreed = (type) => {
    let type_in_url = type.includes('-') ? type.substring(0, 1).toLowerCase() + type.substring(1, type.indexOf('-')) + '/' + type.substring(type.indexOf('-') + 1, type.length) :
        type.substring(0, 1).toLowerCase() + type.substring(1, type.length);
    return fetch(`${process.env.REACT_APP_API_LINK}breed/${type_in_url}/images/random/10`)
        .then(async (res) => {
            let data = await res.json()
            let ret = createReturnObj(data.message);
            ret['filter'] = type;
            return ret;
        });
}

export const getBreedsList = () => {
    return fetch(`${process.env.REACT_APP_API_LINK}breeds/list/all`)
        .then(async (res) => {
            let data = await res.json()
            let ret = createBreedList(data.message);
            return ret;
        });
}

const createReturnObj = (data) => {
    let lst = [...new Set(data)];
    let photoObjLst = lst.map((x) => {
        let start = x.indexOf('breeds/');
        let end = x.lastIndexOf('/');
        return { src: x, type: x.substring(start + 7, start + 8).toUpperCase() + x.substring(start + 8, end) };
    });
    return { photos: photoObjLst };
}

const createBreedList = (data) => {
    let ret = [{value: 'All', label: 'All'}];
    for (const [key, value] of Object.entries(data)) {
        ret.push({
            value: key.charAt(0).toUpperCase() + key.slice(1),
            label: key.charAt(0).toUpperCase() + key.slice(1)
        });
        if (value !== []) {
            ret.push(...value.map(x => {
                return {
                    value: key.charAt(0).toUpperCase() + key.slice(1) + '-' + x,
                    label: key.charAt(0).toUpperCase() + key.slice(1) + '-' + x
                }
            }));
        }
    }
    return ret;
}