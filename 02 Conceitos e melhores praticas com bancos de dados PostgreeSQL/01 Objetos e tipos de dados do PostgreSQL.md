# Objetos e tipos de dados do PostgreSQL



## O que é o arquivo postgreSQL.conf



#### Configuração

1. **O arquivo postgresql.conf**
2. **O arquivo pg_hba.conf**
3. **O arquivo pg_ident.conf**
4. **Comandos administrativos**

****************

### Parte 1: O arquivo PostgreSQL.conf

**Definição**

Arquivo onde estão definidas e armazenadas todas as configurações do servidor PostgreSQL.

Alguns parâmetros só podem ser alterados com uma reinicialização do banco de dados.

A view **pg_settings**, acessada por dentro do banco de dados, guarda todas as configurações atuais.

**postgresql.conf**

Ao acessar a view **pg_settings**, é possível visualizar todas as configurações atuais:

_SELECT name, setting_ _FROM pg_settings;_

Ou é possível usar o comando **SHOW [parâmetro]**;

#### Localização do arquivo postgresql.conf

Por padrão, encontra-se dentro do diretório **PGDATA** definido no momento da inicialização do cluster de banco de dados.

No sistema operacional Windows, se o PostgreSQL foi instalado a partir do repositório oficial, o local do arquivo postgresql.conf será em **[UNIDADE:] >Program Files > PostgreSQL > [VERSION] > data**



#### Configurações de conexão

- **LISTEN_ADDRESSES** - Endereços TCP/IP das interfaces que o servidor PostgreSQL vai escutar/liberar conexoes.
- **PORT** - A porta TCP que o servidor PostgreSQL vai ouvir. o padrão é 5432.
- **MAX_CONNECTIONS** - Numero maximo de conexao simultaneas no servidor PostgreSQL
- **SUPERUSER_RESERVED_CONNECTIONS** - Numero de conexoes (slots) reservadas para conexoes ao banco de dados de super usuarios.

#### Configuracoes de autenticacao

- **AUTHENTICATION_TIMEOUT** - Tempo maximo em segundos para o cliente conseguir uma conexao com o servidor.
- **PASSWORD_ENCRYPTION** - Algoritmo de criptografia das senhas dos novos usuarios criados no banco de dados.
- **SSL** Habilita a conexao criptografada por SSL (somente se o postgreSQL foi compilado com suporte SSL)



#### Configurações de memoria

- **SHARED_BUFFERS** - Tamanho da memoria compartilhada do servidor PostgreSQL para cache/buffer de tabelas, indices e demais relações.
- **WORK_MEM** - Tamanho da memoria para operacoes de agrupamento e ordenação (ORDER BY, DISTINCT,MERGE JOINS).
- **MAINTENANCE_WORK_MEM** - Tamanho da memoria para operacoes como VACUUM, INDEX. ALTER TABLE.

******************************************************

### Parte 2: O arquivo pg_hba.conf

Arquivo responsavel pelo controle de autenticacao dos usuarios no servidor PostgreSQL.

O formato do arquivo pode ser:

