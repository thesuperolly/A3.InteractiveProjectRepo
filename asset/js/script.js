

    // URL to Call JSON API data.
    var jsonData = "asset/js/data.json"

    

    // JQuery Make a new card.
    var newCard = function(listingID, address, image, priceGuide, inspectionTimes, getDirections, setOrder){
        $("main").append('<div id="' +
         listingID + '" class="card" style="order:' + 
         setOrder +';"><div class="lineItem"><div class="cardLeft"><div class="cardThumbnail"><img src="' + 
         image + '" alt=""></div><div class="cardCenter"><h4>' + 
         address + '</h4><div class="rating"><i class="fas fa-star ratings_stars"></i><i class="fas fa-star ratings_stars"></i><i class="fas fa-star ratings_stars"></i><i class="fas fa-star altColor ratings_stars"></i><i class="fas fa-star altColor ratings_stars"></i></div></div><div class="cardRight"><h5 class="inspectionTime">'+ 
         inspectionTimes +'</h5><div class="cardRightIcons"><div><a href="' + 
         getDirections +'" target="_blank"><i class="fas fa-directions"></i></a></div><div><i class="far fa-trash-alt"></i></div></div></div></div></div><div class="info"><div class="priceInfo"><h4>' + 
         priceGuide + '</h4></div><div class="notesArea"><h4>My Notes:</h4><textarea placeholder="What lovely flooring" name="notes"></textarea></div></div></div>');
        }


        

// Run document script
$ ( document ).ready (function(){

    currentLocation = getUserLocation();

    setTimeout(function() {
        getData()
    },  3000)
    // getData();

            // remove dummy cards 
            $ (".card").remove();

// End of document ready
});

    
// CREATE DELETE FUNCTION
    $(document).on('mouseOn', '.fa-trash-alt', function () {
        $(this).closest('.card').fadeOut(300);
    });


// CREATE INFO SECTION TOGGLE
    // when Info circle clicked
    $(document).on('click', '.cardThumbnail, .cardCenter', function () {
        // log click
        console.log("showInfo Clicked")
        // toggle the info area open and closed
        $(this).closest(".card").children( ".info" ).toggleClass("flexIt");        
    });

// CREATE RATING FUNCTION
    $(document).on('hover', '.card', function(){
        console.log('bam');
    })
    // $('.card').hover( console.log('hello'), console.log('goodbye'))



    console.log("JQ good to go...")
// END OF 
// });

var cards = document.querySelectorAll('.card')
console.log(cards)


function getData() {
    // Test Data

                // Call to Live API Data
            // UNCOMMENT WHEN READY=========================================================
            var apikey = 'key_1f6eb1dfbc88eab2d49d10f31f1c7c15';

            var resiSearchUrl = 'https://api.domain.com.au/v1/listings/residential/_search';

            const data = {
                "locations":
                    [{
                        "state": "ACT",
                        "postCode": "2602",
                    }]
            };

            fetch(resiSearchUrl, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': apikey
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
            //END OF UNCOMMENT SECTION====================================================== 


            // COMMENT OUT WHEN GOING LIVE==================================================

                // call JSON/API Info
                // $.getJSON(jsonData, function(data){

                    // look at returned data
                    // console.log(data);
            // END OF COMMENT OUT SECTION===================================================

                    // loop through returned data
                    for (let index = 0; index < data.length; index++) {

                        var item = data[index];

                        // console.log(item);


                        // chack if object is a property listing
                        if (item.type === "PropertyListing" && item.listing.inspectionSchedule.times.length != 0) {

                            //define variable
                            item = item.listing;
                            
                            // create unique ID for each card.
                            var listingID = "cardNo" + index;

                            // Get Litsing Attributes
                            // Address details
                            var getAddress = item.propertyDetails.displayableAddress;

                            // Image Thumnail
                            var getThumbnail = item.media[0].url;

                            // Display price
                            var getPrice = item.priceDetails.displayPrice;

                            // get opening time
                            let opening = item.inspectionSchedule.times[0].openingTime;

                            // get closing time
                            let closing = item.inspectionSchedule.times[0].closingTime;

                            // Inspection times
                            var getInspection = function(){
                                // chech if there are any inspections
                                if (item.inspectionSchedule.times[0]) {

                                    // Shorten the inspection string to only include inspection time
                                    let shortenInspection = function(string){
                                        let shortString = string.slice(0, -3);
                                        let shortestString = shortString.substr(shortString.length - 5);
                                        return shortestString
                                    }

                                    // returne shortened inspection time
                                    return shortenInspection(opening) + " - " + shortenInspection(closing);
                                } else {
                                    return "Inspections Unavailable"
                                } 
                            };

                            var setOrder = closing.slice(11,13)+closing.slice(14,16)

                            // Get listing lat and lon to get directions
                            var getLatitudeAndLongitude = {
                                lat: item.propertyDetails.latitude,
                                lon: item.propertyDetails.longitude
                            }
                            // Sets the URL for directions
                            var getDirections = 'https://www.google.com/maps/dir/?api=1&origin='+currentLocation+'&destination=' + getLatitudeAndLongitude.lat + ', ' + getLatitudeAndLongitude.lon;

                            console.log(getDirections);

                            // attach new card with all created and retrieved data
                            newCard(listingID, getAddress, getThumbnail, getPrice, getInspection(), getDirections, setOrder);
                        }



                    // end of loop    
                    }


            })

            // UNCOMMENT ON LIVE APP========================================================
            .catch((error) => {
                console.error('Error:', error);
            });
            //END OF UNCOMMENT SECTION======================================================

}

function getUserLocation() {
    currentLocation = navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        var coordinates = lat + ", " + long;
        console.log(coordinates);
        currentLocation = coordinates;

        return coordinates 
    });  
    

}