# Trabalhando com Datas



#### Objetivos da Aula

1. Aprender a manipular datas;
2. Aprender a formatar datas;
3. Entender a evolução do tratamento de datas no Java;



## Parte 1: O java.util.Date

A implementação do **java.util.Date** está na JDK desde sua versão 1.0
É de se esperar que algumas coisas não se mostrem tão interessantes nos dias atuais, dado a sua idade.

Como podemos trabalhar com a manipulação de datas com a classe **java.util.Date** do Java.

Alguns construtores do Java Date:

```
Date();
Date(long date);

// Todos estes construtores abaixo estao marcados como @Deprecated desde a versao 1.1 da JDK

Date(int year, int month, int date);
Date(int year, int month, int date, int hrs, int min);
Date(int year, int month, int date, int hrs, int min, int sec);
Date(String s);
```



### Date()

Este construtor vai alocar um objeto da classe `Date` e o **inicializara com o milissegundos mais próximo** do período da sua execução.

Exemplo de como utilizar a classe `Date`

```
import java.util.Date;

public class Exemplo001 {
	
	public static void main(String[] args) {
		Date novaData = new Date();
		System.out.println(novaData);
		//	retorna: Sun Jul 18 23:29:21 BRT 2021
	}
}
```



### Date(long date)

Diferente do construtor anterior, esse construtor espera que você passe os milissegundos com base padrão de tempo (epoch) que usa como referencia **1 de janeiro de 1970 00:00:00**.

> **O que é o Epoch?**
> O <u>epoch timestamp</u> é um padrão largamente aceito para representar uma data como um inteiro 32-bits a partir do inicio do **Unix Epoch**.

```
public class Exemplo002 {
	public static void main(String[] args) {
		Long currentTimeMillis = System.currentTimeMillis();
		
		System.out.println(currentTimeMillis);
		// 1626662283500
		
		Date novaData = new Date(currentTimeMillis);
		// Sun Jul 18 23:57:11 BRT 2021
	}
}
```

**System.currentTimeMillis()** - Esse método estático vai nos retornar o milissegundo mais próximo de sua execução com base no Sistema Operacional.



### Métodos úteis

Segue abaixo uma tabela com Alguns métodos da classe `Date` que são muito uteis e serão usados com frequência durante a manipulação de datas.

| Metodo          | Retorno     | Descrição                                                    |
| --------------- | ----------- | ------------------------------------------------------------ |
| after(Date)     | boolean     | Checa se o objeto Data de referencia e posterior ao comparado |
| before(Date)    | boolean     | Checa se o objeto Data de referencia é anterior ao comparado |
| compareTo(Date) | int         | Compara dois objetos Data                                    |
| equals(Date)    | boolean     | Checa se os objetos são iguais                               |
| getTime()       | long        | Retorna a data em milissegundos                              |
| setTime(long)   | void        | Define uma data com base em milissegundos                    |
| from(Instante)  | static Date | Define uma data com base em um instant                       |
| toInstant()     | Instant     | Retorna um instant com base em um Date                       |



#### Metodo: after() e before()

```
Date dataNoPassado = new Date(1513124807691L);
//	Tue Dec 12 22:26:47 BRST 2017

Date dataNoFuturo = new Date(1613124807691L);
//	Fri Feb 12 08:13:27 BRST 2021

//	Comparando se a dataNoPassado é posterior a dataNoFuturo
boolean isAfter = dataNoPassado.after(dataNoFuturo);
System.out.println(isAfter); //	false

//	Comparando se a dataNoPassado é anterior a dataNoFuturo
boolean isBefore = dataNoPassado.before(dataNoFuturo);
System.out.println(isBefore); //	true

```



#### Metodo: compareTo() e equals()

```
Date dataNoPassado = new Date(1513124807691L);
//	Tue Dec 12 22:26:47 BRST 2017

Date dataNoFuturo = new Date(1613124807691L);
Date mesmaDataNoFuturo = new Date(1613124807691L);
//	Fri Feb 12 08:13:27 BRST 2021

//	Comparando se as datas são iguais
boolean isEquals = dataNoFuturo.equals(mesmaDataNoFuturo);
System.out.println(isEquals); //	true

//	Comparando uma data com a outra
int compareCase1 = dataNoPassado,compareTo(dataNoFuturo) //	passado -> futuro	
int compareCase2 = dataNoFuturo,compareTo(dataNoPassado) //	futuro -> passado
int compareCase3 = dataNoFuturo,compareTo(mesmaDataNoFuturo) //	datas equivalentes

System.out.println(compareCase1); //	-1
System.out.println(compareCase2); //	1
System.out.println(compareCase3); //	0
```



#### Metodo: from() e toInstant()

