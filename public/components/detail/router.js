(function () {
  angular
      .module('riddle.detail')
      .config(function ($stateProvider) {

           $stateProvider

           .state('detail', {
             url: '/detail?serviceName',
             templateUrl: 'components/structure/structure.html',
             views:{
               '': {
                 templateUrl: 'components/structure/structure.html'
               },
               'content@detail':{
                 templateUrl: 'components/detail/detail.html',
                 controller: 'detail.ctrl',
                 controllerAs: 'detail'
               }
             }
           })
      });
})();
