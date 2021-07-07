# Introdução ao Portugol



## Aprenda como utilizar uma estrutura de repetição



**Objetivo da aula**

1.  Aprender o que é uma estrutura de repetição e como utiliza-la



### Aprender o que é uma estrutura de repetição e como utiliza-la

Dentro da logica de programação é uma estrutura que permite executar mais de uma vez o mesmo comando ou conjunto de comandos, de acordo com uma condição ou com um contador.

***

### Linguagem de programção e o Portugol

**O que são linguagens de programação?**
Linguagem de programação é uma linguagem escrita e formal que especifica um conjunto de instruções e regras usadas para gerar programas (software). Um software pode ser desenvolvido para rodar em um computador, dispositivo móvel ou em qualquer equipamento que permita sua execução

O que é obvio para você, certamente não é óbvio para uma maquina. E se você quer que a máquina faça algo para você, você precisa, "falar com ela".

A função das linguagens de programação é servir de um meio de comunicação entre computadores e humanos.



**BAIXO E ALTO NIVEL**

- **Alto nivel** - Essas são aquelas cuja sintaxe se aproxima mais da nossa linguagem e se distanciam mais da linguagem de máquina.
- **Baixo nivel** - E aquela que se aproxima mais da linguagem de maquina. Essas são as que voce precisa ter o conhecimento direto da arquitetura do computador para fazer alguma coisa.



**COMPILADAS OU INTERPRETADAS**

- **Compiladas** - É uma linguagem de programacao em que o codigo fonte, é executado diretamente pelo sistema operacional ou pelo processador, apos ser traduzido por meio de um processo chamado compilação.
- **Interpretadas** - É uma linguagem de programação em que o codigo fonte e executado por um programa de computador chamado interpretador, que em seguida e executado pelo sistema operacional ou processador.



**DEFINICAO DE PORTUGOL**

Portugol é uma pseudolinguagem que permite ao leitor desenvolver algoritmos estruturados em portugues de forma simples e intuitiva, independentemente de linguagem de programacao

E uma pseudolinguagem que permite ao programador pensar no problema em si e nao no equipamento que ira executar o algoritmo



**/*EXEMPLO DE CODIGO*/**

```
//  SIMPELS COMENTARIO 
// FUNCAO DO ALGORITIMO: CALCULAR A MEDIA ARITMETICA
programa
{
    funcao inicio()
    {
        escreva("Ola mundo")
        real nota1,nota2,nota3,nota4,media
        cadeia aluno
        
        escreva("Digte o nome do aluno: ")
        leia(aluno)
        escreva("O seu nome é: " + aluno)
        
        escreva("Digita a nota 1: ")
        leia(nota1)
        escreva("Digita a nota 2: ")
        leia(nota2)
        escreva("Digita a nota 3: ")
        leia(nota3)
        escreva("Digita a nota 4: ")
        leia(nota4)

        media = (nota1+nota2+nota3+nota4)/4

        escreva("O aluno: " + aluno + " obteve a media: " + media)

        // VERIFICA SE A MEDIA É MAIOR OU IGUAL A 7
        se (media >= 7)
        {
            escreva("Parabens!! Voce foi aprovado")
        }
        senao   //  CASO A MEDIA SEJA MENOR QUE 7
        {
            escreva("Infelizmente Voce nao foi aprovado")
        }
    }
}
```

***

### Desvios condicionais e comentários - Portugol

- Aprender a utilizar os desvios condicionais (estruturas de decisão) no Portugol
- Boas praticas de programação - Comentários



**/DESVIO CONDICIONAL - SE/**

É utilizada a palavra reservada **SE**, a condição a ser testada entre parênteses e as instruções que devem ser executadas entre chaves caso o desvio seja VERDADEIRO

```
se (media>=7){
    escreva("Parabens!! Voce foi aprovado")
}
```

**/SE-SENAO/**

Agora vamos imaginar que se a condição for **falsa** um outro conjunto de comandos deve ser executado. Quando iremos encontrar esta situação?



**/CASO/**

Este comando é similar aos comandos **SE** e **SENÃO**, e reduz a complexidade na escolha de diversas opções. Apesar de suas similaridades com o se, ele possui algumas diferenças. Neste comando não e possível o uso de operadores lógicos, ele trabalha apenas com valores definidos.

**/EXEMPLO CONDICIONAIS CASO/**

```
inteiro menu = 0

escolha (menu)
{
    caso 0:
        escreva("MENU 0 SELECIONADO")
    pare
    caso 1:
        escreva("MENU 0 SELECIONADO")
    pare
    caso contrario:
        escreva("Nao existe esta opcao")
    pare

}
```



## Laços de repetição - Portugol

- Aprender a utilizar os laços de repetição no Portugol



**DEFINICAO**

Dentro da logica de programação é uma estrutura que permite executar mais de uma vez o mesmo comando ou conjunto de comandos, de acordo com uma condição ou com um CONTADOR.

**EXEMPLO EM PORTUGOL DO-WHILE**

```
funcao inicio()
{
    inteiro contador, limite, resultado
    contador = 0
    limite = 10
    faca // DO-WHILE
    {
        resultado = 9 * contador
        escreva("9 X " + contador + "=" + resultado + "\n")
        contador++
    }enquanto (contador <= limite)
}
```



## Matrizes e vetores

- Entender o que é uma matriz e um vetoro e entender a sua aplicação prática

**DEFINIÇÃO**

Uma **MATRIZ** é uma coleção de variáveis de mesmo tipo, acessíveis com um único nome e armazenados contiguamente na memoria.

A individualização de cada variável de um vetor e feita através do uso de **INDICES**.

Os **VETORES** são matrizes de uma só dimensão.

**/EXEMPLOS/**

```
cadeia Vetor[5]; // declara um vetor de 5 posições
cadeia Matriz[5][3]; // declara uma matriz de 5 linhas e 3 colunas

cadeia frutas[4];
frutas[0]="Maca"
frutas[1]="Pera"
frutas[2]="Uva"
frutas[3]="Melao"
escreva(frutas[2])

cadeia cesta[][] = {{"Maca", "100"},{"Pera", "200"}, {"Melao", "300"}}

escreva("Frutas: " + cesta[0][0] + " Quantidade: " + cesta[0][1])
```



**FERRAMENTAS UTILIZADAS** 

Flowgorithm - http://www.flowgorithm.org/

Flowgorithm é uma ferramenta de autoria gráfica que permite aos usuários escrever e executar programas usando fluxogramas.
