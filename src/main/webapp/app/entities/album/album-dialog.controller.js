(function() {
    'use strict';

    angular
        .module('appApp')
        .controller('AlbumDialogController', AlbumDialogController);

    AlbumDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Album', 'Banda', 'Musico', 'Genero', 'VotarFavoritoA', 'Cancion'];

    function AlbumDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Album, Banda, Musico, Genero, VotarFavoritoA, Cancion) {
        var vm = this;

        vm.album = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.bandas = Banda.query();
        vm.musicos = Musico.query();
        vm.generos = Genero.query();
        vm.votarfavoritoas = VotarFavoritoA.query();
        vm.cancions = Cancion.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.album.id !== null) {
                Album.update(vm.album, onSaveSuccess, onSaveError);
            } else {
                Album.save(vm.album, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('appApp:albumUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.fechaCreacion = false;

        vm.setFoto = function ($file, album) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        album.foto = base64Data;
                        album.fotoContentType = $file.type;
                    });
                });
            }
        };

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
