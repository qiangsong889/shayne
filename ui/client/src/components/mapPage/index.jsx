import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
var map,
  infoWindow,
  geocoder,
  service,
  key = 'AIzaSyDvmjx3lm_mzWcSpRiHHZVI_AQNb1DeT4k',
  labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  labelIndex = 0,
  markers = [];
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // sessionId: null,
      radius: 500,
      search: '',
      err: ''
      // filter: " accountId IN ('77b0c1a5-6159-44a9-8268-07b393da0d4e') ",
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.sessionId !== this.props.sessionId) {
      console.log('trying to update state of mappage', nextProps);
      this.setState({ sessionId: nextProps.sessionId }, () => this.loadMap());
    } else {
      console.log(
        'componentwillreceiveprops running but nothing changes',
        nextProps
      );
    }
  }

  loadMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 33.832571, lng: -117.918591 },
      zoom: 15
    });
    infoWindow = new google.maps.InfoWindow();
    geocoder = new google.maps.Geocoder();
  }

  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }
  findCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('you are here');
          infoWindow.open(map);
          map.setCenter(pos);
          map.setZoom(15);
        },
        function() {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }
  handleFire = async () => {
    try {
      if (this.state.address) {
        this.findInputAddress(() => {
          this.searchPlaces();
        });
        return;
      }
      this.searchPlaces();
    } catch (err) {
      console.log('err searching', err);
    }
  };
  searchPlaces = () => {
    this.deleteMarkers();
    var request = {
      location: map.center,
      radius: this.state.radius * 1609,
      type: this.state.search
    };
    //======================try to search keyword(limited results 20)===================
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      if (status == 'OK') {
        console.log(results);
        for (var i = 0; i < results.length; i++) {
          this.addMarker(results[i], map);
        }
        console.log('this is the radius', this.state.radius);
        map.setZoom(this.radiusToZoom(this.state.radius * 1609 / 1000));
      } else {
        console.log('having problem useing placesservice', status);
      }
    });
  };

  findInputAddress = cb => {
    var image =
      'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    geocoder.geocode({ address: this.state.address }, (results, status) => {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          icon: image
        });
        cb();
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  radiusToZoom(radius) {
    return Math.round(14 - Math.log(radius) / Math.LN2) + 1;
  }

  addMarker = (place, map) => {
    console.log('this is each place', place);
    var marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      customInfo: place
    });
    // google.maps.event.addListener(marker, 'click', () => {
    //   alert(JSON.stringify(marker.customInfo));
    // });
    marker.addListener('click', () => {
      console.log('this is the marker', marker.customInfo);
      infoWindow.setContent(
        `<div id='content'>name:${
          marker.customInfo.name
        }</div><br /><div>address:${marker.customInfo.vicinity}</div>`
      );
      infoWindow.open(map, marker);
    });
    markers.push(marker);
  };

  // Sets the map on all markers in the array.
  setMapOnAll = map => {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  };

  // Removes the markers from the map, but keeps them in the array.
  clearMarkers = () => {
    this.setMapOnAll(null);
  };

  // Shows any markers currently in the array.
  showMarkers = () => {
    this.setMapOnAll(map);
  };

  // Deletes all markers in the array by removing references to them.
  deleteMarkers = () => {
    this.clearMarkers();
    markers = [];
  };
  //==============suppose to send request to brandify=====================

  // async handleSubmit() {
  //   console.log('going to do a axios request', this.state);
  //   try {
  //     const response = await axios.post(
  //       'https://one-staging-api.brandify.com/service/location/locationMarkers',
  //       this.state
  //     );
  //     console.log('finished posting this is the data', response);
  //   } catch (err) {
  //     console.log('this is the err', err);
  //   }
  // }

  //======================================================================
  render() {
    return (
      <div>
        {this.state.sessionId && (
          <div>
            <div id="map" />
            {/* <input type="submit" onClick={() => this.handleSubmit()} /> */}
            <button
              id="findMyLocation"
              onClick={() => this.findCurrentLocation()}
            >
              my location
            </button>or enter the area you want to seach in<input
              type="text"
              onChange={e => this.setState({ address: e.target.value })}
            />
            <br />
            search for radius(miles):
            <input
              type="number"
              onChange={e =>
                this.setState({ radius: e.target.value }, () => {
                  this.state.radius > 10 || this.state.radius < 1
                    ? this.setState({
                        err:
                          'please limit your search radius between 1-10, search results are limited by google api only 20 results can be displayed'
                      })
                    : this.setState({ err: null });
                })
              }
            />
            {this.state.err}
            <br />
            search for:(bank, reataurant, school, ETC...)
            <input
              type="text"
              onChange={e => this.setState({ search: e.target.value })}
            />
            <button onClick={() => this.handleFire()}>FIRE</button>
          </div>
        )}
      </div>
    );
  }
}

export default Map;
