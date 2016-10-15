(function () {

  angular
      .module('riddle.detail')
      .provider('APIpostService', apiPostService);

      apiPostService.$inject=['$resourceProvider'];

      function apiPostService() {

        this.$get = function($resource) {

            return {
               api: postConfig()
            };


            function postConfig() {
              return $resource(
                            'http://riddle-api.mybluemix.net/api/v1/config/:configType',{
                              configType:'@configType'
                            },{
                              'getConfig':    {method: 'GET', isArray: true, cache:true}
                            }
              );
            }
      };



      }//End-of-hcDataCacheService
})();
