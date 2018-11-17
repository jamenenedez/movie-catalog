'use strict';
(function () {
	angular.module('controller.admin', ['models.user'])
		.controller('UserCtrl', UserCtrl);

	function UserCtrl($scope, $filter, User, $http) {
		$scope.users = User.users;
		$scope.searchText = '';
		$scope.evaluador = {};
		$scope.alerts = [];
		$scope.signupValid = false;

		$scope.validacionSignUp = function () {
			if ($scope.evaluador.password == $scope.repass) {
				$scope.signupValid = true;
			}
			else {
				$scope.signupValid = false;
			}
		};


		$scope.limpiarSiginUp = function () {
			$scope.evaluador = {};
			$scope.repass = null;
			$scope.signupValid = false;
			$scope.alerts = [];
		};

		$scope.registrarUser = function () {
			User.addUser($scope.evaluador)
				.then(function (res) {
					User.users.push(res.data);
					$scope.limpiarSiginUp();
					$scope.alerts.push({ msg: 'Registro de ' + res.data.name + ' exitoso.', type: 'success' });
				}, function (res) {
					$scope.limpiarSiginUp();
					$scope.alerts.push({ msg: res.data.msg, type: 'danger' });
				});
		};

		$scope.eliminarRegistro = function (e) {
			console.log(e);
			User.deleteUser(e._id)
				.then(function (res) {
					console.log(User.users.indexOf(e))
					User.users.splice(User.users.indexOf(e), 1);
				}, function (res) {
					$scope.alerts.push({ msg: res.data.msg, type: 'danger' });
				});
		}

	};

})();
