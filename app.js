var URL = "http://api.bargainburg.co/v1/";

App = Ember.Application.create({});

Ember.Handlebars.helper('price-glyphs', function(value, options) {
    var s = "";
    for (var i = 0; i < value; ++i)
        s += "$";
    return s;
});

Ember.Handlebars.registerHelper('isBusiness', function (options) {
    if (this.type === "merchant") {
        return options.fn(this);
    }
    return options.inverse(this);
});

App.Router.map(function() {
    this.resource('search', function() {
        this.resource('search.query', {path: ':search_string'});
    });
    this.resource('categories');
    this.resource('businesses');
    this.resource('business', {path: '/business/:id'});
    this.resource('coupon', {path: '/coupon/:id'});
});

App.IndexRoute = Ember.Route.extend({
    redirect: function() {
        this.transitionTo('categories');
    }
});

App.CouponRoute = Ember.Route.extend({
    model: function(params) {
        return Ember.$.getJSON(URL + "/coupons/" + params.id + "/?callback=?");
    }
});


App.SearchIndexRoute = Ember.Route.extend({controllerName : 'search.query'});

App.SearchQueryRoute = Ember.Route.extend({
    model: function(params) {
        return Ember.$.getJSON(URL + "/search?query=" + encodeURI(params.search_string) + "&callback=?");
    }
});

App.SearchQueryController = Ember.ArrayController.extend({
    query: null,
    actions : {
        search : function(query) {
            if (query === null || query === '')
                this.transitionToRoute('search.index');
            else
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
            + params.id + "?expand_coupons=1&callback=?");
    }
});

App.LoadingRoute = Ember.Route.extend({});
