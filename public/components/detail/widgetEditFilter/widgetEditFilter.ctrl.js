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
         wef.threshold=data.threshold;
         wef.tresholdtop=data['treshold-top'];
         wef.unit=data.unit;

      });


        wef.submitForm = function(e) {



        var item = {
          inlineChecked: wef.inlineChecked,
          name: wef.name,
          threshold: wef.threshold,
          "treshold-top": wef.tresholdtop,
          unit: wef.unit,
        };
        // var item = [{
        //   inlineChecked: wef.inlineChecked,
        //   name: wef.name,
        //   threshold: wef.threshold,
        //   "treshold-top": wef.tresholdtop,
        //   unit: wef.unit,
        // }];
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
          $('#new-filter-modal').modal('toggle'); ;
         }



      function resetForm() {
        wef.name = null;
        wef.inlineChecked=null;
        wef.name=null;
        wef.threshold=null;
        wef.tresholdtop=null;
        wef.unit=null;
      }

  	}
})();
