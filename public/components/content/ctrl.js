(function () {
   angular
       .module('riddle.content')
       .controller('cont.ctrl', contCtrl);

       function contCtrl($http) {

         //localStorage.clear();

         var cont = this;
         var urlUser = 'http://riddle-api.mybluemix.net/api/v1/config/user';
         // on init fill the ul
        //  var result = JSON.parse(localStorage.getItem("services"));
        //  var result2 = JSON.parse(localStorage.getItem("bus"));
        var tools=[];
        var chainTools=[];
        cont.toolbar = [];
        cont.chain = [];

        $http.get(urlUser).
                  then(function(response) {
                    cont.toolbar = [
                              {
                                items:response.data.toolbar
                              }
                            ];
                    cont.chain = [
                                   {
                                     items:response.data.chain
                                   }
                                 ];
                  cont.checkSvg();
                });




    cont.checkSvg= function() {

      angular.forEach(cont.chain, function(chain, key) {

        if(chain.items.length == 0){
            cont.svgStyle = {
              'display':'none',
            };
        }else {
            cont.svgStyle = {
            'display':'block',
            };
        };
      });
    };

    cont.checkSvg();
    cont.getDropHandler = function(category) {


      return function(dragOb) {
        if(category.items.indexOf(dragOb.item) < 0) {

          dragOb.category.items.splice(dragOb.category.items.indexOf(dragOb.item), 1);
          category.items.push(dragOb.item);


          cont.checkSvg();


          var response = {
                            chain:cont.chain[0].items,
                            toolbar:cont.toolbar[0].items
          }

          $http({
              method: 'POST',
              url: urlUser,
              data: response,
              headers: {'Content-Type': 'application/json'}
          })


          return true;  // Returning truthy value since we're modifying the view model
        }
      }
    }


    //set svg line
    $(window).resize(function() {

      var line1 = $('#line1');
      var el1 = element = document.getElementById('gate');
      var el2= element = document.getElementById('wsk');
      var d = document.getElementById('line1').getAttribute('d')
      var pos1 = el1.getBoundingClientRect();
      var pos2 = el2.getBoundingClientRect();

    //  line1.attr('x1',pos1.left).attr('y1',0).attr('x2',pos2.left).attr('y2',0);
      line1.attr('d',"M"+pos1.left+",0 H"+pos2.left+",0");

    }).resize();

  }
})();
