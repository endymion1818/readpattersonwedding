<?php
  $pagetitle = 'Tim & Anne\'s Wedding | Details and Bookings';
  $pagedesc  = 'Tim Read and Anne Patterson are getting married! If you have recieved an invitation as a guest during the day or for the evening, please register your attendance here. You can also find information about the location of the event and a schedule for the day.';
  include('header.php');?>
  <script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '871561892966717',
      xfbml      : true,
      version    : 'v2.6'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>
  <section class="content home-content" id="home">
    <div class="container">
      <img
        src="img/wedding-landscape.png"
        srcset="img/wedding-landscape.svg"
        class="img-responsive hostillustration"
        width="1000"
        height="526"
        alt="Tim and Anne's Wedding - full logo"
        />
    </div>
  </section>
  <section class="footer">
    <div class="container">
      <h3>Anne and Tim are getting married!</h3>
      <p>We look forward to welcoming you to be part of our special day.  This website will provide you with all the practical information you need and you are able to RSVP via the contact form.</p>
    </div>
  </section>
<section class="content panel2" id="location">
  <div class="container">
  <h2 class="text-center">Location</h2>
      <div class="row row-high">
        <div class="col-sm-6 content-column">
          <div class="row">
            <div class="col-xs-2 col-md-3 icon-column">
              <img
                src="img/icon-parking.png"
                srcset="img/icon-parking.svg"
                alt="backup data being recovered to local machine illustration"
                width="75"
                height="75"
                class="img-responsive img-right waypoint"
                >
            </div>
            <div class="col-xs-10 col-md-9 waypoint">
                <h3>Travelling In</h3>
                <p>It is possible to travel to Richmond by train or tube but Pembroke Lodge is some distance from the centre of the Richmond. For this reason we recommend travelling by car.</p>
                <p>For directions please see the map below or download a printable version:</p>
                <a class="btn btn-timanne" href="pembroke_map.pdf" target="_blank" title="printable PDF of Pembroke Lodge">Printable Map</a>
                <p>&nbsp;</p>
                <h3>Parking</h3>
                <p>Free at Pembroke Lodge but can be busy during the day so please ensure you allow enough time as you may have to wait for a parking space to become available. Cars can be left there overnight and taxis can be arranged. All gates except Richmond Lodge Gate are closed at dusk so all guests arriving or departing after this time will need to use this entrance.</p>
                <p><strong>Evening guests</strong> will have no problems except to enter/exit via Richmond Gate only.</p>
                <p>Taxi firms available in Richmond who know procedure (see <a href="http://www.pembroke-lodge.co.uk/" target="_blank">Pembroke Lodge website</a> for details).</p>
            </div>
          </div>
        </div>
        <div class="col-sm-6 content-column">
          <div class="row">
            <div class="col-xs-2 col-md-3 icon-column">
              <img
                src="img/icon-hotel.png"
                srcset="img/icon-hotel.svg"
                alt="cloud computing illustration"
                width="75"
                height="75"
                class="img-responsive img-right waypoint"
                >
            </div>
            <div class="col-xs-10 col-md-9 waypoint">
              <h3>Hotels in area</h3>
              <p>From closest (parking is very difficult in Richmond, even Hotels have inadequate car spaces):</p>
              <ul>
                <li><a href="http://www.richmondgate.com/" target="_blank">Richmond Gate Hotel</a></li>
                <li><a href="http://www.richmondhill-hotel.co.uk/" target="_blank">Richmond Hill Hotel</a></li>
                <li><a href="http://www.petershamhotel.co.uk/" target="_blank">Petersham 5*</a></li>
                <li><a href="http://www.thebingham.co.uk/" target="_blank">Bingham Hotel</a></li>
                <li><a href="http://www.therichmondparkhotel.co.uk/" target="_blank">Richmond Park Hotel (not in the Park!)</a></li>
                <li><a href="http://www.premierinn.com/gb/en/hotels/england/greater-london/london/london-richmond.html" target="_blank">Premier Inn Richmond</a></li>
              </ul>
              <p>Additionally, if you choose to stay in Croydon, transport to the venue will be provided:</p>
              <ul>
                <li><a href="#" target="_blank">Croydon Park Hotel</a></li>
                <li><a href="#" target="_blank">Jurys Inn</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="responsiveIframeEmbed">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19893.184975967837!2d-0.25350776430138866!3d51.4462557956653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760c106c9e5b5f%3A0xbb1666e13117cb1!2sPembroke+Lodge!5e0!3m2!1sen!2suk!4v1456128474220" width="1900" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>
  </div>
