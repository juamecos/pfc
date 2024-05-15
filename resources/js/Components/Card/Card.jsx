import CardHeader from "./CardHeader";
import CardImage from "./CardImage";
import CardFooter from "./CardFooter";

export default function Card({ stone }) {
    return (
        <div className="flex flex-col max-w-full md:max-w-lg lg:max-w-xl border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-2">
                <CardHeader stone={stone} />
            </div>
            <div className="flex-grow">
                <CardImage stone={stone} />
            </div>
            <CardFooter stone={stone} />
        </div>
    );
}

