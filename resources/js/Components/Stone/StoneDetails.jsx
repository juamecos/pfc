// Components/Stone/StoneDetails.jsx
import { useCallback, useMemo, useState } from 'react';
import CustomText from '@/Components/CustomText';
import StoneImage from '@/Components/Stone/StoneImage';
import CardFooter from '@/Components/Card/CardFooter';
import { router, usePage } from '@inertiajs/react';
import { heartOutline, chatbubbleOutline, eyeOutline } from 'ionicons/icons';
import Modal from '@/Components/Modal';
import MapDisplay from '../Map/MapDisplay';
import Tabs from '@/Components/Tabs/Tabs';
import CommentsSection from '../Comments/CommentsSection';
import StoneInfo from './StoneInfo';
import CardHeader from '../Card/CardHeader';
import { useTabContext } from '@/context/TabContext';

function StoneDetails({ stone }) {
    const { activeTab, switchTab } = useTabContext();

    const { auth } = usePage().props;

    const center = [stone.latitude, stone.longitude]
    const zoom = 11;

    const isOwner = useMemo(() => auth.user && auth.user.id === stone.user_id, [auth, stone]);
    const hasAdminAccess = useMemo(
        () => auth.user && (auth.user.role === 'admin' || auth.user.role === 'moderator'),
        [auth]
    );

    // Tabs
    const tabs = [
        { value: 'comments', label: 'Comments' },
        { value: 'map', label: 'Map' },
        // ...(isOwner ? [{ value: 'actions', label: 'Actions' }] : [])
    ];

    const tabContent = {
        map: <MapDisplay center={center} zoom={zoom} stones={[stone]} />,
        comments: <CommentsSection stoneId={stone.id} initialComments={stone.comments} />,
        // actions: isOwner ? <StoneActions onDelete={openDeleteModal} onEdit={handleEdit} /> : null
    };
    return (
        <main className="mx-auto mb-[30rem] max-w-[910px] p-4  bg-white">
            <CustomText h1 bold title='Stone Details' margin='mb-3' />
            <CardHeader stone={stone} />
            <StoneImage stone={stone} />
            <CardFooter stone={stone} />
            <StoneInfo stone={stone} hasAdminAccess={hasAdminAccess} isOwner={isOwner} />
            <div className="mt-4 ">



                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={switchTab} />
                <div className="mt-4">{tabContent[activeTab]}</div>


                {/* <Modal show={isDeleteModalOpen} onClose={closeDeleteModal} maxWidth="md">
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Confirm Delete
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Are you sure you want to delete this stone? This action cannot be undone.
                        </p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <Button buttonType="alternative" onClick={closeDeleteModal}>Cancel</Button>
                            <Button buttonType="red" onClick={handleConfirmDelete}>Ok</Button>
                        </div>
                    </div>
                </Modal> */}
            </div>
        </main>
    );
}

export default StoneDetails;
