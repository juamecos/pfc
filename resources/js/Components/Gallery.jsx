import React, { useState } from 'react';
import { router } from '@inertiajs/react'
import useGeolocation from '@/hooks/useGeolocation'; // Asumiendo que el hook está en este path
import TagFilters from '@/Components/TagFilters';
import Grid from '@/Components/Grid';
import Pagination from '@/Components/Pagination';
import Footer from '@/Components/Footer';

export default function Gallery({ stones }) {
    const tags = ['Newest', 'Nearest', 'Most commented', 'Most liked', 'Country'];
    const { locationData, error, fetchLocationData } = useGeolocation();

    const [selectedTag, setSelectedTag] = useState('');
    console.log(selectedTag, stones);

    const handleTagSelect = async (tag) => {
        setSelectedTag(tag);
        console.log('handleTagSelect', tag);

        if (tag === 'Newest') {
            router.visit('/', {
                method: 'get',
                data: {
                    filter: 'Newest',
                },
                preserveState: true,
            });
        } else if (tag === 'Nearest') {
            await fetchLocationData(); // Await the location data
            const safeLatitude = encodeURIComponent(locationData.latitude || 0);
            const safeLongitude = encodeURIComponent(locationData.longitude || 0);

            router.visit('/', {
                method: 'get',
                data: { latitude: safeLatitude, longitude: safeLongitude },
                preserveState: true,
            });
        } else if (tag === 'Country') {
            await fetchLocationData(); // Await the location data
            const safeCountryCode = encodeURIComponent(locationData.countryCode || '');

            router.visit('/', {
                method: 'get',
                data: {
                    forCountry: safeCountryCode,
                },
                preserveState: true,
            });
        } else if (tag === 'Most commented') {
            router.visit('/', {
                method: 'get',
                data: {
                    filter: 'Most commented',
                },
                preserveState: true,
            });
        } else if (tag === 'Most liked') {
            router.visit('/', {
                method: 'get',
                data: {
                    filter: 'Most liked',
                },
                preserveState: true,
            });
        } else {
            router.visit('/', {
                method: 'get',
                preserveState: true,
            });
        }
    };

    return (
        <div className="">
            {error && <p>Error: {error}</p>} {/* Mostrar error si existe */}
            <TagFilters tags={tags} onSelectTag={handleTagSelect} />
            <Grid stones={stones} />
            <div className="flex justify-center mt-8 mb-4">
                <Pagination
                    currentPage={stones.current_page}
                    totalPages={stones.last_page}
                    links={stones.links}
                    prevPage={stones.prev_page_url}
                    nextPage={stones.next_page_url}
                    onPageChange={(newPage) => console.log('Change to page', newPage)}
                />
            </div>
            <Footer />
        </div>
    );
}
