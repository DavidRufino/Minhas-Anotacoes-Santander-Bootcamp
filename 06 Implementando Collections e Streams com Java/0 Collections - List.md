# Collections Parte 1 - List

**Objetivos da Aula**

1. Entender o uso da interface Java
2. Entender o uso da interface **java.util.Queue**
3. Entender o uso da interface **java.util.Set**
4. Entender o uso da interface **java.util.Map**



### java.util.List

Garante ordem de inserção, Permite adição, atualização, leitura e remoção sem regras adicionais e Permite ordenação através de comparators

**ArrayList** e **Vectors** implementam a interface List e usam **arrays (redimensionáveis dinamicamente)** para sua estrutura de dados interna, da mesma forma que usa um array comum.

```
package one.digitalinnovation.Aula06.list;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

public class ExemploList {

    public static void main(String[] args) {
        List<String> nomes = new ArrayList<>();

        // Adicionar item a nossa lista
        nomes.add("Carlos");
        nomes.add("Pedro");
        nomes.add("Juliana");
        nomes.add("Maria");
        nomes.add("Joao");

        System.out.println(nomes);
        //  [Carlos, Pedro, Juliana, Maria, Joao]

        //  Reordenamos a lista
        Collections.sort(nomes);    //  sortear a lista
        System.out.println(nomes);
        //  [Carlos, Joao, Juliana, Maria, Pedro]

        //  Atualizamos a lista pela posição (no caso: 2)
        nomes.set(2, "Larissa");
        System.out.println(nomes);
        //  [Carlos, Joao, Larissa, Maria, Pedro]

        //  Remover um item pela posição
        nomes.remove(4);
        System.out.println(nomes);
        //  [Carlos, Joao, Larissa, Maria]

        //  Remover pela identidade dele
        nomes.remove("Carlos");
        System.out.println(nomes);
        //  [Joao, Larissa, Maria]

        //  Obter um valor pela posição (no caso: 1)
        //  Se fosse posto uma posição que nao existe, abrira uma Exception: IndexOutOfBoundsException Index out of range ou Index Out of bounds of length
        String nome = nomes.get(1);
        System.out.println(nome);
        //  Larissa

        //  Obter o tamanho da lista
        int tamanhoDalista = nomes.size();
        System.out.println(tamanhoDalista);
        //  3

        //  Verifica se na List possui o item desejado, no caso o nome: Anderson
        boolean temAnderson = nomes.contains("Anderson");
        System.out.println("A lista possui o nome Anderson? " + temAnderson);
        //  A lista possui o nome Anderson? false

        //  Verifica se a lista esta vazia, retornando booleano
        boolean listaEstaVazia = nomes.isEmpty();
        System.out.println("A lista esta vazia? " + listaEstaVazia);
        //  A lista esta vazia? false

        //  Remove todos os itens de uma lista, limpando a lista
        nomes.clear();

        //  Verifica se a lista esta vazia, retornando booleano
        listaEstaVazia = nomes.isEmpty();
        System.out.println("A lista esta vazia? " + listaEstaVazia);
        //  A lista esta vazia? true

        // Adicionando novamente items a nossa lista
        nomes.add("Carlos");
        nomes.add("Pedro");
        nomes.add("Juliana");
        nomes.add("Maria");
        nomes.add("Joao");

        // Com a lista, é possiveu utilziar o forEach
        for (String nomeDoItem : nomes) {
            System.out.println("forEach: " + nomeDoItem);
            //  forEach: Carlos
            //  forEach: Pedro
            //  forEach: Juliana
            //  forEach: Maria
            //  forEach: Joao
        }

        //  Retorna um iterator na nossa String
        Iterator<String> iterator = nomes.iterator();

        while(iterator.hasNext()){
            System.out.println("while iterator: " + iterator.next());
            //  while iterator: Carlos
            //  while iterator: Pedro
            //  while iterator: Juliana
            //  while iterator: Maria
            //  while iterator: Joao
        }
    }
}

```

#### Method da List

- `.add()` - Adicionar item a nossa lista
- `Collections.sort()` - Reordenar a lista
- `.set()` - Atualizar a lista pela posição
- `.remove()` - Remover um item pela posição ou remover pela identidade.
- `.get()` - Obter um valor pela posição
- `.size()` - Obter o tamanho da lista
- `.contains()` - Retorno booleano caso a **lista** possua o item desejado.
- `.isEmpty()` - Retorno booleano. Verifica se a lista esta vazia
- `.clear()` - Remove todos os itens de uma lista, limpando a lista
- `.iterator()` - Permite a você percorrer elementos de uma coleção sem expor as representações dele, usado com **while**



