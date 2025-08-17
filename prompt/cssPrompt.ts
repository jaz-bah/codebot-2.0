export const cssPrompt = (html: string) => `
You are an expert front-end developer.
I have an HTML snippet with semantic classes. I want to generate a structured CSS tree that reflects the hierarchy and relationships of the elements.

Generate a **nested-looking plain CSS tree** showing only my custom classes, with placeholder properties. 
- Keep the hierarchy visually nested using indentation.
- Use plain CSS syntax (no SCSS, no "&" nesting).
- Keep it clean and readable.

⚠️ Constraints:
1. Do not remove or rename custom classes.
2. Only include the custom classes that appear in the HTML.
3. Completely ignore Bootstrap classes (row, col-*, container, navbar, btn, etc.).
4. Completely ignore Tailwind utility classes (flex, p-4, text-lg, etc.).
5. Use indentation to reflect nesting, but keep plain CSS syntax.
6. Do not add extra styling beyond placeholders unless asked.
7. Return ONLY the CSS tree inside a code block, no explanations.

Example (input):
    <section class="card card-wrapper row col-md-8">
        <h1 class="card-title heading-xl">Hello</h1>
    </section>

Example (output):
\`\`\`css
.card-wrapper {
    /* styles */
}

.card-wrapper{
    /* styles */
}

.card-wrapper .card-title {
    /* styles */
}

.card-wrapper .card-title.heading-xl {
    /* styles */
}
\`\`\`

Code (input): 
${html}
`
