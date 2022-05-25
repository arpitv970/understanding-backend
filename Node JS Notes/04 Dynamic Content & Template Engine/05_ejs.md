# What is EJS?
EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. No religiousness about how to organize things. No reinvention of iteration and control-flow. It's just plain JavaScript.

# Important Syntaxing in EJS
- EJS uses HTML file, unlike pug where we use minimal version of HTML
- So it becomes very flexible to implement EJS in the running project as it requires few addition tags
- To include data dynamically we use: `<%= %>`
- To use JS in EJS file we use: `<% %>`
- Layouts are not directly supported here, but we can use EJS partials where *code blocks* are utilized to reuse, let say there is code block of navbar which used over & over in the site thus we use its code by a functionality provided by EJS:
  - ```ejs
    <%- include('includes/head.ejs') %> 
    ```
  - Here **'-'** is used to render the *.ejs* file, in case of **'='** the code would be sent without being render
 