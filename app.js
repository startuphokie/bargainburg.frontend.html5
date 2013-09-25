var URL = "http://api.bargainburg.co/v1/";

App = Ember.Application.create({});

Ember.Handlebars.helper('price-glyphs', function(value, options) {
    var s = "";
    for (var i = 0; i < value; ++i)
        s += "$";
    return s;
});

App.Router.map(function() {
    this.resource('search', function() {
        this.resource('search.query', {path: ':search_string'});
    });
    this.resource('categories');
    this.resource('businesses');
    this.resource('business', {path: '/business/:id'});
});

App.IndexRoute = Ember.Route.extend({
    redirect: function() {
        this.transitionTo('categories');
    }
});


App.SearchIndexRoute = Ember.Route.extend({controllerName : 'search.query'});

App.SearchQueryRoute = Ember.Route.extend({
    model: function(params) {
        alert('not implemented yet');
    }
});

App.SearchQueryController = Ember.ArrayController.extend({
    query: null,
    actions : {
        search : function(query) {
            this.transitionToRoute('search.query', query);
        }
    }
});

App.CategoriesRoute = Ember.Route.extend({
    model: function(params) {
        return Ember.$.getJSON(URL + "/categories?expand_merchants=1&callback=?");
    }
});

App.BusinessesRoute = Ember.Route.extend({
    model: function(params) {
        return Ember.$.getJSON(URL + "/merchants?callback=?");
    }
});

App.BusinessRoute = Ember.Route.extend({
    model: function(params) {
        return Ember.$.getJSON(URL + "/merchants/"
            + params.id + "?callback=?").then(function(b) {
                return Ember.$.getJSON(URL + "/coupons?merchant_id="
                    + b.id + "&callback=?").then(function(cs) {
                        b['coupons'] = cs;
                        return b;
                });
        });
    }
});
