async function getFetchPosts(start: number = 0, limit: number = 10, search: string) {
    try {
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_start=${start}&q=${search}`
        );
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Oops 👀 " + error);
    }
}

export default getFetchPosts