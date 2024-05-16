import React, { useState } from 'react';
import Modal from './Modal';
import Swal from 'sweetalert2';
import Button from './Button';
import { router } from '@inertiajs/react';
import { usePermissionHandler } from '@/hooks/usePermissionHandler';

export default function FoundButton() {
    const [showModal, setShowModal] = useState(false);
    const { isLoggedIn } = usePermissionHandler();

    const handleOpenModal = () => {
        isLoggedIn() && setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);  // Use FormData to collect data from the form
        const code = formData.get('code'); // Access the code directly from FormData

        try {
            const response = await fetch(route('stone.check', code), {
                method: 'GET'
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Stone not found');


            Swal.fire({
                title: 'Success',
                text: data.message,
                icon: 'success',
                timer: 500, // Tiempo antes de que el Swal se cierre automáticamente
                timerProgressBar: true,
                willClose: () => {
                    handleCloseModal(); // Asegúrate de que esta función cierra el modal adecuadamente


                    router.post('/founds/create', data);
                }
            });
            handleCloseModal();
        } catch (error) {
            console.error('Error fetching stone:', error);
            Swal.fire('Error', error.message, 'error');
        }
    };

    return (
        <>
            <div className="absolute top-4 left-[50%] translate-x-[-50%] z-20000">
                <Button
                    size="lg"
                    buttonType="red"
                    onClick={handleOpenModal}
                    className="mt-5px-5 py-2 mt-5"
                >
                    Found a stone?
                </Button>
            </div>

            <Modal show={showModal} onClose={handleCloseModal} maxWidth="md">
                <div className="p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Enter Stone Code</h3>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                            Code
                        </label>
                        <input
                            type="text"
                            name="code" // Ensure the name attribute matches the FormData key
                            id="code"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            placeholder="Enter code here"
                            required
                        />
                        <div className="mt-4">
                            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}
