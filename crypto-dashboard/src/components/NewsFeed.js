import React, { useState, useEffect } from 'react';
import axios from 'axios';

require('dotenv').config();


export default function NewsFeed () {

    const [articles, setArticles] = useState(null);
    
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/news',
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            setArticles(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });
    }, []);

    const first7Articles = articles?.slice(0,7);

    return(
        <div className="news-feed">
            <h2>NewsFeed</h2>
            {first7Articles?.map((article, index) => (
                <div key={index}>
                    <a href={article.url}><p>{article.title}</p></a>
                </div>
            ))}
        </div>
    )
};