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

module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  setupFilesAfterEnv: ["<rootDir>/src/test-utils/setup.js"],
  watchPlugins: isYeelightInstalled() ? [ [ 'jest-plugin-yeelight', { ip: '192.168.1.56'} ]] : [],
}
