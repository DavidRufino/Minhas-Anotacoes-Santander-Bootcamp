# Trabalhando com JPA

**Objetivos da Aula**

1. Entendendo o JPA
2. Implementações do JPA (Hibernate e EclipseLink)
3. Linguagens de consulta orientada a objetos



## Parte 1: Entendendo JPA

Um problema de produtividade começou a ser notado no desenvolvimento de aplicações **Web Java**. Os desenvolvedores perceberam que a <u>maior parte do tempo era gasto com **queries SQL** através do **JDBC**</u>.

Um outro problema percebido era a **mudança de paradigma**. A programação **Orientada a Objetos **(exp.: Java) **é diferente** do esquema **Entidade Relacional** (exp.: SGBD Tradicionais) , sendo necessário esquematizar dois modelos para um mesmo sistema.

Como solução para esses 2 problemas, foi proposto um modelo de mapeamento chamado **Mapeamento Objeto Relacional** (conhecido como **ORM**) para representar **tabelas** de um banco de dados relacional através de **classes Java**.

Exemplo de mapeamento:

```
| Banco de Dados relacional |  ORM  |   Java   |
| :-----------------------: | :---: | :------: |
|          Tabela           | <---> |  Classe  |
|          Coluna           | <---> | Atributo |
|         Registro          | <---> |  Objeto  |
```

Para padronizar as interfaces da implementações **ORM (Mapeamento Objeto Relacional)** foi criada uma especificação oficial chamada: **JPA (Java Persistence API)**. Ela descreve como deve ser o comportamento dos frameworks Java **ORM** que desejarem Implementar a sua especificação.

Logo, somente com a especificação **JPA**, não será possível executar as operações entre a aplicação e o **Banco de Dados**.

Apesar de ser **somente a especificação**, o **JPA** possui algumas classes, interfaces e anotações que ajudam o desenvolvedor a abstrair o código.

Esses artefatos estão presentes no pacote **javax.persistence** que ajudam a manter o código independente da implementação utilizada.

> Lembrando que para persistir dados com JPA, é preciso escolher uma implementação que ira executar todo o trabalho.



### Artefatos do JPA

Entre os principais artefatos do **JPA**, podem ser destacados:

- Anotações **@Entity** - Indica a aplicação que os **Objetos da Classe** especificada serão **persistidos no banco de dados**. Também podem ser utilizadas outras anotações para auxiliar no mapeamento da classe, tais como: **@id**, **@column**, **@table**, **@OneToMany**, e **@ManyToOne**.
- **Interface EntityManager** - É utilizada para gerenciar o ciclo de vida das entidades. Os principais métodos utilizados são: `find`, `persist` e `remove`.



### Anotação @Entity

As principais anotações utilizadas junto com a annotation **@Entity** são:

- **@Table** - É uma annotation opcional. Por padrão o **Nome** da entidade é usado para realizar o mapeamento com o **nome da Tabela** do banco de dados. Essa annotation será necessária, caso o **nome** da entidade sejam **diferente** do **nome da tabela** no banco de dados.
- **@Column** - É uma annotation opcional. Por padrão o **Atributo** da entidade é usado para realizar o mapeamento com o **Nome da Coluna** do banco de dados. Essa annotation será necessária caso os **Atributos** da entidade sejam **diferentes** das **colunas** do banco de dados.
- **@Id** - É Obrigatório especificar ao menos uma **ID** para a entidade.



### Interface EntityManager

Os principais métodos do **entityManager** para interagir com as entidades são:

- `find` - **Retorna** a entidade que está persistida no banco de dados através da sua **chave primaria**;
- `persist` - **Persiste** a entidade no banco de dados (É necessário ter iniciado uma transação);
- `remove`- **Apaga** a entidade do banco de dados (É necessário ter iniciado uma transação).



Para persistir dados com as entidades mapeadas, é **OBRIGATORIO** iniciar uma transação. Para manipular transações, é necessário utilizar o seguinte método do **EntityManager**:

- `getTransaction` - Retorna uma **EntityTransaction**, sendo **obrigatório** o seu uso quando utilizar algum método que **Realiza alterações** no banco de dados. Pode utilizar os seguintes métodos:
  - `begin` - **Inicia** uma transação;
  - `commit` - Finaliza uma transação, **persistindo** todos os dados que foram modificados desde o inicio da transação;
  - `rollback` - Finaliza uma transação, **revertendo** todos os dados que foram modificados desde o inicio da transação;



### Anotação de Relacionamento

São utilizadas para representar os relacionamentos entre **TABELAS** do banco de dados (através das **chaves estrangeiras** no banco de dados) em uma aplicação que seja utilizando o **JPA**. As principais annotations são: **@ManyToMany**, **@ManyToOne**, **@OneToMany** e **@OneToOne**.

Na aplicação utilizando **JPA**, é possível realizar relacionamento **Unidirecional** e **Bidirecional**.