![](https://raw.githubusercontent.com/DavidRufino/Minhas-Anotacoes-Santander-Bootcamp/master/02%20Conceitos%20e%20melhores%20praticas%20com%20bancos%20de%20dados%20PostgreeSQL/20210705204357.png)

**Metodos de autenticação**

- **TRUST** (conexao sem requisicao de senha)
- **REJECT** (rejeitar conexoes)
- **MD5** (criptografia md5)
- **PASSWORD** (senha sem criptografia)
- **GSS** (generic security service application program interface)
- **SSPI** (security support provider interface - somente para Windows)
- **KRB5** (kerberos V5)
- **IDENT** (utiliza o usuario do sistema operacional do cliente via ident server)
- **PEER** (utiliza o usuario do sistema operacional do cliente)
- **LDAP** (Idap server)
- **RADIUS** (radius server)
- **CERT** (autenticação via certificado ssl do cliente)

![](https://raw.githubusercontent.com/DavidRufino/Minhas-Anotacoes-Santander-Bootcamp/master/02%20Conceitos%20e%20melhores%20praticas%20com%20bancos%20de%20dados%20PostgreeSQL/20210705205204.png)



********

### Parte 3: O arquivo pg_iden.conf

Definição

Arquivo responsavel por mapear os usuarios do sistema operacional com os usuarios do banco de dados. 

Localizado no diretorio de dados PGDATA de sua instalacao.

A opcao ident deve ser utilizada no arquivo **pg_hba.conf**

![](https://raw.githubusercontent.com/DavidRufino/Minhas-Anotacoes-Santander-Bootcamp/master/02%20Conceitos%20e%20melhores%20praticas%20com%20bancos%20de%20dados%20PostgreeSQL/20210705205537.png)



*****

### Parte 4: Comandos administrativos

**Ubuntu**

- **pg_isclusters** - Lista todos os clusters PostgreSQL
- **pg_createcluster <version> <cluster name>** - Cria um novo cluster PostgreSQL
- **pg_dropcluster <version><cluster>** - Apaga um cluster PostgreSQL
- **pg_ctlcluster <version><cluster><action>** - Start, Stop, Status, Restar de clusters PostgreSQL

**CentOS / Red Hot**

- **systemctl <action> <cluster>**
  - **systemctl start postgresql- 11** - Inicia o cluster PostgreSQL
  - **systemctl status postgresql- 11** - Mostra o status do cluster PostgreSQL
  - **systemctl stop spotgresql- 11** - Para o cluster PostgreSQL
  - **systemctl restart postgresql-11** - Restarta o cluster PostgreSQL

**Windows**

![](https://raw.githubusercontent.com/DavidRufino/Minhas-Anotacoes-Santander-Bootcamp/master/02%20Conceitos%20e%20melhores%20praticas%20com%20bancos%20de%20dados%20PostgreeSQL/20210705210220.png)



#### Binarios do PostgreSQL

- createdb
- createuser
- dropdb
- dropuser
- initdb
- pg_ctl
- pg_basebackup
- pg_dump / pg_dumpall
- pg_restore
- psql
- reindexdb
- vacuumdb

****

### Arquitetura / Hierarquia

### Cluster

Coleção de bancos de dados que compartilham as mesmas configurações (arquivos de configuração) do PostgreSQL e do sistema operacional (porta, listen_addresses, etc).

### Banco de dados (database)

Conjunto de schemas com seus objetos/relações (tabelas, funções, triggers, views, etc)

### Schemas

Conjunto de objetos/relações (tabelas, funções, triggers, views, etc).

![](https://raw.githubusercontent.com/DavidRufino/Minhas-Anotacoes-Santander-Bootcamp/master/02%20Conceitos%20e%20melhores%20praticas%20com%20bancos%20de%20dados%20PostgreeSQL/20210705210958.png)

![](https://raw.githubusercontent.com/DavidRufino/Minhas-Anotacoes-Santander-Bootcamp/master/02%20Conceitos%20e%20melhores%20praticas%20com%20bancos%20de%20dados%20PostgreeSQL/20210705211041.png)

![](https://raw.githubusercontent.com/DavidRufino/Minhas-Anotacoes-Santander-Bootcamp/master/02%20Conceitos%20e%20melhores%20praticas%20com%20bancos%20de%20dados%20PostgreeSQL/20210705211109.png)

![](https://raw.githubusercontent.com/DavidRufino/Minhas-Anotacoes-Santander-Bootcamp/master/02%20Conceitos%20e%20melhores%20praticas%20com%20bancos%20de%20dados%20PostgreeSQL/20210705211137.png)



****

****

### Conheça a ferramenta PGA



1. **Visão geral do PGAdmin4**
2. **Configurar acesso ao servidor PostgreSQL**
3. **Visão geral do cluster e nosso primeiro comando**



#### Importante para conexão

1. **Liberar acesso ao cluster em postgresql.conf**
2. **Liberar acesso ao cluster para o usuário do banco de dados em pg_hba.conf**
3. **Criar/editar usuários**



**COMANDOS**

- **CREATE DATABSE [NAME]** - Cria um banco de dados
- **SELECT 1**;



****

## Como administrar usuários no banco de dados

**Objetivos da Aula**

1. Conceitos users/roles/groups
2. Administrando users/roles/groups
3. Administrando acessos (GRANT)



### Parte 1: Conceitos users/roles/groups

**Definição**

Roles (papeis ou funções), users (usuarios) e groupo de usuarios são "contas", perfis de atuação em um banco de dados, que possuem permissões em comum ou especificas.

Nas versões anteriores do PostgreSQL 8.1, **usuarios** e **roles** tinham comportamentos diferentes. Atualmente, **roles** e **users** são alias.

É possível que roles pertençam a outras **roles**;

![](https://raw.githubusercontent.com/DavidRufino/Minhas-Anotacoes-Santander-Bootcamp/master/02%20Conceitos%20e%20melhores%20praticas%20com%20bancos%20de%20dados%20PostgreeSQL/20210706161829.png)

### Parte 2: Administrando users/roles/groups

**Como funciona uma criação de um users/roles ou groups?**

**COMANDOS**

CREATE ROLE name [ [WITH] option [ ... ] ]

where option can be:

**SUPERUSER** - Ela é super user, uma role que é superuser ela e quase irrestrita. USE SOMENTE QUANDO FOR NECESSARIO.

**|NOSUPERUSER** - Padrão. Ela não é superuser

**|CREATEDB** - role com permissão de criar um banco de dados

**|NOCREATEDB** - Padrão. role sem permissão de criar banco de dados

**|CREATEROLE** - role com permissão de criar novas role

**|NOCREATEROLE** - Padrão. role sem permissão de criar novas role

**|INHERIT** - Role com essa permissão, sempre que permanecer a uma outra role ela vai herdar todas as permissões da outra role

**|NOINHERIT** - Padrão. role não herdara permissões da outra role

**|LOGIN** - Esta role tem permissão de se conectar ao banco de dados

**|NOLOGIN** - Padrão. role não tem permissão de se conectar ao banco de dados

**|REPLICATION** - Esta role tem permissão de fazer backup

**|NOREPLICATION** - Padrao. Esta role nao tem permissao de fazer backup

**|BYPASSRLS** - Trabalha mais com seguranca de nivel 

**|NOBYPASSRLS** - *

**|CONNECTION LIMIT connlimit** - Pode definir quantas conexões simultâneas a role pode ter no banco de dados

**|[ENCRYPTED] PASSWORD 'password'** - 

**|PASSWORD NULL** -

**|VALID UNTIL 'timestamp'** - Até que data essa role tem permissão ao banco de dados, tipo validade.

**|IN ROLE role_name [ ... ]** - DEPLECATED quando se cria um nova role, e defina essa IN ROLE, o novo usuário vai pertencer a role definida pelo IN ROLE

**| IN GROUP role_name [ ... ]**

**|ROLE role_name [...]** - A role que esta sendo informada, passa a pertencer ao grupo da nova role sendo criada

**|ADMIN role_name [...]** - Todas as rolas sendo definidas passaram a fazer parte da nova role e terão acessos administrativos dentro da nova role

**|USER role_name[...]** - DEPLECATED 

**|SYSID uid** - DEPLECATED

![](https://raw.githubusercontent.com/DavidRufino/Minhas-Anotacoes-Santander-Bootcamp/master/02%20Conceitos%20e%20melhores%20praticas%20com%20bancos%20de%20dados%20PostgreeSQL/20210706162535.png)

![](https://raw.githubusercontent.com/DavidRufino/Minhas-Anotacoes-Santander-Bootcamp/master/02%20Conceitos%20e%20melhores%20praticas%20com%20bancos%20de%20dados%20PostgreeSQL/20210706164555.png)

#### Associação entre roles

Quando uma role assume as permissões de outra role.

Necessário a opção **INHERIT**

No momento de criação da role:

- **IN ROLE** (passa a pertencer a role informada)
- **ROLE** (a role informada passa a pertencer a nova role)

Ou após a criação da role:

- GRANT [role a ser concedida] TO [role a assumir as permissões]



#### Como funciona essa dinâmica

CREATE ROLE professores NOCREATEDB NOCREATEROLE INHERIT NOLOGIN NOBYPASSRLS CONNECTION LIMIT -1;

CREATE ROLE daniel LOGIN CONNECTION LIMIT 1 PASSWORD '123' IN ROLE proffesores; - A role **daniel** passa a assumir as permissões da role **professores**

CREATE ROLE daniel LOGIN CONNECTION LIMIT 1 PASSWORD '123';

GRANT professores TO daniel;



#### Desassociar membros entre roles

REVOKE [role que será revogada] FROM [role que terá suas permissões revogadas];

REVOKE professores FROM daniel;



#### Alterando uma role

ALTER ROLE role_specification [WITH] option [...]

where options can be de same as CREATE.



#### Excluindo uma role

DROP ROLE role_specification;



### Parte 3: Administrando Acessos (GRANT)

**Definição**

São os privilegios de acesso aos objetos do banco de dados.

![](https://raw.githubusercontent.com/DavidRufino/Minhas-Anotacoes-Santander-Bootcamp/master/02%20Conceitos%20e%20melhores%20praticas%20com%20bancos%20de%20dados%20PostgreeSQL/20210706171430.png)

**DATABASE**

GRANT {{CREATE | CONNECT| TEMPORARY|TEMP}[...]| ALL [PRIVILEGES]} ON DATABASE databse_name [...] TO role_specification [...] [WITH GRANT OPTION]

**SCHEMA**

GRANT {{CREATE|USAGE} [...] | ALL [PRIVILEGES]} ON SHCEMA schema_name [...] TO role_specification [...] [WITH GRANT OPTION]

**TABLE** 

GRANT {{SELECT|INSERT|UPDATE|DELETE|TRUNCATE|REFERENCES|TRIGGER}[...]|ALL [PRIVILEGES] } ON { [TABLE] table_name [...] | ALL TABLES IN SCHEMA schema_name [...] } TO role_specification [...] [WITH GRANT OPTION]

**REVOKE** - Retira as permissões da role

**DATABASE**

REVOKE [GRANT OPTION FOR]{{CREATE|CONNECTION|TEMPORARY|TEMP}[...]|ALL[PRIVILEGES]} ON DATABASE databse_name [...] FROM {[GROUP] role_name| PUBLIC} [...] [CASCADE|RESTRICT]

**SCHEMA**

REVOKE [GRANT OPTION FOR] {{CREATE|USAGE} [...] |ALL[PRIVILEGES]} ON SCHEMA schema_name [...] FROM {[GROUP] role_name | PUBLIC} [...] [CASCADE|RESTRICT]

**TABLE**

REVOKE [GRANT OPTION FOR] {{SELECT|INSERT|UPDATE|DELETE|TRUNCATE|REFERENCES|TRIGGER}[...]|ALL [PRIVILEGES]} ON {[TABLE] table_name [...] | ALL TABLES IN SCHEMA schema_name [...] } FROM {[GROUP] role_name | PUBLIC } [...] | CASCADE | RESTRICT]

#### REVOGANDO TODAS AS PERMISSÕES (SIMPLIFICADO)

REVOKE ALL ON ALL TABLES IN SCHEMA [schema] FROM [role];

REVOKE ALL ON SCHEMA [schema] FROM [role];

REVOKE ALL ON DATABASE [database] FROM [role];



****

## Objetos e comandos do banco de dados



**Objetivos da Aula**

1. Database/Schemas/Objetos
2. Tabelas/Colunas/Tipos de dados
3. DML e DDL



### Parte 1: Database, Schemas e Objetos

**Database**

É o banco de dados.

Grupo de schemas e seus objetos, como tabelas, types, views,funcoes, entre outros. Seus schemas e objetos nao podem ser compartilhados entre si.

Cada database é separado um do outro compartilhando apenas usuarios/roles e configuracoes do cluster PostgreSQL.

**Schemas**

É um grupo de objetos, como tabelas, types, views, funcoes,entre outros.

É possivel relacionar objetos entre diversos chemas.

Por exemplo: schema public e schema curso podem ter tabelas com o mesmo nome (teste por exemplo) relacionando-se entre si.

**Objetos**

São as tabelas, views, funcoes, types, sequences, entre outros, pertencentes aos schemas.

**COMANDOS**

![](https://raw.githubusercontent.com/DavidRufino/Minhas-Anotacoes-Santander-Bootcamp/master/02%20Conceitos%20e%20melhores%20praticas%20com%20bancos%20de%20dados%20PostgreeSQL/20210706175212.png)

![](https://raw.githubusercontent.com/DavidRufino/Minhas-Anotacoes-Santander-Bootcamp/master/02%20Conceitos%20e%20melhores%20praticas%20com%20bancos%20de%20dados%20PostgreeSQL/20210706175448.png)

### Parte 2: Tabelas, Colunas e Tipos de dados

**Definição**

Conjunto de dados dispostos em colunas e linhas referentes a um objetivo comum.

As colunas sao consideradas como 'Campos da tabela', como atributos da tabela.

As linhas de uma tabela são chamadas também de tuplas, e é onde estão contidos os valores, os dados.

![](https://raw.githubusercontent.com/DavidRufino/Minhas-Anotacoes-Santander-Bootcamp/master/02%20Conceitos%20e%20melhores%20praticas%20com%20bancos%20de%20dados%20PostgreeSQL/20210706175823.png)

**NA PRATICA**

![](https://raw.githubusercontent.com/DavidRufino/Minhas-Anotacoes-Santander-Bootcamp/master/02%20Conceitos%20e%20melhores%20praticas%20com%20bancos%20de%20dados%20PostgreeSQL/20210706175912.png)



### Primary Key / Chave Primaria / PK

No conceito de modelo de dados relacional e obedecendo as regras de normalização, uma PK é um conjunto de um ou mais campos que nunca se repetem em uma tabela e que seus valores garantem a integridade do dado único e o utilização do mesmo como referencia para o relacionamento entre demais tabela.

- não pode haver duas ocorrências de uma mesma entidade com o mesmo conteúdo na PK
- A chave primaria não pode ser composta por atributo opcional, ou seja, atributo que aceite nulo.
- Os atributos identificadores devem ser o conjunto mínimo que pode identificar cada instancia de um entidade.
- Não devem ser usadas chaves externas.
- Não deve conter informação volátil.

![](https://raw.githubusercontent.com/DavidRufino/Minhas-Anotacoes-Santander-Bootcamp/master/02%20Conceitos%20e%20melhores%20praticas%20com%20bancos%20de%20dados%20PostgreeSQL/20210706180625.png)



### Foreign Key / Chave Estrangeira / FK

Campo, ou conjunto de campos que são referencias de chaves primarias de outras tabelas ou da mesma tabela.

Sua principal função é garantir a integridade referencial entre tabelas.

![](https://raw.githubusercontent.com/DavidRufino/Minhas-Anotacoes-Santander-Bootcamp/master/02%20Conceitos%20e%20melhores%20praticas%20com%20bancos%20de%20dados%20PostgreeSQL/20210706180829.png)



### Tipos de dados

Numeric Types, Monetary Types, Character Types, Binary Data Types, Date/Time Types, Boolean Type, Enumerated Types, Geometric Types, Network Address Types, Bit String Types, TextSearch Types, UUID Type, XML Type, XML Type, JSON Types, Arrays, Composite Types, Range Types, Domain Types, Object Idnetifier Types, pg_Isn Type, Pseudo-Types

![](https://raw.githubusercontent.com/DavidRufino/Minhas-Anotacoes-Santander-Bootcamp/master/02%20Conceitos%20e%20melhores%20praticas%20com%20bancos%20de%20dados%20PostgreeSQL/20210706181425.png)

![](https://raw.githubusercontent.com/DavidRufino/Minhas-Anotacoes-Santander-Bootcamp/master/02%20Conceitos%20e%20melhores%20praticas%20com%20bancos%20de%20dados%20PostgreeSQL/20210706181540.png)

![](https://raw.githubusercontent.com/DavidRufino/Minhas-Anotacoes-Santander-Bootcamp/master/02%20Conceitos%20e%20melhores%20praticas%20com%20bancos%20de%20dados%20PostgreeSQL/20210706181736.png)

![](https://raw.githubusercontent.com/DavidRufino/Minhas-Anotacoes-Santander-Bootcamp/master/02%20Conceitos%20e%20melhores%20praticas%20com%20bancos%20de%20dados%20PostgreeSQL/20210706181811.png)



### Parte 3: DML e DDL

#### **DML** ou Data Manipulation Language

É uma Linguagem de manipulação de dados: INSERT, UPDATE, DELETE, **SELECT** 

*obs.: **select**, alguns consideram como DML, outros como DQL, que significa Data Query Language, ou linguagem de consulta de dados

#### **DDL** ou Data Definition Language

É uma Linguagem de definição de dados: CREATE, ALTER, DROP

#### **CREATE / ALTER / DROP **

CREATE [objeto] [nome do objeto] [opções];

ALTER [objeto] [nome do objeto] [opções];

DROP [objeto] [nome do objeto] [opções];



***PARA DATABASE**

CREATE DATABASE dadosbancarios;

ALTER DATABASE dadosbancarios OWNER TO diretoria;

DROP DATABASE dadosbancarios;



***PARA SCHEMA**

CREATE SCHEMA IF NOT EXISTS banco;

ALTER SCHEMA bancos OWNER TO diretoria;

DROP SCHEMA IF EXISTS banco;



***PARA TABELAS**

CREATE TABLE [IF NOT EXISTS] [nome da tabela] (

​	[nome do campo] [tipo] [regras] [opções],

​	[nome do campo] [tipo] [regras] [opções]

);

ALTER TABLE [nome da tabela] [opções];

DROP TABLE [nome da tabela];

***MAIS EXEMPLOS PARA TABELAS**

CREATE TABLE IF NOT EXISTS banco(

codigo INTEGER PRIMARY KEY,

nome VARCHAR(50) NOT NULL,

data_criação TIMESTAMP NOT NULL DEFAULT NOW()

);

CREATE TABLE IF NOT EXISTS banco(

codigo INTEGER,

nome VARCHAR(50) NOT NULL,

data_criacao TIMESTAMP NOT NULL DEFAULT NOW(),

PRIMARY KEY (codigo)

);

ALTER TABLE banco ADD COLUMN tem_poupanca BOOLEAN;

DROP TABLE IF EXISTS banco;



**PARA INSERT**

INSERT INTO [nome da tabela] ([campos da tabela,]) VALUES ([valores de acordo com a ordem dos campos acima,]);

INSERT INTO [nome da tabela] ([campos da tabela,]) SELECT [valores de acordo com a ordem dos campos acima,];



**PARA UPDATE**

UPDATE [nome da tabela] SET

[campo1] = [novo valor do campo1],

[campo2] = [novo valor do campo2],

...

[WHERE + condições]

**ATENÇÃO: muito cuidado com os updates. Sempre utilize-os com condição.**

***EXEMPLO DE UPDATE**

UPDATE banco SET codigo = 500 WHERE codigo = 100;

UPDATE banco SET data_criacao = now() WHERE data_criacao IS NULL;



**PARA DELETE**

DELETE FROM [nome da tabela] [WHERE + condições]

**ATENÇÃO: muito cuidado com os deletes. Sempre utilize-os com condição.**

**EXEMPLO DE DELETE**

DELETE FROM BANCO WHERE codigo = 512;

DELETE FROM banco WHERE nome = 'Conta Digital';



**PARA SELECT**

SELECT [campos da tabela] FROM [nome da tabela] [WHERE + condicoes]

**DICAS DE BOAS PRÁTICAS = Evite sempre que puder o SELECT**

***EXEMPLO PARA SELECT**

SELECT codigo, nome FROM banco;

SELECT codigo, nome FROM banco WHERE data_criacao > '2019-10-15 15:00:00';

****

**DDL MÃO NA MASSA**

CREATE TABLE IF NOT EXISTS banco(
	numero INTEGER NOT NULL,
	nome VARCHAR(50) NOT NULL,
	ativo BOOLEAN NOT NULL DEFAULT TRUE,
	data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (numero)
);

CREATE TABLE IF NOT EXISTS agencia (
	banco_numero INTEGER NOT NULL,
	numero INTEGER NOT NULL,
	nome VARCHAR(80) NOT NULL,
	ativa BOOLEAN NOT NULL DEFAULT TRUE,
	data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(banco_numero, numero),
	FOREIGN KEY (banco_numero) REFERENCES banco (numero)
);

CREATE TABLE cliente(
	numero BIGSERIAL PRIMARY KEY,
	nome VARCHAR(120) NOT NULL,
	email VARCHAR(250) NOT NULL,
	ativa BOOLEAN NOT NULL DEFAULT TRUE,
	data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conta_corrente(
	banco_numero INTEGER NOT NULL,
	agencia_numero INTEGER NOT NULL,
	numero BIGINT NOT NULL,
	digito SMALLINT not null,
	cliente_numero BIGINT NOT NULL,
	ativa BOOLEAN NOT NULL DEFAULT TRUE,
	data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (banco_numero, agencia_numero, numero, digito, cliente_numero),
	FOREIGN KEY (banco_numero, agencia_numero) REFERENCES agencia (banco_numero, numero),
	FOREIGN KEY (cliente_numero) references cliente (numero)
);

CREATE TABLE tipo_transacao (
	id SMALLSERIAL PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	ativa BOOLEAN NOT NULL DEFAULT TRUE,
	data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cliente_transacoes(
	id BIGSERIAL PRIMARY KEY,
	banco_numero INTEGER NOT NULL,
	agencia_numero INTEGER NOT NULL,
	conta_corrente_numero BIGINT NOT NULL,
	conta_corrente_digito SMALLINT NOT NULL,
	cliente_numero BIGINT NOT NULL,
	tipo_transacao_id SMALLINT NOT NULL,
	valor NUMERIC(15,2) NOT NULL,
	data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (banco_numero, agencia_numero, conta_corrente_numero, conta_corrente_digito, cliente_numero) REFERENCES conta_corrente (banco_numero, agencia_numero, numero, digito, cliente_numero)
);

****



**Arquivo completo DDL e DML:**

github.com/drobcosta/digital_innovation_one
