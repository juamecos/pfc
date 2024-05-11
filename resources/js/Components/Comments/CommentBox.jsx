// Components/Comments/CommentBox.jsx
import { useState } from 'react';
import { router } from '@inertiajs/react';
import TextAreaInput from '@/Components/Forms/TextAreaInput';
import Button from '@/Components/Button';

export default function CommentBox({ stoneId }) {
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) {
            setError('Content is required');
            return;
        }
        setError('');

        router.post(
            route('comments.store'),
            { stone_id: stoneId, content },
            {
                onSuccess: (page) => {
                    setContent('');
                },
                onError: (errors) => {
                    setError(errors.content || 'An error occurred');
                }
            }
        );
    };

    return (
        <form onSubmit={handleSubmit} className="my-4">
            <TextAreaInput
                id="comment-content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your comment..."
                label="New Comment"
                rows={4}
                error={error}
                isFocused
            />
            <Button type="submit" buttonType="green" className="mt-2">
                Post Comment
            </Button>
        </form>
    );
}
