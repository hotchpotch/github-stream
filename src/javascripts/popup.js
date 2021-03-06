({
  init: function() {
    var self = this;
    $(function() {
      self.bindClick();
    });
  },

  /* private */

  bindClick: function() {
    var self = this;
    $('#next-button').click(function() {
      var button = this;
      self.getOldestNotification(function(notification) {
        if (notification) {
          self.moveToUrl(notification.url);
          self.setDescriptions(notification);
        }
        $(button).toggleClass('disable', !notification);
      });
      return false;
    });
  },

  getOldestNotification: function(callback) {
    chrome.extension.sendRequest({method: 'popNotification'}, function(res) {
      callback(res);
    });
  },

  moveToUrl: function(url) {
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.update(tab.id, {url: url});
    });
  },

  setDescriptions: function(notification) {
    $.each(['title', 'subject', 'body'], function() {
      $('#' + this + ' .value').text(notification[this]);
    });
  }
}).init();
