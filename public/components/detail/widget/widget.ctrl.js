(function() {
    'use strict';
    angular
        .module('riddle.detail')
        .controller('widget.ctrl', widgetCtrl);

    function widgetCtrl(APIService, clickedItem, cuisineDB, $rootScope) {

        var widget = this;

        $(function(){
	         $('.ripple').materialripple();
	      });

        widget.modalId = '';

        widget.setModalId =  function(id) {
          console.log(id);
          clickedItem.id = id;
          $rootScope.$broadcast('setItemId');

        }

        widget.deleteItem =  function(id) {

          clickedItem.id = id;
          $rootScope.$broadcast('setItemId');

          var dbData = JSON.parse(cuisineDB.getData());

          dbData.splice(clickedItem.id, 1);
          console.log(dbData);
          console.log( widget.serviceName);
console.log(id);

             APIService.apiPost.postConfig({

                     configType:  widget.serviceName

             },dbData,function() {
               console.log('succeeded');
               $rootScope.$broadcast('loadReady');
             });


        }

  	}
})();