- **Unidirecional** - é possível chegar de uma instancia **A** para uma instancia **B** facilmente, porém o **caminho contrario é dificultado**.
- **Bidirecional** - Tanto do **A** para o **B**, quanto do **B** para o **A** o acesso é **facilitado**.



Nas annotations de relacionamento, a propriedade **fetch** exige atenção especial do desenvolvedor. Seus possíveis valores são:

- **Eager** (ansioso) - A entidade mapeada com esse atributo **SEMPRE** será carregada na aplicação quando a **entidade que está MAPEANDO for consultada**, mesmo que nunca seja utilizada durante a execução da aplicação.
- **Lazy** (preguiçoso) - A entidade mapeada com esse atributo **SOMENTE** será carregada na aplicação quando **esta for EXPLICITAMENTE consultada** pela entidade que está mapeando. (É o mais aconselhável de usar caso não se saiba, em um primeiro real numero de frequência de consultas)



## Parte 2: Implementações do JPA (Hibernate e EclipseLink)

Lembrando que para utilizar o **JPA** é **necessário** utilizar alguma implementação, pois o **JPA** é apenas a **ESPECIFICAÇÃO**. Algumas das **implementações** mais conhecidas para o **JPA** são:

- **Hibernate** - É uma ferramenta **ORM** open source e é a líder de mercado, sendo a inspiração para a especificação **Java Persistence API (JPA)**. O **Hibernate** nasceu **SEM JPA** e tinha sua própria implementação **ORM** (que ainda é possível usar), porem as versões atuais já possuem compatibilidade com a especificação JPA e são mais aconselháveis de usar que a implementação nativa.
- **EclipseLink** É um projeto open source de persistência da Eclipse Foundation. Ele é a **implementação de referencia do JPA**, além de permitir desenvolvedores interagirem com vários serviços de data, incluindo banco de dados, web services, OXM (Object XML Mapping), EIS (Enterprise Information Systems). Alguns padrões suportados pelo EclipseLink são: **JPA**, **JAXB**, **JCA**, **SOD**.

Mesmo o **JPA** sendo a especificação oficial para frameworks de implementação ORM, o **Hibernate AINDA** possui as suas **APIs nativas**. Elas são mais flexíveis porém mais complicadas de usar, portanto **é aconselhável utilizar as APIs do JPA** (caso não precise dessa flexibilidade).

> Apenas como observação, as **APIs nativas do Hibernate** utilizam as classes **SessionFactory** e **Session** (no JPA são utilizados **EntityManagerFactory** e **EntityManager**). Porem, mesmo quando se utiliza o JPA com a implementação do Hibernate, na verdade são utilizadas as classes **SessionFactory** e **Session** de forma "Envelopada" (wraped).



### JPA na pratica

#### PostgreSQL

```
CREATE TABLE IF NOT EXISTS estado (
	id SERIAL,
	nome VARCHAR(80) NOT NULL,
	sigla CHARACTER(2) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS aluno (
	id SERIAL,
	nome VARCHAR(80) NOT NULL,
	idade INTEGER NOT NULL,
	estado_id INTEGER NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (estado_id) REFERENCES estado (id)
);
```



#### Gradle

```
//	implementation Necessarias

	//	Notar que essa API nao faz o programa rodar, apenas valida as annotations (pois sao so as especificacoes)
	//	Não precisa implementar pois, o Hibernate e EclipseLink ja possuem JPA em seu pack
	// https://mvnrepository.com/artifact/javax.persistence/javax.persistence-api
	//implementation group: 'javax.persistence', name: 'javax.persistence-api', version: '2.2'

	//	Driver JDBC que sera utilizado pelos frameworks que implementam o JPA
	// https://mvnrepository.com/artifact/org.postgresql/postgresql
	implementation group: 'org.postgresql', name: 'postgresql', version: '42.2.23'

	//	Implementacao Hibernate
	// https://mvnrepository.com/artifact/org.hibernate/hibernate-core
	//implementation group: 'org.hibernate', name: 'hibernate-core', version: '5.5.5.Final'

	//	Implementacao EclipseLink
	// https://mvnrepository.com/artifact/org.eclipse.persistence/eclipselink
	implementation group: 'org.eclipse.persistence', name: 'eclipselink', version: '2.7.6'

	// Automatizador de criacao de Metamodels
	// https://mvnrepository.com/artifact/org.hibernate/hibernate-jpamodelgen
	annotationProcessor('org.hibernate:hibernate-jpamodelgen:5.4.13.Final')
```

#### resources/META-INF/persistence.xml

