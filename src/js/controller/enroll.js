angular.module('todoApp')
  .controller('enrollController', function ($http, StudentService) {
    var enrollLists = this
    enrollLists.lists = []
    enrollLists.showlists = []
    enrollLists.allID = []
    enrollLists.indlists = []
    enrollLists.courseID = ''
    enrollLists.courseName = ''
    enrollLists.courseDes = ''
    enrollLists.courseNameandID = ''
    enrollLists.coursecredit = ''
    enrollLists.courselists = ''
    enrollLists.eachcourse = []
    enrollLists.wordjson =''
    enrollLists.credit = 0
    enrollLists.icurrentcredit = 0
    $http.get('https://whsatku.github.io/skecourses/list.json')
      .success(function(responses){    
        enrollLists.lists = responses
        enrollLists.allID = responses.id
    })
    $http.get('http://52.37.98.127:3000/v1/5610546699/5610546699?pin=1937')
      .success(function(responses){    
        enrollLists.indlists = responses.courses
        enrollLists.icurrentcredit = responses.credits
        enrollLists.eachcourse = enrollLists.courselists.split(",")
        angular.forEach(enrollLists.lists, function (list){
        var dup = false;
        angular.forEach(enrollLists.indlists, function (slist){

          if(list.id == slist.id){
            dup = true;
          }
        })
        if(!dup){
          enrollLists.showlists.push(list)
        }
        dup = false;
      }) 
    })
      
      
    enrollLists.getJSON = function() {
    $http.get('http://52.37.98.127:3000/v1/5610546699/5610546699?pin=1937')
      .success(function(responses){
        enrollLists.wordjson = JSON.stringify(responses)
        //alert(enrollLists.wordjson)
      })
    }

    enrollLists.searchin = function() { 
      var search = document.getElementById('search').value
      var show =  enrollLists.lists
      enrollLists.showlists = []
      angular.forEach(show, function (list) {
        var dup = false;
        angular.forEach(enrollLists.indlists, function (slist){
          if(slist.id == list.id){
            dup = true;
          }
        })
        if(list.id.indexOf(search) >=0 && !dup){
          enrollLists.showlists.push(list)
        }
        dup = false;
      })
    }

    enrollLists.enrollment = function(cid){
      if(enrollLists.icurrentcredit+enrollLists.credit <= 22){
            var enId = cid;
            var check = false
            var showtemp = enrollLists.showlists
            enrollLists.showlists = []
            angular.forEach(enrollLists.indlists, function (list) {
              if(list.id == enId){
                check = true;  
              }
            })
            if(!check){
            angular.forEach(showtemp, function (list) {
                if(list.id == enId){
                  enrollLists.indlists.push(list)
                  enrollLists.icurrentcredit += enrollLists.credit
                }
                else
                  enrollLists.showlists.push(list)
            })
            }
            enrollLists.toDB();
          }
          else
            window.alert("Your currently credit:"+enrollLists.icurrentcredit + ". you can't enroll this course with credit "+enrollLists.credit+".")
    }

    enrollLists.dropCourse = function(cid) {
      var enId = cid
        var enrolltemp = enrollLists.indlists
        enrollLists.indlists = [] 
        angular.forEach(enrolltemp, function (list) {
          if(list.id != enId){
            enrollLists.indlists.push(list)
            // console.log('asdasd'+enrollLists.credit)
            // enrollLists.icurrentcredit -= enrollLists.credit
          }
          else if(list.id == enId){
                        console.log('asdasd'+enrollLists.credit)
            enrollLists.icurrentcredit -= enrollLists.credit
          }
          else
            enrollLists.showlists.push(list)
        })

        enrollLists.showlists.sort(compare);
        enrollLists.toDB();
    }

    enrollLists.getDes = function(cid) {
      $http.get('https://whsatku.github.io/skecourses/'+cid+'.json')
      .success(function(responses){
        enrollLists.courseID = responses.id
        enrollLists.courseName = responses.name.en
        enrollLists.courseNameandID = responses.id + ' - '+responses.name.en
        enrollLists.credit = responses.credit.total
        enrollLists.coursecredit = responses.credit.total + '('+ responses.credit.lecture +'-'+ responses.credit.lab +'-'+ responses.credit.self +')'
        enrollLists.courseDes = responses.description.en
    })
    }
    enrollLists.toService = function() {
      StudentService.course = enrollLists.indlists
    }

    enrollLists.toDB = function() {
      var enroll = '';
      angular.forEach(enrollLists.indlists, function(list) {
        console.log(list.id)
        enroll += list.id + ",";
      })
      enroll = enroll.substring(0, enroll.length-1)
      console.log(enroll)
      var enrollcode = {
        5610546699: {
        stdId: "5610546699",
        name: "Kittipat Promdirek",
        courses: enrollLists.indlists,
        credits: enrollLists.icurrentcredit,
        password: "1234"
    }

}
      $http.post('http://52.37.98.127:3000/v1/5610546699?pin=1937',enrollcode)
    }

  function compare(a,b) {
    if (a.id < b.id)
      return -1;
    else if (a.id > b.id)
      return 1;
    else 
      return 0;
    }
  })
