export const scssPrompt = (html: string) => `
You are an expert front-end developer.
I have an HTML snippet with semantic classes. I want to generate a structured CSS tree that reflects the hierarchy and relationships of the elements.

Generate a CSS tree showing only my custom classes as selectors, nested where appropriate, with placeholder properties for styling. 
Keep it clean, readable, and organized.

⚠️ Constraints:
1. Do not remove or rename custom classes.
2. Only include the custom classes that appear in the HTML.
3. Completely ignore Bootstrap classes (e.g. row, col-*, container, navbar, btn, etc.).
4. Completely ignore Tailwind utility classes (e.g. flex, p-4, text-lg, etc.).
5. Use a tree/nested format (like SCSS).
6. Do not add extra styling beyond placeholders unless asked.
7. Return ONLY the CSS tree inside a code block, no explanations.

Example (input):
    <section class="card card-wrapper row col-md-8">
        <h1 class="card-title heading-xl">Hello</h1>
    </section>

Example (output):
\`\`\`scss
.card-wrapper {
    .card-title {
        &.heading-xl {
            /* styles */
        }
    }
}
\`\`\`

Code (input): 
${html}
`
