## Parte 6: Optional

Pode ajudar a escrever um código limpo sem usar muitas verificações de nulos. Usando **Opcional**, podemos especificar valores alternativos para retornar ou código alternativo para executar. Isso torna o código mais legível porque os fatos que estavam ocultos agora são visíveis para o desenvolvedor.

características:

- Tratamento para valores que podem ser nulos
- Possui 2 estados: **Presente** e **Vazio**
- Permite que você execute operações em valores que podem ser nulos sem preocupação com as famosas **NullPointerExceptions**



#### Optional Estados

```
package one.digitalinnovation.Aula06.optionals;

import java.util.Optional;

public class ExemploOptionalEstados {

    public static void main(String[] args) {

        Optional<String> optionalString = Optional.of("Valor presente");
        System.out.println("Valor opcional que está presente");
        optionalString.ifPresentOrElse(System.out::println, () -> System.out.println("não esta presente"));

        Optional<String> optionalNull = Optional.ofNullable(null);
        System.out.println("Valor opcional que não está presente");
        optionalNull.ifPresentOrElse(System.out::println, () -> System.out.println("null = não está presente"));

        Optional<String> emptyOptional = Optional.empty();
        System.out.println("Valor opcional que não está presente");
        emptyOptional.ifPresentOrElse(System.out::println, () -> System.out.println("empty = não está presente"));

        Optional<String> optionalNullErro = Optional.of(null);
        System.out.println("Valor opcional que lanã erro NUllPointerException");
        optionalNullErro.ifPresentOrElse(System.out::println, () -> System.out.println("erro = não está presente"));
    }
}
```



#### Optional Primitivos

```
package one.digitalinnovation.Aula06.optionals;

import java.util.Optional;
import java.util.OptionalDouble;
import java.util.OptionalInt;
import java.util.OptionalLong;

public class ExemploOptionalPrimitivos {

    public static void main(String[] args) {

        //  Valor inteiro opcional
        OptionalInt.of(12).ifPresent(System.out::println);

        //  Valor decimal opcional
        OptionalDouble.of(55.2).ifPresent(System.out::println);

        //  Valor longo opcional
        OptionalLong.of(23L).ifPresent(System.out::println);
    }
}
```



#### Optional

```
package one.digitalinnovation.Aula06.optionals;

import java.util.Optional;

public class ExemploOptional {

    public static void main(String[] args) {

        Optional<String> optionalString = Optional.of("Valor opcional");

        System.out.println(optionalString.isPresent());

        optionalString.ifPresent(System.out::println);

        optionalString.ifPresentOrElse(System.out::println, () -> System.out.println("Valor não está presente"));

        if (optionalString.isPresent()) {
            String valor = optionalString.get();
            System.out.println(valor);
        }

        optionalString.map((valor) -> valor.concat("****")).ifPresent(System.out::println);
        optionalString.orElseThrow(IllegalStateException::new);
    }
}
```
