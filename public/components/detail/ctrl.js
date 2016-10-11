(function () {
  angular
      .module('riddle.detail')
      .controller('detail.ctrl', detailCtrl);

      function detailCtrl($stateParams, $http, APIService ) {
        var detail = this;
        var urlUser = '';
        detail.items = [];
        detail.greet = "julz";
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
        });

        if (urlUser !== 'undefined') {
          // your code her

        $http.get(urlUser).
               then(function(response) {


        angular.forEach(response.data, function(config, key) {

          detail.items.push({
            inlineChecked: false,
            name: config.name,
            threshold: config.threshold,
            tresholdtop: config["treshold-top"],
            unit:config.unit,
            questionPlaceholder: "name"
          });


        });

      })}
               detail.submitForm = function() {

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

        // detail.serviceName = $stateParams.serviceName;
        // detail.param1 = $stateParams.param1;
        // detail.param2 = $stateParams.param2;

      }
})();
