
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

import BottomNavigator from '@/Components/BottomNavigator';



export default function Guest({ children }) {


    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">

                {children}
                <BottomNavigator />
            </main>
            {/* <Footer /> */}

        </div>
    );
}
