
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";



import StoneDetails from "@/Components/Stone/StoneDetails";
export default function Show({ stone }) {

    return (
        <GuestLayout>
            <Head title="Lagisgame" />
            <StoneDetails stone={stone} />
        </GuestLayout>
    )
}