<section class="content panel3" id="programme">
  <div class="container">
  <h2 class="text-center">Programme of Events</h2>
      <div class="row row-high">
        <div class="col-sm-6 content-column">
          <div class="row">
            <div class="col-xs-2 col-md-3 icon-column">
              <img
                src="img/icon-events.png"
                srcset="img/icon-events.svg"
                alt="backup data being recovered to local machine illustration"
                width="75"
                height="75"
                class="img-responsive img-right waypoint"
                >
            </div>
            <div class="col-xs-10 col-md-9 waypoint">
                <h3>Programme</h3>
                <ul>
                  <li>14.30 Guest Arrival time</li>
                  <li>15.00 Wedding, ends at 15.30</li>
                  <li>15.30 Drinks Reception and photos</li>
                  <li>16.45 Call to Wedding Breakfast</li>
                  <li>19.00 Speeches and Cake cutting</li>
                  <li>19.30 Evening Guests arrival time</li>
                  <li>19.45 Cake cutting followed by first dance</li>
                  <li>20.00 Bar opens and DJ starts </li>
                  <li>21.00 Evening Buffet</li>
                  <li>23.45 Bar closes</li>
                  <li>23.55 Last Dance (if we are still able!)</li>
                  <li>24.00 Carriages</li>
                </ul>
            </div>
          </div>
        </div>
        <div class="col-sm-6 content-column">
          <div class="row">
            <div class="col-xs-2 col-md-3 icon-column">
              <img
                src="img/icon-pemblodge.png"
                srcset="img/icon-pemblodge.svg"
                alt="pembroke lodge icon"
                width="75"
                height="75"
                class="img-responsive img-right waypoint"
                >
            </div>
            <div class="col-xs-10 col-md-9 waypoint">
              <h3>About Pembroke Lodge</h3>
              <p>From humble beginnings as a molecatchers' lodge to the philosopher and mathematician Bertrand Russel's home to the residence of Phantom Squad, GCHQ Liaison Regiment during the Second World War, Pembroke Lodge has had an <a href="http://www.pembroke-lodge.co.uk/pembroke-lodge-history">interesting history</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
<section class="content contact" id="contact">
  <div class="container">
    <h2 class="text-center">Gifts</h2>
    <br/>
    <div class="col-sm-6 col-sm-offset-3">
      <p>We would be delighted simply to see you at our wedding and help us celebrate our special day together.  We don’t have a gift list but if you wish to make a gesture, then a contribution towards our dream honeymoon later in the year would be much appreciated.</p>
      <p>Alternatively, if you would prefer to make a donation to a charity then Croydon Branch Diabetes UK, Marie Curie, and Cats Protection League are all causes we support, but feel free to make a gift to the charity of your own choosing.</p>
    </div>
  </div>
</section>
<section class="content panel3 social-wall" id="socialwall">
  <div class="container">
    <h2 class="text-center">Your Photos</h2>
    <h3 class="text-center">Tag your photos #anneandtim2016 on Twitter to appear here, or upload them to dropbox and share them with us!</a></h3>
    <br>
    <div class="social-stream" id="social-stream"></div>
  </div>
</section>
<?php include('footer.php');?>