```
<?xml version="1.0" encoding="UTF-8"?>
<persistence xmlns="http://xmlns.jcp.org/xml/ns/persistence"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/persistence http://xmlns.jcp.org/xml/ns/persistence/persistence_2_2.xsd"
             version="2.2">

    <!-- Unidade de persistencia JPA -->
    <persistence-unit name="parte1-aulaJPA">

        <description> Unidade de persistencia JPA </description>

        <!-- Classes (entidades) que serao mapeadas -->
        <!-- [NOME-DA-PASTA].[NOME-DA-CLASS-JAVA] -->
        <class>model.Aluno</class>
        <class>model.Estado</class>

        <!-- Configuracoes de conexao ao banco de dados -->
        <properties>
            <!-- Configuracao do banco de dados -->

            <!-- MySQL driver: com.mysql.cj.jdbc.Driver -->
            <!-- PostgreSQL driver: org.postgresql.Driver -->

            <property name="javax.persistence.jdbc.driver" value="org.postgresql.Driver" />
            <property name="javax.persistence.jdbc.url" value="jdbc:postgresql://localhost/digital_innovation_one" />
            <property name="javax.persistence.jdbc.user" value="postgres" />
            <property name="javax.persistence.jdbc.password" value="password" />
        </properties>
    </persistence-unit>

    <!-- Unidade de persistencia parte2 JPA -->
    <persistence-unit name="parte2-aulaJPA">

        <description> Unidade de persistencia JPA </description>

        <!-- Implementacao do JPA -->
        <!--<provider>org.hibernate.jpa.HibernatePersistenceProvider</provider>-->
        <provider>org.eclipse.persistence.jpa.PersistenceProvider</provider>

        <!-- Classes (entidades) que serao mapeadas -->
        <!-- Tem de informar o nome da pasta, caso esteja na raiz do projeto, adicione somente o nome da classe -->
        <!-- [NOME-DA-PASTA].[NOME-DA-CLASS-JAVA] -->
        <class>one.digitalinnovation.Aula07.model.Aluno</class>
        <class>one.digitalinnovation.Aula07.model.Estado</class>

        <!-- Configuracoes de conexao ao banco de dados e do Hibernate/EclipseLink -->
        <properties>
            <!-- Configuracoes do banco de dados -->
            <!-- MySQL driver: com.mysql.cj.jdbc.Driver -->
            <!-- PostgreSQL driver: org.postgresql.Driver -->
            <property name="javax.persistence.jdbc.driver" value="org.postgresql.Driver" />
            <property name="javax.persistence.jdbc.url" value="jdbc:postgresql://localhost/digital_innovation_one" />
            <property name="javax.persistence.jdbc.user" value="postgres" />
            <property name="javax.persistence.jdbc.password" value="password" />
            <!-- END Configuracoes do banco de dados -->

            <!-- Configuracoes do Hibernate (os parametros so sao reconhecidos se estiver usando a implementacao do Hibernate)-->
            <!-- MySQL driver: org.hibernate.dialect.MySQL8Dialect -->
            <!-- PostgreSQL driver: org.hibernate.dialect.PostgreSQL82Dialect -->

            <!--<property name="hibernate.dialect" value="org.hibernate.dialect.PostgreSQL82Dialect" />
            <property name="hibernate.show_sql" value="true" />
            <property name="hibernate.format_sql" value="true" />
            <property name="hibernate.hbm2ddl.auto" value="create" />-->

            <!--OBS o valor: "create", toda vez for rodar a aplicação, ele vai criar o Banco de Dados do zero, vai apagar tudo que tiver e criara um novo-->
            <!-- Possible values for hibernate.hbm2ddl.auto are: validate, update, create, create-drop -->
            <!-- END Configuracoes do Hibernate -->


            <!-- Configuracoes do EclipseLink (os parametros so sao reconhecidos se estiver usando a implementacao do EclipseLink) -->

            <!--  Propriedades do EclipseLink -->
            <!-- eclipselink.target-database para MySQL: MySQL -->
            <!-- eclipselink.target-database para PostgreSQL: PostgreSQL -->

            <property name="eclipselink.target-database" value="PostgreSQL"/>
            <property name="eclipselink.logging.level.sql" value="FINE" />
            <property name="eclipselink.logging.parameters" value="true" />
            <property name="eclipselink.ddl-generation" value="drop-and-create-tables" />
            <!-- END Configuracoes do Hibernate -->
        </properties>

    </persistence-unit>
</persistence>
```

#### model/Aluno.java

```
package one.digitalinnovation.Aula07.model;

import javax.persistence.*;

// Pronto. ja fizemos o mapeamento.
// Com esta anotação: @Entity, indica que esta class modular
// tem representação/persiste no Banco de Dados
@Entity
public class Aluno {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private int idade;

    //  Anotação para RELACIONALMENTO
    //  Muitos alunos para UM determinado Estado
    //  Estados podem ter VARIOS Alunos
    //  fetch do tipo EAGER, significar, sempre que for chamado, ele carregara automaticamente o Estado
    @ManyToOne(fetch = FetchType.LAZY)
    private Estado estado; // estado aqui, é um id, que relacionando com a Tabela Etado

    public Aluno() {}
    public Aluno(String nome, int idade) {
        this.nome = nome;
        this.idade = idade;
    }
    public Aluno(String nome, int idade, Estado estado) {
        this.nome = nome;
        this.idade = idade;
        this.estado = estado;
    }

    @Override
    public String toString() {
        return "Aluno{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", idade=" + idade +
                ", estado=" + estado +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getIdade() {
        return idade;
    }

    public void setIdade(int idade) {
        this.idade = idade;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }
}
```

