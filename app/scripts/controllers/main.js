'use strict';

angular.module('testApp')
    .service('NewsService', ['$http', '$q', function($http, $q){
        var currentNews = [];
        return {
            get: function(qs){
                var deferredData = $q.defer();

                // Check and make sure the query is defined
                if(qs == null || qs == ''){
                    // If not, return an empty promise.
                    return deferredData.promise;
                }
                var url = 'http://ajax.googleapis.com/ajax/services/search/news?q=' + qs + '&v=1.0';
                $http.get(url)
                    .success(function(data) {
                        currentNews = data;
                        deferredData.resolve(data);
                    })
                    .error(function() {

                    });
                return deferredData.promise;
            },
            data: function(){
                return currentNews;
            }
        };
    }])
    .controller('MainCtrl', ['$scope', 'NewsService', function ($scope, NewsService) {
        // Article Placeholder
        $scope.newsArticles = [];
        // Static Title
        $scope.appName = 'test app';
        // Default Query
        $scope.qs = 'Apple';

        // Get default news feed (i.e. Apple feed from google)
        NewsService.get($scope.qs).then(
            function(data){  $scope.newsArticles = data;},
            function(data){ alert('data error'); });

        // Get custom news feed & update news title
        $scope.updateNews = function(qs){
            $scope.qs = qs;
            NewsService.get(qs).then(
                function(data){  $scope.newsArticles = data;},
                function(data){ alert('data error'); });
        };
    }]);
