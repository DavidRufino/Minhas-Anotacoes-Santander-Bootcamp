# Novidades do Java 10



## Aplicando os novos releases da linguagem na prática I

```
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.stream.Collectors;

...
	URL url = new URL("https://docs.oracle.com/javase/10/language/");
	URLConnection urlConnection = url.openConnection();
	BufferedReader buffredReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
	System.out.println(buffredReader.lines().collect(Collectors.joining()).replaceAll(">", ">\n"));
...
```



## Aplicando os novos releases da linguagem na prática II

O Java SE 10 introduziu em Março de 2018, a **inferência de tipos** para variáveis locais. Anteriormente, declarar uma variável local requer uma declaração de tipo manifesto, ou seja, explicita. Agora, a inferência de tipo permite que o compilador escolha o tipo estático da variável, com base no tipo do inicializador:

```
var names = new ArrayList<String>();
```

- **var** não pode ser utilizado em nível de classe.
- **var** não pode ser utilizado como parâmetro.
- **var** não pode ser utilizada em variáveis locais não inicializadas;

```
...
public static void main(String[] args) {
	printarSoma(5, 5, 5);
}

public static void printarSoma(int... numeros) {
	int soma;
	if (numeros.length > 0) {
		soma = 0;
		for (int numero = 0; numero < numeros.length; numero++) {
			soma+=numeros[numero];
		}
		
		System.out.println("A soma é: " + soma);
	}
}
...
```



# Referencias

Oracle. **Java Platform, Standard Edition** - https://www.docs.oracle.com/javase/10/language/