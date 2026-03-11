import { useEffect, useState } from "react";
import axios from "axios";
import ArticlesList from "../ArticlesList";

export default function ArticlesListPage() {

    const [articles, setArticles] = useState(null);

    useEffect(() => {
        async function loadArticles() {
            try {
                const response = await axios.get("/api/medium-articles");
                console.log("Frontend received:", response.data);
                setArticles(response.data);
            } catch (e) {
                console.error("Fetch failed", e);
                setArticles([]); // Set to empty array only on error
            }
        }

        loadArticles();
    }, []);

    if (articles === null) return <div className="loading">Loading Articles...</div>;

    const lastUpdate = articles[0]?.lastSynced;
    return (
        <div className="page-container">
            <h1>Articles</h1>
            <ArticlesList articles={articles} />
        </div>
    );
}