(function () {

  angular
      .module('riddle.detail')
      .factory('boilerplate', boilerplate);

      function apiService() {

            return {
               myFunction: _myFunction,
               myFunc2: _myFunc2
            };

            function _myFunc(number, numberTwo) {
              return number+number2;
            }

            function _myFunc2() {
              //TODO
            }
      }
})();