#### model/Estado.java

```
package one.digitalinnovation.Aula07.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Estado {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String sigla;

    //  Agora esta bidirecional
    @OneToMany(
            mappedBy = "estado",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Aluno> alunos = new ArrayList<>();

    public Estado() {}
    public Estado(String nome, String sigla) {
        this.nome = nome;
        this.sigla = sigla;
    }
    public Estado(String nome, String sigla, List<Aluno> alunos) {
        this.nome = nome;
        this.sigla = sigla;
        this.alunos = alunos;
    }

    @Override
    public String toString() {
        return "Estado{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", sigla='" + sigla + '\'' +
                ", alunos=" + alunos +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSigla() {
        return sigla;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }

    public List<Aluno> getAlunos() {
        return alunos;
    }

    public void setAlunos(List<Aluno> alunos) {
        this.alunos = alunos;
    }
}
```

#### Main.Java

```
package one.digitalinnovation.Aula07;

import one.digitalinnovation.Aula07.model.Aluno;
import one.digitalinnovation.Aula07.model.Estado;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class MainAula {

    public static void main(String[] args) {

        /*
        *   O JPA é só uma especificação, ele só possui as interfaces.
        */

        //  Criar um gerenciador de entidades com o banco de dados especificado no arquivo "persistence.xml"
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("parte2-aulaJPA");
        EntityManager entityManager = entityManagerFactory.createEntityManager();

        /*  Criar instancias para serem adicinados no banco de dados */
        Estado estadoParaAdicionar = new Estado("Rio de Janeiro", "RJ");
        Aluno alunoParaAdicionar = new Aluno("Daniel", 29, estadoParaAdicionar);
        Aluno alunoParaAdicionar1 = new Aluno("Aline", 21, estadoParaAdicionar);
        Aluno alunoParaAdicionar2 = new Aluno("Marcos", 25, estadoParaAdicionar);
        Aluno alunoParaAdicionar3 = new Aluno("Gabriel", 34, estadoParaAdicionar);

        // Criando uma transação antes de interagir
        entityManager.getTransaction().begin(); //  Iniciar uma transação

        //  Antes de interagir, tem que haver uma transação
        entityManager.persist(estadoParaAdicionar);
        entityManager.persist(alunoParaAdicionar);
        entityManager.persist(alunoParaAdicionar1);
        entityManager.persist(alunoParaAdicionar2);
        entityManager.persist(alunoParaAdicionar3);

        entityManager.getTransaction().commit();    //  Finalizar uma transação

        /* Resgatar uma instancia no banco de dados */
        //  Leitura nao precisa de transação
        Estado estadoEncontrado = entityManager.find(Estado.class, 1);
        Aluno alunoEncontrado = entityManager.find(Aluno.class, 1);

        System.out.println(estadoEncontrado);
        System.out.println(alunoEncontrado);

        /* Alterar uma entidade */
        entityManager.getTransaction().begin(); //  Iniciar uma transação

        alunoEncontrado.setNome("Bruno");
        alunoEncontrado.setIdade(19);

        entityManager.getTransaction().commit();    //  Finalizar uma transação

        /* Remover uma entidade */
        // Criando uma transação antes de interagir
        entityManager.getTransaction().begin(); //  Iniciar uma transação

        entityManager.remove(alunoEncontrado);

        entityManager.getTransaction().commit();    //  Finalizar uma transação

        /* Encerrar o gerenciador de entidades e encerrar a fabrica de gerenciadores de entidade */
        entityManager.close();
        entityManagerFactory.close();
    }
}
```



## Parte 3: Linguagens de Consulta Orientada a Objetos

O **JPQL** (Java Persistence Query Language) é uma linguagem de consulta independente **Orientada a objetos** definida pelo **JPA**.

**JPQL** é usado para <u>realizar consultas no banco de dados</u>. É inspirado no SQL (inclusive a sua sintaxe), porem ele <u>interage com o banco de dados através das **Entidades do JPA**</u>, ao invés de interagir diretamente nas tabelas de banco de dados (como é no SQL).

Com o **JPQL** é possível utilizar as **propriedades de Orientação a Objetos** nas consultas realizadas no banco de dados, através das **Entidades** Mapeadas, tal como **herança**.



Algumas vantagens ao utilizar o **JPQL** em relação aos métodos básicos de gestão de entidade do **EntityManager** são:

1. Operações de busca, atualização e remoção de **Entidades em MASSA**, ao invés de realizar operações em apenas uma instância por vez através de chaves primarias (como nos métodos do `entityManager`);
2. Realizar <u>Consultas mais **Complexas**</u>;
3. Realizar <u>Funções de **Agregação**</u>;



