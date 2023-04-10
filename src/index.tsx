import { createRoot } from 'react-dom/client';
import App from '~/components/App';
import 'maplibre-gl/dist/maplibre-gl.css';
import './styles.less';

const root = createRoot(document.getElementById('app')!);

root.render(<App />);
