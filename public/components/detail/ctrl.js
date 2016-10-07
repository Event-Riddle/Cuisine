(function () {
  angular
      .module('riddle.detail')
      .controller('detail.ctrl', detailCtrl);

      function detailCtrl($stateParams, $http) {
        var detail = this;
        $http.get('http://riddle-api.mybluemix.net/api/v1/filter').
               then(function(response) {
                   detail.greeting = response.data;
                   console.log(detail.greeting);
               });

             detail.items = [];

             detail.add = function () {
               console.log(detail.items);
               detail.items.push({
                 inlineChecked: false,
                 question: "",
                 questionPlaceholder: "Parameter Name",
                 text: ""
               });
             };

        detail.serviceName = $stateParams.serviceName;
        detail.param1 = $stateParams.param1;
        detail.param2 = $stateParams.param2;
        console.log($stateParams.serviceName);
      }
})();
