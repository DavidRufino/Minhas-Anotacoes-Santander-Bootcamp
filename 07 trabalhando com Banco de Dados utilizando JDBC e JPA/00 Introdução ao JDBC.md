# Introdução ao JDBC

**Objetivos da Aula**

1. Configurar Banco de Dados
2. JDBC e drivers de conexão
3. Consultas com JDBC



## Parte 1: Configurar Banco de Dados

Um **Banco de Dados** armazena dados de forma estruturada, tornando o acesso e atualização dos dados mais rápido, pois aumenta a eficiência computacional (menor "gasto" de memoria, processamento e tempo).



### Exemplo MySQL

```
CREATE databse digital_innovation_one;

USE digital_innovation_one;

CREATE TABLE aluno (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(80) NOT NULL,
	idade INTEGER NOT NULL,
	estado CHARACTER(2) NOT NULL
);

INSERT INTO aluno(nome, idade, estado) VALUES ('Pedro', 20, 'RJ');
INSERT INTO aluno(nome, idade, estado) VALUES ('Maria', 35, 'ac');
INSERT INTO aluno(nome, idade, estado) VALUES ('Joao', 10, 'SC');
INSERT INTO aluno(nome, idade, estado) VALUES ('Ana', 51, 'GO');

SELECT * FROM aluno;
```

### Exemplo utilizando PostgreSQL

```
CREATE databse digital_innovation_one;

CREATE TABLE IF NOT EXISTS aluno (
	id SERIAL,
	nome VARCHAR(80) NOT NULL,
	idade INTEGER NOT NULL,
	estado CHARACTER(2) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO aluno (nome, idade, estado) VALUES ('Pedro', 20, 'RJ');
INSERT INTO aluno (nome, idade, estado) VALUES ('Maria',35,'AC');
INSERT INTO aluno (nome, idade, estado) VALUES ('Joao',10, 'SC');
INSERT INTO aluno (nome, idade, estado) VALUES ('Ana', 51,'GO');

SELECT * FROM aluno;
```



## Parte 2: JDBC e drivers de conexão

**JDBC (Java Database Connectivity)** é uma API com diversas classes e interfaces escritas na linguagem Java que estão presentes nos pacotes **java.sql** e **javax.sql**. Elas permitem que programas em Java realizem conexões em banco de dados para realizar consultas. Uma dessas classes principais é o **driver JDBC** que intermedia essa interação;

Sem a API JDBC, seria necessário conhecer o protocolo proprietário de cada banco de dados para se conectar e realizar consultas. Já com a API JDBC, é utilizada somente **UMA interface Java para qualquer banco de dados**, deixando o **driver implementar as especificações de cada banco de dados**, enquanto o desenvolvedor se preocupa apenas em selecionar um driver e criar as Queries (consultar o SQL).

- Classe **DriverManager** - Responsável pela comunicação com os drivers disponíveis. É utilizada para cria uma **Connection** com o banco de dados através de uma **URL** (que especifica driver, localização do BD e nome do BD).
- Interface **Connection** - Representa a conexão com o banco de dados. Permite criar **"Statements"** que constroem consultas SQL.



### Exemplo com MySQL

**Gradle para MySQL Connector JDBC**

```
// https://mvnrepository.com/artifact/mysql/mysql-connector-java
implementation group: 'mysql', name: 'mysql-connector-java', version: '8.0.26'
```

Exemplo de conexão com o MySql:

```
package one.digitalinnovation.Aula07;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Aula07Application {

	public static void main(String[] args) throws SQLException {

		//	Definindo parametros para se conectar ao banco de dados
		String urlConnectionMySql = "jdbc:mysql://localhost/digital_innovation_one";
		
		//	OU PARA MELHOR LEITURA/MANUTENÇÃO
		String driver = "mysql";
		String dataBaseAdress = "localhost";
		String dataBaseName = "digital_innovation_one";
		String user = "root";
		String password = "password";

		//	Construindo a string de conexao com o exemplo 'PARA MELHOR LEITURA/MANUTENÇÃO'
		StringBuilder sb = new StringBuilder("jdbc:")
				.append(driver).append("://")
				.append(dataBaseAdress).append("/")
				.append(dataBaseName);

		String urlConnection = sb.toString(); 
		// agora todos os String se tornaram um: jdbc:mysql://localhost/digital_innovation_one

		//	Criando conexao usando o DriverManager, passando como parametros a string de conexao, usuario e a senha do usuario
		try (Connection connection = DriverManager.getConnection(urlConnection, user, password);) {
			System.out.println("SUCESS");
		} catch (SQLException throwables) {
			System.out.println("FAIL");
		}
	}
}
```



### Exemplo com PostgreSQL

**Gradle para PostgreSQL JDBC Driver**

```
// https://mvnrepository.com/artifact/org.postgresql/postgresql
implementation group: 'org.postgresql', name: 'postgresql', version: '42.2.23'
```

Exemplo de conexão com o PostgreSQL:

```
package one.digitalinnovation.Aula07;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Aula07Application {

	public static void main(String[] args) throws SQLException {

		//	Definindo parametros para se conectar ao banco de dados
		String urlConnectionPostgreSql = "jdbc:postgresql://localhost/digital_innovation_one";
		
		//	OU PARA MELHOR LEITURA/MANUTENÇÃO
		String driver = "postgresql";
		String dataBaseAdress = "localhost";
		String dataBaseName = "digital_innovation_one";
		String user = "postgres"; // user do PostgreSQL por default é: postgres
		String password = "password";

		//	Construindo a string de conexao com o exemplo 'PARA MELHOR LEITURA/MANUTENÇÃO'
		StringBuilder sb = new StringBuilder("jdbc:")
				.append(driver).append("://")
				.append(dataBaseAdress).append("/")
				.append(dataBaseName);

		String urlConnection = sb.toString(); 
		// agora todos os String se tornaram um: jdbc:postgresql://localhost/digital_innovation_one

		//	Criando conexao usando o DriverManager, passando como parametros a string de conexao, usuario e a senha do usuario
		try (Connection connection = DriverManager.getConnection(urlConnection, user, password);) {
			System.out.println("SUCESS");
		} catch (SQLException throwables) {
			System.out.println("FAIL");
		}
	}
}
```

- `.getConnection()` - Tenta estabelecer uma conexão com o URL do banco de dados fornecido.



## Parte 3: Consultas com JDBC

As interface de **Statement** é usada para criar instruções básicas SQL em Java, ela fornece métodos para executar **consultas com o banco de dados**. Existem diferentes tipos de instruções que são usadas em JDBC da seguinte maneira:

Interfaces para montar comandos SQL:

- **Create Statement** - Executar SQL comuns
- **Prepared Statement** - Executar SQL parametrizáveis
- **Callable Statement** - Executar stored procedures



### Prepared Statement

Representa uma instrução SQL recompilada, que pode ser executada várias vezes. Isso aceita consultas SQL parametrizadas. Nisso, "?" é usado no lugar do parâmetro, pode-se passar o parâmetro dinamicamente usando os métodos de DECLARAÇÃO PREPARADA em tempo de execução.

> Prefira **PreparedStatement** ao **Statement** quando for parametrizar a consulta pois:
>
> - Previne SQL Injection
> - Melhora legibilidade
> - Melhora desempenho



Exemplo na prática:

Exemplo abaixo é do arquivo: **ConnectionFactory.java** que fara a conexão ao Banco de dados.