Vantagens em utilizar o **JPQL** em relação ao **SQL** são:

1. **NÃO** é necessário realizar os **joins** explicitamente entre entidades que estão com **annotations de relacionamento**, pois os **joins** são criados automaticamente durante uma consulta;
2. **JPQL** utiliza as funcionalidades de carregamento **lazy** e **eager** nos **Relacionamento entre entidades**, aumentando a eficiência das consultas na aplicação;
3. As consultas podem ser armazenadas em cache para **Melhor Performance da Aplicação**;



### Outras linguagens

Além do **JPQL**, existem outras linguagens para realizar consultas através dos frameworks **ORM**. Entre elas estão:

- **HQL** - o *Hibernate Query Language* é uma **Linguagem de Consulta Orientada a Objetos** que realiza operações nas tabelas e colunas da base de dados através do **Hibernate** (através de classes e propriedades da orientação a objetos). Ela inspirou a criação do **JPQL** e **Hibernate** (**Session** e **SessionFactory**).
- **EQL** - O *EclipseLink Query Language* prove diversas extensões para a especificação padrão do **JPQL**. Essas extensões proveem acesso as funcionalidades padrões do **SQL**, além de funcionalidades do **EclipseLink**.



### JPA Criteria API

Existe uma alternativa a consultas **JPQL** a partir do **JPA 2.0** chamada **JPA Criteria API**, que é muito útil para construir **Consultas Dinâmicas**.

No **JPQL** as consultas só são verificadas no momento da execução, não sendo possível detectar erros de sintaxe na consulta durante a compilação. Já o **JPA Criteria API** consegue detectar esses erros no **Momento de Compilação**.

Essa funcionalidade se torna possível por que no **JPA Criteria API** as consultas são definidas como **Instancias de Objetos Java** representam elementos de consulta. Já as consultas **JPQL** são definidas apenas como **String**.



Para o **JPA Criteria API** verificar os possíveis erros em tempo de compilação, é necessário utilizar o **JPA Metamodel** para referenciar os **Atributos das Entidades**.

O **JPA Metamodel** provê a habilidade de examinar o modelo de persistência de um objeto para **consultar** os detalhes de uma entidade **JPA**. Para cada entidade, uma classe metamodelo é criada com o mesmo nome da classe, porém procedido pelo símbolo (**underscore**) e com os atributos estáticos que representam os campos de persistência.

Sem o **JPA Metamodel**, os atributos serão referenciados através das Strings, tendo como principal desvantagem o risco de ocorrer algum erro em tempo de execução para o usuário final.



No Entanto, o **JPA Criteria API** é mais complicado de se utilizar comparando com **JPQL**. Sendo assim, para **Consultas Estáticas Simples**, é preferível utilizar o **JPQL**, enquanto que para **Consultas Dinâmicas** é preferível o **JPA Criteria API**.

Em relação a eficiência, tanto consultas **JPQL** quanto Consultas **JPA Criteria** são **EQUIVALENTES** em **PODER** e **EFICIÊNCIA**. Portanto, saber quando escolher um ou outro é um grande desafio para projetos de software.



Para usar o **JPQL** ou o **JPA Criteria API** é necessário ter um objeto da classe **EntityManager**, pois é através dos seus métodos `createQuery` (JPQL) e `getCriteriaBuilder` (JPA Criteria API) que se inicia a criação das consultas.

Para criar os **JPA Metamodel** de cada entidade será necessário adicionar o **JAR "hibernate-jpamodelgen"** através do **Gradle**, **Maven** ou manualmente. Esse JAR automatiza a criação de metamodels. (também existem outras organizações que oferecem esse tipo de solução).

É possível criar manualmente os **JPA Metamodels** de cada entidade que irão auxiliar na validação das consultas realizadas através do **JPA Criteria API**, porem isso seria trabalhoso demais. Por essa razão é fácil utilizar um gerador de Metamodels para automatizar esse processo.



### Exemplo na prática



#### 1 - Criando um gerenciador de entidades com o banco de dados especificado no arquivo  "persistence.xml"

```
		//  Criar um gerenciador de entidades com o banco de dados especificado no arquivo "persistence.xml"
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("parte2-aulaJPA");
        EntityManager entityManager = entityManagerFactory.createEntityManager();

        /*  Criar instancias para serem adicinados no banco de dados */
        Estado estadoParaAdicionar = new Estado("Rio de Janeiro", "RJ");
        Aluno alunoParaAdicionar = new Aluno("Daniel", 29, estadoParaAdicionar);

        // Criando uma transação antes de interagir
        entityManager.getTransaction().begin(); //  Iniciar uma transação

        //  Antes de interagir, tem que haver uma transação
        entityManager.persist(estadoParaAdicionar);
        entityManager.persist(alunoParaAdicionar);
        
        //  Outra forma de criar instancias
        entityManager.persist(new Aluno("Aline", 21, estadoParaAdicionar)); //  alunoParaAdicionar1
        entityManager.persist(new Aluno("Marcos", 25, estadoParaAdicionar));    //  alunoParaAdicionar2
        entityManager.persist(new Aluno("Gabriel", 34, estadoParaAdicionar));   //  alunoParaAdicionar3

        entityManager.getTransaction().commit();    //  Finalizar uma transação
```

