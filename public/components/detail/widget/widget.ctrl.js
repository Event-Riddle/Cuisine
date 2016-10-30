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
          clickedItem.id = id;
          $rootScope.$broadcast('setItemId');
        }

        widget.deleteItem =  function(id) {

          clickedItem.id = id;

          var dbData = JSON.parse(cuisineDB.getData());

          dbData.splice(clickedItem.id, 1);


             APIService.apiPost.postConfig({

                     configType:  widget.serviceName

             },dbData,function() {
               $rootScope.$broadcast('loadReady');
             });


        }

  	}
})();
