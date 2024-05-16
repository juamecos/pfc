import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import useGeolocation from '@/hooks/useGeolocation'; // Assuming the hook is at this path
import TagFilters from '@/Components/TagFilters';
import Grid from '@/Components/Grid';
import Pagination from '@/Components/Pagination';
import Footer from '@/Components/Footer';
import { usePermissionHandler } from '@/hooks/usePermissionHandler';

export default function Gallery({ stones }) {
    const tags = ['Newest', 'Nearest', 'Most commented', 'Most liked', 'Country'];
    const { locationData, error, fetchLocationData } = useGeolocation();
    const { requestGeoPermission } = usePermissionHandler();
    const [selectedTag, setSelectedTag] = useState('');

    const visitNewest = async () => {
        router.visit('/', {
            method: 'get',
            data: {
                filter: 'Newest',
            },
            preserveState: true,
        });
    };

    const visitNearest = async () => {
        await fetchLocationData();
        const safeLatitude = encodeURIComponent(locationData.latitude || 0);
        const safeLongitude = encodeURIComponent(locationData.longitude || 0);
        router.visit('/', {
            method: 'get',
            data: { latitude: safeLatitude, longitude: safeLongitude },
            preserveState: true,
        });
    };

    const visitCountry = async () => {
        await fetchLocationData();
        const safeCountryCode = encodeURIComponent(locationData.countryCode || '');
        router.visit('/', {
            method: 'get',
            data: {
                forCountry: safeCountryCode,
            },
            preserveState: true,
        });
    };

    const visitMostCommented = async () => {
        router.visit('/', {
            method: 'get',
            data: {
                filter: 'Most commented',
            },
            preserveState: true,
        });
    };

    const visitMostLiked = async () => {
        router.visit('/', {
            method: 'get',
            data: {
                filter: 'Most liked',
            },
            preserveState: true,
        });
    };

    const handleTagSelect = async (tag) => {
        setSelectedTag(tag);

        if (tag === 'Newest') {
            await visitNewest();
        } else if (tag === 'Nearest') {
            requestGeoPermission(visitNearest);
        } else if (tag === 'Country') {
            requestGeoPermission(visitCountry);
        } else if (tag === 'Most commented') {
            await visitMostCommented();
        } else if (tag === 'Most liked') {
            await visitMostLiked();
        } else {
            router.visit('/', {
                method: 'get',
                preserveState: true,
            });
        }
    };

    return (
        <div className="">
            {error && <p>Error: {error}</p>} {/* Show error if exists */}
            <TagFilters tags={tags} onSelectTag={handleTagSelect} />
            <Grid stones={stones} />
            <div className="flex justify-center mt-8 mb-4">
                <Pagination

                    links={stones.links}

                />
            </div>
            <Footer />
        </div>
    );
}
