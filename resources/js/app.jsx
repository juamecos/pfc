import './bootstrap';
import '../css/app.css';

import { hydrateRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import RootErrorBoundary from './ErrorBoundaries/RootErrorBoundary';
import 'leaflet/dist/leaflet.css';


const appName = import.meta.env.VITE_APP_NAME || 'Lapisgame';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = hydrateRoot(el);

        root.render(
            <RootErrorBoundary>
                <App {...props} />
            </RootErrorBoundary>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
