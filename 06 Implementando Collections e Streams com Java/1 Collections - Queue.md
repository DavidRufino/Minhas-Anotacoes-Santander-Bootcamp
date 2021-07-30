## Parte 2: Queue

**Queue** garante ordem de inserção, Permite: adição, leitura e remoção considerando a regra básica de uma fila: de *Estrutura de Dado* do tipo **FIFO** - Primeiro que entra, primeiro que sai. 

**Queue** também não permite mudança de ordenação e, caso queira alterar algum elemento da lista, precisara remover o elemento da lista, fazer sua alteração e adiciona-lo novamente a lista, onde ele pegara uma nova posição.

Implementações:

- **java.util.LinkedList**

```
package one.digitalinnovation.Aula06.queue;

import java.util.LinkedList;
import java.util.Queue;

public class ExemploLinkedlist {

    public static void main(String[] args) {

        Queue<String> filaBanco = new LinkedList<>();

        //  Banco abril
        //  Pessoas entrando na fila
        filaBanco.add("Patricia");
        filaBanco.add("Roberto");
        filaBanco.add("Flavia");
        filaBanco.add("Pamela");
        filaBanco.add("Anderson");

        System.out.println(filaBanco);
        //  [Patricia, Roberto, Flavia, Pamela, Anderson]

        //  A Patricia foi a primeira a chegar na fila
        //  Logo, ela sera a primeira a ser atendida pelo Banco

        // Vamos obter o primeiro elemento da fila do Banco
        String clienteASerAtendido = filaBanco.poll();
        System.out.println("Primeiro da fila: " + clienteASerAtendido);
        //  Primeiro da fila: Patricia

        //  Note que agora, Patricia foi removida da fila, agora a fila possuo um elemento a menos
        System.out.println(filaBanco);
        // [Roberto, Flavia, Pamela, Anderson]

        //  Obter o primeiro elemento da fila do Banco sem remove-lo
        String primeiroCliente = filaBanco.peek();
        System.out.println("Agora quem e o Primeiro da fila? " + primeiroCliente);
        // Agora quem e o Primeiro da fila? Roberto

        filaBanco.clear();

        //  Obter o primeiro elemento da fila, se nao houver, uma Exception NoSuchElementException sera lancada
        String primeiroClienteOuErro = filaBanco.element();
        System.out.println("Ha pessoas na fila? " + primeiroClienteOuErro);
    }
}
```



- `.pool()` - Para retornar o primeiro elemento da fila e o remover usamos o método.
- `.peek()` - retorna o primeiro elemento da fila, sem remove-lo.
- `.element()` - também retorna o primeiro elemento da fila sem remove-lo mas com a diferença de que caso a fila esteja vazia ele retornará uma exceção do tipo `NoSuchElementException`.
- `.size()` -  retorna o tamanho da fila.
- `.isEmpty()` - verifica se a fila está vazia retornando `true` ou `false`.
- `.clear()` - removendo todos os seus elementos.
- `Collections.sort()` - ocorrerá um erro de compilação, pois **a fila ou Queue não permite alteração na sua ordem**.



