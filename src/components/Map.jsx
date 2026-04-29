import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function Map({ parkings }) {
    return (
        <MapContainer
            center={[4.7110, -74.0721]}
            zoom={13}
            style={{ height: "400px", width: "100%", borderRadius: "12px" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FitBounds parkings={parkings} />


            {parkings.map(
                (p) =>
                    p.lat &&
                    p.lng && (
                        <Marker key={p.id} position={[p.lat, p.lng]}>
                            <Popup>
                                <strong>{p.address}</strong> <br />
                                ${p.pricePerHour} / hora
                            </Popup>
                        </Marker>
                    )
            )}
        </MapContainer>
    );
}
function FitBounds({ parkings }) {
    const map = useMap();

    useEffect(() => {
        const validCoords = parkings.filter(p => p.lat && p.lng);

        if (validCoords.length > 0) {
            const bounds = L.latLngBounds(
                validCoords.map(p => [p.lat, p.lng])
            );

            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
        }
    }, [parkings, map]);

    return null;
}
export default Map;