# Entendendo como o Git funciona por baixo dos panos



### Topicos fundamentais para entender o funcionamento do Git

**OBJETIVO DA AULA**

- SHA1
- OBJETOS fundamentais
- SISTEMA DISTRIBUIDO
- SEGURANÇA



### SHA1

A sigla SHA significa Secure Hash Algorithm (Algoritmo de Hash Seguro), é um conjunto de funções hash criptograficas projetadas pela NSA (Agência de Segurança Nacional dos EUA).

A encriptação gera conjunto de characteres identificador de 40 digitos.
É uma forma curta de representar um arquivo

**EXEMPLO**

```
echo "ola mundo" | openssl SHA1
> (stdin) = f9fc856e559b950175f2b7cd7dad61facbe58e7b
```

Ele e uma forma curta de represetar o arquivo, o estado do arquivo.
Toda vez que o arquivo for alterado, o sha tambem sera alterado.
É uma forma eficiente de identificar se o arquivo foi alterado ou não.

**OPTIONS**

Guit Bash Here - ja inicia o bash com o diretorio selecionado

**COMANDOS**

```
$ openssl sha1 [NOME_ARQUIVO.FORMATO] - gera um SHA1 do arquivo
```

***

## Objetos internos do Git



- BLOBS
- TREES
- COMMITS



### BLOBS

BLOBS possuem o SHA1 dos arquivos

**FLAGS**

- **stdin** - significa 'esta funcao espera receber um arquivo e a gente esta falando que esta enviando texto'

**COMANDOS**

```
echo 'conteudo' | git hash-object --stdin
> fc31e91b26cf85a55e072476de7f263c89260eb1
```

//	Passara essa STRING 'conteudo' para a função do [git hash-object] e vai devolver o sha1 da STRING 'conteudo'

**COMANDOS**

```
echo -e 'conteudo' | openssl sha1
> 65b0d0dda479cc03cce59528e28961e498155f5c
```

Por que os mesmo sha1 da STRING 'conteudo' sao diferentes utilizando o sha1 direto e git hash-object --stdin ? por que isso acontece?

É por que esses objetos especificos do **GIT**, do jeito que o **GIT** usa eles, os arquivos ficam guardado dentro do objeto **BLOB**, e esse objeto contem **METADADOS**, titulo, tamanho, barra acontraria com zero e com o conteudo do arquivo. 
o arquivo **NAO** contem apenas a **STRING** 'conteudo', ela contem **STRING** 'blob 9\0conteudo'



### TREES

As TREES armazenam BLOBS
BLOBS possuem o SHA1 dos arquivos
TREES apontam para tipos de BLOBS diferentes
*TREES é como uma pasta*

ou seja, se o BLOB do arquivo for diferente, o TREES que aponta para esse BLOB tambem sera diferente
Uma coisa relacionam com outra coisa

**DESENHO**

```
        TREE
 _________|________
 |        |       |
BLOB    BLOB    TREE
                  |
                BLOB
```



### COMMITS

Commit aponta para uma TREE
Commit aponta para o parente
Commit aponta para o autor
Commit aponta para uma mensagem do autor

Commit é unico para cada autor que for publicar ou 'PUSH' o arquivo



### Sistema Distribuido Seguro

Por que o GIT é um Sistema tão seguro?

Imagina que voce tenha seu codgigo em um servidor na nuvem github por EXEMPLO
O codigo esta na sua maquina e nas nuvens.