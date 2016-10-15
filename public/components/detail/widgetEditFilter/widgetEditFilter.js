(function() {
    'use strict';
    angular
        .module('riddle.detail')
        .directive('editFormFilter', editFormFilter);

    function editFormFilter() {

  		return {
  			restrict: 'EA',
  			scope: {
          item: '=formItem',
          someArray: '@array'
  			},
        templateUrl: 'components/detail/widgetEditFilter/widgetEditFilter.html',
        controller: 'widgetEditFilter.ctrl',
        controllerAs: 'widgetEditFilter',
        bindToController: true
  		};
  	}
})();
