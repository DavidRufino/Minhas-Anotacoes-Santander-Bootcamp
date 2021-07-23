# Por dentro da modularização do Java





## Entendendo o que é a modularização por meio do Jigsaw



### Parte 1: Jigsaw

Há muito tempo se diz sobre modularizar a plataforma Java. É um plano que começou desde antes do Java 7, foi uma possibilidade no Java 8 e por fim, para permitir mais tempo de desenvolvimento, revisão e testes, foi movido para o Java 9.

O Projeto **Jigsaw**, como foi chamado, é composto por uma serie de JEPs. Algumas delas inclusive já disponíveis no Java 8, como os conhecidos Compact Profiles. A ideia por trás do projeto não é só criar um sistema de módulos, que poderemos usar em nossos projetos, mas também aplicá-lo em toda a plataforma e JDK em busca de melhor organização e desempenho.

Por padrão, todo sistema modular já vem com o modulo **java.base**. contendo a String e todo **java.lang**, **java.io**, **java.util** e demais pacotes muitas vezes essências para a esmagadora maioria dos projetos.



## Iniciando um projeto com Java Modular



#### package digital.innovation.one.core

```
//	arquivo: Runner.java
import digital.innovation.one.utils.Calculadora;

public class Runner {

    /*
        Com o conceito de modularização do java (module-info.java),
        não é mais possivel visualizar as operações da pasta 'internal' e a class Calculadora do projeto utils.
        Sera visivel apenas SE o projeto utils 'autorizar' este projeto utilizar a class dela.
     */
    public static void main(String[] args) {
        Calculadora calculadora = new Calculadora();
        System.out.println(calculadora.sum(1, 4));
    }
}

```

```
//	arquivo: module-info.java

module digital.innovation.one.core {
	// requerer o que esta contido neste endereco
    requires digital.innovation.one.utils; 
}
```

Na classe `Runner` acima, com o conceito de **modularização do Java** (module-info.java) não é mais possível visualizar as operações da pasta 'internal' e a classe `Calculadora` , sendo necessário configurar o module-info.java deste projeto com **requires**, e configurar o module-info.java do projeto abaixo que esta a classe  `Calculadora` com **exports**.



#### package digital.innovation.one.utils

```
//	arquivo: internal/

@FunctionalInterface
public interface Operacao {
    int execute(int a, int b);
}

public class SumHelper implements Operacao {

    @Override
    public int execute(int a, int b) {
        return (a + b);
    }
}

public class SubHelper implements Operacao {

    @Override
    public int execute(int a, int b) {
        return (a - b);
    }
}

public class MultHelper implements Operacao {

    @Override
    public int execute(int a, int b) {
        return (a * b);
    }
}

public class DivHelper implements Operacao {

    @Override
    public int execute(int a, int b) {
        return (a / b);
    }
}
```

```
//	arquivo: Calculadora.java

import digital.innovation.one.utils.internal.DivHelper;
import digital.innovation.one.utils.internal.MultHelper;
import digital.innovation.one.utils.internal.SubHelper;
import digital.innovation.one.utils.internal.SumHelper;

public class Calculadora {

    private DivHelper divHelper;
    private MultHelper multHelper;
    private SubHelper subHelper;
    private SumHelper sumHelper;

    //  Construtor
    public Calculadora() {
        divHelper = new DivHelper(); // Instanciando
        multHelper = new MultHelper(); // Instanciando
        subHelper = new SubHelper(); // Instanciando
        sumHelper = new SumHelper(); // Instanciando
    }

    /* Delegamos o comportamentos para outros metodos */
    public int div(int a, int b) {
        return divHelper.execute(a,b); // chamar DivHelper porque é ele que sabera executar
    }

    public int mult(int a, int b) {
        return multHelper.execute(a,b); // chamar MultHelper porque é ele que sabera executar
    }

    public int sub(int a, int b) {
        return subHelper.execute(a,b); // chamar SubHelper porque é ele que sabera executar
    }

    public int sum(int a, int b) {
        return sumHelper.execute(a,b); // chamar SumHelper porque é ele que sabera executar
    }

}
```

```
//	arquivo: module-info.java

module digital.innovation.one.utils {
	// deixar visualizar apenas o conteudo contido nesta pasta APENAS PARA digital.innovation.one.core
    exports digital.innovation.one.utils to digital.innovation.one.core;
}
```

