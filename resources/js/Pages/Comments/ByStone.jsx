// resources/js/Pages/Components/ByStone.jsx

import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import CommentList from "@/Components/Comments/CommentList";

export default function ByStone(
    { comments, stoneId }

) {
    console.log(comments);
    return (
        <GuestLayout>
            <Head title={`Comments for Stone #${stoneId}`} />

            <h1 className="text-2xl font-bold mb-4">Comments for Stone #{stoneId}</h1>

            <CommentList comments={comments} />
        </GuestLayout>
    );
}
