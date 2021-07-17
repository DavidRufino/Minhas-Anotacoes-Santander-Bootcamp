# Características da linguagem II



## Strings e o pacote java.lang



**Objetivos da Aula**

1. Strings
2. Laços, Condições e Operadores
3. Convenções

LINKS: https://github.com/andrelugomes/digital-innovation-one

### Strings

É uma sequencia de caracteres;

Pacote `java.lang`

```
public static void main(String[] args) {

    var nome = "André";
    var sobreNome = "Gomes";
    final var nomeCompleto = nome + sobreNome;

	//	Concatenação na linguagem de programação Java é a operação de juntar duas strings
    System.out.println(nome);
    System.out.println("Nome do cliente : " + nome);
    System.out.println("Nome completo do cliente : " + nomeCompleto);
    var string = new String(" Minha  String ");

    System.out.println("Char na posição : " + string.charAt(5));
    System.out.println("Quantidade=" + string.length());
    System.out.println("Sem Trim [" + string + "]");
    System.out.println("Com Trim [" + string.trim() + "]");
    System.out.println("Lower " + string.toLowerCase());
    System.out.println("Upper " + string.toUpperCase());
    System.out.println("Contém M? " + string.contains("M"));
    System.out.println("Contém X? " + string.contains("X"));
    System.out.println("Replace " + string.replace("n", "$"));
    System.out.println("Equals? " + string.equals(" Minha String "));
    System.out.println("EqualsIgnoreCase? " + string.equalsIgnoreCase(" minha sTrinG "));
    System.out.println("Substring(1,6)=" + string.substring(1, 6));

  }
```

#### String format

Permite formatar um texto de forma que fique mais fácil para ler e para escrever

```
public static void main(String[] args) {

    var nome = "André";
    var sobreNome = "Gomes";
    final var nomeCompleto = nome + sobreNome;

    final var mensagem = String.format("O cliente %s possui sobre nome %s ", nome, sobreNome);
    System.out.println(mensagem);

    System.out.println(String.format("Numero %.2f ", 1.2375d));
  }
```

Aqui está uma referência rápida para todos os especificadores de conversão suportados:

