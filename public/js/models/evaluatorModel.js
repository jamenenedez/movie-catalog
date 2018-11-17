angular.module('models.evaluator',[])
	.factory('Evaluator',Evaluator);

function Evaluator($http){
	var e = {
		evaluators : []
	};

	e.getEvaluators = function(){
		return $http.get('/adminTCJ2018/evaluator');
	};

	e.addEvaluator = function(evaluator){
		return $http.post('/adminTCJ2018/evaluator',evaluator);
	};

	e.setEvaluaciones = function(id,evaluaciones){
		return $http.put('/adminTCJ2018/evaluator/'+id,evaluaciones);
	}

	e.deleteEvaluator = function(id){
		return $http.delete('/adminTCJ2018/evaluator/'+id);
	}

	return e;

}
