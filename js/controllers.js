var marketManApp = angular.module('MarketManApp.controllers', []);

// For Users Controller
marketManApp.controller('userController',function ($scope, $rootScope, $location, userAPIservice ) {
  
  $scope.orderByField = 'firstName';
  $scope.reverseSort = false;
  $scope.usersList = [];

  if ($rootScope.usersList === undefined) {
    userAPIservice.getUser().success(function (response) {
      $scope.userList = response.results;
      $scope.counter = 1;
      response.results.forEach(users => {
        $scope.resultObj = {
          id: $scope.counter,
          firstName : users.name.first,
          lastName : users.name.last,
          imageSmall : users.picture.thumbnail,
          imageLarge : users.picture.large,
          country : users.location.country,
          phone : users.cell,
          email : users.email,
          gender: users.gender
        };
        $scope.usersList.push($scope.resultObj);
        $scope.counter++;
      });
      $rootScope.usersList = $scope.usersList;
    });
  } else {
    $scope.usersList = $rootScope.usersList;
  }
  
  // SOrted By Gender
  $scope.sortedGender = function(gender) {
    $scope.genderList = [];
    $rootScope.usersList.forEach(element => {
      if (element.gender == gender) {
        $scope.genderList.push(element);
      }
    });
    $scope.usersList = $scope.genderList;
    console.log($scope.usersList);
  }

  $scope.userDetails = function(user) {
      $rootScope.userDetail = user;
      $location.path("/details");
  }

  $scope.deleteItem = function(index) {
    for (let i=0; i < $scope.usersList.length; i++) {
      if ($scope.usersList[i].id == index) {
        return $scope.usersList.splice(i, 1);
      }
    }
  }

// Sorting 

  $scope.sortColumn = 'firstName';
  $scope.reverseSort = false;

  $scope.sortData = function(column) {
    $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
    $scope.sortColumn = column;
    console.log($scope.usersList);
  }

  $scope.getSortClass = function(column) {
    if ($scope.sortColumn == column) {
      return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
    }
  }
 

  // get Paging
        $scope.pageSize = 10;
        $scope.currentPage = 0;

        $scope.changePage = function(page){
            $scope.currentPage = page;
        }

        $scope.numberOfPages = function() {
          return $scope.usersList.length / $scope.pageSize;
        }
});

marketManApp.filter('startFrom', function() {
  return function(input, start) {
      start = +start; //parse to int
      return input.slice(start);
  }
});


// For User Detail Controller
marketManApp.controller('userDetailController', function ($scope, $rootScope, $location) {
  $scope.user = $rootScope.userDetail;
  $scope.editAble = false;

  $scope.onEditable = function() {

    $scope.editAble = true;
  }

  $scope.onSave = function() {
   if (confirm("Are you sure?")) {
    $scope.editAble = false;
    }
  }

  $scope.onDelete = function(id) {
    if (confirm("Are you sure?")) {
     for (let i=0; i < $rootScope.usersList.length ; i++) {
       if ($rootScope.usersList[i].id == id){
        $rootScope.usersList.splice(i, 1);
        $location.path('/');
       }
     }
      
  }
  }

  $scope.back = function () {
    $location.path('/');
  }
});