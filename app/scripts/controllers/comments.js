'use strict';

/**
 * @ngdoc function
 * @name adneomTestApp.controller:CommentsCtrl
 * @description
 * # CommentsCtrl
 * Controller of the adneomTestApp
 */
angular.module('adneomTestApp')
  .controller('CommentsCtrl', function ($scope, $rootScope) {
	  
		$scope.selectedPost = $rootScope.postList[0];
		
		$scope.upvoteComment = function(id){
			$scope.selectedPost.comments[id].upvote = $scope.selectedPost.comments[id].upvote +1;
		};
		
		$scope.newComment = {
			newBody: '',
			newAuthor: ''
		};
		
		$scope.submitMyComment = function(){
			var currentComments = $scope.selectedPost.comments;
			currentComments.push({
					body: $scope.newComment.newBody,
					author: $scope.newComment.newAuthor,
					upvote: 0,
					post: $scope.selectedPost
				});
			$scope.newComment = {
				newBody: '',
				newAuthor: ''
			};				
		};

  });
