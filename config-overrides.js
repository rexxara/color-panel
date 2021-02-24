const { override, addWebpackAlias} = require('customize-cra');
const path = require('path')

 module.exports = override(
     
);

// const SassRuleRewirer = require('react-app-rewire-sass-rule');
// // Basic
// module.exports = function override(config, env) {
//   config = new SassRuleRewirer()
//     .rewire(config, env);
//   return config;
// }

