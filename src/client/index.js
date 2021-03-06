
var pixi = require('pixi'),
    engine = require('engine'),
    solar = require('solar'),
    LoadingState = require('./states/LoadingState');

engine.Device.whenReady(function() {
  var game = new engine.Game({
        parent: 'content',
        antialias: true,
        width: 1024,
        height: 576
      }),
      loadingState = new LoadingState();

  // create auth
  game.auth = new solar.Auth(game);
  game.auth.user.uuid = '1';

  // create game state
  game.state.add('loader', loadingState, true, true);

  global.game = game;
});
