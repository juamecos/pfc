
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

import BottomNavigator from '@/Components/BottomNavigator';
import UpButton from '@/Components/UpButton';
import BackButton from "@/Components//BackButton"


export default function Guest({ children }) {


    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex justify-between items-center px-4 mb-4">
                <BackButton />
            </div>
            <main className="flex-grow">

                {children}
                <BottomNavigator />
            </main>
            {/* <Footer /> */}
            <UpButton />
        </div>
    );
}
