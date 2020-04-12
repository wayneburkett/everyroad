import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibHdidXJrIiwiYSI6ImNqZ21mbm9pdDFiZXgzM21uaTVrNWpqNW4ifQ.d-nFW-zZRUKXM5E8rdgW3Q';

class Application extends React.Component {
  mapRef = React.createRef();
  map;

  constructor(props: Props) {
    super(props);
    this.state = {
      streams: []
    };
  }

  componentDidUpdate() {
    this.setFill();
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-90.258403, 38.606557],
      zoom: 5
    });

    this.map.on('load', () => {
      this.fetchActivities()
      this.setFill()
    })
  }

  fetchActivities() {
    fetch('/activities')
      .then(result => result.json())
      .then(data => {
        this.setState({streams: data})
      })
  }

  setFill() {
    // update
  }

  render() {
    const streams = this.state.streams
    const renderStream = (stream, i) => {
      return (
        <div key={i} className='txt-s'>
          <span>{`${stream.name.toLocaleString()}`}</span>
        </div>
      );
    }

    return (
      <div>
        <div ref={this.mapRef} className="absolute top right left bottom" />
        <div className="bg-white absolute top lef ml12 mt12 py12 px12 shadow-darken10 round z1 wmax180">
          <div className='mb6'>
            <h2 className="txt-bold txt-s block">Rides</h2>
            <p className='txt-s color-gray'>Your rides</p>
          </div>
          {streams.map(renderStream)}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));

