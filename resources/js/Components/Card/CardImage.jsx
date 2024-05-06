import { Link } from '@inertiajs/react';

export default function CardImage({ stone }) {
    const { image, id, title } = stone;
    return (
        <Link href={`/stones/${id}`} className="block">
            <img
                className="rounded-t-lg w-full"
                src={image}
                alt={title ? `Image of stone titled: ${title}` : ''}
            />
        </Link>
    );
}