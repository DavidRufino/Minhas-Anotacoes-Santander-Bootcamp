## Parte 7: Stream API

É usado para processar coleções de objetos. Um fluxo é uma sequência de objetos que oferece suporte a vários métodos que podem ser canalizados para produzir o resultado desejado.

características:

- Manipulação de coleção com o paradigma funcional de forma paralela;
- Imutável - Não altera a coleção origem, sempre cria uma nova coleção;
- Principais funcionalidades:
  - `Mapping` - Retorna uma coleção com mesmo tamanho da origem com os elementos alterados
  - `Filtering` - Retorna uma coleção igual ou menor que a coleção origem, com os elementos intactos;
  - `ForEach` - Executa uma determinada lógica para cada elemento, retornando nada;
  - `Peek` - Executa uma determinada lógica para cada elemento, retornando a própria coleção;
  - `Counting` - Retorna um inteiro que representa a contagem de elementos;
  - `Grouping` - Retorna uma coleção agrupada de acordo com a regra definida;



Na prática:

```
package one.digitalinnovation.Aula06.steam;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

public class ExemploUtilizandoStreamAPI {

    public static void main(String[] args) {

        List<String> estudantes = new ArrayList<>();

        //  Adiciona 4 estudantes para a coleção
        estudantes.add("Pedro");
        estudantes.add("Thayse");
        estudantes.add("Marcelo");
        estudantes.add("Carla");
        estudantes.add("Juliana");
        estudantes.add("Thiago");
        estudantes.add("Rafael");

        //  Retorna a contagem de elementos do stream
        System.out.println("Contagem: " + estudantes.stream().count());
        //  Contagem: 7

        //  Retorna o elemento com maior numero de letras
        System.out.println("Maior numero de letras: " + estudantes.stream().max(Comparator.comparingInt(String::length)));
        //  Maior numero de letras: Optional[Marcelo]

        //  Retorna o elemento com menor numero de letras
        System.out.println("Menor numero de letras: " + estudantes.stream().min(Comparator.comparingInt(String::length)));
        //  Menor numero de letras: Optional[Pedro]

        //  Retorna os elementos que tem a letra R no nome
        System.out.println("Com a letra R no nome: " + estudantes.stream().filter((estudante) -> estudante.toLowerCase().contains("r")).collect(Collectors.toList()));
        //  Com a letra R no nome: [Pedro, Marcelo, Carla, Rafael]

        //  Retorna uma nova coleção, com os nomes concatenados a quantidade de letra de cada nome
        System.out.println("Retorna uma nova coleção com a quantidade de letras: " + estudantes.stream().map(estudante -> estudante.concat(" - ").concat(String.valueOf(String.valueOf(estudante.length())))).collect(Collectors.toList()));
        //  Retorna uma nova coleção com a quantidade de letras: [Pedro - 5, Thayse - 6, Marcelo - 7, Carla - 5, Juliana - 7, Thiago - 6, Rafael - 6]

        //  Retorna somente os 3 primeiros elementos da coleção
        System.out.println("Retorna os 3 primeiros elementos: " + estudantes.stream().limit(3).collect(Collectors.toList()));
        //  Retorna os 3 primeiros elementos: [Pedro, Thayse, Marcelo]

        //  Exibe cada elemento no console, e depois retorna a mesma coleção
        System.out.println("Retorna os elementos: " + estudantes.stream().peek(System.out::println).collect(Collectors.toList()));;
        //  Retorna os elementos: [Pedro, Thayse, Marcelo, Carla, Juliana, Thiago, Rafael]

        //  Exibe cada elemento no console sem retornar outra coleção
        System.out.println("Retorna os elementos novamente: ");
        estudantes.stream().forEach(System.out::println);
        //  Retorna os elementos novamente:
        //  Pedro
        //  Thayse
        //  Marcelo
        //  Carla
        //  Juliana
        //  Thiago
        //  Rafael

        //  Retorna true se todos os elementos possuem a letra W no nome
        System.out.println("Tem algum elemento com W no nome? " + estudantes.stream().allMatch((elemento) -> elemento.contains("W")));
        //  Tem algum elemento com W no nome? false

        //  Retorna true se algum dos elementos possuirem a letra A minuscula no nome
        System.out.println("Tem algum elemento com a minusculo no nome? " + estudantes.stream().anyMatch((elemento) -> elemento.contains("a")));
        //  Tem algum elemento com a no nome? true

        //  Retorna true se nenhum elemento possuem a letra A minuscula no nome
        System.out.println("Nao tem nenhum algum elemento com A minusculo no nome? " + estudantes.stream().noneMatch((elemento) -> elemento.contains("a")));
        //  Nao tem nenhum algum elemento com A minusculo no nome? false

        //  Retorna o primeiro elemento da colecao, se existir exibe no console
        System.out.println("Retorna o primeiro elemento da colecao: ");
        estudantes.stream().findFirst().ifPresent(estudante -> System.out.print(estudante));
        //  Retorna o primeiro elemento da colecao:
        //  Pedro

        //  Exemplo de operação encadeada
        System.out.println("Operacao encadeada: ");
        System.out.println(estudantes.stream()
                .peek(System.out::println)
                .map(estudante -> estudante.concat(" - ").concat(String.valueOf(estudante.length())))
                .peek(System.out::println)
                .filter((estudante) -> estudante.toLowerCase().contains("r"))
                .collect(Collectors.toList())
        );
        //  Operacao encadeada:
        //  Pedro
        //  Pedro - 5
        //  Thayse
        //  Thayse - 6
        //  Marcelo
        //  Marcelo - 7
        //  Carla
        //  Carla - 5
        //  Juliana
        //  Juliana - 7
        //  Thiago
        //  Thiago - 6
        //  Rafael
        //  Rafael - 6
        //  [Pedro - 5, Marcelo - 7, Carla - 5, Rafael - 6]

    }
}
```



# Referências

GeeksforGeeks. **Vector vs ArrayList in Java** - https://www.geeksforgeeks.org/vector-vs-arraylist-java/

Gabriel Machado. **O que é Queue?** - https://digitalinnovation.one/artigos/o-que-e-queue

Breno Guimarães. **Sets em Java** - https://digitalinnovation.one/artigos/sets-em-java

Devmedia. **Conhecendo a interface Map do Java** - https://www.devmedia.com.br/conhecendo-a-interface-map-do-java/37463

Jéf Bueno. **Diferença hashmap e arraylist** - https://pt.stackoverflow.com/questions/210401/diferen%C3%A7a-hashmap-e-arraylist

GeeksforGeeks. **Comparator Interface in Java with Examples** - https://www.geeksforgeeks.org/comparator-interface-java/

GeeksforGeeks. **Java 8 Optional Class** - https://www.geeksforgeeks.org/java-8-optional-class/

GeeksforGeeks. **Stream In Java** - https://www.geeksforgeeks.org/stream-in-java/