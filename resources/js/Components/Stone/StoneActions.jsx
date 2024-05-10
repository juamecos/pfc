// Components/Stone/StoneActions.jsx
import Button from '@/Components/Button';

export default function StoneActions({ onDelete, onEdit }) {
    return (
        <div className="flex justify-left gap-4">
            <Button buttonType="red" size="md" onClick={onDelete} className="my-4">
                Delete Stone
            </Button>
            <Button buttonType="green" size="md" onClick={onEdit} className="my-4">
                Edit Stone
            </Button>
        </div>
    );
}