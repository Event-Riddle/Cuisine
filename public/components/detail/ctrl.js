(function () {
  angular
      .module('riddle.detail')
      .controller('detail.ctrl', detailCtrl);

      function detailCtrl($stateParams, $http, APIService, APIpostService ) {
        var detail = this;
        var urlUser = '';
        detail.items = [];
        detail.serviceName = $stateParams.serviceName;
        switch ($stateParams.serviceName) {
          case "filter":
            urlUser = 'http://riddle-api.mybluemix.net/api/v1/config/filter';
            break;
          default:
        }

        APIService.api.getConfig({

                configType:  $stateParams.serviceName

        }, function (data) {
        //var sortedData = hcBumblebee.ctfMultiSort(data)
          var obj = {};
              obj.data = data;
              console.log(JSON.stringify(obj.data));

              angular.forEach(obj.data, function(config, key) {

                detail.items.push({
                  inlineChecked: false,
                  name: config.name,
                  threshold: config.threshold,
                  tresholdtop: config["treshold-top"],
                  unit:config.unit,
                  questionPlaceholder: "name"
                });


              });

        });


               detail.submitForm = function() {
                 console.log('blub');
              }

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


        // detail.param1 = $stateParams.param1;
        // detail.param2 = $stateParams.param2;

      }
})();