```
//	arquivo: ConnectionFactory.java

package one.digitalinnovation.Aula07;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class ConnectionFactory {

    private ConnectionFactory() { throw  new UnsupportedOperationException(); }

    public static Connection getConnection() {

        Connection connection = null;

        //  Carregar o arquivo: connection.properties
        //  Criado na pasta: resources
        //  Neste arquivo, adicionamos os parametros necessario para se comunicar com o Banco de Dados
        //  em vez de criar tudo nesta class, facilitando a manutenção posteriormente

        try(InputStream input = ConnectionFactory.class.getClassLoader().getResourceAsStream("connection.properties")) {

            //  Definindo parametros para se conectar ao banco de dados
            Properties properties = new Properties();
            properties.load(input);

            String driver = properties.getProperty("jdbc.driver");
            String dataBaseAdress = properties.getProperty("db.address");
            String dataBaseName = properties.getProperty("db.name");
            String user = properties.getProperty("db.user.login");
            String password = properties.getProperty("db.user.password");

            //	Construindo a string de conexao com o exemplo 'PARA MELHOR LEITURA/MANUTENÇÃO'
            StringBuilder sb = new StringBuilder("jdbc:")
                    .append(driver).append("://")
                    .append(dataBaseAdress).append("/")
                    .append(dataBaseName);

            String urlConnection = sb.toString(); // agora todos os String se tornaram um: jdbc:postgresql://localhost/digital_innovation_one

            //	Criando conexao usando o DriverManager, passando como parametros a string de conexao, usuario e a senha do usuario
            try {
                connection = DriverManager.getConnection(urlConnection, user, password);
                System.out.println("\nSUCESS Connection");
            } catch (SQLException throwables) {
                System.out.println("FAIL Connection");
            }
        } catch (IOException e) {
            System.out.println("Não foi possivel carregar o arquivo: connection.properties. " + e);
            e.printStackTrace();
        }

        return connection;
    }

}
```

Exemplo abaixo é do modelo de classe nominado de: **Aluno.java**, servirá para obter/criar objetos no banco de dados.

```
//	arquivo: model/Aluno.java

package one.digitalinnovation.Aula07.model;

public class Aluno {

    private int id;
    private String nome;
    private int idade;
    private String estado;

    public Aluno() {}

    public Aluno(int id, String nome, int idade, String estado) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.estado = estado;
    }

    public Aluno(String nome, int idade, String estado) {
        this.nome = nome;
        this.idade = idade;
        this.estado = estado;
    }

    @Override
    public String toString() {
        return String.format("Aluno {id='%d', nome='%s', idade='%d', estado='%s'}", this.id, this.nome, this.idade, this.estado);
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

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
```

Exemplo abaixo é do arquivo: **AlunoDAO.java**,  com sufixo **DAO** (Data Access Object) no final do nome, ela será uma classe especializada, fara a **SELECT/UPDATE** e trabalhara o **recebimento dos resultado**, adicionando os itens na **List do tipo Aluno**