| SPECIFIER | APPLIES TO                                                   | OUTPUT                                                       |
| --------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| %a        | floating point (except *[BigDecimal](https://docs.oracle.com/javase/8/docs/api/java/math/BigDecimal.html)*) | Hex output of floating point number                          |
| %b        | Any type                                                     | “true” if non-null, “false” if null                          |
| %c        | character                                                    | Unicode character                                            |
| %d        | integer (incl. byte, short, int, long, bigint)               | Decimal Integer                                              |
| %e        | floating point                                               | decimal number in scientific notation                        |
| %f        | floating point                                               | decimal number                                               |
| %g        | floating point                                               | decimal number, possibly in scientific notation depending on the precision and value. |
| %h        | any type                                                     | Hex String of value from hashCode() method.                  |
| %n        | none                                                         | Platform-specific line separator.                            |
| %o        | integer (incl. byte, short, int, long, bigint)               | Octal number                                                 |
| %s        | any type                                                     | String value                                                 |
| %t        | Date/Time (incl. long, Calendar, Date and TemporalAccessor)  | %t is the prefix for Date/Time conversions. More formatting flags are needed after this. See Date/Time conversion below. |
| %x        | integer (incl. byte, short, int, long, bigint)               | Hex string.                                                  |

#### String Builder

Essa classe permite criar e manipular dados de Strings dinamicamente, ou seja, podem criar variáveis de String modificáveis.

```
public static void main(String[] args) {

    var nome = "André";

    final var builder = new java.lang.StringBuilder(nome);
    System.out.println(builder.append("Luis"));

    final var reverse = builder.reverse();

    System.out.println(reverse);

    final var insert = reverse.insert(0, "#").insert(reverse.length(), "#");
    System.out.println(insert);

  }
```



## Laços, Condicionais e Operadores

- `IF` e `IF` Ternário
- `FOR`
- `WHILE` e `DO-WHILE`
- **Operadores**
  - Igualdade
  - Lógicos
  - Incremento
  - Matemáticos
  - Relacionais



### `IF` e `IF` Ternário

A instrução condicional **if** em **Java** tem por finalidade tomar uma decisão de acordo com o resultado de uma condição especificada.

O **operador ternário** é um recurso para tomada de decisões com objetivo similar ao do **if**/else, mas que é codificado em apenas uma linha.

```
public static void main(String[] args) {

    final var condicao = false;

    if (condicao) {
      System.out.println("A condição é verdadeira");
    } else {
      System.out.println("A condição é falsa");
    }

    if (condicao)
      System.out.println("Uma única linha...");

    final var ternario = condicao ? "é verdadeira" : "é falsa";

    System.out.println(ternario);
  }
```



### Operadores

#### Igualdade

O **operador de igualdade** do **Java** ( == ) compara o conteúdo de duas variáveis.

```
public static void main(String[] args) {

    final var numero = 11;

    if (numero == 10) {
      System.out.println("O número é 10");
    } else {
      System.out.println("O número  não é 10");
    }

    if (numero != 10) {
      System.out.println("O número não é 10");
    } else {
      System.out.println("O número é 10");
    }

    final var letra = "B";

    if ("A".equals(letra)) {
      System.out.println("É a letra A");
    }

    if (!letra.equals("A")) {
      System.out.println("Não é a letra A");
    }
  }
```



#### Lógicos

Operador lógico obtém o valor lógico de uma expressão. O resultado da resolução da expressão é chamado de valor lógico, que em Java, também chamamos de um valor booleano.

```
public static void main(String[] args) {

    final var numero = 2;
    final var letra = "A";

    //Sort Circuit
    if (numero < 5 && letra.equals("A")) {
      System.out.println("Atendeu a condição");
    }

    if (numero < 5 || letra.equals("A")) {
      System.out.println("Atendeu a outracondição");
    }

    if ((10 - 5) > 1 && (5 - 3) > 1) {
      System.out.println("Lógica maluca...");
    }

  }
```



#### Incremento

Os **operadores de incremento** e decremento são **operadores** unários usados para adicionar ou subtrair 1 do valor de uma variável numérica.

```
public static void main(String[] args) {

    var numero = 1;

    System.out.println(++numero);

    var variavel = 10;

    System.out.println(variavel--);
    System.out.println(variavel);
  }
```



#### Matemáticos

Os ***operadores aritméticos*** ou ***operadores matemáticos*** realizam as operações fundamentais da matemática entre duas variáveis e retornam o resultado.

```
public static void main(String[] args) {

    System.out.println(0 + 1);

    System.out.println(3 - 1);

    System.out.println(3 * 1);

    System.out.println(8 / 2);

    System.out.println(8 % 2); //módulo - resto da divisão

    var numero = 10;
    numero *= 2;
    System.out.println(numero);

  }
```

Aqui está uma referência rápida

| Operação      | Operador | Expressão algébrica | Expressão Java |
| ------------- | -------- | ------------------- | -------------- |
| Adição        | +        | a + 1               | a +1           |
| Subtração     | -        | b -2                | b -2           |
| Multiplicação | *        | cm                  | c * m          |
| Divisão       | /        | d / e               | d / e          |
| Resto         | %        | f mod g             | f % g          |



#### Relacional

Operadores relacionais são utilizados para comparar valores, o resultado de uma expressão relacional é um valor [booleano](http://www.dicasdeprogramacao.com.br/tipos-de-dados-primitivos/) (`VERDADEIRO` ou `FALSO`).

```
public static void main(String[] args) {

    final var numero = 6;

    if (numero > 20) {
      System.out.println("O número é maior que 20");
    } else if (numero >= 10) {
      System.out.println("O número é maior ou igual a 10");
    } else if (numero <= 5) {
      System.out.println("O número é menor ou igual que 5");
    } else {
      System.out.println("nenhuma da anteriores");
    }
}
```



#### `FOR`

O **laço** for é uma **estrutura de repetição** compacta. Seus elementos de inicialização, condição e iteração são reunidos na forma de um cabeçalho e o corpo é disposto em seguida.

```
public static void main(String[] args) {

    for (int i = 0; i <= 10; i = i + 1) {
      System.out.println("I=" + i);
    }

    for (int x = 0; x <= 5; x++)
      System.out.println("X=" + x);
    
  }
```



#### `WHILE` e `DO-WHILE`

A estrutura de repetição `do-while` é uma variação da estrutura `while`. Existe uma diferença sutil, porém importante, entre elas. Em um laço `while`, a condição é testada antes da primeira execução das instruções que compõem seu corpo. Desse modo, se a condição for falsa na primeira vez em que for avaliada, as instrução desse laço não serão executadas nenhuma vez. Em um laço `do-while`, por outro lado, a condição somente é avaliada depois que suas instruções são executadas pela primeira vez, assim, mesmo que a condição desse laço seja falsa antes de ele iniciar, suas instruções serão executadas pelo menos uma vez.

```
public static void main(String[] args) {

    var x = 0;

    //Testa a condição antes
    while (x < 1) {
      System.out.println("Dentro do while...");
      x++;
    }

    var y = 0;

    //Testa a condição depois
    do {
      System.out.println("Dentro do do/while...");
    } while (y++ < 1);
  }
```



## Convenções de nomes



**Checkstyle Gradle Plugin**: 

O plug-in **Checkstyle** executa verificações de qualidade nos arquivos de origem Java do seu projeto usando **Checkstyle** e gera relatórios a partir dessas verificações.

https://docs.gradle.org/current/userguide/checkstyle_plugin.html
https://github.com/checkstyle/checkstyle



**PMD Gradle Plugin**:

O plug-in **PMD** executa verificações de qualidade nos arquivos de origem Java do seu projeto usando **PMD** e gera relatórios a partir dessas verificações.

https://docs.gradle.org/current/userguide/pmd_plugin.html



**Como adicionar ao projeto**:

no arquivo `build.gradle`

```
plugins {
	id 'java'
	id 'checkstyle'
	id 'pmd'
}
....
checkstyle {
	toolVersion = '8.21'
	showViolations = true
	configFile = file ("config/checkstyle/checkstyle.xml") // localização do arquivo checkstyle
}

pmd {
	ruleSetFiles = files("config/pmd/rulest.xml") // localização do arquivo pmd
	toolVersion = "6.15.0"
	ignoreFailures = true
	consoleOutput = true
}
```



# Bibliografia



devmedia. **Operadores lógicos e matemáticos da linguagem Java** - https://www.devmedia.com.br/operadores-logicos-e-matematicos-da-linguagem-java/25248

Dicas de Programação. **Conheça os Operadores Relacionais!** - https://dicasdeprogramacao.com.br/operadores-relacionais/

eXcript. **OPERADORES LÓGICOS DO JAVA** - http://excript.com/java/operador-logico-java.html

Bóson Treinamento em Ciencia e Tecnologia.  **Operadores de Incremento e Decremento em Java** - http://www.bosontreinamentos.com.br/java/operadores-de-incremento-e-decremento-em-java/

Tableless. **Estruturas de Repetição** - https://tableless.com.br/java-estruturas-de-repeticao/

