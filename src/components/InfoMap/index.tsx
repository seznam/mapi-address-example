import { useEffect, useRef } from 'react';
import { API_KEY, API_URL } from '~/constants';
import maplibregl from 'maplibre-gl';
import './styles.less';

interface IInfoMapOptions {
	longitude: number;
	latitude: number;
	lang: string;
}

export default function InfoMap({
	longitude,
	latitude,
	lang,
}: IInfoMapOptions) {
	const mapDOMRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// mapa
		const mapa = new maplibregl.Map({
			container: mapDOMRef.current,
			style: {
				version: 8,
				sources: {
					turist: {
						type: 'raster',
						attribution: '<a href="https://licence.mapy.cz/?doc=mapy_pu#api" target="_blank">&copy; Seznam.cz a.s. a další</a>',
						minzoom: 1,
						maxzoom: 19,
						tiles: [
							`${API_URL}/maptiles/outdoor/256@2x/{z}/{x}/{y}?lang=${lang}&apikey=${API_KEY}`,
						],
						tileSize: 256,
					},
				},
				layers: [
					{
						id: 'maptiles',
						type: 'raster',
						source: 'turist',
						minzoom: 1,
						maxzoom: 19,
					},
				],
			},
			center: [longitude, latitude],
			zoom: 18,
			maxZoom: 19,
			minZoom: 1,
			attributionControl: false,
		});

		mapa.on('load', () => {
			mapa.addControl(new maplibregl.AttributionControl({ compact: false }), 'bottom-left');

			new maplibregl.Marker().setLngLat([longitude, latitude]).addTo(mapa);
		});

		return () => {
			mapa.remove();
		};
	}, []);

	return <div className="infoMap">
		<div className="infoMap__map" ref={mapDOMRef}></div>
	</div>;
}
