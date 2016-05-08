angular.module('todoApp')
.service('StudentService', function ($http) {
  var studentS = this
  studentS.stdLists = []
  studentS.stdCourse = []
  studentS.courseDes = '';
  studentS.course = [];

  studentS.getStudent = function () {
  	$http.get('http://52.37.98.127:3000/v1/5610546699?pin=1937')
      .success(function(responses){    
        studentS.stdLists = responses
        studentS.course = responses.course
        console.log(studentS.stdLists)
    })
  }

  studentS.changeCourse = function () {
  	angular.forEach(studentS.stdLists, function (list) {
        if(list.id == '5610546699')
          list.course = studentS.course
      })
  }

  studentS.getDescription = function (cid) {
	$http.get('https://whsatku.github.io/skecourses/'+cid+'.json')
      .success(function(responses){
      	studentS.courseDes = responses.description.en
      	console.log(studentS.courseDes)
      	return studentS.courseDes;
    })
  }
})