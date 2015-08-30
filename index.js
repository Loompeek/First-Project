// JavaScript Document
jQuery.support.cors = true;
$(document).ready(function() {
  $("#sort_div").hide();
  var sorted;
  var sortedDone = false;
  $("#btn").click(function() {
    $.ajax({ 
    type: 'GET', 
    url: 'http://www.cybersoft.cz/data.json', 
    data: {}, 
    dataType: 'json',
      success: function (data) {
        $("#sort_div").show();
        $("#tablediv").html('<table id="tbl">');   
        $("#tbl").append('<thead><tr><th class="name">NAME</th><th class="location">LOCATION</th><th class="image">IMAGE</th></tr></thead><tbody>');
        $.each(data, function(index, element) {
        
            
          $.each(element, function(key, value) {
            sorted = element;
            $('#tbl').append( '<tr><td class="name">' +  value.name + '</td><td class="location">' + '<a href=https://www.google.cz/maps/place/' +
                        value.location.replace(/ /g,'%20') + '>' + value.location + '</a>' + '</td><td class="image">' + '<a href="' + value.image + 
                        '"><img src="' + value.image + '" alt="' + value.name + '" width=100px height=100px /></a>' + '</td></tr>'  );
          });
          
          
        });
        
        $("#tbl").append('</tbody></table>');
        
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log('Could not get posts, server response: ' + textStatus + ': ' + errorThrown);
      }
    });
  });
  
  $("#btn2").click(function() {
    if (sortedDone == false) {
      var sortedDesc = sorted.sort(function(a, b) {
        if (a.name > b.name) { 
          return -1;
      	} else if (a.name < b.name) { 
          return 1;
     		}  
        return 0;  
      });
      $("#sort_div").show();    
      $("#tablediv").html('<table id="tbl">');   
      $("#tbl").append('<thead><tr"><th class="name">NAME</th><th class="location">LOCATION</th><th class="image">IMAGE</th></tr></thead><tbody>');
      $.each(sortedDesc, function(key, value) {
        $('#tbl').append( '<tr><td class="name">' +  value.name + '</td><td class="location">' + '<a href=https://www.google.cz/maps/place/' +
                        value.location.replace(/ /g,'%20') + '>' + value.location + '</a>' + '</td><td class="image">' + '<a href="' + value.image + 
                        '"><img src="' + value.image + '" alt="' + value.name + '" width=100px height=100px /></a>' + '</td></tr>'  );   
      });
      $("#tbl").append('</tbody></table>');
      sortedDone = true;  
      } else {
        var sortedAsc = sorted.sort(function(a, b) {
          if (a.name > b.name) {
      		  return 1;
      		}
    			else if (a.name < b.name) {
     			  return -1;
     			}
          return 0;  
        });
        $("#sort_div").show();
        $("#tablediv").html('<table id="tbl">');   
        $("#tbl").append('<thead><tr><th class="name">NAME</th><th class="location">LOCATION</th><th class="image">IMAGE</th></tr></thead><tbody>');
        $.each(sortedAsc, function(key, value) {
          $('#tbl').append( '<tr><td class="name">' +  value.name + '</td><td class="location">' + '<a href=https://www.google.cz/maps/place/' +
                        value.location.replace(/ /g,'%20') + '>' + value.location + '</a>' + '</td><td class="image">' + '<a href="' + value.image + 
                        '"><img src="' + value.image + '" alt="' + value.name + '" width=100px height=100px /></a>' + '</td></tr>'  );   
        });
        $("#tbl").append('</tbody></table>');
        sortedDone = false;    
      }
  });
  
  $("#btn").hover(function() {
    $(this).html("");
  },
  function(){
    $(this).html("Download");
  });
  
  $("#btn2").hover(function() {
    $(this).html("");
  },
  function(){
    $(this).html("Sort");
  });
  
  var myheight = Math.max(0, $('#body_panel').outerHeight());
  $('#left_panel').innerHeight($('#body_panel').outerHeight());

});