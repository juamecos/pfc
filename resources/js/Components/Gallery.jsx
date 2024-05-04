import React, { useState } from 'react';
import { router } from '@inertiajs/react'
import useGeolocation from '@/hooks/useGeolocation'; // Asumiendo que el hook está en este path
import TagFilters from './TagFilters';
import Grid from './Grid';
import Pagination from './Pagination';
import Footer from './Footer';

export default function Gallery({ stones }) {
    const tags = ['New', 'Nearest', 'Most commented', 'Most liked', 'Country'];
    const { locationData, error, fetchLocationData } = useGeolocation();

    const images = stones.data.filter(stone => stone.image);
    const [selectedTag, setSelectedTag] = useState('New');

    const handleTagSelect = (tag) => {
        setSelectedTag(tag);
        if (selectedTag === 'Nearest') {
            fetchLocationData();
            const { latitude, longitude } = locationData;
            console.log('From handleTagSelect');
            console.log('Selected tag: ' + tag);
            console.log(error);
            console.log(locationData);

            const safeLatitude = encodeURIComponent(latitude);
            const safeLongitude = encodeURIComponent(longitude);

            console.log('From handleTagSelect ' + safeLatitude + ' ' + safeLongitude);

            router.visit('/', {
                method: 'get',
                data: { latitude: safeLatitude, longitude: safeLongitude },
                preserveState: true
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
