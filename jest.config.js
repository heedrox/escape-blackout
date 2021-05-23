// save a .env.local file with YEELIGHT_JEST_ACTIVE=true and YEELIGHT_JEST_IP=x.x.x.x
// to active yeelight plugin

const isYeelightInstalled = () => {
  try {
    require.resolve("jest-plugin-yeelight");
    console.log("jest-plugin-yeelight is installed. Yeelight will change per every test result :) .");
    return true;
  } catch(e) {
    console.log("jest-plugin-yeelight not installed. Yeelight will not change based on test results :( .");
    return false;
  }
};

const isYeelightActive = () => process.env.YEELIGHT_JEST_ACTIVE === 'true';
const addIf = (condition, ...elements) =>
  condition ? elements : [];

module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  setupFilesAfterEnv: ["<rootDir>/src/test-utils/setup.js"],
  watchPlugins: [
    ...addIf(isYeelightInstalled() && isYeelightActive(), [ 'jest-plugin-yeelight', { ip: process.env.YEELIGHT_JEST_IP } ]),
    [ './src/test-utils/browser-test-overlay.js' ]
    ]
};
