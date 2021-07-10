# Preparando o ambiente para programar em Java



## Java - Instalação e Ambiente



#### Ferramentas de Build

- **Gradle** - Um sistema de automação de compilação de código aberto que se baseia nos conceitos de `Apache Ant` e `Apache Maven` e introduz uma linguagem de domínio específico baseada em `Groovy` em vez do XML usado pelo `Apache Maven` para declarar a configuração do projeto.
- **Maven** - Apache Maven, ou Maven, é uma ferramenta de automação de compilação utilizada primariamente em projetos Java. Ela é similar à ferramenta Ant, mas é baseada em conceitos e trabalhos diferentes em um modo diferente. Também é utilizada para construir e gerenciar projetos escritos em C#, Ruby, Scala e outras linguagens.
- **Maven Wrappers** - é uma excelente escolha para projetos que precisam de uma versão específica do Maven (ou para usuários que não desejam instalar o Maven). **Em vez de instalar muitas versões dele no sistema operacional, podemos apenas usar o script de invólucro específico do projeto.**
- **IntelliJ IDEA** - é um ambiente de desenvolvimento integrado escrito em Java para o desenvolvimento de software de computador. Ele é desenvolvido pela JetBrains e está disponível como uma edição da comunidade licenciada do Apache 2 e em uma edição comercial proprietária.

**LINKS**

https://gradle.org/ - Grandle

https://maven.apache.org/ - Maven

https://www.jetbrains.com/ - IntelliJ IDEA



#### Instalando no Windows

**Grandle** - Criar uma pasta na **[UNIDADE]:**\ com nome **Gradle** exp: `C:\Gradle` e extrair o arquivo baixado para dentro desta pasta ficando: `C:\Gradle\gradle-7.X.y\bin` 

https://gradle.org/install/#manually

**Apache Maven** - Extrair o arquivo para a pasta `Program Files` exp.: `C:\program files\apache-maven-3.x.y\bin`



***

## Java - Criação de Projetos



**Spring Initializr** - Fornece uma interface web bem simples para o usuário. Podendo gerar seu projeto a partir de uma estrutura de configurações pré-moldadas. São configurações de versões do java/spring boot, grupo/nome do projeto, série de lista de dependências e etc.

**LINKS**  

https://start.spring.io/ - Spring Initializr

- **Project** - Temos a opcao de escolher entre `Maven Projet` e ` Gradle Project`
- **Language** - Temos a opção entre `Java` , `Kotlin` e `Groovy`
- **Spring Boot** - É um projeto da Spring que veio para facilitar o processo de configuração e publicação de nossas aplicações. A intenção é ter o seu projeto rodando o mais rápido possível e sem complicação.
- **Group** - é um identificador de pacote, é como um endereço da web. Ele deve ser algo unico e identificará seu aplicativo de maneira exclusiva. Note que ele é criado pelo que é chamado de `Nome de dominio reverso`. exp.: www.google.com passa a ser **com.google.gmail**



**Maven Project** - Para abrir Projeto Maven, localize o arquivo `pom.xml` do projeto

**Gradle Project** - Para abrir Projeto Gradle, localize o arquivo `build.gradle` do projeto



#### POSSÍVEIS ERRORS

**Pergunta:** Esta dando **Error: Java: invalid target release: 11 - IntelliJ IDEA** e agora?

**Resposta:** Você precisa instalar o Java SDK dessa versão que esta sendo exigida (no caso versão 11), quando instalado, em IntelliJ IDEA. Vá em `File` > `Project Structure` > `Project` > Em **Project SDK** localize o Java SDK instalado.

