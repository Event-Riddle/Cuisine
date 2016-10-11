(function () {

  angular
      .module('riddle.detail')
      .provider('APIService', apiService);

      apiService.$inject=['$resourceProvider'];

      function apiService() {

        this.$get = function($resource) {

            return {
               api: getConfig()
            };


            function getConfig() {
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
