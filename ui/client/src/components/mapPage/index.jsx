import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionId: null,
      radius: null,
      filter: " accountId IN ('77b0c1a5-6159-44a9-8268-07b393da0d4e') ",
      lat: null,
      lng: null
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
    var map;
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 33.832571, lng: -117.918591 },
      zoom: 15
    });
  }
  async handleSubmit() {
    console.log('going to do a axios request', this.state);
    try {
      const response = await axios.post(
        'https://one-staging-api.brandify.com/service/location/locationMarkers',
        this.state
      );
      console.log('finished posting this is the data', response);
    } catch (err) {
      console.log('this is the err', err);
    }
  }
  render() {
    return (
      <div>
        {this.state.sessionId && (
          <div>
            <div id="map" />
            <div>
              radius:
              <input
                type="text"
                id="radius"
                onChange={e => this.setState({ radius: e.target.value })}
              />
              <br />
              useLatLng:
              <select
                name="option"
                id="longandlat"
                onChange={e => console.log(e.target.value)}
              >
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
              <br />
              lat:
              <input
                type="text"
                id="lat"
                onChange={e => this.setState({ lat: e.target.value })}
              />
              <br />
              lng:
              <input
                type="text"
                id="lng"
                onChange={e => this.setState({ lng: e.target.value })}
              />
              <br />
              <input type="submit" onClick={() => this.handleSubmit()} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Map;
