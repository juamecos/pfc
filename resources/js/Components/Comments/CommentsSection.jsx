// Components/Comments/CommentsSection.jsx
import { useState, useEffect } from 'react';
import CommentList from '@/Components/Comments/CommentList';
import CommentBox from '@/Components/Comments/CommentBox';


export default function CommentsSection({ stoneId, initialComments = [] }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);




    useEffect(() => {
        if (!loaded && !loading) {
            setLoading(true);
            fetch(route('comments.byStone.fetch', { stoneId }))
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error fetching comments: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data && data.comments) {
                        setComments(data.comments.data || []);
                        setLoaded(true);
                    }
                })
                .catch(error => {
                    console.error('Failed to load comments:', error);
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, []);

    return (
        <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Comments</h2>
            <CommentBox stoneId={stoneId} />
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


