const path = require('path')

// Resolve import path
module.exports = {
  resolve: {
    // for WebStorm
    alias: {
      '@': path.resolve(__dirname),
      '~': path.resolve(__dirname),
      '~common': path.join(__dirname, 'components/common'),
      '~account': path.join(__dirname, 'components/account'),
      '~info': path.join(__dirname, 'components/info'),
      '~layouts': path.join(__dirname, 'components/layouts'),
      '~lobby': path.join(__dirname, 'components/lobby'),
      '~news': path.join(__dirname, 'components/news'),
      '~pages': path.join(__dirname, 'components/pages'),
      '~support': path.join(__dirname, 'components/support'),
      '~user': path.join(__dirname, 'components/user'),
      '~scssAsset': path.join(__dirname, 'static/assets/scss/components'),
      '~imageAsset': path.join(__dirname, 'static/assets/images/components'),
      '~imageRoot': path.join(__dirname, 'static/assets/images')
    }
  }
}
