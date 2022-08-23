import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import React from 'react'

const FilightMap = withScriptjs(withGoogleMap((props) => {
    const { center } = props;
    return (
        <GoogleMap
            defaultZoom={1}
            defaultCenter={props.center}
        >
            {props.isMarkerShown && <Marker position={center} />}

            <InfoBox
                defaultPosition={new window.google.maps.LatLng(center.lat, center.lng)}
                options={{ closeBoxURL: ``, enableEventPropagation: true }}
            >
                <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
                    <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                        Hello, Taipei!
                    </div>
                </div>
            </InfoBox>
            {/* <DistanceMatrixService
                options={{
                    destinations: [{ lat: 1.296788, lng: 103.778961 }],
                    origins: [{ lng: 103.780267, lat: 1.291692 }],
                    travelMode: "DRIVING",
                }}
                callback={(response) => { console.log(response) }}
            /> */}
        </GoogleMap>
    )
}));

export default FilightMap

