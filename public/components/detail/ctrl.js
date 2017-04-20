(function () {
  angular
      .module('riddle.detail')
      .controller('detail.ctrl', detailCtrl);

      function detailCtrl($stateParams, APIService, cuisineDB, $scope, clickedItem) {

        var detail = this;
        var urlUser = '';
        detail.items = [];
        detail.citems = [];
        detail.serviceName = $stateParams.serviceName;

        detail.setModalId =  function(id) {
          clickedItem.id = null;
        };

        getData();

        $scope.$on('loadReady', function (evt) {
          getData();
        });

             detail.add = function () {

               switch (detail.serviceName) {
                 case 'filter':
                   detail.items.push({
                     inlineChecked: false,
                     name: "",
                     topId: "",
                     threshold: "",
                     thresholdtop: "",
                     unit:"",
                     filtering: 'exclude',
                     questionPlaceholder: "name"
                   });
                   break;
                 case 'correlator':
                   detail.items.push({
                     'matcher_id': '',
                     'matcher_value': '',
                      name: '',
                     'pitch': '',
                     'time_treshold': '',
                      timestamp: '',
                     'timestamp_format': ''
                   });
                   break;
                 default:

               }

             };

             function getData() {
               APIService.api.getConfig({

                       configType:  $stateParams.serviceName

               }, function (data) {
                 console.log(data);
                 var obj = {};
                     obj.data = data;

                     //set Data to cDB

                     cuisineDB.addData(JSON.stringify(obj.data));

                     detail.items=[];
                     detail.citems=[];
                     angular.forEach(JSON.parse(cuisineDB.getData()), function(config, key) {
                      switch (detail.serviceName) {
                        case 'filter':
                        detail.items.push({
                         inlineChecked: config.active,
                         name: config.name,
                         "filter-top-id": config["filter-top-id"],
                         "threshold-value-top": config["threshold-value-top"],
                         "threshold-value-bottom": config["threshold-value-bottom"],
                         unit:config.unit,
                         filtering: config.filtering,
                         questionPlaceholder: "name"
                       });
                       case 'correlator':

                       detail.citems.push({
                          'matcher_id': config['matcher_id'],
                          'matcher_value': config['matcher_value'],
                           name: config['name'],
                          'pitch': config['pitch'],
                          'time_treshold': config['time_treshold'],
                          timestamp: config['timestamp'],
                          'timestamp_format': config['timestamp_format']
                       });

                          break;
                        default:

                      }


                     });
               })

             }


      }
})();
