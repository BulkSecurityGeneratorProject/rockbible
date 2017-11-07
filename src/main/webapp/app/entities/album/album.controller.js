(function() {
    'use strict';

    angular
        .module('appApp')
        .controller('AlbumController', AlbumController);

    AlbumController.$inject = ['DataUtils', 'Album'];

    function AlbumController(DataUtils, Album) {

        var vm = this;

        vm.albums = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            Album.query(function(result) {
                vm.albums = result;
                vm.searchQuery = null;
            });
        }
    }
})();
