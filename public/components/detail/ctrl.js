(function () {
  angular
      .module('riddle.detail')
      .controller('detail.ctrl', detailCtrl);

      function detailCtrl($stateParams, $http) {
        var detail = this;
        var urlUser = '';
        detail.items = [];

        switch ($stateParams.serviceName) {
          case "filter":
            urlUser = 'http://riddle-api.mybluemix.net/api/v1/config/filter';
            break;
          default:
        }

        $http.get(urlUser).
               then(function(response) {
                    console.log(response.data);

        angular.forEach(response.data, function(config, key) {
          console.log(config);
          detail.items.push({
            inlineChecked: false,
            name: config.name,
            threshold: config.threshold,
            tresholdtop: config.threshold-top,
            unit:config.unit,
            questionPlaceholder: "name"
          });


        });

               });
               detail.submitForm = function() {

              }

             detail.add = function () {
               console.log(detail.items);
               detail.items.push({
                 inlineChecked: false,
                 name: "",
                 threshold: "",
                 tresholdtop: "",
                 unit:"",
                 questionPlaceholder: "name"
               });
             };

        detail.serviceName = $stateParams.serviceName;
        detail.param1 = $stateParams.param1;
        detail.param2 = $stateParams.param2;
        console.log(detail.items);
      }
})();
