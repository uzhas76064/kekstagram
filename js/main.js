//import { getPictures } from './data.js';
//import { renderPictures } from './picture.js';
import './form.js';
import './pictureEditor.js';
import {fetchPictures} from './server.js';
import {resetFormParams, setUserFormSubmit} from './form.js';

// renderPictures(getPictures());
fetchPictures();
setUserFormSubmit(resetFormParams);
