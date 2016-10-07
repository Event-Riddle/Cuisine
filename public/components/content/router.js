(function () {
  angular
      .module('riddle.content')
      .config(function ($stateProvider) {

        $stateProvider

          .state('struct', {
            url: '/struct',
            views:{
              '': {
                templateUrl: 'components/structure/structure.html'
              },
              'content@struct':{
                templateUrl: 'components/content/content.html',
                controller: 'cont.ctrl',
                controllerAs: 'cont'
              }
            }
          })
      });
})();