- Classe **Instant**
  - Surgiu na JDK 1.8;
  - Imutável e Thread safe;
  - Modela um ponto instantâneo de uma linha do tempo;
  - Indicado para gravar marcações temporais em eventos da sua aplicação;

Como manipular uma classe `Instant`

```
import java.time.Instant;

public class Exemplo005 {
	
	public static void main(String[] args)	 {
		Date dataInicio = new Date(1513124807691L);
		System.out.println(dataInicio);
		// Tue Dec 12 22:26:47 BRST 2017
		
		Instant instant = dataInicio.toInstant();
		System.out.println(instant);
		//	2017-12-13T00:26:47.691Z
	}
}
```



## Parte 2: java.util.Calendar

Na JDK 1.1 foi observada a necessidade de facilitar alguns recursos que a classe Date oferecia.

Sendo assim, a classe `Calendar` foi criada.

Com isso uma série de métodos e construtores da classe Date foi depreciada. Por exemplo o construtor **Date(int year, int month, int date)**.

`Calendar` é uma classe abstrata que provê métodos para converter data entre um instante especifico.

O `Calendar` possui alguns campos específicos para manipulação como: **MONTH**, **YEAR**, **HOUR** etc.

Capturando o instante atual com **Calendar**

```
import java.util.Calendar;

...
Calendar agora = Calendar.getInstance();
System.out.println(agora);
...
```

#### Manipulando datas

```
import java.util.Calendar;
...
Calendar agora = Calendar.getInstance();

System.out.println("A data corrente é: " + agora.getTime());
//	A data corrente é : Sun Jul 14 20:50:21 BRT 2019

agora.add(Calendar.DATE, -15);
System.out.println("15 dias atras: " + agora.getTime());
//	15 dias atras: Sat Jun 29 20:50:31 BRT 2019

agora.add(Calendar.MONTH, 4);
System.out.println("4 meses depois atras: " + agora.getTime());
//	4 meses depois atras: Tue Oct 29 20:50:11 BRT 2019

agora.add(Calendar.YEAR, 2);
System.out.println("2 anos depois: " + agora.getTime());
//	2 anos depois: Fri Oct 29 20:50:31 BRT 2021
...
```

#### Imprimindo datas e horas

Algumas maneiras de converter o resultado de um objeto `Calendar`

```
...
Calendar agora = Calendar.getInstance();

System.out.println("%tc\n", agora);
//	Dom Jul 14 20:58:11 BRT 2019

System.out.println("%tF\n", agora);
//	2019-07-14

System.out.println("%tD\n", agora);
//	07/14/19

System.out.println("%tr\n", agora);
//	08:58:11 PM

System.out.println("%tT\n", agora);
//	20:58:11
...
```



## Parte 3: java.text.DateFormat

Existem, basicamente, duas classes para formatação de datas. O `DateFormat` e o `SimpleDateFormat`. Ambos oferecem maneiras de formatar e parsear (Parse) a saída das datas.

O `DateFormat` tem uma implementação muito limitada, com apenas duas opções, um padrão longo ou curto. Exemplo de `DateFormat`:

```
import java.text.DateFormat;
import java.util.Date;
...
Date agora = new Date();

String dateToStr = DateFormat.getInstance().format(agora);
System.out.println(dateToStr);
//	14/07/19 22:40

dateToStr = DateFormat.getDateTimeInstance(DateFormat.LONG.DateFormat.SHORT).format(agora);
System.out.println(dateToStr);
//	14 de Julho de 2019 22:40
...
```

Já o `SimpleDateFormat` traz uma grande facilidade que é definir um padrão de formatação para a saída de data que desejar. 

Quando trata-se de formatação de datas, a classe `SimpleDateFormat` é mais usada, pois no seu construtor, quando instanciada, permite passar como argumento o formato da data desejada. Exemplo de `SimpleDateFormat`:

```
import java.text.SimpleDateFormat;
import java.util.Date;
...
Date agora new Date();

SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
String dataFormatada = formatter.format(agora);
System.out.println(dataFormatada);
//	14/07/2019
...
```

Tabela com as letras padrões definido:

