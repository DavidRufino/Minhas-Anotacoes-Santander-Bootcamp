## Parte 3: Set

A classe **Set** herda comportamentos da **java.util.collection**, as principais características dos sets e suas implementações são:

Como herdam da classe **Collection**, implementam também seus métodos tais como: `add`, `remove`, `size`, `contains`, `clear`, `isEmpty  `entre outros.

características:

- por padrão, não garante a ordem de inserção.
- não permite itens repetidos
- permite adição e remoção. Não possui busca por item e atualização. Para a leitura, apenas navegação.
- não permite mudança de ordenação.

Implementações:

- **java.util.HashSet**
- **java.util.TreeSet**
- **java.util.LinkedHashSet**

![](D:\Users\David Rufino\Documents\Estudo, Escola\Cursos\Bootcamp Santander FullStack\06 Implementando Collections e Streams com Java\img\20210725210625.png)



#### HashSet

É a implementação mais comum de um Set e é conhecido por ser performático e não permitir valores repetidos. Pode ser usado onde a ordenação não é importante.

Construtor:

```
Set<Double> notas = new HashSet<>();
```

```
package one.digitalinnovation.Aula06.set;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

public class ExemploHashSet {

    public static void main(String[] args) {

        Set<Double> notasAlunos = new HashSet<>();

        //  Adiciona as notas no set
        notasAlunos.add(7.8);
        notasAlunos.add(8.8);
        notasAlunos.add(6.3);
        notasAlunos.add(10.0);
        notasAlunos.add(9.1);
        notasAlunos.add(8.1);
        notasAlunos.add(7.1);
        notasAlunos.add(7.9);

        System.out.println(notasAlunos);
        //  [9.1, 8.1, 10.0, 7.9, 6.3, 7.1, 8.8, 7.8]

        //  Remove a nota do set
        notasAlunos.remove(6.3);
        System.out.println(notasAlunos);
        //  [9.1, 8.1, 10.0, 7.9, 7.1, 8.8, 7.8]

        //  Retorna a quantidade de itens do set
        int quantidadeDeNotasRegistradas = notasAlunos.size();
        System.out.println(quantidadeDeNotasRegistradas);
        //  7

        //  Percorrer toda notasAlunos
        for(Double nota : notasAlunos){
            System.out.println("for-proxima nota: " + nota);
            //  for-proxima nota: 9.1
            //  for-proxima nota: 8.1
            //  for-proxima nota: 10.0
            //  for-proxima nota: 7.9
            //  for-proxima nota: 7.1
            //  for-proxima nota: 8.8
            //  for-proxima nota: 7.8
        }
        //  OU usando iterator com while
        Iterator<Double> iterator = notasAlunos.iterator();

        while(iterator.hasNext()){
            System.out.println("while-proxima nota: " + iterator.next());
            //  while-proxima nota: 9.1
            //  while-proxima nota: 8.1
            //  while-proxima nota: 10.0
            //  while-proxima nota: 7.9
            //  while-proxima nota: 7.1
            //  while-proxima nota: 8.8
            //  while-proxima nota: 7.8
        }

        //  Limpar notasAlunos
        notasAlunos.clear();
        System.out.println(notasAlunos);
        //  []

    }
}
```



#### LinkedHashSet

Diferente do `HashSet`, mantem a ordenação de acordo com a ordem de inserção dos itens e por isso perde um pouco de performance.

Construtor:

```
LinkedHashSet<Integer> sequenciaNumerica = new LinkedHashSet<>();
```

