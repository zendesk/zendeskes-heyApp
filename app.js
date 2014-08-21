(function() {

  return {
    requests: {
        notifyAll: function(data) {
          return {
            url: '/api/v2/apps/notify',
            type: 'POST',
            data: JSON.stringify({
              "app_id": this.id(),
              "event": "popMessage",
              "body": data
            })
          };
        }
    },

    events: {
      'app.activated':'doSomething',
      'ticket.save': 'checkUrgent',

    },

    doSomething: function() {
      this.switchTo('main');
    },

    checkUrgent: function() {
      var ticket = this.ticket();
      if (ticket.priority() == "urgent") {
        var data = "the ticket #" + ticket.id() + "has been marked as urgent priority and needs attention";
        this.ajax("notifyAll", data);
        return true;
      }
    },

    popMessage: function(body) {
      this.$('.message').text(body);
    }

  };

}());
