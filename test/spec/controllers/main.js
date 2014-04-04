'use strict';

describe ('Service: NewsService', function () {
    var NewsService, qs, $httpBackend;
    beforeEach(function() {
        module('testApp');
        inject(function( _$httpBackend_, _NewsService_) {
            $httpBackend = _$httpBackend_;
            NewsService = _NewsService_;
        });
    });

    afterEach (function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe ('when get method is called', function () {
        // Only run http request if there is a query string defined
        it ('should return an empty promise if there is no query string', function () {
            NewsService.get('');
            expect(NewsService.get().then()).toBeDefined();
        });
        // Mock http request
        it ('should return news articles when there is a query string', function () {
            $httpBackend
                .whenGET('http://ajax.googleapis.com/ajax/services/search/news?q=Apple&v=1.0')
                // TODO: this is super lame mocking...
                .respond (200, {
                    "responseData": {
                        "results": []
                    }
                });
            NewsService.get('Apple');
            $httpBackend.flush();
            expect(NewsService.data().responseData.results).toBeDefined();
        });
    });
});

describe('Controller: MainCtrl', function () {
    // load the controller's module
    beforeEach(module('testApp'));

    var MainCtrl,scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));
    // Create placeholder for news articles:
    describe('$scope.newsArticles', function(){
        it('should contain an empty array for news articles', function () {
            expect(scope.newsArticles).toBeDefined();
        });
    });
    // Create static variable for the app name:
    describe('$scope.appName', function(){
        it('should contain the application name', function () {
            expect(scope.appName).toBe('test app');
        });
    });
    // Set the default news query subject:
    describe('$scope.qs', function(){
        it('should have a default query for the news feed', function () {
            expect(scope.qs).toBe('Apple');
        });
    });

    // Change the news query subject:
    describe('$scope.updateNews', function(){
        it('should update the query for the news feed', function () {
            scope.updateNews('Microsoft');
            expect(scope.qs).toBe('Microsoft');
        });
    });

});
