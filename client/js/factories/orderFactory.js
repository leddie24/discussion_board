discBoard.factory('orderFactory', function($http) {
   var factory = {};

   factory.getOrders = function(callback) {
      $http.get('/orderslist').then(
      function (output) {
         console.log('Got orders');
         callback(output.data);
      },
      function (output) {
         console.log("Error getting orders");
      });
   }

   factory.addOrder = function(order, callback) {
      $http.post('/addorder', order).then(
      function (response) {
         console.log(response);
         console.log("added order");
         callback(response);
      },
      function (response) {
            console.log("Error adding order");
      });
   }

   return factory;
});