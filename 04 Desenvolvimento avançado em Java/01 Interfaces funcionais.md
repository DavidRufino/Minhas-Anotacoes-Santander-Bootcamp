# Interfaces funcionais

**Objetivos da Aula**

1. Entender o Paradigma Funcional no Java
2. Aprender como utilizar uma lambda e API Lambda do Java 8;



## Facilitando o código da API



### Parte 1: Função de Alta Ordem

É uma função que recebe ou retorna uma função como **parâmetro**.

Exemplo mostra o uso de **Paradigma Funcional** com **Função de Alta Ordem**:

```
// arquivo: aula2/FuncaoAltaOrdem.java

public class FuncaoAltaOrdem {

	public static void main(String[ ] args) {
        Calculo soma = (a,b) -> a+b;
		System.out.println(executarOperacao(soma, 1, 3));
    }

    public static int executarOperacao(Calculo calculo, int a, int b) {
		return calculo.calcular(a, b);
	}
}

// FunctionalInterface apenas diz: esta interface so permite um metodo, caso alguem tente por mais de um method, sera exibido um error.

@FunctionalInterface 
interface Calculo {
	public int calcular(int a, int b);
}
```

`main` - cria um comportamento utilizando **Paradigma Funcional** na **Interface** `Calculo`, que será **a+b**, e este comportamento será nominado de **soma**.

`executarOperacao` - Como o nome já diz, ele executará a **Parâmetro** `Calculo`  enviando os valores **a** e **b** para `calcular` e retornara com o resultado do comportamento que foi dado.

```
...
Calculo soma = (a,b) -> a+b;
Calculo subtracao = (a,b) -> a-b;
Calculo divisao = (a,b) -> a/b;
Calculo mult = (a,b) -> a*b;
...
```

o exemplo acima demonstra varias possibilidades para calculo



### Parte 2: Consumer

Contém uma função que recebe um argumento e tem um retorno void.

```
import java.util.function.Consumer;

public class Consumidores {

	public static void main(String[] args) {
		
		Consumer<String> imprimirUmaFrase = System.out::println; 
		//	OU desta forma
		Consumer<String> imprimirUmaFrase2 = frase -> System.out.println("Hello " + frase);
		
		imprimirUmaFrase.accept("world"); // exemplo de imprimirUmaFrase
        imprimirUmaFrase2.accept("world"); // exemplo de imprimirUmaFrase2
	}
}
```

`::` - é basicamente um atalho caso vc queira passar uma referencia para um método que já existe, oque simplifica a expressão.



### Parte 3: Function

Representa uma função que aceita um argumento e produz um resultado.

`Function<Entrada, Retorno>`

```
import java.util.function.Function;

public class Funcoes {
	
	public static void main(String[] args) {
		Function<String, String> retornarNomeAoContrario = texto -> new StringBuilder(texto).reverse().toString();
		System.out.println(retornarNomeAoContrario.apply("Joao"));

		Function<String, Integer> converterStringParaInteiroECalculaODobro = string -> Integer.valueOf(string) * 2;
		System.out.println(converterStringParaInteiroECalculaODobro.apply("17"));
	}
}
```



### Parte 4: Predicate

É uma interface com uma função que recebe um argumento e retorna um boolean

```
import java.util.function.Predicate;

public class Funcoes {
	
	public static void main(String[] args) {
		Predicate<String> estaVazio = valor -> valor.isEmpty();
		System.out.println(estaVazio.test(""));
		System.out.println(estaVazio.test("Joao"));
	}
}
```



### Parte 5: Suppliers

É uma interface funcional, ela não aceita argumentos e retorna um resultado.

```
import java.util.function.Supplier;

public class Suppliers {
	
	public static void main(String[] args) {
	
		Supplier<Pessoa> instanciaPessoa = Pessoa::new;
		//	OU desta forma
		Supplier<Pessoa> instanciaPessoa = () -> new Pessoa();
		
		System.out.println(instanciaPessoa.get());
		//	nome: Joao, idade: 23
	}
}

public class Pessoa {
	private String nome;
	private Integer idade;
	
	public Pessoa() {
		this.nome = "Joao";
		this.idade = 23;
	}
	
	@Override
	public String toString() {
		/*	
			Se nao sobrescrever este method String 
			quando for dar por exemplo: System.out.println
			ele iria me retornar um valor exp.: Pessoa@23fc625e
		*/
		return String.format("nome:  %s, idade: %d",nome, idade);
	}
}
```

