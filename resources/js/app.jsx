import { StrictMode, Suspense } from 'react';
import './bootstrap';
import '../css/app.css';

import { hydrateRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import RootErrorBoundary from './ErrorBoundaries/RootErrorBoundary';
import Loader from '@/Components/Loader';
import { TabProvider } from '@/context/TabContext';


import 'leaflet/dist/leaflet.css';


const appName = import.meta.env.VITE_APP_NAME || 'Lapisgame';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        hydrateRoot(el,
            <StrictMode>
                <Suspense fallback={<Loader />}>
                    <TabProvider initialTab="map">
                        <RootErrorBoundary>
                            <App {...props} />
                        </RootErrorBoundary>
                    </TabProvider>
                </Suspense >
            </StrictMode>
        )

    },
    progress: {
        color: '#4B5563',
    },
});
