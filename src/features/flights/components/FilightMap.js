import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from 'react-google-maps';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import React from 'react'

const FilightMap = withScriptjs(withGoogleMap((props) => {
    const { center, markers, polygons } = props;
    const focusMarker = markers && markers.find(mark => mark.focus == true);
    const focusCenter = !focusMarker ? center : focusMarker.markerLocation;
    const arrPolyline = markers && markers.map(marker => { return marker.markerLocation });

    return (
        <GoogleMap
            defaultZoom={1}
            center={focusCenter}
            defaultCenter={center}
        >
            {markers && markers.map(marker =>
                <Marker
                    key={marker.markerType}
                    position={marker.markerLocation}
                    label={marker.markerName}
                />
            )}
            {arrPolyline && <Polyline path={arrPolyline}
                geodesic={true}
                options={{
                    strokeColor: "#ff2527",
                    strokeOpacity: 0.75,
                    strokeWeight: 2
                }}
            />}

            {/* <InfoBox
                defaultPosition={new window.google.maps.LatLng(center.lat, center.lng)}
                options={{ closeBoxURL: ``, enableEventPropagation: true }}
            >
                <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
                    <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                        Hello, Taipei!
                    </div>
                </div>
            </InfoBox> */}
        </GoogleMap>
    )
}));

export default FilightMap

