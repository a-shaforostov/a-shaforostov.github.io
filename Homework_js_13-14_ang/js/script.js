//			$scope.$apply(); используется для обновления вида, если данные обновились не в ангуляре.
(function () {
	"use strict";

	// Init angular application
	var app = angular.module("quiz", []);

	// Create controller
	app.controller("appCtrl", function ($scope) {

		$scope.model = new Model(quizData);

		$scope.initQuiz = function () {
		
			$scope.userAnswers = [];
			$scope.testResult = {};
			
			var questions = $scope.model.data.questions; 
			_.each(questions, function(value) {
				$scope.userAnswers.push(
					_.fill(new Array(value.correctAnswers.length), false)
				);
			});
			
			window.scrollTo(0, 0);

		}

		$scope.initClickHandler = function() {
			$scope.initQuiz();
		};
		
		$scope.checkClickHandler = function() {
			$scope.testResult = $scope.model.checkResult($scope.userAnswers);
			$('.modal').modal();
		};
		
		$scope.closeModalHandler = function() {
			$scope.initQuiz();
		};
		
		$scope.initQuiz();
	});

/*	Модель  */

	function Model(appData) {
		this.data = appData || {};
	}

	Model.prototype.checkResult = function (userAnswers) {
		
		var qs = this.data.questions;
		var result = {
			correct: 0,
			total: qs.length
		};
		
		for (var i = 0; i < qs.length; i++) {
			if ( _.isEqual(userAnswers[i], qs[i].correctAnswers) ) {
				result.correct++;
			}
		}
		
		return result;
	}

/* 	Модель (конец)   */
}) ();