```
package one.digitalinnovation.Aula06.set;

import sun.awt.image.ImageWatched;

import java.util.Iterator;
import java.util.LinkedHashSet;

public class ExemploLinkedHashSet {

    public static void main(String[] args) {

        LinkedHashSet<Integer> sequenciaDeNumero = new LinkedHashSet<>();

        //  Adicionar os elementos
        sequenciaDeNumero.add(1);
        sequenciaDeNumero.add(7);
        sequenciaDeNumero.add(12);
        sequenciaDeNumero.add(22);
        sequenciaDeNumero.add(54);

        System.out.println(sequenciaDeNumero);
        //  [1, 7, 12, 22, 54]

        //  Remover um elemento pela identidade
        sequenciaDeNumero.remove(12);
        System.out.println(sequenciaDeNumero);
        //  [1, 7, 22, 54]

        //  Quantos elementos possui na lista
        int qtdElementoNaLista = sequenciaDeNumero.size();
        System.out.println(qtdElementoNaLista);
        //  4

        //  Percorrer toda notasAlunos
        for(Integer numero : sequenciaDeNumero){
            System.out.println("for-proximo numero: " + numero);
            //  for-proximo numero: 1
            //  for-proximo numero: 7
            //  for-proximo numero: 22
            //  for-proximo numero: 54
        }
        //  OU usando iterator com while
        Iterator<Integer> iterator = sequenciaDeNumero.iterator();

        while(iterator.hasNext()){
            System.out.println("while-proximo numero: " + iterator.next());
            //  while-proximo numero: 1
            //  while-proximo numero: 7
            //  while-proximo numero: 22
            //  while-proximo numero: 54
        }

        boolean listaEstaVazia = sequenciaDeNumero.isEmpty();
        System.out.println("sequenciaDeNumero esta vazia? " + listaEstaVazia);
        //  sequenciaDeNumero esta vazia? false

    }
}
```



#### TreeSet

Funciona de uma maneira diferente dos demais por não estar em uma lista e sim em uma **árvore** binária.

Construtor:

```
TreeSet<String> treeCapitais = new TreeSet<>();
```

```
package one.digitalinnovation.Aula06.set;

import java.util.Iterator;
import java.util.TreeSet;

public class ExemploTreeSet {

    public static void main(String[] args) {

        TreeSet<String> treeCapitais = new TreeSet<>();

        //  Adicionando capitais a arvore treeCapitais
        treeCapitais.add("Rio de Janeiro");
        treeCapitais.add("Sao Paulo");
        treeCapitais.add("Belo Horizonte");
        treeCapitais.add("Bahia");
        treeCapitais.add("Curitiba");
        treeCapitais.add("Florianopolis");

        System.out.println(treeCapitais);
        //  [Bahia, Belo Horizonte, Curitiba, Florianopolis, Rio de Janeiro, Sao Paulo]

        //  Obter a primeira capital do topo da arvore: treeCapitais
        String nomeDoTopo = treeCapitais.first();
        System.out.println(nomeDoTopo);
        // Bahia

        //  Obter a ultima capital do final da arvore: treeCapitais
        String nomeDoFinal = treeCapitais.last();
        System.out.println(nomeDoFinal);
        //  Sao Paulo

        //  Obter a primeira capital abaixo da avore da capital de nome: Belo Horizonte
        String nomeAbaixo = treeCapitais.lower("Belo Horizonte");
        System.out.println(nomeAbaixo);
        //  Bahia

        //  Obter a primeira capital acima da avore da capital de nome: Belo Horizonte
        String nomeAAcima = treeCapitais.higher("Belo Horizonte");
        System.out.println(nomeAAcima);
        //  Curitiba

        //  Retornar novamente todas as capitais de treeCapitais
        System.out.println(treeCapitais);

        //  Obter a primeira capital no topo da arvore e a removendo do set
        String primeiraCapital = treeCapitais.pollFirst();
        System.out.println(primeiraCapital);
        //  Bahia

        //  Obter a primeira capital do final da arvore e a removendo do set
        String ultimaCapital = treeCapitais.pollLast();
        System.out.println(ultimaCapital);
        //  Sao Paulo

        //  Percorrer toda treeCapitais
        for(String capital : treeCapitais){
            System.out.println("for-proxima capital: " + capital);
            //  for-proximo numero: 1
            //  for-proximo numero: 7
            //  for-proximo numero: 22
            //  for-proximo numero: 54
        }
        //  OU usando iterator com while
        Iterator<String> iterator = treeCapitais.iterator();

        while(iterator.hasNext()){
            System.out.println("while-proximo capital: " + iterator.next());
            //  while-proximo numero: 1
            //  while-proximo numero: 7
            //  while-proximo numero: 22
            //  while-proximo numero: 54
        }
    }
}

```

Por ser uma árvore binária, essa estrutura possui alguns métodos diferentes. Entre eles:

- `.first()`: Retorna a primeira capital no topo da árvore.
- `.last()`: Retorna a ultima capital abaixo na arvore.
- `.lower()`: Retorna a primeira capital abaixo na árvore da capital parametrizada.
- `.higher()`: Retorna a primeira capital acima na árvore da capital parametrizada.
- `.pollFirst()`: Retorna a primeira capital no topo da árvore, removendo do set.
- `.pollFirst()`: Retorna a primeira capital no final da árvore, removendo do set.



