import { useEffect, useState } from "react";
import axios from "axios";
import ArticlesList from "../ArticlesList";

export default function ArticlesListPage() {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        async function loadArticles() {
            const response = await axios.get("/api/medium-articles");
            setArticles(response.data);
        }

        loadArticles();
    }, []);

    return (
        <>
            <h1>Articles</h1>
            <ArticlesList articles={articles} />
        </>
    );
}