```
package one.digitalinnovation.Aula07.dao;

import one.digitalinnovation.Aula07.ConnectionFactory;
import one.digitalinnovation.Aula07.model.Aluno;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

//	Class especializada para CRUD
public class AlunoDAO {

    //  Consultar
    public List<Aluno> list() {
        List<Aluno> alunos = new ArrayList<>();

        try (Connection connection = ConnectionFactory.getConnection()) {

            //  Preparando a consulta SQL
            String sql = "SELECT * FROM aluno"; //  SELECIONAR tudo da tabela aluno

            //  Preparar o statement com os parametros recebidos
            //  Nesta função não tera parametros, pois irá retornar todos os valores da tabela aluno
            PreparedStatement stmt = connection.prepareStatement(sql);

            //  Executar a consulta e armazenar o resultados da consulta no objeto nominado de result
            ResultSet result = stmt.executeQuery();

            //  Criar um objeto do tipo Aluno que sera adicionado na lista alunos
            while(result.next()) {
                int id = result.getInt("id");
                String nome = result.getString("nome");
                int idade = result.getInt("idade");
                String estado = result.getString("estado");

                alunos.add(new Aluno(id,nome,idade,estado));    //  adicionar o objeto na lista alunos
            }
        } catch (SQLException throwables) {
            System.out.println("AlunoDAO: FAIL on list()");
            throwables.printStackTrace();
        }
        return alunos;
    }

    //  Consultar com Filtro
    public Aluno getById(int id) {
        Aluno aluno = new Aluno();

        try (Connection connection = ConnectionFactory.getConnection()) {

            //  Preparando a consulta SQL
            String sql = "SELECT * FROM aluno WHERE id = ?"; //  SELECIONAR tudos os alunos que possuir o id informado

            //  Preparar o statement com os parametros recebidos
            PreparedStatement stmt = connection.prepareStatement(sql);
            stmt.setInt(1, id); //  informar o valor

            //  Executar a consulta e armazenar o resultados da consulta no objeto nominado de result
            ResultSet result = stmt.executeQuery();

            //  Guardar os valores retornados da tabela
            if(result.next()) {
                aluno.setId(result.getInt("id"));
                aluno.setNome(result.getString("nome"));
                aluno.setIdade(result.getInt("idade"));
                aluno.setEstado(result.getString("estado"));
            }
        } catch (SQLException throwables) {
            System.out.println("AlunoDAO: FAIL on getById()");
            throwables.printStackTrace();
        }
        return aluno;
    }

    //  Inserção
    public void create(Aluno aluno) {
        try (Connection connection = ConnectionFactory.getConnection()) {

            //  Preparando a consulta SQL
            String sql = "INSERT INTO aluno(nome, idade, estado) VALUES (?, ?, ?)"; //  SELECIONAR tudos os alunos que possuir o id informado

            //  Preparar o statement com os parametros recebidos
            PreparedStatement stmt = connection.prepareStatement(sql);
            stmt.setString(1, aluno.getNome()); //  informar o valor do primeiro ?
            stmt.setInt(2, aluno.getIdade()); //  informar o valor do segundo ?
            stmt.setString(3, aluno.getEstado()); //  informar o valor do terceiro ?

            //  Executar a inserção e retorna a linha afetada
            int rowsAftected = stmt.executeUpdate();

            System.out.println("AlunoDAO: SUCESS on create() aluno on rows: " + rowsAftected);
        } catch (SQLException throwables) {
            System.out.println("AlunoDAO: FAIL on create()");
            throwables.printStackTrace();
        }
    }

    //  Deletar
    public void delete(int id) {
        try (Connection connection = ConnectionFactory.getConnection()) {

            //  Preparando a consulta SQL
            String sql = "DELETE FROM aluno WHERE id = ?"; //  SELECIONAR tudos os alunos que possuir o id informado

            //  Preparar o statement com os parametros recebidos
            PreparedStatement stmt = connection.prepareStatement(sql);
            stmt.setInt(1, id); //  informar o valor do primeiro ?

            //  Executar a inserção e retorna a linha afetada
            int rowsAftected = stmt.executeUpdate();

            System.out.println("AlunoDAO: SUCESS on delete() aluno on rows: " + rowsAftected);
        } catch (SQLException throwables) {
            System.out.println("AlunoDAO: FAIL on delete()");
            throwables.printStackTrace();
        }
    }

	//	Atualizar
    public void update(Aluno aluno) {
        try (Connection connection = ConnectionFactory.getConnection()) {

            //  Preparando a consulta SQL
            String sql = "UPDATE aluno SET nome = ?, idade = ?, estado = ? WHERE id = ?"; //  SELECIONAR tudos os alunos que possuir o id informado

            //  Preparar o statement com os parametros recebidos
            PreparedStatement stmt = connection.prepareStatement(sql);
            stmt.setString(1, aluno.getNome()); //  informar o valor do primeiro '?'
            stmt.setInt(2, aluno.getIdade()); //  informar o valor do segundo '?'
            stmt.setString(3, aluno.getEstado()); //  informar o valor do terceiro '?'
            stmt.setInt(4, aluno.getId()); //  informar o valor do quarto '?'

            //  Executar a inserção e retorna a linha afetada
            int rowsAftected = stmt.executeUpdate();

            System.out.println("AlunoDAO: SUCESS on update() aluno on rows: " + rowsAftected);
        } catch (SQLException throwables) {
            System.out.println("AlunoDAO: FAIL on update()");
            throwables.printStackTrace();
        }
    }
}
```

