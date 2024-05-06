
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import BackButton from "@/Components//BackButton"
import Icon from '@/Components//Icon';
import { ellipsisVertical } from 'ionicons/icons';
import StoneDetails from "@/Components/Stone/StoneDetails";
export default function Show({ stone }) {


    return (
        <GuestLayout>
            <Head title="Lagisgame" />
            <div className="flex justify-between items-center px-4 mb-4">
                <BackButton />
                <Icon iconName={ellipsisVertical} />
            </div>
            <StoneDetails stone={stone} />




        </GuestLayout>
    )
}