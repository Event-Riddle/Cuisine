(function() {
    'use strict';
    angular
        .module('riddle.detail')
        .directive('formFilter', formFilter);

    function formFilter() {

  		return {
  			restrict: 'EA',
  			scope: {
          item: '=formItem',
          someArray: '@array',
          clickId: '=clickId',
          serviceName: '@serviceName'

  			},
        templateUrl: 'components/detail/widget/widget.html',
        controller: 'widget.ctrl',
        controllerAs: 'widget',
        bindToController: true
  		};
  	}
})();
