'use strict';
(function(){
	angular.module('appTallerCiencia',['ngRoute','controller.admin'])
		.config(configurar);

	function configurar($routeProvider){
		$routeProvider
			.when('/home',{
				templateUrl:'/templates/evaluadores.html',
        controller:'UserCtrl',
				resolve:{
					cargar: function($q,$location,User){
						var deferred = $q.defer();
						User.getUsers()
						.then(function(res){
							User.users = res.data;
							deferred.resolve();
						},function(res){
							console.log('Error: '+res);
						})
						return deferred.promise;
					}
				}
			})
			.otherwise({
        redirectTo: '/home'
      });
	};
})();
