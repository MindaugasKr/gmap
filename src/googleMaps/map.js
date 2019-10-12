import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import Cluster from './Cluster';
import { susolvkaCoords } from '../fakeData';
import supercluster from 'points-cluster';

class GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  state = {
    mapProps: null,
    getClusters: null,
    center: null,
    zoom: null
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

  renderMarkers = clusteredMarkers => clusteredMarkers.map((marker) => {
    const { numPoints, wx, wy, points } = marker;

    if (numPoints === 1) {
      const { markersData } = this.props;
      const { id } = points[0];
      const { url } = markersData[id];

      return <Marker
        key={id}
        lat={wy}
        lng={wx}
        url={url}
      />
    } else {
      const id = `${numPoints}_${points[0].id}`;

      return <Cluster
        key={id}
        lat={wy}
        lng={wx}
        numPoints={numPoints}
      />;
    }
  })

  handleChange = mapProps => {
    const { zoom } = mapProps;
    this.setState({
      mapProps,
      zoom
    })
  };

  handleChildClick = (id, childProps) => {
    const { url } = childProps;
    if (url) {
      window.location.assign(url);
    } else {
      const { lat, lng } = childProps;
      this.setState({
        center: [lat, lng],
        zoom: 14
      })
    }
  }

  render() {
    const { mapProps, getClusters, center, zoom } = this.state;
    const clusteredMarkers = mapProps && getClusters
      ? getClusters(mapProps)
      : [];

    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBu5nZKbeK-WHQ70oqOWo-_4VmwOwKP9YQ' }}
          defaultCenter={susolvkaCoords}
          defaultZoom={this.props.zoom}
          onChange={this.handleChange}
          onChildClick={this.handleChildClick}
          center={center}
          zoom={zoom}
        >
          {this.renderMarkers(clusteredMarkers)}
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;