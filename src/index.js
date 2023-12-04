// require("./scss/base.scss");
// const init = () => {
//   console.log("initial change");
// };

// init();

require("./scss/base.scss");

import init from "./js/app/init";

window.addEventListener("DOMContentLoaded", () => {
  init();
});
