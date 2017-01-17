(function () {
  angular
      .module('riddle.detail')
      .controller('detail.ctrl', detailCtrl);

      function detailCtrl($stateParams, APIService, cuisineDB, $scope, clickedItem) {

        var detail = this;
        var urlUser = '';
        detail.items = [];
        detail.serviceName = $stateParams.serviceName;

        detail.setModalId =  function(id) {
          clickedItem.id = null;
        };

        getData();

        $scope.$on('loadReady', function (evt) {
          getData();
        });

             detail.add = function () {

               detail.items.push({
                 inlineChecked: false,
                 name: "",
                 topId: "",
                 bottomId: "",
                 threshold: "",
                 thresholdtop: "",
                 unit:"",
                 questionPlaceholder: "name"
               });
             };

             function getData() {
               APIService.api.getConfig({

                       configType:  $stateParams.serviceName

               }, function (data) {

                 var obj = {};
                     obj.data = data;

                     //set Data to cDB

                     cuisineDB.addData(JSON.stringify(obj.data))


                     detail.items=[];
                     angular.forEach(JSON.parse(cuisineDB.getData()), function(config, key) {
                        detail.items.push({
                         inlineChecked: config.active,
                         name: config.name,
                         "filter-bottom-id": config["filter-bottom-id"],
                         "filter-top-id": config["filter-top-id"],
                         "threshold-value-top": config["threshold-value-top"],
                         "threshold-value-bottom": config["threshold-value-bottom"],
                         unit:config.unit,
                         questionPlaceholder: "name"
                       });

                     });
               })

             }


      }
})();
