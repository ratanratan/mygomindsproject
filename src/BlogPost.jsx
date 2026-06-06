import React from 'react';
import { useParams } from 'react-router-dom';

function BlogPost() {

    //Get the param value 
    const { slug } = useParams();

    // Sample data representing different blog posts
    const blogPosts = {
        'first-post': {
            title: 'First Blog Post',
            content: 'This is the content of the first post.',
            name: "Ratan"
        },
        'second-post': {
            title: 'Second Blog Post',
            content: 'This is the content of the second post.',
            name: "Anu"
        },
        'third-post': {
            title: 'Third Blog Post',
            content: 'This is the content of the third post.',
            name: "Sathya"
        },
        'sleeping-post': {
            title: 'Sleeping Blog Post',
            content: 'This is the content of the Sleeping post.',
            name: "Always Sleeping"
        },
    };

    //from blogPosts loading the particular slug value 
    const post = blogPosts[slug];

    return (
        <>
            {post && <h1>
                {post.name} {post.title} {post.content}
            </h1>

            }
        </>
    );
}

export default BlogPost;