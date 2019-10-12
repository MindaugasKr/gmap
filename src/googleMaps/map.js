import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import Cluster from './Cluster';
import { susolvkaCoords } from '../fakeData';
import supercluster from 'points-cluster';

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  state = {
    mapProps: null,
    getClusters: null
  }

  componentDidMount() {
    this.createGetClusters();
  }

  componentDidUpdate(prevProps) {
    const { markersData } = this.props;
    const { prevMarkersData } = prevProps.markersData;

    if (markersData !== prevMarkersData) {
      this.createGetClusters()
    }
  }

  createGetClusters = () => {
    const { markersData } = this.props;
    const { getClusters } = this.state;

    if (
      markersData &&
      !getClusters
    ) {
      const getClusters = supercluster(
        markersData, { radius: 60 }
      )
      this.setState({ getClusters });
    }
  }

  renderMarkers = markerList => markerList.map((marker, index) => {
    const { numPoints, wx, wy } = marker;
    return numPoints === 1
      ? <Marker key={index} lat={wy} lng={wx} />
      : <Cluster key={index} lat={wy} lng={wx} numPoints={numPoints} />
  })

  onChange = mapProps => this.setState({ mapProps });

  render() {
    const { mapProps, getClusters } = this.state;
    const clusteredMarkers = mapProps && getClusters
      ? getClusters(mapProps)
      : [];

    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBu5nZKbeK-WHQ70oqOWo-_4VmwOwKP9YQ' }}
          defaultCenter={susolvkaCoords}
          defaultZoom={this.props.zoom}
          onChange={this.onChange}
        >
          {this.renderMarkers(clusteredMarkers)}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;