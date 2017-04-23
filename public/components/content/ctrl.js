(function () {
   angular
       .module('riddle.content')
       .controller('cont.ctrl', contCtrl);

       function contCtrl($http, $rootScope) {

        var cont = this;
        var urlUser = 'http://riddle-api.mybluemix.net/api/v1/config/user';
        var urlLuculus = 'http://lucullus.mybluemix.net/api/v1/start';
        var urlDeactivate = 'http://lucullus.mybluemix.net/api/v1/stop';
        var ws = 'ws://lucullus.mybluemix.net/count';


        $(function(){
           $('.ripple').materialripple();
        });

        var tools=[];
        var chainTools=[];
        cont.toolbar = [];
        cont.chain = [];
        cont.gateWay = 0;
        cont.opw = 0;
        cont.dps = [
          { label: "OpenWhisk", y: 1  },
          { label: "GateWay",  y: 1  },

        ];

        //canvasJS
        var chart = new CanvasJS.Chart("chartContainer", {
          theme: 'theme2',
          // title:{
          // 	text: "incoming and outgoing messages"
          // },
          animationEnabled: false,   // change to true

          axisY:{
            minimum: 0,
            maximum: 1000
          },
          data: [
          {
            // Change type to "bar", "area", "spline", "pie",etc.
            type: "bar",
            dataPoints: cont.dps
          }
          ]
        });
        chart.render();

        //websockets
        ws = new WebSocket(ws);

       ws.onopen = function (e) {
         console.log("onopen:", arguments);
       };

       ws.onclose = function (e) {
         console.log("onclose:", arguments);
       };

       ws.onmessage = function (e) {

         var data = JSON.parse(e.data);

           $rootScope.$apply(function() {
            cont.gateWay = data['count_in'];
            cont.opw = data['count_out'];
            // cont.dps =  [
            //   { label: "GateWay",  y: cont.gateWay  },
            //   { label: "OpenWhisk", y: cont.opw  },
            // ];
            cont.dps[0] = { label: "OpenWhisk", y: cont.opw  };
            cont.dps[1] = { label: "GateWay",  y: cont.gateWay  };


            chart.render();
          });
      //    chart.render();
       };

       ws.onerror = function (e) {
         console.log(e);
         console.log("onerror:", arguments);
       };


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


          var data = {
                        chain:cont.chain[0].items,
                        toolbar:cont.toolbar[0].items
                      }

          $http({
                  method: 'POST',
                  url: urlUser,
                  data: data,
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
              });


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

      line1.attr('d',"M"+pos1.left+",0 H"+pos2.left+",0");

    }).resize();

    //activate and deactivate event-handler chain
    cont.activate =  function() {
      console.log('activate');
      $http({
          method: 'POST',
          url: urlLuculus,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
    };

    cont.deactivate =  function() {
      console.log('deactivate');
      $http({
          method: 'POST',
          url: urlDeactivate,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
    };
  }
})();
