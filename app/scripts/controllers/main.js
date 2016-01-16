'use strict';

/**
 * @ngdoc function
 * @name adneomTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the adneomTestApp
 */
var app = angular.module('adneomTestApp');
	
	app.service('getNews', function ($http) {
		
		var getNewsService = function(){};
        getNewsService.newsPromise={};
		
		getNewsService.all = function(){
			var requestedFile = $http.get('http://adneom.herokuapp.com/api/posts/');
			if(requestedFile.success){
                this.newsPromise = requestedFile.then(function(result){ return result.data; });
            }
/* 			this.newsPromise = this.newsPromise.then(function(news){
				return this.news;
			}); */
			return this.newsPromise;
		};			
			
		return getNewsService;
		
	});
		



	app.controller('MainCtrl', function ($scope, getNews) {
		
		getNews.getNewsService.then(function(news){
                $scope.news = news;
            });
		
	});
