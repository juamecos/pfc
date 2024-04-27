
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import Button from '@/Components/Button';
import Text from '@/Components/CustomText';
import Avatar from '@/Components/Avatar';
import BottomNavigator from '@/Components/BottomNavigator';



export default function Guest({ children }) {


    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow"> {/* Takes up any available space */}
                {/* <Button onClick={() => console.log('Clicked!')} buttonType="default">Default</Button>
                <Button onClick={() => console.log('Clicked!')} buttonType="green" size="lg">Green Large</Button>
                <Button onClick={() => console.log('Clicked!')} buttonType="red" disabled={true}>Red Disabled</Button>
                <Button onClick={() => console.log('Clicked!')} buttonType="alternative" loading={true}>Loading Button</Button>


                
                <Text p title="Este es un gran texto para detalles importantes del producto que necesita destacarse." size="lg" bold />
                <Text h1 title="Bienvenidos a Nuestra Página Web" textColor="text-blue-800" />
                <Text h2 bold title="Explora Nuestras Funciones" textColor="text-green-700" />
                <Text p title="Este es un ejemplo de texto de párrafo en nuestra aplicación." />
                <Text p italic title="Este texto está en cursiva para énfasis." />
                <Text p bold title="Nuevo" textColor="text-red-500" />
                <Text p title="Pie de foto bajo una imagen." textShadow="shadow-md" />
                <Text h3 title="Pulsa Aquí para Más" textColor="text-indigo-500" />
                <Text p title="‘Lo único imposible es aquello que no intentas.’" italic textColor="text-gray-500" />
                <Text p bold title="¡Advertencia! Este proceso borrará todos los datos." textColor="text-red-700" />
                <Text h4 title="Este es un título de sección muy largo que necesita romper adecuadamente entre palabras." textBreak="words" />
                <Text p title="Todos los derechos reservados. © 2024" textColor="text-gray-400" size="sm" />
                <Avatar src="https://gravatar.com/avatar/0c43e86717a4ebf80516611317d7a31f?s=400&d=robohash&r=x" alt="User's avatar" rounded={true} />
                <Avatar />  */}

                {children}
                <BottomNavigator />
            </main>
            {/* <Footer /> */}

        </div>
    );
}
