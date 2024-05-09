// Components/Stone/StoneDetails.jsx
import { useCallback, useMemo, useState } from 'react';
import CustomText from '@/Components/CustomText';
import StoneImage from '@/Components/Stone/StoneImage';
import CardFooter from '@/Components/Card/CardFooter';
import Avatar from '@/Components/Avatar';
import Button from '@/Components/Button';
import { router, usePage } from '@inertiajs/react';
import { heartOutline, chatbubbleOutline, eyeOutline } from 'ionicons/icons';
import Modal from '@/Components/Modal';
import MapDisplay from '../Map/MapDisplay';

function StoneDetails({ stone }) {
    const { auth } = usePage().props;
    const likesCount = useMemo(() => stone.likes.length, [stone.likes]);
    const commentsCount = useMemo(() => stone.comments.length, [stone.comments]);
    const foundsCount = useMemo(() => stone.founds.length, [stone.founds]);

    const center = [stone.latitude, stone.longitude]
    const zoom = 11;


    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const isOwner = useMemo(() => auth.user && auth.user.id === stone.user_id, [auth, stone]);
    const hasAdminAccess = useMemo(
        () => auth.user && (auth.user.role === 'admin' || auth.user.role === 'moderator'),
        [auth]
    );

    const icons = [
        { icon: eyeOutline, size: 20, text: `${foundsCount} founds` },
        { icon: heartOutline, size: 20, text: `${likesCount} likes` },
        { icon: chatbubbleOutline, size: 20, text: `${commentsCount} comments` }
    ];

    const openDeleteModal = useCallback(() => {
        setIsDeleteModalOpen(true);
    }, []);

    const closeDeleteModal = useCallback(() => {
        setIsDeleteModalOpen(false);
    }, []);

    const handleConfirmDelete = useCallback(() => {
        closeDeleteModal();
        router.delete(route('stone.destroy', stone.id));
    }, [closeDeleteModal, stone.id]);

    const handleEdit = useCallback(() => {
        router.get(route('stone.edit', stone.id));
    }, [stone.id]);

    return (
        <main className="mx-auto mb-[30rem] max-w-[910px] p-4  bg-white">
            <StoneImage stone={stone} />
            <CardFooter icons={icons} />
            <div className="flex items-center space-x-4 my-6 px-2 py-2 rounded-full bg-blue-200">
                <Avatar src={stone.user.avatar} alt={`${stone.user.name}'s avatar`} />
                <div>
                    <CustomText h2 title={stone.user.name} textColor="text-gray-900" margin="my-3" />
                    <CustomText p bold title={`From ${stone.user.country}`} textColor="text-gray-700" margin="my-3" />
                </div>
            </div>
            <div className="mt-4 ">
                <CustomText h1 bold title={stone.title} textColor="text-gray-900" margin="my-3" />
                <CustomText p bold title={stone.description} margin="my-4" />
                <CustomText p italic title={`Location: ${stone.city}, ${stone.country}`} textColor="text-sm text-gray-900" margin="my-3" />
                <CustomText p title={`Coordinates: ${stone.latitude.toFixed(3)}, ${stone.longitude.toFixed(3)}`} textColor="text-sm text-gray-500" />
                <CustomText p title={`Created at: ${new Date(stone.created_at).toLocaleDateString()}`} textColor="text-sm text-gray-500" />
                <CustomText p title={`Updated at: ${new Date(stone.updated_at).toLocaleDateString()}`} textColor="text-sm text-gray-500" />



                {hasAdminAccess && (
                    <>

                        <CustomText p title={`Status: ${stone.active ? 'Active' : 'Inactive'}`} textColor={stone.active ? 'text-green-500' : 'text-red-500'} />
                        <CustomText p title={`Abuse: ${stone.abuse ? 'Reported' : 'No reports'}`} textColor={stone.abuse ? 'text-red-500' : 'text-gray-500'} />
                        <CustomText p title={`Moderation Status: ${stone.moderation_status}`} textColor="text-sm text-gray-500" />
                        <CustomText p title={`Report Count: ${stone.report_count}`} textColor="text-sm text-gray-500" />
                    </>
                )}
                {isOwner && (
                    <>
                        <CustomText p title={`Code: ${stone.code}`} textColor="text-sm text-gray-500" />
                        <div className="flex justify-left gap-4">
                            <Button
                                buttonType="red"
                                size="md"
                                onClick={openDeleteModal}
                                className="my-4"
                            >
                                Delete Stone
                            </Button>
                            <Button
                                buttonType="green"
                                size="md"
                                onClick={handleEdit}
                                className="my-4"
                            >Edit Stone</Button>
                        </div>
                    </>
                )}
                <div className='my-4'>
                    <MapDisplay center={center} zoom={zoom} stones={[stone]} />
                </div>


                <Modal show={isDeleteModalOpen} onClose={closeDeleteModal} maxWidth="md">
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
                </Modal>
            </div>
        </main>
    );
}

export default StoneDetails;
