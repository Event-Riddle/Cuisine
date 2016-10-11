(function() {
    'use strict';
    angular
        .module('riddle.detail')
        .directive('hello', hello);

    function hello() {

  		return {
  			restrict: 'EA',
  			scope: {
          greet: '@greet',
          someArray: '@array'
  			},
        templateUrl: 'components/detail/widget/widget.html',
        controller: 'widget.ctrl',
        controllerAs: 'widget',
        bindToController: true
  		};
  	}
})();
