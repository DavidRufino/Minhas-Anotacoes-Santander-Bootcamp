## Parte 4: Map

Essa interface é um objeto que mapeia valores para chaves, ou seja, através da chave consegue ser acessado o valor configurado, sendo que a chave não pode ser repetida ao contrário do valor, mas se caso tiver uma chave repetida é sobrescrito pela última chamada. Diferente das outras que armazena apenas um **valor**, a util.Map armazena dois valores, a **CHAVE** e o **VALOR** a ser armazenado.

características:

- Entrada de chave e valor
- Permite valores repetidos, mas não permite repetição de chave.
- Permite adição, busca por chave ou valor, atualização, remoção e navegação.
- Pode ser ordenado.
- não possui métodos da interface Collection.

Implementações:

- **java.util.HashMap** - Mais comum. Ela é a mais utilizada por questões de performance e pela sua consistência.
- **java.util.TreeMap** - Para criação de arvore binaria. Mantém uma ordem própria de ordenação.
- **java.util.HashTable** - Uma versão antiga do HashMap, sendo mais utilizada em cenários onde tem sincronização de threads. Atualmente não e mais tão utilizada. Ela garante a ordem de inserção.



#### HashMap

É um conjunto de pares de chave-valor, para cada elemento (valor) salvo num `HashMap` deve existir uma **chave única** atrelada a ele. Os elementos num `HashMap` devem ser acessados por suas chaves.

Construtor:

```
HashMap<Integer, String> hashMap = new HashMap<>();
// HashMap<CHAVE, VALOR>
```

```
package one.digitalinnovation.Aula06.map;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ExemploHashMap {

    public static void main(String[] args) {

        Map<String, Integer> campeoesMundialFifa = new HashMap<>();
        //  OU
        //Map<String, List<Object>> campeoesMundialFifa = new HashMap<>();

        //  Adicionar os campeoes mundias fifa no HashMap
        campeoesMundialFifa.put("Brasil", 5);
        campeoesMundialFifa.put("Alemanha", 4);
        campeoesMundialFifa.put("Italia", 4);
        campeoesMundialFifa.put("Uruguai", 2);
        campeoesMundialFifa.put("Argentina", 2);
        campeoesMundialFifa.put("Franca", 2);
        campeoesMundialFifa.put("Inglaterra", 1);
        campeoesMundialFifa.put("Espanha", 1);

        //  Listar todos os valores registrados
        System.out.println(campeoesMundialFifa);
        //  {Franca=2, Brasil=5, Argentina=2, Inglaterra=1, Uruguai=2, Espanha=1, Italia=4, Alemanha=4}

        //  Atualizar o valor apra a CHAVE: Brasil
        campeoesMundialFifa.put("Brasil", 6);
        System.out.println(campeoesMundialFifa);
        //  {Franca=2, Brasil=6, Argentina=2, Inglaterra=1, Uruguai=2, Espanha=1, Italia=4, Alemanha=4}

        //  Retorna o VALOR contido na CHAVE: Brasil
        System.out.println(campeoesMundialFifa.get("Brasil"));
        //  6

        //  Retornar se existe ou nao, um campeao de CHAVE: Franca
        System.out.println(campeoesMundialFifa.get("Franca"));
        //  2

        //  Remover os VALORES contido na CHAVE: Franca
        campeoesMundialFifa.remove("Franca");

        //  Retornar se existe ou nao, um campeao de CHAVE: Franca
        System.out.println(campeoesMundialFifa.containsKey("Franca"));
        //  false

        //  Retornar se existe ou não alguma seleção com hexa campea
        System.out.println(campeoesMundialFifa.containsValue(6));
        //  true

        //  Retornar o tamanho do mapa
        System.out.println(campeoesMundialFifa.size());
        //  7
    }
}
```

- `.put(CHAVE, VALOR)` - é usado para inserir um mapeamento em um mapa. Isso significa que podemos inserir uma chave específica e o valor para o qual ela está mapeando em um mapa específico. Se uma chave existente for passada, o valor anterior será substituído pelo novo valor. Se um novo par for passado, o par será inserido como um todo.
- `.containsKey()` - é usado para verificar se uma chave específica está sendo mapeada para o HashMap ou não. Ele pega o elemento-chave como parâmetro e retorna True se esse elemento estiver mapeado no mapa.
- `.containsValue()` - é usado para verificar se um determinado valor está sendo mapeado por uma ou mais chaves no HashMap. Ele pega o valor como um parâmetro e retorna True se esse valor for mapeado por qualquer uma das chaves no mapa.



#### TreeMap

É uma implementação baseada em árvore que pode armazenar dados de valor-chave em ordem de classificação com eficiência . É similar à HashMap mas tem algumas diferenças.

Construtor:

```
TreeMap<String, String> treeMap = new TreeMap<>();
//	TreeMap<CHAVE, VALOR>
```

