(function () {
  angular.module('riddle.core',[

    'ui.router',
    'ui.router.stateHelper',
    'gm.dragDrop'

  ]);
})();

//app.module[index.html] <- app.core <- third.party.dependencies[UI.ROUTER, etc.]
