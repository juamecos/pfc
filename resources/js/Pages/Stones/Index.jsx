import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Gallery from "@/Components/Gallery";
import CustomText from "@/Components/CustomText";
import Button from "@/Components/Button";


export default function Stones(props) {

    const { stones } = props;
    const backgroundImageUrl = 'images/background-index.png';


    return (
        <GuestLayout>

            <Head title="Lagisgame" />
            <header className="h-96 w-full bg-cover bg-center relative" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
                <div className="bg-black bg-opacity-30 flex flex-col justify-center items-center text-center h-full">

                    <CustomText h1 bold title='Lagisgame' textColor="text-white" margin="my-8" />
                    <CustomText h2 title='Explore the world through hidden stones' textColor="text-white" margin="mb-6" />
                    <Button size="lg" href="/discover" buttonType="red" className="mt-5px-5 py-2 mt-5">Start your search here</Button>
                </div>
            </header>

            <Gallery stones={stones} />
        </GuestLayout>
    )
}
