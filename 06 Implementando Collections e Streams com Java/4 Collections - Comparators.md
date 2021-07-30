## Parte 5: Comparators

Uma interface de **comparação** é usada para ordenar os objetos de classes definidas pelo usuário. Um objeto **comparador** é capaz de comparar dois objetos de duas classes diferentes.

características:

- Algoritmos de ordenação
- Utilizado primeiramente em **java.util.List**
- Permite a ordenação de objetos complexos (criados pelo usuário)

Implementações:

- **java.util.Comparator** - Interface para definir classe com regra de ordenação.
- **java.util.Comparable** - Interface para definir regra de ordenação em uma classe de domínio.

Método de classe de coleções para classificar elementos de lista é usado para classificar os elementos de lista por um determinado comparador. 

```
// Para classificar uma determinada lista. ComparatorClass deve implementar
// Interface do comparador.
public void sort (List list, ComparatorClass c)
```



Na prática:

```
package one.digitalinnovation.Aula06.comparators;

public class Estudante implements Comparable<Estudante> {

    private final String nome;
    private final Integer idade;

    public Estudante(String nome, Integer idade) {
        this.nome = nome;
        this.idade = idade;
    }

    public String getNome() { return this.nome; }
    
    public Integer getIdade() { return this.idade; }

    @Override
    public String toString() { return (this.nome + " - " + this.idade); }

    @Override
    public int compareTo(Estudante estudante) { return this.getIdade() - estudante.getIdade(); }
}
```

```
package one.digitalinnovation.Aula06.comparators;

import java.util.Comparator;

public class EstudanteOrdemIdadeReversaComparator implements Comparator<Estudante> {

    @Override
    public int compare(Estudante estudante1, Estudante estudante2) {
        return estudante2.getIdade() - estudante1.getIdade();
    }
}
```

```
package one.digitalinnovation.Aula06.comparators;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class MainExempleList {

    public static void main(String[] args) {

        List<Estudante> estudante = new ArrayList<>();

        estudante.add(new Estudante("Pedro", 19));
        estudante.add(new Estudante("Carlos", 23));
        estudante.add(new Estudante("Mariana", 21));
        estudante.add(new Estudante("Joao", 18));
        estudante.add(new Estudante("Thiago", 20));
        estudante.add(new Estudante("George", 22));
        estudante.add(new Estudante("Larissa", 21));

        //  Exibe todos os estudantes
        System.out.println(estudante);
        //  [Pedro - 19, Carlos - 23, Mariana - 21, Joao - 18, Thiago - 20, George - 22, Larissa - 21]

        //  ordem natural dos numeros por Idade
        estudante.sort((first, second) -> first.getIdade() - second.getIdade());
        System.out.println(estudante);
        //  [Joao - 18, Pedro - 19, Thiago - 20, Mariana - 21, Larissa - 21, George - 22, Carlos - 23]

        //  ordem reversa dos numeros por Idade
        estudante.sort((first, second) -> second.getIdade() - first.getIdade());
        System.out.println(estudante);
        //  [Carlos - 23, George - 22, Mariana - 21, Larissa - 21, Thiago - 20, Pedro - 19, Joao - 18]

        //  Ordem natural dos numeros por idade por method reference
        estudante.sort(Comparator.comparingInt(Estudante::getIdade));
        System.out.println(estudante);
        //  [Joao - 18, Pedro - 19, Thiago - 20, Mariana - 21, Larissa - 21, George - 22, Carlos - 23]

        //  Ordem reversa dos numeros por idade por method reference
        estudante.sort(Comparator.comparingInt(Estudante::getIdade).reversed());
        System.out.println(estudante);
        //  [Carlos - 23, George - 22, Mariana - 21, Larissa - 21, Thiago - 20, Pedro - 19, Joao - 18]

        //  Ordem natural dos numeros por idade utilizando interface Comparable
        Collections.sort(estudante);
        System.out.println(estudante);
        //  [Joao - 18, Pedro - 19, Thiago - 20, Mariana - 21, Larissa - 21, George - 22, Carlos - 23]

        //  Ordem reversa dos numeros por idade utilizando interface Comparable
        Collections.sort(estudante, new EstudanteOrdemIdadeReversaComparator());
        System.out.println(estudante);
        //  [Carlos - 23, George - 22, Mariana - 21, Larissa - 21, Thiago - 20, Pedro - 19, Joao - 18]
    }
}
```

- `compareTo()` -  retorna um inteiro menor que zero, zero, ou maior que zero, caso um objeto seja "menor", igual ( **equals**), ou "maior" que outro objeto.





