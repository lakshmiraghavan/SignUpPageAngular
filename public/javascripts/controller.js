/**
 * Created by lakshmi on 10/6/15.
 */
angular.module('myApp',["ui.router"])
    .config(function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise('/main');

        $stateProvider

            .state('main', {
                url: '/main',
                templateUrl: '/html/main.html',
                controller: "AppCtrl"
            })

            // nested list with custom controller
            .state('success', {
                url: '/success',
                templateUrl: '/html/success.html',
                controller: "AppCtrl"

            })

            // nested list with just some random string data
            .state('fail', {
                url: '/fail',
                templateUrl: '/html/fail.html',
                controller: "AppCtrl"
            })

    })
.controller('AppCtrl', function($scope, $http, $state){
        console.log("Hello from controller");

        var refresh = function(){

            $http.get('/contactlist').success(function(res){
                console.log("I got the data I requested from server");
                $scope.contactlist = res;
                $scope.contact = '';
            })
        }
         refresh();

        var birthday;

        $scope.addContact =  function(){
            console.log($scope.contact);
            birthday = $scope.contact.dob;

            $http.post('/contactlist', $scope.contact).success(function(response){
                $state.go("success");
            console.log(response);
                refresh();
            }).error(function(res){
                $state.go("fail");
                console.log("error");
            })
        }

        $scope.nomatch = true;

        $scope.matchPassword = function () {
            if($scope.contact.password === $scope.passwordConfirm){
                $scope.nomatch = false;
            }
            else $scope.nomatch = true;;
        };

        $scope.minAge = function () {
            var current = new Date();
            var minYear = current.getFullYear() - 150;
            var min = new Date(minYear,current.getMonth(),current.getDate()).toISOString();
            return min;
        };

        console.log($scope.dob)
       // console.log("min age",$scope.minAge())


    })
