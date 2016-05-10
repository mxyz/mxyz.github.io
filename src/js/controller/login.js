angular.module('todoApp', ['ui.router'])
  .controller('LoginController', function ($http, StudentService) {
    var Login = this
    Login.lists = []
    Login.name = ''
    Login.ID = ''
    Login.wordJSON = ''
    StudentService.getStudent()
    $http.get('http://52.37.98.127:3000/v1/5610546699?pin=1937')
      .success(function(responses){    
        Login.lists = responses
        Login.wordJSON = JSON.stringify(responses)
    })

    Login.getJSON = function() {
       $http.get('http://52.37.98.127:3000/v1/5610546699?pin=1937')
      .success(function(responses){
        Login.wordJSON = JSON.stringify(responses)
    })
    }
    Login.addTodo = function () {
      var idlist = Login.lists
      id = document.getElementById('id').value
      var pwd = document.getElementById('pwd').value
      document.getElementById('id').value= '';
      document.getElementById('pwd').value= '';
        angular.forEach(idlist, function (list) {
          if (list.stdId == id && list.password == pwd){
            Login.ID = id
            Login.name = list.name
            window.location = "#/enroll";
          }else{
            window.location = "#/login";
          }
        })
      }
  })
