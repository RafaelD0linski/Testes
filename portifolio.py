html = "<!-- Coloque aqui o conteúdo do index.html -->"
css = "/* Coloque aqui o conteúdo do style.css */"
js = "// Coloque aqui o conteúdo do script.js"

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)
with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Arquivos gerados com sucesso!")