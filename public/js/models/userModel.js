angular.module('models.user',[])
	.factory('User',User);

function User($http){
	var e = {
		users : []
	};

	e.getUsers = function(){
		return $http.get('/catalog/user');
	};

	e.addUser = function(user){
		return $http.post('/catalog/user',user);
	};

	/* e.setEvaluaciones = function(id,evaluaciones){
		return $http.put('/catalog/user/'+id,evaluaciones);
	} */

	e.deleteUser = function(id){
		return $http.delete('/catalog/user/'+id);
	}

	return e;

}