#### 2.2 - Utilizando o método `find()`do entityManager

```
		//  2.2 - Utilizando o metodo find do entityManager
        //  Trazendo somente 1 resultado
        Aluno alunoEntityManager = entityManager.find(Aluno.class, 1);

        //  Resultado da consulta
        System.out.println("Consulta do alunoEntityManager: " + alunoEntityManager);
        //  Consulta do alunoEntityManager: Aluno{id=1, nome='Daniel', idade=29, estado=Estado{id=1, nome='Rio de Janeiro', sigla='RJ', alunos=[]}}
        
        // =====================================================================
```

No exemplo acima, foi utilizando o `find()` que retornou um resultado (sem a possibilidade de buscar por nome, ou outros atributos, só é possível buscas por id primário **@Id**), mas e se quiséssemos trazer **TODOS** os alunos? **Não** seria possível utilizando `EntityManager` e seus method. Para obter uma **lista** de aluno, deve utilizar um dos métodos utilizados abaixo nas partes **2.3** - **2.4** - **2.5**

#### 2.3 - SQL nativo

```
		// 2.3 - SQL nativo
        // Trazendo somente 1 resultado

        String sql = "SELECT * FROM aluno WHERE nome = :nome ";
        Aluno alunoSQL = (Aluno) entityManager
                .createNativeQuery(sql, Aluno.class)
                .setParameter("nome", nome)
                .getSingleResult();

        //  Trazendo uma lista como resultado
        String sqlList = "SELECT * FROM aluno";
        List<Aluno> alunoSqlList = entityManager
                .createNativeQuery(sqlList, Aluno.class)
                .getResultList();

        //  Resultado das consultas acima
        System.out.println("Consulta alunoSQL: " + alunoSQL);
        alunoSqlList.forEach(Aluno -> System.out.println("Consulta de Lista Aluno: " + Aluno));
        //  Consulta alunoSQL: Aluno{id=1, nome='Daniel', idade=29, estado=Estado{id=1, nome='Rio de Janeiro', sigla='RJ', alunos=[]}}
        //  Consulta de Lista Aluno: Aluno{id=1, nome='Daniel', idade=29, estado=Estado{id=1, nome='Rio de Janeiro', sigla='RJ', alunos=[]}}
        //  Consulta de Lista Aluno: Aluno{id=2, nome='Aline', idade=21, estado=Estado{id=1, nome='Rio de Janeiro', sigla='RJ', alunos=[]}}
        //  Consulta de Lista Aluno: Aluno{id=3, nome='Marcos', idade=25, estado=Estado{id=1, nome='Rio de Janeiro', sigla='RJ', alunos=[]}}
        //  Consulta de Lista Aluno: Aluno{id=4, nome='Gabriel', idade=34, estado=Estado{id=1, nome='Rio de Janeiro', sigla='RJ', alunos=[]}}

        // =====================================================================
```

No exemplo acima vimos que é possível utilizar consultas SQL na nossa aplicação, nos utilizamos  o equivalente a essa consulta:

```
SELECT * FROM aluno WHERE nome = 'Daniel'
SELECT * FROM aluno
```



#### 2.4 - JPQL

```
		// 2.4 - JPQL
        // Trazendo somente 1 resultado
        String jpql = "select a from Aluno a where a.nome = :nome"; //	Com a letra inicial do nome da tabela em maiúsculo.
        Aluno alunoJPQL = entityManager
                .createQuery(jpql, Aluno.class)
                .setParameter("nome", nome)
                .getSingleResult();

        //  Trazendo uma lista como resultado
        String jpqlList = "select a from Aluno a where a.estado.sigla = :estadoSigla";  //	Com a letra inicial do nome da tabela em maiúsculo.
        List<Aluno> alunoJpqlList = entityManager
                .createQuery(jpqlList, Aluno.class)
                .setParameter("estadoSigla", "RJ")
                .getResultList();

        //  Resultado das consultas acima
        System.out.println("Consulta alunoJPQL: " + alunoJPQL);
        alunoJpqlList.forEach(Aluno -> System.out.println("Consulta de Lista Aluno JPQL: " + Aluno));
        //  Consulta alunoJPQL: Aluno{id=1, nome='Daniel', idade=29, estado=Estado{id=1, nome='Rio de Janeiro', sigla='RJ', alunos=[]}}
        //  Consulta de Lista Aluno JPQL: Aluno{id=1, nome='Daniel', idade=29, estado=Estado{id=1, nome='Rio de Janeiro', sigla='RJ', alunos=[]}}
        //  Consulta de Lista Aluno JPQL: Aluno{id=2, nome='Aline', idade=21, estado=Estado{id=1, nome='Rio de Janeiro', sigla='RJ', alunos=[]}}
        //  Consulta de Lista Aluno JPQL: Aluno{id=3, nome='Marcos', idade=25, estado=Estado{id=1, nome='Rio de Janeiro', sigla='RJ', alunos=[]}}
        //  Consulta de Lista Aluno JPQL: Aluno{id=4, nome='Gabriel', idade=34, estado=Estado{id=1, nome='Rio de Janeiro', sigla='RJ', alunos=[]}}

        // =====================================================================
```