Exemplo abaixo e do arquivo resources: **connection.properties**, e um arquivo criado com as propriedades da conexão, que será usado pela classe: **ConnectionFactory**, deste modo, será mais fácil leitura/manutenção

```
##	Arquivo: resources/connection.properties

## ** PARA MySql  (apagar/ativar os ## abaixo)
jdbc.driver=mysql
db.address=localhost
db.name=digital_innovation_one
db.user.login=root
db.user.password=password

## ** PARA PostgreSQL (apagar/ativar os ## abaixo)
## jdbc.driver=postgresql
## db.address=localhost
## db.name=digital_innovation_one
## db.user.login=postgres
## db.user.password=password
```

Exemplo abaixo da classe que executará

```
package one.digitalinnovation.Aula07;

import one.digitalinnovation.Aula07.dao.AlunoDAO;
import one.digitalinnovation.Aula07.model.Aluno;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class MainAula {

    public static void main(String[] args) throws SQLException {
        AlunoDAO alunoDAO = new AlunoDAO();

        //  Consultar
        List<Aluno> alunos = alunoDAO.list();
        alunos.stream().forEach(System.out::println);
        //  SUCESS Connection
        //  Aluno {id='1', nome='Pedro', idade='20', estado='RJ'}
        //  Aluno {id='2', nome='Maria', idade='35', estado='AC'}
        //  Aluno {id='3', nome='Joao', idade='10', estado='SC'}
        //  Aluno {id='4', nome='Ana', idade='51', estado='GO'}

        //  Consulta com filtro
        Aluno alunoParaConsulta = alunoDAO.getById(1);
        System.out.println(alunoParaConsulta);

        //  Inserção
        Aluno alunoParaInsercao = new Aluno(
                "Matheus",
                43,
                "SP"
        );
        alunoDAO.create(alunoParaInsercao); //  Inserção

        //  Deletar
        alunoDAO.delete(5);
        alunoDAO.list().stream().forEach(System.out::println);  //  retornar nova Consulta

        //  Atualizar
        Aluno alunoParaAtualizar = alunoDAO.getById(3);
        alunoParaAtualizar.setNome("Joaquim");
        alunoParaAtualizar.setIdade(18);
        alunoParaAtualizar.setEstado("RS");
        alunoDAO.update(alunoParaAtualizar);    //  Atualziar
        alunoDAO.list().stream().forEach(System.out::println);  //  retornar nova Consulta
    }
}
```



Existem 3 métodos para executar comandos SQL:

- `execute()` - Pode executar qualquer tipo de SQL. Retorna um valor booleano e executa uma instrução SQL estática que está presente no objeto de instrução preparado.
- `executeQuery()` - Usado para executar **SELECT**. Retorna um **ResultSet** da instrução preparada no momento.
- `executeUpdate()` - Usado para comandos de alteração de banco de dados (**INSERT**, **UPDATE**, **DELETE**, **CREATE**, **ALTER**). Retorna o número de linhas afetadas pelas instruções DML.



#### ResultSet

Objeto que contem os dados de uma determinada consulta no Banco de Dados (normalmente com **SELECT**).

São utilizados os **métodos getters para buscar dados** do ResultSet. Tais como: **getInt**, **getFloat** e **getString**.

O método `next()` é utilizado para percorrer os registro do **ResultSet** (Normalmente utilizado junto com **while**).





# Referencias

Docs Oracle. **Class DriverManager** - https://docs.oracle.com/javase/8/docs/api/java/sql/DriverManager.html

Geeksforgeeks. **Establishing JDBC Connection in Java** - https://www.geeksforgeeks.org/establishing-jdbc-connection-in-java/

Geeksforgeeks. **Types of Statements in JDBC** -https://www.geeksforgeeks.org/types-of-statements-in-jdbc/
