(function() {

  return {
    requests: {
        notifyAll: function(data) {
          return {
            url: '/api/v2/apps/notify',
            type: 'POST',
            contentType: 'application/json',
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
      'notification.popMessage':'doPopMessage'

    },

    doSomething: function() {
      this.switchTo('main');
    },

    checkUrgent: function() {
      var ticket = this.ticket();
      if (ticket.priority() == "urgent") {
        //var data = 'the ticket</a href="#' + ticket.id() + '">#'+ ticket.id() +'</a> has been marked as urgent priority and needs attention';
        var data = 'there is an urgent ticket that needs attention';
        this.ajax("notifyAll", data).done(function(){
          return true;
        });
      }
      else {
        return true;
      }
    },

    doPopMessage: function(body) {
      services.notify(body, 'error');
    }

  };

}());
