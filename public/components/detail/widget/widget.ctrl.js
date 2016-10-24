(function() {
    'use strict';
    angular
        .module('riddle.detail')
        .controller('widget.ctrl', widgetCtrl);

    function widgetCtrl(clickedItem, cuisineDB, $rootScope) {

        var widget = this;

        $(function(){
	         $('.ripple').materialripple();
	      });

        widget.modalId = '';

        widget.setModalId =  function(id) {

          clickedItem.id = id;
          $rootScope.$broadcast('setItemId');


        }


  	}
})();
