import { createAds } from './project_modules/data.js';
import { createPopup } from './project_modules/popup.js';

const AD_QUANTITY = 10;
const ads = createAds(AD_QUANTITY);

createPopup(ads[0]);
