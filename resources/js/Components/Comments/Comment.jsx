// Components/Comments/Comment.jsx
import { useState } from 'react';
import CommentHeader from '@/Components/Comments/CommentHeader';

export default function Comment({ comment }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { content } = comment;

    const toggleDropdown = () => setDropdownOpen((open) => !open);

    return (
        <article className="p-3 mb-2 text-base bg-white border-t border-gray-200">
            <CommentHeader comment={comment} />

            {/* content */}
            <p className="text-gray-500">{content}</p>

        </article>
    );
}
