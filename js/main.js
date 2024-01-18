import { getPictures } from './data.js';
import { renderPictures } from './renderThumbnails.js';
import './uploadForm.js';

renderPictures(getPictures());
