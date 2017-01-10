(function() {
    'use strict';
    angular
        .module('riddle.detail')
        .controller('widgetEditFilter.ctrl', widgetEditFilter);

    function widgetEditFilter( $http, APIService, cuisineDB, $rootScope, $scope, clickedItem) {

        var wef = this;

        $scope.$on('setItemId', function (evt) {

        var data= cuisineDB.getItem(clickedItem.id);

         wef.inlineChecked=data.inlineChecked;
         wef.name=data.name;
         wef.bottomId=data.bottomId;
         wef.topId=data.topId;
         wef.threshold=data.threshold;
         wef.thresholdtop=data['threshold-top'];
         wef.unit=data.unit;

      });

      $('#new-filter-modal').on('hidden.bs.modal', function (e) {
          resetForm()
      })

        wef.submitForm = function(e) {

          var item = {
            inlineChecked: wef.inlineChecked,
            name: wef.name,
            bottomId: wef.bottomId,
            topId:wef.topId,
            threshold: wef.threshold,
            "threshold-top": wef.thresholdtop,
            unit: wef.unit,
          };


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
        wef.inlineChecked=null;
        wef.name=null;
        wef.bottomId=null;
        wef.topId=null;
        wef.threshold=null;
        wef.thresholdtop=null;
        wef.unit=null;
      }

  	}
})();
