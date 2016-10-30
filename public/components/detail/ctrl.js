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
                 threshold: "",
                 tresholdtop: "",
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
                         inlineChecked: config.inlineChecked,
                         name: config.name,
                         threshold: config.threshold,
                         tresholdtop: config["treshold-top"],
                         unit:config.unit,
                         questionPlaceholder: "name"
                       });

                     });
               })

             }


      }
})();
