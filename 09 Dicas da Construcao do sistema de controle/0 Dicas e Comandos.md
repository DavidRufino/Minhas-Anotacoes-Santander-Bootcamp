| [Próxima Dicas de API REST com Spring Boot](https://github.com/DavidRufino/Minhas-Anotacoes-Santander-Bootcamp/blob/master/10%20Dicas%20de%20Desenvolvimento%20de%20API%20REST%20com%20Spring%20Boot/00%20Dicas%20de%20API%20REST%20com%20Spring%20Boot.md) |
| -----------------------------------------------------------: |

## Lombok

O plug-in **[Lombok](https://plugins.jetbrains.com/plugin/6317-lombok)** facilita na hora de construir as **classes de modelo** não sendo necessário gerar/criar os: **Getter and Setter**, **equals() and hashCode()** e os **Constructor** (com assinatura e sem assinatura). Só é preciso adicionar, em cima da class, as anotações:

- `@Getter` -  Permite que o **Lombok** gere o Getter padrão automaticamente
- `@Setter` - Permite que o **Lombok** gere o Setter padrão automaticamente
- `@AllArgsConstructor` - Gera construtores que aceitam argumentos
  - `@AllArgsConstructor(onConstructor = @__(@Autowired))` - colocará as anotações listadas no construtor gerado. O sublinhado duplo foi introduzido por causa dos problemas de compatibilidade com versões anteriores. De acordo com a documentação.
- `@NoArgsConstructor` -  Gera construtores que não aceitam argumentos
- `@EqualsAndHashCode` - Gera `hashCode`e `equals` que implementa a partir dos campos do seu objeto.
- `@Builder` - permite que você produza automaticamente o código necessário para que sua classe seja instanciada com códigos como:`Person.builder().name("Adam Savage").city("San Francisco").job("Mythbusters").job("Unchained Reaction").build();`
- `@Data` - é uma anotação atalho conveniente que agrupa as características de `@ToString`, `@EqualsAndHashCode`, `@Getter`/`@Setter` e `@RequiredArgsConstructor` em conjunto

**Gradle**

```
	//	Facilita na construção dos get e settes e construtor etc
	//	apenas adicionando Annotations @
	compileOnly 'org.projectlombok:lombok:1.18.10'
	annotationProcessor 'org.projectlombok:lombok'
```



## Swagger e SpringFox

Documentar sua **API REST** é muito importante. É uma interface pública, que outros módulos, aplicativos ou desenvolvedores podem usar. Mesmo que você não o exponha publicamente, ainda é importante. O código de **back-end** e **front-end** geralmente é trabalhado por desenvolvedores diferentes. Quem está criando a API geralmente não é quem a está consumindo. É, portanto, fundamental ter interface devidamente documentada para evitar confusão e mantê-la sempre atualizada.

No entanto, não é realista escrever tal documentação manualmente e mantê-la atualizada sempre que seu código for alterado. É aqui que o **SpringFox** entra em jogo. É uma integração Swagger para Spring Framework. Ele pode inspecionar automaticamente suas classes, detectar controladores, seus métodos, classes de modelo que eles usam e URLs para os quais são mapeados. Sem qualquer documentação manuscrita, ele pode gerar muitas informações sobre sua API apenas inspecionando classes em seu aplicativo. Quão legal é isso? Mais importante ainda, sempre que você fizer alterações, elas serão refletidas na documentação.

**Gradle**

```
	//	Dependencia para testes e documentação
	implementation group: 'io.springfox', name: 'springfox-swagger2', version: '2.9.2'
	implementation group: 'io.springfox', name: 'springfox-swagger-ui', version: '2.9.2'
```



## BigDecimal

**BigDecimal** é uma maneira exata de representar números imutável.

**Usamos \*BigDecimal\* para aritmética de alta precisão. Também o usamos para cálculos que requerem controle sobre a escala e comportamento de arredondamento** . Um exemplo são os cálculos que envolvem transações financeiras.

Se estiver lidando com dinheiro, ou se a precisão é uma obrigação, use `BigDecimal`. Caso contrário, `Doubles`tendem a ser bons o suficiente.



## JPA 

#### *@Embeddable* e *@EmbeddedId*

Em software, encontramos muitos casos de uso em que precisamos ter uma chave primária composta para definir uma entrada em uma tabela. **Chaves primárias compostas são chaves que usam mais de uma coluna para identificar uma linha na tabela de forma exclusiva** .

Representamos uma chave primária composta em Spring Data usando a anotação `@Embeddable` em uma classe. Esta chave é então incorporado na classe entidade correspondente da tabela como a chave primária composta utilizando o `@EmbeddedId` anotação sobre um campo da `@Embeddable` tipo.



#### Relacionamento

Os mapeamentos de associação são um dos principais recursos do JPA e do [Hibernate](http://www.hibernate.org/) . Eles modelam o relacionamento entre duas tabelas de banco de dados como atributos em seu modelo de domínio:

- `@ManyToOne` - Onde uma entidade (coluna ou conjunto de colunas) é / são referenciada com outra entidade (coluna ou conjunto de colunas) que contém valores únicos.
- `@OneToMany` - Nesse relacionamento, cada linha de uma entidade é referenciada a muitos registros filho em outra entidade.
- `@OneToOne` - Um item pode pertencer a apenas um outro item.
- `@ManyToMany` - Uma ou mais linhas de uma entidade estão associadas a mais de uma linha em outra entidade.



#### Lazy e Eager

Em um **relacionamento** entre duas entidades, quando é carregado uma entidade a partir do banco de dados, o **JPA** carrega seus campos de identificação, nome e endereço. Mas você tem duas opções para o carregamento da tabela relacionada com a entidade que esta sendo carregada:

- `FetchType.LAZY` - Faz com que determinados objetos **não sejam carregados** do banco até que você precise deles (apenas quando você solicitar explicitamente o carregamento destes);
- `FetchType.EAGER` - Oposto ao Lazy. Carrega os dados mesmo que você não vá utilizá-los;



#### CascadeType

O **CascadeType** define o conjunto de operações em cascata que são propagadas para a entidade associada. A função do **Cascade** é cascatear operações de persistência. É utilizada apenas quando existe algum tipo de relacionamento entre 2 ou mais classes.

- **ALL** = Realiza todas as operações em cascata
- **DETACH** = Realiza a operação *detach* em cascata
- **MERGE** = Realiza a operação *merge* em cascata
- **PERSIST** = Realiza a operação *persist* em cascata
- **REFRESH** = Realiza a operação *refresh* em cascata
- **REMOVE** = Realiza a operação *remove* em cascata



## Spring Framework MVC

- `@RestController` - É para marcar que o controlador está fornecendo serviços REST com o tipo de resposta JSON. Esta anotação é uma versão especializada de `@Controller` que adiciona as anotações `@Controller` e `@ResponseBody` automaticamente;

- `@RequestMapping ` - Podemos usá-lo com definição de classe para criar o URI de base. Por exemplo:

  ```
  @RestController
  @RequestMapping("/home")
  public class HomeController { }
  ```

  Agora "/home" é o URI para o qual este controlador será usado. Esse conceito é muito semelhante ao contexto de servlet de um aplicativo da web.

- `@Repository` - é uma especialização da `@Component`anotação que indica que uma classe anotada é um "Repositório", que pode ser usado como um mecanismo para encapsular o armazenamento, recuperação e comportamento de pesquisa que emula uma coleção de objetos.

- **ResponseEntity<T>** - Representa toda a **resposta HTTP**: código de status (**STATUS CODE**), cabeçalhos (**HEAD**) e corpo (**BODY**). Como resultado (**ResponseEntity.ok()**), podemos usá-lo para configurar totalmente a resposta HTTP.



## Melhores praticas para estruturar projetos

Nomes recomendados para as Package/Pastas:

- **config** - class which will read from property files;
- **cache** - caching mechanism class files;
- **constants** - constant defined class;
- **controller** - controller class;
- **exception** - exception class;
- **model** - pojos classes will be present;
- **entity** - The package name for the database table should be **entity**. Entity classes should be under domain package, which does not to be appended with the class name. It can be like Book.class, School.class, etc..,
- **security** - security classes;
- **service** - Impl classes; E todas as class com Sufixo: Service
- **util** - utility classes;
- **validation** - validators classes;
- **bootloader** - main class;
- **repository** - repository class;
- **enums** - package contendo os enum;
- **dto** - package DTO (**Data Transfer Object**) é a implementação do pacote Data Parse Object, que é justamente objetos para fazer a transferência de dados, sera responsavel por receber todo os dados
  - subfolder: **request**
  - subfolder: **response**

- **swagger** - Fornece ferramentas para: auxiliar na definição do arquivo de configuração (**Swagger** Editor), interagir com API através das definições do arquivo de configuração (**Swagger** UI) e gerar templates de código a partir do arquivo de configuração (**Swagger** Codegen).



## Conceito de REST API

Para criarmos os controladores, que são responsáveis por fazer a interface da API com o “mundo externo”, basta criarmos uma classe anotada com `@RestController`, e mapear as rotas da API com as anotações `@RequestMapping`, `@GetMapping`, `@PostMapping`, `@PutMapping` e `@DeleteMapping`.

- `@PostMapping` - Essa anotação é usada para mapear solicitações **HTTP POST** em métodos específicos de manipulador. **@PostMapping** é uma anotação composta que atua como um atalho para **@RequestMapping** ( method = RequestMethod. POST );
- `@Service` - Esta anotação é usada em uma classe. O **@Service** marca uma classe Java que executa algum serviço, como executar lógica de negócios, executar cálculos e chamar APIs externas. Esta anotação é uma forma especializada da anotação **@Component** destinada a ser usada na camada de serviço;
- `@Autowired` - Fornece controle sobre onde e como a ligação entre os beans deve ser realizada. Pode ser usado para em métodos setter, no construtor, em uma propriedade ou métodos com nomes arbitrários e / ou vários argumentos.
- `@RequestBody` - Esta anotação é usada para anotar os argumentos do método do manipulador de solicitações. A anotação **@RequestBody** indica que um parâmetro de método deve ser associado ao valor do corpo da solicitação **HTTP**. O **HttpMessageConveter** é responsável pela conversão da mensagem de solicitação **HTTP** para o objeto.
- `@PathVariable` - é uma anotação Spring que indica que um parâmetro de método deve ser vinculado a uma variável de modelo URI. exemplo: http://localhost:8080/api/employees/111 a **PathVariable** extrairá o valor **111** 
- `@Bean` - é aplicada em um método para especificar que ele retorna um bean a ser gerenciado pelo contexto Spring. A anotação Spring Bean é geralmente declarada nos métodos das classes de configuração.



## Spring Data – CrudRepository

**[CrudRepository](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/CrudRepository.html)** é uma **interface Spring Data para operações CRUD genéricas em um repositório de um tipo específico.** Ele fornece vários métodos prontos para usar para interagir com um banco de dados.

- **save()** - Utilizado para adicionar uma nova instância ou para atualizar uma instância;
- **findById()** - Recupera uma entidade por seu id.
- **deleteById()** - Exclui a entidade com o ID fornecido.



## Artefatos do JPA

- `@Id` - é herdada de **javax.persistence.Id**, indicando que o campo do membro abaixo é a chave primária da entidade atual. Consequentemente, seu Hibernate e seu framework Spring, bem como você pode fazer alguns `reflect`trabalhos baseados nesta anotação.

- `@GeneratedValue` - serve para configurar a forma de incremento da coluna (campo) especificada. Por exemplo, ao usar `Mysql`, você pode especificar `auto_increment`na definição da tabela para torná-la auto-incremental e, em seguida, usar

  ```java
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  ```



## java.util

- **Optional<T>** - Um objeto recipiente que pode ou não conter um valor não nulo. Se um valor estiver presente, `isPresent()` retornará `true` e `get()` retornará o valor. Métodos adicionais que dependem da presença ou ausência de um valor contido são fornecidos, como:
  - `orElseThrow` - Retorne o valor contido, se presente, caso contrário, lance uma exceção a ser criada pelo fornecedor fornecido;
  -  `ifPresent()` - executar um bloco de código se o valor estiver presente;



## Hibernate Envers

É uma biblioteca que permite auditar classes persistentes através do controle de versões em mapeamentos objetos relacionais feitos através do Hibernate.

Para cada entidade mapeada auditada, uma tabela versionada é criada no banco de dados, contendo todo o histórico das alterações efetuadas sobre aquela entidade. Basicamente, cada transação realizada no banco é classificada como uma revisão (ao menos que essa transação não realize nenhuma modificação), sendo que cada nova revisão gera alimentação automática das tabelas que permitem o versionamento das classes persistentes. 

Dessa forma, o analista pode recuperar e consultar dados históricos sem muito esforço, sendo possível, por exemplo, verificar quais informações foram alteradas naquela revisão, o dia em que aquela alteração ocorreu, em qual momento, quem realizou tal mudança e até mesmo registrar outras informações que julgar imprescindíveis. Em cima disso, é possível identificar comportamentos indevidos da aplicação por parte dos seus usuários e até mesmo recuperar dados que não deveriam ter sofridos alterações.

- `@Audited` - Anotar sua classe persistente ou algumas de suas propriedades com as quais deseja fazer a auditoria. **Em um relacionamento de classe**, todas elas deveram ter a anotação.

**Gradle**

```
implementation group: 'org.hibernate', name: 'hibernate-envers', version: '5.5.5.Final'
```



# Referências

Projectlombok. **Lombok features** - https://projectlombok.org/features/all

Baeldung. **BigDecimal and BigInteger in Java** - https://www.baeldung.com/java-bigdecimal-biginteger

Stackoverflow. **Double vs. BigDecimal?** - https://stackoverflow.com/questions/3413448/double-vs-bigdecimal

Stackoverflow. **What is the recommended project structure for spring boot rest projects?** - https://stackoverflow.com/questions/40902280/what-is-the-recommended-project-structure-for-spring-boot-rest-projects

Dtidigital. **APIs REST em Spring Boot: Como ter produtividade na criação** - https://www.dtidigital.com.br/blog/apis-rest-em-spring-boot-performance-e-produtividade-na-criacao-de-microsservicos-stand-alone/

Medium. **Spring Boot na prática — parte 2** - https://medium.com/@michel.marciano1984/spring-boot-na-pr%C3%A1tica-parte-2-eac9bdcab17a

Baeldung. **Spring @PathVariable Annotation** - https://www.baeldung.com/spring-pathvariable

Docs Oracle. **Java™ Platform, Standard Edition 8 API Specification** - https://docs.oracle.com/javase/8/docs/api/index.html

Docs Spring. **Interface CrudRepository<T,ID>** - https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/CrudRepository.html

Vojtech Ruzicka. **Documenting Spring Boot REST API with Swagger and SpringFox** - https://www.vojtechruzicka.com/documenting-spring-boot-rest-api-swagger-springfox/

Raphael Carvalho. **Spring Boot + Swagger: documentando sua API automaticamente** - https://medium.com/@raphaelbluteau/spring-boot-swagger-documentando-sua-api-automaticamente-27903293aeb6

StackOverflow. **what is best practice to package structuring Spring project?** - https://stackoverflow.com/questions/56897204/what-is-best-practice-to-package-structuring-spring-project

TutorialsPoint. **JPA - Entity Relationships** - https://www.tutorialspoint.com/jpa/jpa_entity_relationships.htm

Docs Oracle. **Enum CascadeType** - https://docs.oracle.com/javaee/6/api/javax/persistence/CascadeType.html

Dev Media. **Cascade Hibernate: Conhecendo diferentes tipos** - https://www.devmedia.com.br/cascade-hibernate-conhecendo-diferentes-tipos/28892

StackOverflow. **Qual a diferença entre DAO e Repository?** - https://pt.stackoverflow.com/questions/12927/qual-a-diferen%C3%A7a-entre-dao-e-repository

Baeldung. **Constructor Injection in Spring with Lombok** - https://www.baeldung.com/spring-injection-lombok