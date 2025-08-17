
// generate css tree
export const generateCssTree = async (html: string) => {
    try {
        const res = await fetch('/api/css-tree', {
            method: 'POST',
            body: JSON.stringify({ message: html }),
        })
        const data = await res.json()
        return data.reply;
    } catch (error) {
        return "Failed to fetch data from Groq API"
    }
}