O uso do **Suppliers** faz sentido quando se esta utilizando uma classe que auxilia no trabalho com listas, arrays e conjuntos.



## Iterações entre as funções



### Stream

Oferece ao desenvolvedor a possibilidade de trabalhar com conjuntos de elementos de forma mais simples e com um número menor de linhas de código. Isso se tornou possível graças à incorporação do **paradigma funcional**, combinado com as **expressões lambda**, o que facilita a manutenção do código e aumenta a eficiência no processamento devido ao uso de paralelismo.

```
import java.util.stream.Stream;
import java.util.stream.Collectors;

public class Iteracoes {
	
	public static void main(String[] args ) {
	
		String[] nomes = {"Joao", "Joao", "Paulo", "Oliveira", "Santos", "Instrutor", "Java"};
		Integer[] numeros = {1, 2, 3, 4, 5};
		
		imprimirNomeFiltrados(nomes);
		imprimirTodosNomes(nomes);
		imprimirODobroDeCadaItemDaLista(numeros);
	}
	
	public static void imprimirNomeFiltrados(String... nomes) {
	
		System.out.println("Metodo imprimirNomeFiltrados");
		
		String nomesParaImprimirDoFor = "";
		
		/* Metodo utilizando o laço FOR */
		for (int i = 0; i < nomes.length; i++) {
			if (nomes[i].equals("Joao")) {
				nomesParaImprimirDoFor += (" " + nomes[i]);
			}
		}
		System.out.println("FOR: " + nomesParaImprimirDoFor);
		//	FOR:  Joao Joao
		
		/* Metodo utilizando Stream */
		String nomesParaImprimirDaStream = Stream.of(nomes)
        .filter(nome -> nome.equals("Joao"))
        .collect(Collectors.joining());
		
		System.out.println("Stream: " + nomesParaImprimirDaStream);
		//	Stream: JoaoJoao
	}
	
	public static void imprimirTodosNomes(String... nomes) {
	
		System.out.println("Metodo imprimirTodosNomes");
	
		/* Metodo utilizando o FOR */
		for (String nome : nomes) {
			System.out.println("FOR: " + nome);
		}
		
		/* Metodo utilizando forEach */
		Stream.of(nomes).forEach(nome -> System.out.println("forEach: "+ nome));
		
	}
	
	public static void imprimirODobroDeCadaItemDaLista(Integer... numeros) {
	
		System.out.println("Metodo imprimirODobroDeCadaItemDaLista");
	
		for (Integer numero : numeros) {
			System.out.println("FOR: " +numero*2);
		}
		
		Stream.of(nomes).map(numero -> numero*2).forEach(numero -> System.out.println("forEach: " + numero))
	}
}
```

`[]` ou `...` - em Java são chamados de **Variable Arguments** ou **varargs** **.** Ele permite que o método aceite zero ou vários argumentos. Varargs é muito útil se você não sabe quantos argumentos terá que passar no método.

`Stream` - o processamento é um pouco mais custoso se comparado ao `for`.

```
import java.util.stream.Stream;
import java.util.ArrayList;
import java.util.List;

...
List<String> lista = new ArrayList<>();
lista.add("Desenvolvedor");
lista.add("Testador");
lista.add("Gerente de projeto");
lista.add("Gerente de qualidade");

lista.stream()
.filter(profissao -> profissao.startsWith("Gerente"))
.forEach(System.out::println);
//	Gerente de projeto
//	Gerente de qualidade
...
```



# Bibliografia

Devmedia. **Java Streams API: manipulando coleções de forma eficiente** - https://www.devmedia.com.br/java-streams-api-manipulando-colecoes-de-forma-eficiente/37630