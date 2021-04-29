 



















    // URL to Call JSON API data.
    var jsonData = "asset/js/data.json"

    

    // JQuery Make a new card.
    var newCard = function(listingID, address, image, priceGuide, inspectionTimes){
        $("main").append('<div id="' +
         listingID + '" class="card"><div class="lineItem"><div class="cardLeft"><div class="cardThumbnail"><img src="' + 
         image + '" alt=""></div><div class="cardCenter"><h4>' + 
         address + '</h4><div class="rating"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i></div></div><div class="cardRight"><h5>'+ inspectionTimes +'</h5><div class="cardRightIcons"><div class="showInfo"><i class=" infoButton fas fa-info-circle"></i></div><div><i class="fas fa-map-marker-alt"></i></div><div><i class="far fa-trash-alt"></i></div></div></div></div></div><div class="info"><div class="priceInfo"><h4>' + 
         priceGuide + '</h4></div><div class="notesArea"><h4>Notes:</h4><textarea name="notes"></textarea></div></div></div>');
        }

// Run document script
$ ( document ).ready (function(){


            // remove dummy cards 
            $ (".card").remove();


            // Call to Live API Data
            // UNCOMMENT WHEN READY=========================================================
            // var apikey = 'key_1f6eb1dfbc88eab2d49d10f31f1c7c15';

            // var resiSearchUrl = 'https://api.domain.com.au/v1/listings/residential/_search';

            // const data = {
            //     "locations":
            //         [{
            //             "state": "ACT",
            //             "postCode": "2602",
            //         }]
            // };

            // fetch(resiSearchUrl, {
            //     method: 'POST', 
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'X-Api-Key': apikey
            //     },
            //     body: JSON.stringify(data),
            // })
            //     .then(response => response.json())
            //     .then(data => {
            //         console.log('Success:', data);
            //END OF UNCOMMENT SECTION====================================================== 





            // Test Data
            // COMMENT OUT WHEN GOING LIVE==================================================

                // call JSON/API Info
                $.getJSON(jsonData, function(data){

                    // look at returned data
                    console.log(data);
            // END OF COMMENT OUT SECTION===================================================

                    // loop through returned data
                    for (let index = 0; index < data.length; index++) {

                        // chack if object is a property listing
                        if (data[index].type === "PropertyListing") {

                            // create unique ID for each card.
                            var listingID = "card no:" + index;

                            // Get Litsing Attributes
                            // Address details
                            var address = data[index].listing.propertyDetails.displayableAddress;

                            // Image Thumnail
                            var getThumbnail = data[index].listing.media[0].url;

                            // Display price
                            var getPrice = data[index].listing.priceDetails.displayPrice;

                            // Inspection times
                            var getInspection = function(){
                                // chech if there are any inspections
                                if (data[index].listing.inspectionSchedule.times[0]) {

                                    // Shorten the inspection string to only include inspection time
                                    let shortenInspection = function(string){
                                        let shortString = string.slice(0, -3);
                                        let shortestString = shortString.substr(shortString.length - 5);
                                        return shortestString
                                    }

                                    // get opening time
                                    let opening = data[index].listing.inspectionSchedule.times[0].openingTime;

                                    // get closing time
                                    let closing = data[index].listing.inspectionSchedule.times[0].closingTime;

                                    
                                    return shortenInspection(opening) + " - " + shortenInspection(closing);

                                } else {
                                    
                                    return "Inspections Unavailable"
                                }
                            
                                
                            };

                            // attach new card with all created and retrieved data
                            newCard(listingID, address, getThumbnail, getPrice, getInspection());
                        }
                    // end of loop    
                    }


            })
            .catch((error) => {
                console.error('Error:', error);
            });

});

    

    
// CREATE DELETE FUNCTION
    $(document).on('click', '.fa-trash-alt', function () {
        $(this).closest('.card').fadeOut(300);
    });


// CREATE INFO SECTION TOGGLE
    // when Info circle clicked
    $(document).on('click', '.showInfo', function () {
        // log click
        console.log("showInfo Clicked")
        // remove info and input cross

        if($(this).has("i .fa-info-circle")){
            console.log("Info Clicked")
            $(this).find(".fa-info-circle").remove();

            $(this).append('<i class="fas fa-times-circle"></i>');

            $(this).closest(".card").children( ".info" ).css( "display", "flex" );
        
        }else{
            $(this).has(".fa-times-circle").remove();

            $(this).append('<i class="fas fa-info-circle"></i>');

            $(this).closest(".card").children( ".info" ).css( "display", "none" );
        }
        
    });


    console.log("JQ good to go...")
// END OF 
// });