| Letter | Date or Time Component                           | Presentation                                                 | Examples                                    |
| ------ | ------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------- |
| `G`    | Era designator                                   | [Text](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html#text) | `AD`                                        |
| `y`    | Year                                             | [Year](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html#year) | `1996`; `96`                                |
| `Y`    | Week year                                        | [Year](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html#year) | `2009`; `09`                                |
| `M`    | Month in year (context sensitive)                | [Month](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html#month) | `July`; `Jul`; `07`                         |
| `L`    | Month in year (standalone form)                  | [Month](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html#month) | `July`; `Jul`; `07`                         |
| `w`    | Week in year                                     | [Number](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html#number) | `27`                                        |
| `W`    | Week in month                                    | [Number](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html#number) | `2`                                         |
| `D`    | Day in year                                      | [Number](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html#number) | `189`                                       |
| `d`    | Day in month                                     | [Number](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html#number) | `10`                                        |
| `F`    | Day of week in month                             | [Number](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html#number) | `2`                                         |
| `E`    | Day name in week                                 | [Text](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html#text) | `Tuesday`; `Tue`                            |
| `u`    | Day number of week (1 = Monday, ..., 7 = Sunday) | [Number](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html#number) | `1`                                         |
| `a`    | Am/pm marker                                     | [Text](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html#text) | `PM`                                        |
| `H`    | Hour in day (0-23)                               | [Number](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html#number) | `0`                                         |
| `k`    | Hour in day (1-24)                               | [Number](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html#number) | `24`                                        |
| `K`    | Hour in am/pm (0-11)                             | [Number](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html#number) | `0`                                         |
| `h`    | Hour in am/pm (1-12)                             | [Number](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html#number) | `12`                                        |
| `m`    | Minute in hour                                   | [Number](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html#number) | `30`                                        |
| `s`    | Second in minute                                 | [Number](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html#number) | `55`                                        |
| `S`    | Millisecond                                      | [Number](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html#number) | `978`                                       |
| `z`    | Time zone                                        | [General time zone](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html#timezone) | `Pacific Standard Time`; `PST`; `GMT-08:00` |
| `Z`    | Time zone                                        | [RFC 822 time zone](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html#rfc822timezone) | `-0800`                                     |
| `X`    | Time zone                                        | [ISO 8601 time zone](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html#iso8601timezone) | `-08`; `-0800`; `-08:00`                    |



## Parte 4: Datas no Java 8+

O Java 8 veio com uma série de novidades para facilitar o trabalho com Datas.

E a grande melhoria está no pacote **java.time** que foi herdado do projeto **Joda Time**.

links: https://www.joda.org/joda-time/

Trabalhar com datas nunca foi tão fácil com esse novo pacote.
Nele destacam-se três classes:

- **LocalDate**;
- **LocalTime**;
- **LocalDateTime**;

Basicamente, o que tínhamos ate então eram as classes que vimos até agora: `Date` e `Calendar`.

Com o uso constante, elas se mostram confusas e trabalhosas. Além de serem mutáveis.

> Em programação orientada a objetos e funcional, um objeto **imutável** é um objeto no qual seu estado não pode ser modificado após ser criado. Ele é um contraste com um objeto **mutável**, que pode ser modificado após sua criação.



### LocalDate

É uma classe imutável para representar uma data. Seu formato padrão é **yyyy-MM-dd**

```
import java.time.LocalDate;
...
LocalDate hoje = LocalDate.now();
System.out.println(hoje);
//	2019-07-14

LocalDate ontem = hoje.minusDays(1); // minus Days = menos Dia = menos (X) dia
System.out.println(ontem);
//	2019-07-13
...
```



### LocalTime

É uma classe imutável que representa um padrão de hora-minuto-segundo. Pode ser representado até o nível de nanosegundos. Exemplo: **12:22:10:123212345**

Sua utilização é similar ao `LocalDate`

```
import java.time.LocalTime;
...
LocalTime agora = LocalTime.now();
System.out.println(agora);
//	23:53:58.421

LocalTime maisUmaHora = agora.plusHours(1);
System.out.println(maisUmaHora);
...
```



### LocalDateTime

funciona como uma espécie de junção entre o `LocalTime` e o `LocalDate`. Também é uma classe imutável e você consegue trabalhar com dia e hora de uma só vez.

Podemos manipular a data e hora com precisão de nanosegundos. Exemplo: **2nd October 2007 at 13:45.30.123456789**

```
import java.time.LocalDateTime;
...
LocalDateTime agora = LocalDateTime.now();
System.out.println(agora);
//	2019-07-15T00:02:16.076

LocalDateTime futuro = agora.plusHours(1).plusDays(2).plusSeconds(12); // Adiciona 1 hora, adiciona 2 dias, adiciona 12 segundos
System.out.println(futuro);
//	2019-07-17T01:02:28.076
...
```





## REFERÊNCIA

https://docs.oracle.com/javase/8/docs/api/java/util/Date.html

https://docs.oracle.com/javase/8/docs/api/java/lang/System.html#currentTimeMillis--

https://docs.oracle.com/javase/8/docs/api/javatime/instant.html

https://www.javatpoint.com/java-util-date

https://www.devmedia.com.br/trabalhando-com-as-classes-date-calendar-e-simpledateformat-em-java/27401

https://docs.oracle.com/javase/8/docs/api/java/text/DateFormat.html

https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html

https://docs.oracle.com/javase/8/docs/api/java/time/LocalTime.html

https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html

https://docs.oracle.com/javase/8/docs/api/java/time/LocalDateTime.html