'use strict';
(function(){
	angular.module('controller.admin',['models.evaluator'])
		.controller('EvaluadorCtrl',EvaluadorCtrl);

	function EvaluadorCtrl($scope,$filter,Evaluator,$http){
		//$scope.userName = Admin.admin.name;
		//$scope.user = Admin.admin;
		//$scope.users = User.users;
		$scope.evaluators = Evaluator.evaluators;
		//console.log($scope.users);
		$scope.searchText='';
		$scope.evaluador = {};
		$scope.alerts = [];
		$scope.signupValid = false;

		$scope.validacionSignUp = function(){
      if($scope.evaluador.password == $scope.repass){
              $scope.signupValid = true;
      }
      else{
              $scope.signupValid = false;
      }
		};


		$scope.limpiarSiginUp = function(){
	    $scope.evaluador = {};
	    $scope.repass = null;
			$scope.signupValid = false;
			$scope.alerts = [];
		};

		$scope.registrarEvaluador = function(){
			//$scope.limpiarSiginUp();
		  Evaluator.addEvaluator($scope.evaluador)
		    .then(function(res){
		    	Evaluator.evaluators.push(res.data);
		    	$scope.limpiarSiginUp();
		      $scope.alerts.push({msg:'Registro de '+res.data.name+' exitoso.', type:'success'});
		    },function(res){
		            //console.log("Error: "+res);
		      $scope.limpiarSiginUp();
		      $scope.alerts.push({msg:res.data.msg, type:'danger'});
		    });
		};

		$scope.eliminarRegistro = function(e){
			console.log(e);
			Evaluator.deleteEvaluator(e._id)
				.then(function(res){
					console.log(Evaluator.evaluators.indexOf(e))
					Evaluator.evaluators.splice(Evaluator.evaluators.indexOf(e),1);
					//$scope.limpiarSiginUp();
					//$scope.alerts.push({msg:'Registro de '+res.data.name+' exitoso.', type:'success'});
				},function(res){
								//console.log("Error: "+res);
					//$scope.limpiarSiginUp();
					$scope.alerts.push({msg:res.data.msg, type:'danger'});
				});
		}

	};

})();
