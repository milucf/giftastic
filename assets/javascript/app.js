$(document).ready(function(){
  var topics=["Dog","Cat","Hamster","Fish","Mouse","Guinea pig","parrot","Snake","Iguanas","Ferret"];

getTopics();
//==========================
  function getTopics(){
     for (i=0;i<topics.length;i++){
       var btn=$("<button>");
       btn.addClass("btn btn-primary").text(topics[i]).attr("data-name",topics[i]);
         $(".btn-topics").append(btn);
     }
  }

$("#btnAddAnimal").on("click",function(){
  var newAnimal=$(":text").val().trim();
  if(newAnimal.length && !topicsInclude(newAnimal)){
  topics.push(newAnimal);
  $(".btn-topics").empty();
  getTopics();
  $(":text").val("");
}
});

function topicsInclude(str){
  for (i=0;i<topics.length;i++)
  if(topics[i].toLocaleLowerCase().trim()==str.toLocaleLowerCase().trim())
  return true;
  return false;
}

 $(document).on("click", "img", function(){
   var newSrc=this.src;
   if(this.src.endsWith("_s.gif")){
    newSrc=newSrc.substr(0,newSrc.lastIndexOf("_s.gif"))+".gif";
   }
   else{
     newSrc=newSrc.substr(0,newSrc.lastIndexOf(".gif"))+"_s.gif";
   }
this.src=newSrc;
 });

 $(document).on("click", ".btn-primary", displayAnimalGiphy);

 function displayAnimalGiphy(){
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+animal+"&limit=10&api_key=dc6zaTOxFJmzC ";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          $("#container").empty();
          var img,div;
          for (i=0;i<response.data.length;i++){
             img=$("<img>");
             div=$("<div>");
             img.attr("id",response.data[i].id).attr("src",response.data[i].images.fixed_height_still.url);
             div.attr("id","dv"+i).addClass("thumbnail giphydv").append(img);
             div.append("Rating: <span class=\"label label-default\">"+response.data[i].rating.toUpperCase()+"</span>");
             $("#container").append(div);
          }

        });
 }

 });