(function() {
    'use strict';
    angular
        .module('riddle.detail')
        .controller('widgetEditFilter.ctrl', widgetEditFilter);

    function widgetEditFilter( $http, APIService, cuisineDB, $rootScope, $scope, clickedItem) {

        var wef = this;

        $scope.$on('setItemId', function (evt) {

        var data = cuisineDB.getItem(clickedItem.id);

        switch (wef.serviceName) {
          case 'filter':
            wef.inlineChecked = data.active;
            wef.name = data.name;
            wef.topId = data['filter-top-id'];
            wef.threshold = data['threshold-value-bottom'];
            wef.thresholdtop = data['threshold-value-top'];
            wef.filtering = data['filtering'];
            wef.unit = data.unit;
          case 'correlator':
            wef.matcherId = data['matcher_id'];
            wef.matcherValue = data['matcher_value'];
            wef.cname = data.name;
            wef.pitch = data['pitch'];
            wef.timeTreshold =  data['time_treshold'];
            wef.timestamp = data['timestamp'];
            wef.timestampFormat = data['timestamp_format'];

            break;
          default:

        }


      });

      $('#new-filter-modal').on('hidden.bs.modal', function (e) {
          resetForm()
      })

        wef.submitForm = function(e) {

          switch (wef.serviceName) {
            case 'filter':
            var item = {
              active: wef.inlineChecked,
              name: wef.name,
              "filter-top-id":wef.topId,
              "threshold-value-top": wef.thresholdtop,
              "threshold-value-bottom": wef.threshold,
              filtering: wef.filtering,
              unit: wef.unit,
            };

              break;
            case 'correlator':
            var item = {
              'matcher_id': wef.matcherId,
              'matcher_value': wef.matcherValue,
              'name': wef.cname,
              'pitch': wef.pitch,
              'time_treshold': wef.timeTreshold,
              timestamp: wef.timestamp,
              'timestamp_format': wef.timestampFormat
            };

              break;
            default:

          }


          var dbData = JSON.parse(cuisineDB.getData());


          if ( clickedItem.id === undefined || clickedItem.id === null) {
            dbData.push(item);
          }else {
            dbData[clickedItem.id] = item;
          }

          APIService.apiPost.postConfig({

            configType:  wef.serviceName

          },dbData,function() {
            console.log('succeeded');
            $rootScope.$broadcast('loadReady');
          });

          resetForm();
          $('#new-filter-modal').modal('toggle');
      }



      function resetForm() {
        wef.name = null;
        wef.inlineChecked = null;
        wef.name = null;
        wef.topId = null;
        wef.threshold = null;
        wef.thresholdtop = null;
        wef.unit = null;
        wef.filtering = 'exclude';

        wef.matcherId = null;
        wef.matcherValue = null;
        wef.cname = null;
        wef.pitch = null;
        wef.timeTreshold = null,
        wef.timestamp = null;
        wef.timestampFormat = null

      }
    }
})();
