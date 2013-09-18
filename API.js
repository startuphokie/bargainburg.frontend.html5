window.API = {
    search: function(s) {
        var k = [];
        var t = s.toLowerCase();
        for (var i = 0; i < businesses.length; ++i) {
            var obj = businesses[i];
            if (obj['name'].toLowerCase().indexOf(t) !== -1 ||
                obj['description'].toLowerCase().indexOf(t) !== -1)
                k.push(obj);
        }

        return k;
    },

    /*
     convert businesses to
     [
        {'category': 'Food',
         'businesses' : [{'name' : ... , 'slug' : ...}, {'name' : ..., 'slug' : ... }]
        },
        {'category': 'Grocery',
         'businesses' : [{'name' : ... , 'slug' : ...}, {'name' : ..., 'slug' : ...}]
        }
    ]
    and sorts it alphabetically by category
    */
    categories: function() {
        var cats = {};
        var cat_arr = [];
        for (var i = 0; i < businesses.length; ++i) {
            var obj = businesses[i];
            if (cats[obj['category']] === undefined)
                cats[obj['category']] = [];

            cats[obj['category']].push(obj);
        }

        for (var cat in cats) {
            cat_arr.push({
                'category' : cat,
                'businesses' : cats[cat]
            });
        }

        return cat_arr.sort(function (a, b) {
            if (a.name > b.name)
              return 1;
            if (a.name < b.name)
              return -1;
            // a must be equal to b
            return 0;
        });
    },

    businesses: function() {
        return businesses;
    },

    get_business: function(slug) {
        for (var i = 0; i < businesses.length; ++i) {
            var obj = businesses[i];
            if (obj['slug'] === slug)
                return obj;
        }
        return undefined;
    },
    get_coupons: function(slug) {
        var cs = window.coupons[slug];
        if (cs === undefined)
            return [];
        else
            return cs;

    }
}
