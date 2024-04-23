//import { getPictures } from './data.js';
import './form.js';
import './pictureEditor.js';
import {fetchPictures} from './server.js';
import {resetFormParams, setUserFormSubmit} from './form.js';
import {renderPictures} from './picture.js';
import './filters.js';
import './preview.js';

// renderPictures(getPictures());
fetchPictures(renderPictures);
document.querySelector('.img-filters').classList.remove('img-filters--inactive');
setUserFormSubmit(resetFormParams);
