// Components/Comments/CommentsSection.jsx
import { useState, useEffect } from 'react';
import CommentList from '@/Components/Comments/CommentList';
import CommentBox from '@/Components/Comments/CommentBox';
import { usePage } from '@inertiajs/react';
import Pagination from '../Pagination';

export default function CommentsSection({ stoneId, initialComments = [] }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const { auth } = usePage().props;



    useEffect(() => {
        if (!loaded && !loading) {
            setLoading(true);
            fetch(route('comments.byStone.fetch', { stoneId }))
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Error fetching comments: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.comments && data.comments.data) {
                        setComments(data.comments.data);
                        setData(data.comments);
                    }
                    setLoading(false);
                    setLoaded(true);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [loaded, loading, stoneId]);

    const handleCommentSubmit = (newComment) => {
        setComments([newComment, ...comments]);
    };

    if (loaded && data && !loading) {
        console.log(data)
    }


    return (
        <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Comments</h2>
            <CommentBox stoneId={stoneId} onCommentSubmit={handleCommentSubmit} />
            {(loading && !comments && !loaded) ? (
                <p>Loading comments...</p>
            ) : (
                <>
                    <CommentList
                        comments={comments}
                    />

                </>

            )}
        </div>
    );
}
