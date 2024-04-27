import React, { useState } from 'react';
import TagFilters from './TagFilters';
import Grid from './Grid';
import Pagination from './Pagination';
import Card from './Card';
import Footer from './Footer';

export default function Gallery({ stones }) {
    const tags = ['New', 'Nearest', 'Most commented', 'Most liked', 'Country'];
    const images = stones.data.filter(
        (stone) => {
            return stone.image;
        }
    )
    console.log(stones);
    const [selectedTag, setSelectedTag] = useState('All');

    //   const filteredImages = stones.data.filter((stone) =>
    //     selectedTag === 'All' || stone.tags.includes(selectedTag)
    //   );

    const handleTagSelect = (tag) => {
        setSelectedTag(tag);
    };

    return (
        <div className=''>

            <TagFilters tags={tags} onSelectTag={handleTagSelect} />
            <Grid images={images} />
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
};

