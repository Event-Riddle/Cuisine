(function () {
  'use strict'

    angular
        .module('riddle.detail')
        .factory('cuisineDB', cDB);

        function cDB() {
            var data = [];


            return {
              getData: _getData,
              getItem: _getItem,
              addData: _addData
            }


            function _getData() {
              return data;
            }

            function _addData(dataSet) {
              data=[];
              data = dataSet;
            }

            function _getItem(id) {
              return JSON.parse(data)[id];
            }

        }
})();
