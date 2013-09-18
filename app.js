App = Ember.Application.create({});


App.Router.map(function() {
    this.resource('search', function() {
        this.resource('search.query', {path: ':search_string'});
    });
    this.resource('categories');
    this.resource('businesses');
    this.resource('business', {path: '/business/:business_slug'});
});

App.IndexRoute = Ember.Route.extend({
    redirect: function() {
        this.transitionTo('categories');
    }
});


App.SearchIndexRoute = Ember.Route.extend({controllerName : 'search.query'});

App.SearchQueryRoute = Ember.Route.extend({
    model: function(params) {
        return API.search(params.search_string);
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
        return API.categories();
    }
});

App.BusinessesRoute = Ember.Route.extend({
    model: function(params) {
        return API.businesses();
    }
});

App.BusinessRoute = Ember.Route.extend({
    model: function(params) {
        var obj = API.get_business(params.business_slug);
        obj['coupons'] = API.get_coupons(params.business_slug);
        return obj;
    }
});
