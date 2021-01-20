import * as PNotify from '../../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

// console.log(PNotify);
const enterImageName = function enterImgName() {
  PNotify.notice({
    text: 'Please enter image name!',
  });
};
const notFound = function notFound() {
  PNotify.info({
    text: 'Image not found. Please check your request and try again!',
  });
};
const errorRequest = function errReq() {
  PNotify.error({
    text: 'Request error!',
  });
};
// console.log(errorRequest);
export default { enterImageName, notFound, errorRequest };
