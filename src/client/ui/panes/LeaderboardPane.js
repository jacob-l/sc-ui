var engine = require('engine'),
    Layout = require('../Layout'),
    Pane = require('../components/Pane'),
    Label = require('../components/Label');
    Button = require('../components/Button');
    Tooltip = require('../components/Tooltip');

var maxRows = 5;
var sortBy = 'currency';

function LeaderboardPane(game, settings) {
  Pane.call(this, game, {
    padding: [20],
    layout: {
      gap: 6
    },
    bg: {
      color: 0x116699,
      borderSize: 0.0,
      radius: 1
    }
  });

  this.users = [];

  /*
  //Uncomment this block if you would like to get some data for testing
  this.users = [{
      id: 1,
      name: 'User A',
      currency: 1,
      kills: 8
  }, {
      id: 2,
      name: 'User B',
      currency: 3,
      kills: 6
  }, {
      id: 3,
      name: 'User C',
      currency: 5,
      kills: 2
  }, {
      id: 4,
      name: 'User D',
      currency: 7,
      kills: 0
  }, {
      id: 5,
      name: 'User E',
      currency: 9,
      kills: 10
  }, {
      id: 6,
      name: 'User F',
      currency: 11,
      kills: 12
  }];*/
  
  this.sortByKillsButton = new Button(game, 'Sort by kills');
  this.sortByKillsButton.on('inputUp', this._changeSort, this);
  this.sortByCurrencyButton = new Button(game, 'Sort by currency');
  this.sortByCurrencyButton.on('inputUp', this._changeSort, this);
  this.addPanel(Layout.NONE, this.sortByKillsButton);
  this.addPanel(Layout.NONE, this.sortByCurrencyButton);
  this.sortByCurrencyButton.visible = false;

  this.drawedUsers = [];
  this._redrawUsers();
};

LeaderboardPane.prototype = Object.create(Pane.prototype);
LeaderboardPane.prototype.constructor = LeaderboardPane;

LeaderboardPane.prototype._redrawUsers = function() {
    for (var i = 0; i < this.drawedUsers.length; i++) {
        this.removePanel(this.drawedUsers[i]);
    }
    this.drawedUsers = [];
    
    this.users = this.users.sort(function (a, b) {
        if (sortBy === 'currency') {
            return a.currency - b.currency;
        }
        
        return a.kills - b.kills;
    });

    for(var i = 0; i < this.users.length && i < maxRows; i++) {
        var user = new Pane(game, {
            layout: {
                direction: Layout.HORIZONTAL,
                gap: 1
            }
        });
        
        user.addPanel(Layout.NONE, new Label(game, sortBy === 'currency' ?
            this.users[i].currency.toString() : this.users[i].kills.toString()));
        user.addPanel(Layout.NONE, new Label(game, this.users[i].name));
        
        this.addPanel(Layout.NONE, user);
        this.drawedUsers.push(user);
    }
};

LeaderboardPane.prototype._changeSort = function() {
    if (sortBy === 'currency') {
        sortBy = 'kills';
        this.sortByCurrencyButton.visible = true;
        this.sortByKillsButton.visible = false;
    } else {
        sortBy = 'currency';
        this.sortByCurrencyButton.visible = false;
        this.sortByKillsButton.visible = true;
    }
    
    this._redrawUsers();
};

LeaderboardPane.prototype.addPlayer = function(player) {
    this.users = this.users.filter(function(item) {
        item.id !== player.id;
    });
    
    this.users.push(player);

    this._redrawUsers();
}

LeaderboardPane.prototype.removePlayer = function(player) {
    this.users = this.users.filter(function(item) {
        item.id !== player.id;
    });
    
    this._redrawUsers();
}

LeaderboardPane.prototype.refreshOrder = function() {
    this._redrawUsers();
}

module.exports = LeaderboardPane;