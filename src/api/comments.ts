async function getFetchComments(postId: number, limit: number, start: number = 0, search: string) {
    try {
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${postId}/comments?_limit=${limit}&_start=${start}&name_like=${search}`
        );
        const data = await res.json();
        return data
    } catch (error) {
        console.error("Oops 👀 " + error);
    }
}

export default getFetchComments