No exemplo acima, Qual seria a diferença em utilizar  **JPQL** ou **SQL** ? A diferença é perceptível:

- Não precisa consultar o Banco de Dados toda vez para verificar os campos, com **JPQL** o programador focará apenas na **Orientação a Objeto**;
- Em Banco de Dados mais elaborados (a do exemplo é simplificado) é perceptível a **GRANDE DIFERENÇA**. Com o **SQL**, em buscas mais complexas, teria de ser feito diversos `joins`, enquanto o **JPQL** o programador faz tudo através da classe já mapeada.
-  O **JPQL** já identifica o tipo do **Objeto** pelo mapeamento, não precisando converter para o tipo desejado (como é feito no **SQL**);



#### 2.5 - JPA Criteria API + JPA Metamodel

```
// 2.5 - JPA Criteria API + JPA Metamodel
        // Trazendo somente 1 resultado
        
        CriteriaQuery<Aluno> criteriaQuery = entityManager.getCriteriaBuilder().createQuery(Aluno.class);
        Root<Aluno> alunoRoot = criteriaQuery.from(Aluno.class);
        CriteriaBuilder.In<String> inClause = entityManager.getCriteriaBuilder().in(alunoRoot.get(Aluno_.nome));
        inClause.value(nome);
        criteriaQuery.select(alunoRoot).where(inClause);
        Aluno alunoAPICriteria = entityManager.createQuery(criteriaQuery).getSingleResult();

        // Trazendo uma lista como resultado
        CriteriaQuery<Aluno> criteriaQueryList = entityManager.getCriteriaBuilder().createQuery(Aluno.class);
        Root<Aluno> alunoRootList = criteriaQueryList.from(Aluno.class);
        List<Aluno> alunoAPICriteriaList = entityManager.createQuery(criteriaQueryList).getResultList();

        // Resultados das consultas acima
        System.out.println("Consulta alunoAPICriteria: " + alunoAPICriteria);
        alunoAPICriteriaList.forEach(Aluno -> System.out.println("Consulta alunoAPICriteriaList: " + Aluno));
        
        // =====================================================================
```

```
		/* Encerrar o gerenciador de entidades e encerrar a fabrica de gerenciadores de entidade */
        entityManager.close();
        entityManagerFactory.close();
```



#### Demais Arquivos da prática

resources/META-INF/persistence.xml

```
<?xml version="1.0" encoding="UTF-8"?>
<persistence xmlns="http://xmlns.jcp.org/xml/ns/persistence"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/persistence http://xmlns.jcp.org/xml/ns/persistence/persistence_2_2.xsd"
             version="2.2">

    <!-- Unidade de persistencia parte2 JPA -->
    <persistence-unit name="parte2-aulaJPA">

        <description> Unidade de persistencia JPA </description>

        <!-- Implementacao do JPA -->
        <provider>org.hibernate.jpa.HibernatePersistenceProvider</provider>
        <!--<provider>org.eclipse.persistence.jpa.PersistenceProvider</provider>-->

        <!-- Classes (entidades) que serao mapeadas -->
        <!-- Tem de informar o nome da pasta, caso esteja na raiz do projeto, adicione somente o nome da classe -->
        <!-- [NOME-DA-PASTA].[NOME-DA-CLASS-JAVA] -->
        <class>one.digitalinnovation.Aula07.model.Aluno</class>
        <class>one.digitalinnovation.Aula07.model.Estado</class>

        <!-- Configuracoes de conexao ao banco de dados e do Hibernate/EclipseLink -->
        <properties>
        
            <!-- Configuracoes do banco de dados -->
            <!-- MySQL driver: com.mysql.cj.jdbc.Driver -->
            <!-- PostgreSQL driver: org.postgresql.Driver -->
            
            <property name="javax.persistence.jdbc.driver" value="org.postgresql.Driver" />
            <property name="javax.persistence.jdbc.url" value="jdbc:postgresql://localhost/digital_innovation_one" />
            <property name="javax.persistence.jdbc.user" value="postgres" />
            <property name="javax.persistence.jdbc.password" value="password" />
            <!-- END Configuracoes do banco de dados -->

            <!-- Configuracoes do Hibernate (os parametros so sao reconhecidos se estiver usando a implementacao do Hibernate)-->
            <!-- MySQL driver: org.hibernate.dialect.MySQL8Dialect -->
            <!-- PostgreSQL driver: org.hibernate.dialect.PostgreSQL82Dialect -->

            <property name="hibernate.dialect" value="org.hibernate.dialect.PostgreSQL82Dialect" />
            <property name="hibernate.show_sql" value="true" />
            <property name="hibernate.format_sql" value="true" />
            <property name="hibernate.hbm2ddl.auto" value="create" />

            <!--OBS o valor: "create", toda vez for rodar a aplicação, ele vai criar o Banco de Dados do zero, vai apagar tudo que tiver e criara um novo-->
            <!-- Possible values for hibernate.hbm2ddl.auto are: validate, update, create, create-drop -->
            <!-- END Configuracoes do Hibernate -->

            <!-- Configuracoes do EclipseLink (os parametros so sao reconhecidos se estiver usando a implementacao do EclipseLink) -->

            <!--  Propriedades do EclipseLink -->
            <!-- eclipselink.target-database para MySQL: MySQL -->
            <!-- eclipselink.target-database para PostgreSQL: PostgreSQL -->

            <!--<property name="eclipselink.target-database" value="PostgreSQL"/>
            <property name="eclipselink.logging.level.sql" value="FINE" />
            <property name="eclipselink.logging.parameters" value="true" />
            <property name="eclipselink.ddl-generation" value="drop-and-create-tables" />-->
            <!-- END Configuracoes do Hibernate -->
            
        </properties>

    </persistence-unit>
</persistence>
```

