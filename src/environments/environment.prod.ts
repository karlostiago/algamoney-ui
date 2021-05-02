export const environment = {
  production: true,
  apiURL: 'https://ct-algamoney-api.herokuapp.com/',

  tokenAllowedDomains: [ new RegExp('ct-algamoney-api.herokuapp.com') ],
  tokenDisallowedRoutes: [ new RegExp('\/oauth\/token') ]
};
