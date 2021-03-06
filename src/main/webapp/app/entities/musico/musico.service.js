(function() {
    'use strict';
    angular
        .module('appApp')
        .factory('Musico', Musico);

    Musico.$inject = ['$resource', 'DateUtils'];

    function Musico ($resource, DateUtils) {
        var resourceUrl =  'api/musicos/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.fechaNacimiento = DateUtils.convertLocalDateFromServer(data.fechaNacimiento);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.fechaNacimiento = DateUtils.convertLocalDateToServer(copy.fechaNacimiento);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.fechaNacimiento = DateUtils.convertLocalDateToServer(copy.fechaNacimiento);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