Gradle

```
//	implementation Necessarias

	//	Notar que essa API nao faz o programa rodar, apenas valida as annotations (pois sao so as especificacoes)
	//	Não precisa implementar pois, o Hibernate e EclipseLink ja possuem JPA em seu pack
	// https://mvnrepository.com/artifact/javax.persistence/javax.persistence-api
	//implementation group: 'javax.persistence', name: 'javax.persistence-api', version: '2.2'

	//	Driver JDBC que sera utilizado pelos frameworks que implementam o JPA
	// https://mvnrepository.com/artifact/org.postgresql/postgresql
	implementation group: 'org.postgresql', name: 'postgresql', version: '42.2.23'

	//	Implementacao Hibernate
	// https://mvnrepository.com/artifact/org.hibernate/hibernate-core
	implementation group: 'org.hibernate', name: 'hibernate-core', version: '5.5.5.Final'

	//	Implementacao EclipseLink
	// https://mvnrepository.com/artifact/org.eclipse.persistence/eclipselink
	//implementation group: 'org.eclipse.persistence', name: 'eclipselink', version: '2.7.6'

	// Automatizador de criacao de Metamodels
	// https://mvnrepository.com/artifact/org.hibernate/hibernate-jpamodelgen
	annotationProcessor('org.hibernate:hibernate-jpamodelgen:5.4.13.Final')
```

model/Aluno.java

```
package one.digitalinnovation.Aula07.model;

import javax.persistence.*;

// Pronto. ja fizemos o mapeamento.
// Com esta anotação: @Entity, indica que esta class modular
// tem representação/persiste no Banco de Dados
@Entity
public class Aluno {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private int idade;

    //  Anotação para RELACIONALMENTO
    //  Muitos alunos para UM determinado Estado
    //  Estados podem ter VARIOS Alunos
    //  fetch do tipo EAGER, significar, sempre que for chamado, ele carregara automaticamente o Estado
    @ManyToOne(fetch = FetchType.LAZY)
    private Estado estado; // estado aqui, é um id, que relacionando com a Tabela Etado

    public Aluno() {}
    public Aluno(String nome, int idade) {
        this.nome = nome;
        this.idade = idade;
    }
    public Aluno(String nome, int idade, Estado estado) {
        this.nome = nome;
        this.idade = idade;
        this.estado = estado;
    }

    @Override
    public String toString() {
        return "Aluno{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", idade=" + idade +
                ", estado=" + estado +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getIdade() {
        return idade;
    }

    public void setIdade(int idade) {
        this.idade = idade;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }
}
```

model/Estado.java

```
package one.digitalinnovation.Aula07.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Estado {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String sigla;

    //  Agora esta bidirecional
    @OneToMany(
            mappedBy = "estado",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Aluno> alunos = new ArrayList<>();

    public Estado() {}
    public Estado(String nome, String sigla) {
        this.nome = nome;
        this.sigla = sigla;
    }
    public Estado(String nome, String sigla, List<Aluno> alunos) {
        this.nome = nome;
        this.sigla = sigla;
        this.alunos = alunos;
    }

    @Override
    public String toString() {
        return "Estado{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", sigla='" + sigla + '\'' +
                ", alunos=" + alunos +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSigla() {
        return sigla;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }

    public List<Aluno> getAlunos() {
        return alunos;
    }

    public void setAlunos(List<Aluno> alunos) {
        this.alunos = alunos;
    }
}
```

