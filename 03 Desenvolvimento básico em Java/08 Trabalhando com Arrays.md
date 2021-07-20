# Trabalhando com Arrays

**Objetivos da Aula**

1. O que é um array?
2. Declaração de arrays
3. Comprimento do arrays
4. Percorrendo arrays
5. Arrays multidimensionais



## Parte 1: O que é um array?

**Array** ou **Matriz**, é uma estrutura de dados que nos permite organizar valores na memoria. 

Elas Armazenam elementos do mesmo tipo, podendo ser unidimensionais ou multidimensionais.

Em Arrays

- Cada item é chamado de elemento;
- Cada elemento é acessado pela posição numérica (índice ou index);
- O índice inicia a partir de 0;
- Ao se declarar um array, todos índices são inicializados em 0;

Quando se cria um array, não se pode mudar de tamanho, no momento de sua criação, ela não poderá mudar de tamanho. Se for necessário mais espaço, será necessário cria uma nova array e, antes de referir ela, copie os elementos da array antiga.



## Parte 2: Declarando arrays

Exemplo de como declarar uma array

```
...
/* declarando array em branco */

int arraySize = 10;
dataType[] arrayName = new dataType[arraySize];

int meyArray = new int[7];

/* declarando array com informações já inclusas */

dataType[] arrayNameComValore = {value0, value1, value2};

int[] meuArrayComValore = {12, 32, 54, 6, 8, 89, 64};
...
```

Para alterar ou adicionar um valor em um elemento especifico, coloque o índice (index) desse elemento

```
...
meuArray[5] = 50;
meuArrayComValore[3] = 17
// O indice 3 em meuArrayComValore era 6, agora passara a ser 17
...
```



## Parte 3: Comprimento do array

Para descobrir quantos elementos um array possui, utilize a propriedade `length`

```
System.out.println(meuArray.length);
```



## Parte 4: Percorrendo um array

Para manipular / processar um array, devemos usar um laço de repetição por exemplo: `for`, `for each` etc.

```
...
int[] meuArray = {12, 32, 54, 6, 8, 89, 64};
for (int i=0; i<7; i++) {
	System.out.println(meuArray[i]);
}
...
```

No exemplo acima, foi utilizado uma variável de controle (contador), que vai de 0 até o numero de posições do array.



## Parte 5: Arrays multidimensionais

Um array multidimensional é um array contendo um ou mais arrays internos

```
...
int[][] meuArrayMulti = { {1, 2, 3, 4}, {5, 6, 7} };
...
```

No exemplo acima, a variável `meuArrayMulti` é um array com dois arrays como seus elementos.

Para percorrer um array multidimensional:

```
...
int[][] meuArrayMulti = { {1, 2, 3, 4}, {5, 6, 7} };
for (int i=0; i<meuArrayMulti.length; ++i) {
	for (int j=0; j<meuArrayMulti[i].length; ++j) {
		System.out.println(meuArray[i][j]);
	}
}
...
```

