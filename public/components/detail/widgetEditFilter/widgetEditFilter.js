(function() {
    'use strict';
    angular
        .module('riddle.detail')
        .directive('editFormFilter', editFormFilter);

    function editFormFilter() {

  		return {
  			restrict: 'EA',
  			scope: {
          serviceName: '@serviceName',

  			},
        templateUrl: 'components/detail/widgetEditFilter/widgetEditFilter.html',
        controller: 'widgetEditFilter.ctrl',
        controllerAs: 'wef',
        bindToController: true
  		};
  	}
})();
