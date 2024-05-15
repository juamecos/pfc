import { Link } from '@inertiajs/react';

export default function CardImage({ stone }) {
    const { image, id, title } = stone;
    return (
        <Link href={`/stones/${id}`} className="block w-[100%] h-[100%]">
            <img
                className="w-[100%] h-[100%] object-cover"
                src={image}
                alt={title ? `Image of stone titled: ${title}` : ''}
            />
        </Link>
    );
}