(function () {
	"use strict";

	// Init angular application
	var app = angular.module("quiz", []);

	// Create controller with factory
	app.controller("appCtrl", function ($scope) {

		$scope.model = new Model(quizData);
		$scope.userAnswers = [];
		
		$scope.initClickHandler = function() {
			$scope.model.initQuiz();
		};
		
		$scope.checkClickHandler = function() {
			$scope.testResult = $scope.model.checkResult();
			$('.modal').modal();
			$scope.model.initQuiz();
		};
		
		$scope.model.initQuiz();

	});

/* 
	Модель
*/

	function Model(appData) {
		this.data = appData || {};
	}

	Model.prototype.initQuiz = function () {
		
		 // Очистить 
		var l = this.data.questions.length; 
		_.each(this.data.questions, function(value) {
			value.userAnswers = _.fill(new Array(l), false);
		});

	}

	Model.prototype.checkResult = function () {
		
		var l = this.data.questions.length;
		var result = {
			correct: 0,
			total: l
		};
		
		_.each(this.data.questions, function(value) {
			// Сверить массивы попарно. Результат - массив несовпадающих эл-тов
			// Если массив пуст, значит ответ правильный
			if (_(value.userAnswers).xor(value.correctAnswers).isEmpty()) {
				result.correct++;
			}
		});
		
		return result;
	}

/* 
	Модель (конец)
*/
	
}) ();