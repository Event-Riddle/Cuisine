(function () {

  angular
      .module('riddle.detail')
      .provider('APIService', apiService);

      apiService.$inject=['$resourceProvider'];

      function apiService() {

        this.$get = function($resource) {

            return {
               api: getConfig(),
               apiPost: postConfig()
            };


            function getConfig() {
              return $resource(
                            'http://riddle-api.mybluemix.net/api/v1/config/:configType',{
                              configType:'@configType'
                            },{
                              'getConfig':    {method: 'GET', isArray: true, cache: false}
                            }
              );
            }

            function postConfig() {
              return $resource(
                            'http://riddle-api.mybluemix.net/api/v1/config/:configType',{
                              configType:'@configType'
                            },{
                              'postConfig':    {
                                method: 'POST', isArray: true, cache:false,
                                  headers: {
                                      'content-type':'application/x-www-form-urlencoded'
                                    }
                              }
                            }
              );
            }

      };



      }//End-of-hcDataCacheService
})();
