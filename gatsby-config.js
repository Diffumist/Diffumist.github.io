module.exports = {
  siteMetadata: {
    siteUrl: 'https://diffumist.github.io',
    title: 'Misty lake',
    author: 'Diffumist'
  },
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/'
      },
      __key: 'pages'
    }
  ]
};
