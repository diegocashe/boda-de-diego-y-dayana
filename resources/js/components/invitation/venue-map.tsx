import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { cn } from '@/lib/utils';

// Vite reescribe las rutas de los íconos por defecto de Leaflet; sin esto no se ven.
const markerIconDefault = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

interface VenueMapProps {
    lat: number;
    lng: number;
    name: string;
    className?: string;
}

export default function VenueMap({ lat, lng, name, className }: VenueMapProps) {
    return (
        <MapContainer center={[lat, lng]} zoom={16} scrollWheelZoom={false} className={cn('z-0 h-full w-full', className)} attributionControl={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[lat, lng]} icon={markerIconDefault}>
                <Popup>{name}</Popup>
            </Marker>
        </MapContainer>
    );
}
