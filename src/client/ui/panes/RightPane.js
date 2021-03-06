
var engine = require('engine'),
    Layout = require('../Layout'),
    Pane = require('../components/Pane'),
    BorderPane = require('../components/BorderPane'),
    Label = require('../components/Label'),
    Image = require('../components/Image'),
	ButtonIcon = require('../components/ButtonIcon'),
	Tooltip = require('../components/Tooltip');

function RightPane(game, settings) {
  Pane.call(this, game, {
    width: 288,
    height: 96,
    padding: [0],
    layout: {
      ax: Layout.CENTER,
      ay: Layout.TOP,
      direction: Layout.VERTICAL,
      gap: 0
    },
    bg: {
      color: 0x336699,
      fillAlpha: 0.2,
      fillAlpha: 0.0,
      borderSize: 0.0,
      radius: 0
    }
  });

  this.infoBorderPane = new BorderPane(game, {
    padding: [0],
    gap: [5, 0],
    bg: {
      fillAlpha: 0.0
    }
  });

  this.infoBorderPane2 = new BorderPane(game, {
    padding: [0],
    gap: [5, 0],
    bg: {
      fillAlpha: 0.0
    }
  });

  this.fpsText = new Label(game,
    '60 fps', {
      padding: [0],
      text: {
        fontName: 'medium',
        tint: 0x66aaff
      },
      bg: {
        fillAlpha: 0.0,
        borderAlpha: 0.0
      }
    });

  this.pingText = new Label(game,
    '0 ping', {
      padding: [0],
      text: {
        fontName: 'medium',
        tint: 0x66aaff
      },
      bg: {
        fillAlpha: 0.0,
        borderAlpha: 0.0
      }
    })

  this.versionText = new Label(game,
    'solar crusaders dev', {
      padding: [5],
      text: {
        fontName: 'medium',
        tint: 0x66aaff
      },
      bg: {
        fillAlpha: 0.0,
        borderAlpha: 0.0
      }
    });

  // add layout panels
  this.addPanel(Layout.CENTER, this.versionText);
  
  this.icon1 = new ButtonIcon(game, 'texture-atlas', { icon: { frame: 'icon-x01.png' }});
  this.tooltip = new Tooltip(game, 'Button', this.icon1);

  this.infoBorderPane2.addPanel(Layout.RIGHT, this.fpsText);
  this.infoBorderPane2.addPanel(Layout.LEFT, this.pingText);
  
  this.addPanel(Layout.CENTER, this.infoBorderPane2);
  this.addPanel(Layout.CENTER, this.icon1);
  // create timer
  game.clock.events.loop(500, this._updateInfo, this);
};

RightPane.prototype = Object.create(Pane.prototype);
RightPane.prototype.constructor = RightPane;

RightPane.prototype.validate = function() {
  return Pane.prototype.validate.call(this);
};

RightPane.prototype._updateInfo = function() {
  this.fpsText.text = this.game.clock.fps + ' fps';
  this.pingText.text = this.game.net.rtt + ' rtt';
  this.invalidate(true);
};

module.exports = RightPane;
