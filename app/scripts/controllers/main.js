'use strict';

/**
 * @ngdoc function
 * @name adneomTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the adneomTestApp
 */
var app = angular.module('adneomTestApp');

app.run(function($rootScope) {
    $rootScope.postList = [
		{
			title: 'Google',
			link: 'http://www.google.com',
			upvote: 3,
			comments: [
				{
					body: 'Super tutorial !',
					author: 'Justin Bériot',
					upvote: 1,
					post: 0
				},{
					body: 'J\'adore',
					author: 'Sebastien de Frutos',
					upvote: 0,
					post: 0
				}
			]
		},{
			title: 'Yahoo',
			link: 'http://www.yahoo.com',
			upvote: 1,
			comments: [
				{
					body: 'Super tutorial !',
					author: 'Justin Bériot',
					upvote: 1,
					post: 0
				}
			]
		},{
			title: 'Reedit',
			link: 'https://www.reddit.com/',
			upvote: 0,
			comments: []
		},{
			title: 'GitHub',
			link: 'https://github.com/',
			upvote: 1,
			comments: []
		},{
			title: 'Some stuff',
			link: 'http://sdefrutos.fr/',
			upvote: 0,
			comments: []
		}
	];
});

app.controller('MainCtrl', function MainCtrl($scope, $rootScope) {
	
	$scope.upvotePost = function(id){
		$rootScope.postList[id].upvote = $rootScope.postList[id].upvote +1;
	};
	
	$scope.newPost = {
		newTitle: '',
		newLink: ''
	};
		
	$scope.submitMyPost = function(){
		var currentPosts = $rootScope.postList;
		currentPosts.push({
			title: $scope.newPost.newTitle,
			link: $scope.newPost.newLink,
			upvote: 0,
			comments: []
		});
		$scope.newPost = {
			newTitle: '',
			newLink: ''
		};				
	};
	
});

