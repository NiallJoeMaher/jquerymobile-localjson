//pageinit event triggers only once
$(document).on("pageinit", "#info-page", function () {   
    //on pageinit json is collected and parsed
    $.getJSON( "data/data.json", function( info ) {
        // console log data to see data structure in browser 
        console.log(info);

        //set up string for adding <li/>
        var li = "";
        //counter for id in array
        var i = 0;
        
        //container for $li to be added
        //we create one long list of all the items so only one single call to the dom is needed during the append stage
        info.infoArray.map(function (name) {
            //add the <li> to "li" variable
            //store index value in array as id of the <a> tag
            li += '<li><a href="#" id="' + i + '" class="info-go">' + name.name + '</a></li>';
            i++;
        });
        //append list to ul
        $("#prof-list").append(li).promise().done(function () {
            //wait for append to finish - thats why you use a promise()
            //done() will run after append is done
            //click event for the redirection to happen to #details-page
            $(this).on("click", ".info-go", function (e) {
                e.preventDefault();
                //store the information in the next page's data
                $("#details-page").data("info", info.infoArray[this.id]); 
                $.mobile.changePage("#details-page");
            });

            //refresh list to enhance its styling.
            $(this).listview("refresh");
        });
    });
  
});

$(document).on("pagebeforeshow", "#details-page", function () {
    //get from data - you put this here when the "a" wa clicked in the previous page
    var info = $(this).data("info");
    //string to put HTML in
    var info_view = "";
    //use for..in to iterate through object
    for (var key in info) {
        //key is the key of the property in the object 
        info_view += '<div class="ui-grid-a"><div class="ui-block-a"><div class="ui-bar field">' + key + '</div></div><div class="ui-block-b"><div class="ui-bar value" style="width : 75%">' + info[key] + '</div></div></div>';
    }
    //add this to html
    $(this).find("[data-role=content]").html(info_view);
});