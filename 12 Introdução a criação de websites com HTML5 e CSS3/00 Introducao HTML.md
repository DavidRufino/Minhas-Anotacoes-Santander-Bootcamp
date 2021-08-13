# Introdução ao curso de HTML

**Objetivos**

1. Historia e estrutura básica
2. Semântica
3. Principais elementos HTML



## Breve Historia

Em 1991 **Tim Berners-Lee** criou essa linguagem de marcação para melhorar a comunicação entre ele e seus colegas de trabalho no CERN, desde então já surgiram 5 versões e o **HTML** se tornou a base da web.

Com o **HTML** definimos o significado e a **estrutura do conteúdo da web** e, além de texto, nossas páginas precisam de imagens, vídeos e vários outros formatos e para isso temos os **elementos HTML**.

Um elemento HTML é formado pela **tag de abertura** e seus atributos, o conteúdo e uma **tag de fechamento**.

Com esses elementos podemos **agrupar tipos de conteúdo, alterar tamanho e forma de fontes e adicionar diferentes mídias ao nossa página na web**.



## Estrutura básica do HTML

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title> Aula HTML </title>
	</head>
	<body>
        Estrutura Basica
	</body>
</html>
```

- `DOCTYPE` - O **Doctype não é uma tag HTML**, mas uma instrução para o navegador e outros programas que podem ler seu site, que o código encontrado ali é um código HTML. Assim eles sabem o que fazer para mostrar seu site da melhor forma possível.

- `HTML `- Representa a raiz (elemento de nível superior) de um **documento HTML**, portanto, também é conhecido como *root element* . Todos os outros elementos devem ser descendentes deste elemento.
- `HEAD` - Contém informações legíveis por máquina (metadados) sobre o documento, como título , scripts e style sheets.
- `META` - Representa metadados que não podem ser representados por outros elementos relacionados com a meta de HTML, como **base**, **link**, **script**, **style** ou **title**.
- `TITLE` - Define o **título do documento** que é mostrado na barra de título do navegador ou na guia de uma página. Ele contém apenas texto; tags dentro do elemento são ignoradas.
- `BODY` - Representa o conteúdo de um **documento HTML**. Só pode haver um elemento **<Body>** em um documento.



## Semântica

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title> Aula HTML </title>
	</head>
	<body>
        <header>
            <h1>Estrutura Básica</h1>
        </header>

        <section>
            <header>
                <h2>Posts</h2>
            </header>

            <article>
                <header>
                    <h3>Post #1</h3>
                </header>
            </article>
        </section>

        <footer>
            Rodapé
        </footer>
	</body>
</html>
```

- HEAD**ER** - Não confunda com **HEAD**. Representa o conteúdo introdutório, normalmente um grupo de auxílios introdutórios ou de navegação. Ele pode conter alguns elementos de título, mas também um logotipo, um formulário de pesquisa, um nome de autor e outros elementos;
- `<h1>, <h2>, <h3>, <h4>, <h5>, <h6>` - Representam seis níveis de cabeçalhos de seção. `<h1>` é o nível de seção mais alto, enquanto `<h6>` o mais baixo;
- `SECTION` - Representa uma seção autônoma genérica de um documento, que não possui um elemento semântico mais específico para representá-lo. As seções devem sempre ter um título, com muito poucas exceções;
- `ARTICLE` - Representa uma composição independente em um documento, página, aplicativo ou site, que se destina a ser distribuído ou reutilizado de forma independente;
- `FOOTER` - Representa um rodapé para seu conteúdo de seção mais próximo ou elemento raiz de seção . Normalmente, um contém informações sobre o autor da seção, dados de direitos autorais ou links para documentos relacionados;



# Referência

Developer.Mozilla. **HTML Elements Reference** - https://developer.mozilla.org/en-US/docs/Web/HTML/Element