```
package one.digitalinnovation.Aula06.map;

import java.util.Iterator;
import java.util.Map;
import java.util.TreeMap;

public class ExemploTreeMap {

    public static void main(String[] args) {

        TreeMap<String, String> treeCapitais = new TreeMap<>();

        //  Montar a arvore com as capitais
        treeCapitais.put("RS", "Porto Alegre");
        treeCapitais.put("RJ", "Florianopolis");
        treeCapitais.put("PR", "Curitiba");
        treeCapitais.put("SP", "Sao Paulo");
        treeCapitais.put("RJ", "Rio de Janeiro");
        treeCapitais.put("BH", "Belo Horizonte");

        //  Exibe todas as capitais
        System.out.println(treeCapitais);
        //  {BH=Belo Horizonte, PR=Curitiba, RJ=Rio de Janeiro, RS=Porto Alegre, SP=Sao Paulo}

        //  Retorna a primeira capital no topo da arvore
        System.out.println(treeCapitais.firstKey());
        //  BH

        //  Retorna a ultima capital no final da arvore
        System.out.println(treeCapitais.lastKey());
        //  SP

        //  Retorna a primeira capital abaixo na arvore da capital parametrizada
        System.out.println(treeCapitais.lowerKey("SC"));
        //  RS

        //  Retorna a primeira capital acima na arvore da capital parametrizada
        System.out.println(treeCapitais.higherKey("SC"));
        //  SP

        //  Retorna a primeira capital no topo da arvore
        System.out.println(treeCapitais.firstEntry().getKey() + " - " + treeCapitais.firstEntry().getValue());
        //  BH - Belo Horizonte

        //  Retorna a primeira capital no final da arvore
        System.out.println(treeCapitais.lastEntry().getKey() + " - " + treeCapitais.lastEntry().getValue());
        //  SP - Sao Paulo

        //  Retorna a primeira capital abaixo na arvore da capital parametrizada
        System.out.println(treeCapitais.lowerEntry("SC").getKey() + " - " + treeCapitais.lowerEntry("SC").getValue());
        //  RS - Porto Alegre

        //  Retorna a primeira capital acima na arvore da capital parametrizada
        System.out.println(treeCapitais.higherEntry("SC").getKey() + " - " + treeCapitais.higherEntry("SC").getValue());
        //  SP - Sao Paulo

        Map.Entry<String, String> firstEntry = treeCapitais.pollFirstEntry();
        Map.Entry<String, String> lastEntry = treeCapitais.pollLastEntry();

        //  Retorna a primeira capital no topo da arvore, removendo do map
        System.out.println(firstEntry.getKey() + " - " + firstEntry.getValue());
        //  BH - Belo Horizonte

        //  Retorna a primeira capital no final da arvore, removendo do map
        System.out.println(lastEntry.getKey() + " - " + lastEntry.getValue());
        //  SP - Sao Paulo

        //  Exibe todas as capitais
        System.out.println(treeCapitais);
        //  {PR=Curitiba, RJ=Rio de Janeiro, RS=Porto Alegre}

        //  Percorrer toda treeCapitais
        for(String capital : treeCapitais.keySet()){
            System.out.println("for-proxima capital: " + capital + " - " + treeCapitais.get(capital));
            //  for-proxima capital: PR - Curitiba
            //  for-proxima capital: RJ - Rio de Janeiro
            //  for-proxima capital: RS - Porto Alegre
        }
        //  OU usando iterator com while
        Iterator<String> iterator = treeCapitais.keySet().iterator();

        while(iterator.hasNext()) {
            System.out.println("while-proximo capital: " + iterator.next());
            //  while-proximo capital: PR
            //  while-proximo capital: RJ
            //  while-proximo capital: RS
        }
    }
}
```

- `.firstKey()` - Retorna a **primeira (mais baixa)** chave atualmente no mapa.
- `.firstEntry()` - Retorna um **mapeamento de valor-chave associado à menor chave** neste mapa, ou nulo se o mapa estiver vazio.
- `.lastKey()` - Retornar a última (mais alta) chave atualmente neste mapa.
- `.lastEntry()` - Retornar o mapeamento de valor-chave associado à maior chave neste mapa, ou nulo se o mapa estiver vazio.
- `.lowerKey()` - Retornar a maior chave estritamente menor do que a chave fornecida, passada como parâmetro.
- `.higherKey()` - Retornar a chave mínima estritamente maior do que a chave fornecida, ou null se não houver tal chave.
- `.lowerEntry()` - Retornar um mapeamento de valor-chave associado à maior chave estritamente menor do que a chave fornecida, ou null se não houver essa chave.
- `.higherEntry()` - Retornar um mapeamento de valor-chave associado à menor chave estritamente maior do que a chave fornecida, ou nulo se não houver tal chave.

#### HashTable

Implementa uma tabela Hash, que mapeia chaves para valores. Qualquer objeto não nulo pode ser usado como chave ou valor. Para armazenar e recuperar objetos de uma tabela de hash com êxito, os objetos usados como chaves devem implementar o método hashCode e o método equals.  

Construtor:

```
Hashtable<String, Integer> hashTable = new Hashtable<>();
//	Hashtable<CHAVE, VALOR>
```

```
package one.digitalinnovation.Aula06.map;

import java.util.Hashtable;

public class ExemploHashTable {

    public static void main(String[] args) {

        Hashtable<String, Integer> estudantes = new Hashtable<>();

        estudantes.put("Carlos", 21);
        estudantes.put("Mariana", 33);
        estudantes.put("Rafaela", 18);
        estudantes.put("Pedro", 44);

        //  Exibe todos os estudantes
        System.out.println(estudantes);
        //  {Carlos=21, Pedro=44, Mariana=33, Rafaela=18}

        //  Atualizar o VALOR de CHAVE: Pedro
        estudantes.put("Pedro", 55);
        System.out.println(estudantes);
        //  {Carlos=21, Pedro=55, Mariana=33, Rafaela=18}

        //  Remover os VALORES contido na CHAVE: Pedro
        estudantes.remove("Pedro");
        System.out.println(estudantes);
        //  {Carlos=21, Mariana=33, Rafaela=18}

        int idadeDoEstudante = estudantes.get("Rafaela");
        System.out.println(idadeDoEstudante);
        //  18

        //  Navega nos registro do mapa
        for (String chave : estudantes.keySet()) {
            System.out.println(chave + " - " + estudantes.get(chave));
            //  Carlos - 21
            //  Mariana - 33
            //  Rafaela - 18
        }
    }
}
```





