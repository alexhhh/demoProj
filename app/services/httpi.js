'use strict';
var App;
(function (App) {
    var Services;
    (function (Services) {
        var Httpi = (function () {
            function Httpi($http) {
                this.http = $http;
            }
            Httpi.prototype.Request = function (config) {
                config.url = this.interpolateUrl(config.url, config.params, config.data);
                if (config && config.headers && config.headers['Content-Type'] && config.headers['Content-Type'].indexOf('x-www-form-urlencoded') >= 0) {
                    config.data = $.param(config.data, true);
                }
                return this.http(config);
            };
            Httpi.prototype.interpolateUrl = function (url, params, data) {
                // Make sure we have an object to work with - makes the rest of the
                // logic easier.
                params = (params || {});
                data = (data || {});
                // Strip out the delimiter fluff that is only there for readability
                // of the optional label paths.
                url = url.replace(/(\(\s*|\s*\)|\s*\|\s*)/g, "");
                // Replace each label in the URL (ex, :userID).
                url = url.replace(/:([a-z]\w*)/gi, function ($0, label) {
                    // NOTE: Giving "data" precedence over "params".
                    var _result = this.popFirstKey(data, params, label, null);
                    if (_result == null)
                        _result = "";
                    return _result;
                });
                // Strip out any repeating slashes (but NOT the http:// version).
                url = url.replace(/(^|[^:])[\/]{2,}/g, "$1/");
                // Strip out any trailing slash.
                url = url.replace(/\/+$/i, "");
                return (url);
            };
            // I take 1..N objects and a key and perform a popKey() action on the
            // first object that contains the given key. If other objects in the list
            // also have the key, they are ignored.
            Httpi.prototype.popFirstKey = function (object1, object2, objectN, key) {
                // Convert the arguments list into a true array so we can easily
                // pluck values from either end.
                var objects = Array.prototype.slice.call(arguments);
                // The key will always be the last item in the argument collection.
                var key = objects.pop();
                var object = null;
                // Iterate over the arguments, looking for the first object that
                // contains a reference to the given key.
                while (object = objects.shift()) {
                    if (object.hasOwnProperty(key)) {
                        var _value = (this.popKey(object, key));
                        return _value;
                    }
                }
            };
            // I delete the key from the given object and return the value.
            Httpi.prototype.popKey = function (object, key) {
                var value = object[key];
                delete (object[key]);
                return (value);
            };
            Httpi.serviceId = 'Httpi';
            return Httpi;
        }());
        Services.Httpi = Httpi;
        // Register with angular
        App.app.factory(Httpi.serviceId, ['$http', function ($http) { return new Httpi($http); }]);
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=httpi.js.map