import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { debounce } from "lodash";
import { add } from '../services/photoService';
import Modal from '@material-ui/core/Modal';
import {
  selectPhoto,
  selectFiltered,
  selectCurrentBreed,
  selectAvailable
} from '../redux_slices/photoSlice';
import './gallery.css';


export function Gallery() {
  const photos = useSelector(selectPhoto);
  const filtered = useSelector(selectFiltered);
  const current_breed = useSelector(selectCurrentBreed);
  const none_left = useSelector(selectAvailable);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const on_mobie = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

  window.onscroll = debounce(() => {
    if (loading || none_left) return;
    if (
      document.documentElement.scrollTop + document.documentElement.clientHeight >= 0.65*document.documentElement.scrollHeight
    ) {
      add(dispatch, setLoading, filtered, current_breed, none_left);
    }
  }, 100);

  const [open, setOpen] = useState(false);
  const [curr_src, setSrc] = useState('');

  const handleOpen = (src) => {
    setSrc(src);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modal_body = (!on_mobie ? (
    <img src={curr_src} className='modal' alt='none' onClick={handleClose}></img>
  ):(
    <img src={curr_src} className='modal' alt='none' onClick={handleClose}></img>
  ));

  return (
    <div>
      <section id = 'gal' className="gallery">
        {filtered ?
          (photos.map((e, i) => on_mobie ?
            <img key={i} src={e.src} className="image large" alt={e.type} onClick={() => {handleOpen(e.src)}}></img> :
            <img key={i} src={e.src} className="image small" alt={e.type} onClick={() => {handleOpen(e.src)}}></img>))
          : (photos.map((e, i) => (i % 9 !== 0) ?
            <img key={i} src={e.src} className="image small" alt={e.type} onClick={() => {handleOpen(e.src)}}></img> :
            <img key={i} src={e.src} className="image large" alt={e.type} onClick={() => {handleOpen(e.src)}}></img>
          ))}
        <Modal
          open={open}
          onClose={handleClose}
        >
          {modal_body}
        </Modal>
      </section>
      {loading ? <div className="loader">
        <CircularProgress style={{color: 'rgb(25, 72, 173)'}}/>
      </div> : null}
    </div>
  );
}
