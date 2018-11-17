'use strict';
(function(){
	angular.module('appTallerCiencia',['ngRoute','controller.admin'])
		.config(configurar);

	function configurar($routeProvider){
		$routeProvider
			.when('/home',{
				templateUrl:'/templates/evaluadores.html',
        controller:'EvaluadorCtrl',
				resolve:{
					cargar: function($q,$location,Evaluator){
						var deferred = $q.defer();
						Evaluator.getEvaluators()
						.then(function(res){
							Evaluator.evaluators = res.data;
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
