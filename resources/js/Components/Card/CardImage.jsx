export default function CardImage({ imageUrl }) {
    return (
        <a href="#" className="block">
            <img className="rounded-t-lg w-full" src={imageUrl} alt="" />
        </a>
    );
}