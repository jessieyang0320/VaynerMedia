$(function() {
    $('body').on('mousedown', 'li', function() {
        $(this).addClass('draggable').on('mousemove', function(e) {
          e.preventDefault();
            $('.draggable').offset({
                top: e.pageY - $('.draggable').outerHeight() / 2,
                left: e.pageX - $('.draggable').outerWidth() / 2
            }).on('mouseup', function() {

              var user2 = $("#user2")
              var user1 = $("#user1")
              var position1 = user1.offset();
              var position2 = user2.offset();
             

              // console.log(position2)

                $(this).removeClass('draggable');
                var elPos = $(this).position();
                var elX = elPos.left
                var elY = elPos.top
                

                if( position2.left < elX < position2.left+ user2.width() && position2.top< elY <position2.top + user2.height() ){

                  $(this).appendTo("#user2")
                  var userId = 2

                  $.ajax("http://jsonplaceholder.typicode.com/albums/" +$(this)[0].id, {
                    method: 'PATCH',
                    data:{
                      "userId": 2
                    }
                  }).then(function(data){
                    console.log(data)
                  })
                 

                } 

                if( position1.left < elX < position1.left+ user1.width() && position1.top< elY <position1.top + user1.height() ){

                  $(this).appendTo("#user1")
                  var userId = 1

                  $.ajax("http://jsonplaceholder.typicode.com/albums/" +$(this)[0].id, {
                    method: 'PATCH',
                    data:{
                      "userId": 1
                    }
                  }).then(function(){
                    
                  })

                }

            });
        });
        
    }).on('mouseup', function() {
        $('.draggable').removeClass('draggable');
    });

    




});



 // fetch data refector data fetch process? repeating code here 
$.ajax({
        url: "http://jsonplaceholder.typicode.com/users/1/albums",
        type: 'GET',
        dataType: 'json', // added data type
        success: function(res) {            
            var user1 = [];
             $.each(res, function(key,value){
                             
                user1.push("<li id='"+ value.id +"'>" + value.id + " " + value.title + "</li>" )
                              
                             
            })             
             $("#user1").append(user1.join(''))            
        }
    });

$.ajax({
        url: "http://jsonplaceholder.typicode.com/users/2/albums",
        type: 'GET',
        dataType: 'json', // added data type
        success: function(res) {            
            var user2 = [];
             $.each(res, function(key,value){

                user2.push("<li id='"+ value.id +"'>" + value.id + " " + value.title + "</li>" )           
            })             
             $("#user2").append(user2.join(''))            
        }
    });
