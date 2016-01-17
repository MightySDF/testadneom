'use strict';

/**
 * @ngdoc overview
 * @name adneomTestApp
 * @description
 * # adneomTestApp
 *
 * Main module of the application.
 */
angular
  .module('adneomTestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/comments', {
        templateUrl: 'views/comments.html',
        controller: 'CommentsCtrl',
        controllerAs: 'comments'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name adneomTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the adneomTestApp
 */
var app = angular.module('adneomTestApp');

app.run(["$rootScope", function($rootScope) {
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
}]);

app.controller('MainCtrl', ["$scope", "$rootScope", function MainCtrl($scope, $rootScope) {

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
	
}]);


'use strict';

/**
 * @ngdoc function
 * @name adneomTestApp.controller:CommentsCtrl
 * @description
 * # CommentsCtrl
 * Controller of the adneomTestApp
 */
angular.module('adneomTestApp')
  .controller('CommentsCtrl', ["$scope", "$rootScope", function ($scope, $rootScope) {
	  
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

  }]);

angular.module('adneomTestApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/comments.html',
    "<div class=\"main-container row\"> <div class=\"col-md-8 col-sm-8 col-xs-12\"> <h1>Comments</h1> <a href=\"#/\" class=\"right eighteen back-button\">Back</a> </div> <div class=\"lastNews col-md-8 col-sm-8 col-xs-12\"> <div class=\"news-wrapper\"> <h2 class=\"p-2\">Comments on : <a href=\"{{selectedPost.link}}\" title=\"External link\" target=\"blank\">{{selectedPost.title}}</a></h2> <form name=\"postForm\" class=\"pt-0 pb-2 pl-2 pr-2 comment-form\" ng-submit=\"submitMyComment()\"> <h3 class=\"mt-0 mb-0\">Post your comentary</h3> <fieldset> <legend class=\"hide\">This fieldset allows you to publish a comment about this post. Comments are composed of your name/pseudonym and a text.</legend> <label class=\"col-md-3 col-sm-3 col-xs-3 mt-2\" for=\"newAuthor\">Author</label> <input class=\"col-md-9 col-sm-9 col-xs-9 mt-2\" id=\"newAuthor\" name=\"newAuthor\" type=\"text\" placeholder=\"Your name or pseudonym here\" ng-model=\"newComment.newAuthor\" required> <br> <label class=\"col-md-3 col-sm-3 col-xs-3 mt-2\" for=\"newComment\">Your comment</label> <input class=\"col-md-9 col-sm-9 col-xs-9 mt-2\" id=\"newComment\" name=\"newComment\" type=\"text\" placeholder=\"Your comment here\" ng-model=\"newComment.newBody\" required> <br> <button type=\"submit\" class=\"mt-2 pl-2 pr-2 pt-1 pb-1 right eighteen submit-button\">Submit</button> <span class=\"clear\"></span> </fieldset> </form> <ul> <li ng-repeat=\"commentItem in selectedPost.comments\" class=\"news-elt row p-2\"> <div class=\"mr-2 left\"> <div class=\"upvotePost upvote-{{commentItem.upvote}} eighteen\"> <span ng-if=\"commentItem.upvote>0\">+</span> {{commentItem.upvote}} </div> </div> <div class=\"postContent col-md-9 col-sm-9 col-xs-9\"> <strong class=\"sixteen\">{{commentItem.author}}</strong> <br> <p>{{commentItem.body}}</p> <span ng-if=\"commentItem.upvote>0\" class=\"\">{{commentItem.upvote}} users liked it.</span> <span ng-if=\"commentItem.upvote==0\" class=\"\">No one liked it so far.</span> <a href=\"\" class=\"\" ng-click=\"upvoteComment($index)\"> <span class=\"\">What about you ?</span> <img class=\"upvote-icon\" src=\"images/upvote.gif\" alt=\"Vote now\"> </a> </div> </li> </ul> </div> </div> </div>"
  );


  $templateCache.put('views/main.html',
    "<div class=\"main-container row\"> <div class=\"col-md-8 col-sm-8 col-xs-12\"> <h1>Last news</h1> </div> <div class=\"lastNews col-md-8 col-sm-8 col-xs-12\"> <div class=\"news-wrapper\"> <ul> <li ng-repeat=\"newsItem in postList\" class=\"news-elt p-2 row\"> <div class=\"mr-2 left\"> <div class=\"upvotePost upvote-{{newsItem.upvote}} eighteen\"> <span ng-if=\"newsItem.upvote>0\">+</span> {{newsItem.upvote}} </div> </div> <div class=\"postContent col-md-9 col-sm-9 col-xs-9\"> <a href=\"{{newsItem.link}}\" title=\"External link\" target=\"blank\"> <strong class=\"eighteen\">{{newsItem.title}}</strong> </a> <br> <a href=\"#/comments\" ng-click=\"getComments($index)\" title=\"See the comments\"> <span ng-if=\"newsItem.comments.length>0\">{{newsItem.comments.length}} Comments</span> <i ng-if=\"newsItem.comments.length==0\">There is no comments yet. Be the first one to share your feeling.</i> </a> <br> <span ng-if=\"newsItem.upvote>0\" class=\"\">{{newsItem.upvote}} users liked it.</span> <span ng-if=\"newsItem.upvote==0\" class=\"\">No one liked it so far.</span> <a href=\"\" class=\"\" ng-click=\"upvotePost($index)\"> <span class=\"\">What about you ?</span> <img class=\"upvote-icon\" src=\"images/upvote.gif\" alt=\"Vote now\"> </a> </div> </li> </ul> </div> </div> <div class=\"newNews col-md-4 col-sm-4 col-xs-12 pb-2\"> <form name=\"postForm\" ng-submit=\"submitMyPost()\"> <h2>Submit a new post</h2> <fieldset> <legend class=\"hide\">This fieldset allows you to publish news composed of a title and a link.</legend> <label class=\"col-md-3 col-sm-3 col-xs-3 mt-2\" for=\"newTitle\">Title</label> <input class=\"col-md-9 col-sm-9 col-xs-9 mt-2\" id=\"newTitle\" name=\"newTitle\" type=\"text\" placeholder=\"Title here\" ng-model=\"newPost.newTitle\" required> <br> <label class=\"col-md-3 col-sm-3 col-xs-3 mt-2\" for=\"newLink\">Link</label> <input class=\"col-md-9 col-sm-9 col-xs-9 mt-2\" id=\"newLink\" name=\"newLink\" type=\"text\" placeholder=\"http://www.random.com\" ng-model=\"newPost.newLink\" required> <br> <button type=\"submit\" class=\"mt-2 pl-2 pr-2 pt-1 pb-1 right eighteen submit-button\">Submit</button> <span class=\"clear\"></span> </fieldset> </form> </div> </div>"
  );

}]);
