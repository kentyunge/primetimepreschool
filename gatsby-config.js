let activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

console.log(`Using environment config: '${activeEnv}'`)

require("dotenv").config({path: `.env.${activeEnv}`})

console.log(`********${process.env.CLIENTSECRERT}*********`);
console.log(`${process.env.USERNAME} - ${process.env.PASS}`);

module.exports = {
  siteMetadata: {
    title: 'Gatsby + WordPress Starter'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass', {
      resolve: 'gatsby-source-wordpress',
      options: {
        // The base url to your WP site.
        baseUrl: 'primetimepreschool.wordpress.com',
        // WP.com sites set to true, WP.org set to false
        hostingWPCOM: true,
        // The protocol. This can be http or https.
        protocol: 'https',
        // Use 'Advanced Custom Fields' Wordpress plugin
        useACF: false,
        auth: {
          wpcom_app_clientSecret: process.env.CLIENTSECRET,
          wpcom_app_clientId: "64465",
          wpcom_user: process.env.USERNAME,
          wpcom_pass: process.env.PASS
        },
        // Set to true to debug endpoints on 'gatsby build'
        verboseOutput: false
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp', {
      // Removes unused css rules
      resolve: 'gatsby-plugin-purgecss',
      options: {
        // Activates purging in gatsby develop
        develop: true,
        // Purge only the main css file
        purgeOnly: ['/all.sass']
      }
    }, // must be after other CSS plugins
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ]
}
