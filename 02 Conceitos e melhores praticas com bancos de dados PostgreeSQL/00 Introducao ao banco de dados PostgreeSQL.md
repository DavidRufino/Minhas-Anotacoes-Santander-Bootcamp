# Introdução ao banco de dados PostgreeSQL 

com **Daniel Robert Costa** Database Engineer

### Fundamentos de banco de dados

### Conceitos e melhores práticas com banco de dados PostgreeSQL



##### Introdução

1. Fundamentos de banco de dados
2. Modelo relacional
3. introdução ao PostgreSQL

### Fundamentos de banco de dados

**Oque são dados?**

Valores brutos , fatos brutos. observações documentadas, registros soltos, que são recolhidos e armazenados sem sofrer qualquer tratamento.

![](D:\Users\David Rufino\Documents\Estudo, Escola\Cursos\Bootcamp Santander FullStack\02 Conceitos e melhores praticas com bancos de dados PostgreeSQL\20210704180349.png)

**Oque são informações?**

Estruturação de dados, organização de dados. Conjunto de dados relacionados entre si que geram valor, que criam sentidos aos dados. Material do conhecimento.

![](D:\Users\David Rufino\Documents\Estudo, Escola\Cursos\Bootcamp Santander FullStack\02 Conceitos e melhores praticas com bancos de dados PostgreeSQL\20210704180557.png)



### Modelos relacional

**Definição**

Modelo mais comum, que classifica e organiza as informacoes em tabelas com linhas e colunas. As linhas, ou tuplas, são os dados organizados, são os valores das tabelas, e as colunas são os atributos destes dados.

![](D:\Users\David Rufino\Documents\Estudo, Escola\Cursos\Bootcamp Santander FullStack\02 Conceitos e melhores praticas com bancos de dados PostgreeSQL\20210704181008.png)

Já a maquina entende da seguinte maneira:

telefone.1 = proprietario.1

telefone.2 = proprietario.2

telefone.3 = proprietario.3

telefone.4 = proprietario.4

telefone.5 = proprietario.5



**Tabelas**

Conjuntos de dados dispostos em colunas e linhas referentes a um objetivo comum. As colunas são consideradas como "campos da tabela", como atributos da tabela. As linhas de uma tabela são chamadas também de tuplas, e é onde estão contidos os valores, os dados.

#### **O que pode ser definido como tabelas?**

- **Coisas tangiveis**
  - Elementos fisicos (carro, produto, animal)

- **Funções**
  - Perfis de usuário, status de compra

- **Eventos ou ocorrências**
  - Produtos de um pedido, histórico de dados

#### **Colunas importantes**

- **Chave Primaria / Primary Key / PK**
  - Conjunto de um ou mais campos que nunca se repetem. Identidade da tabela. São Utilizados como indice de referencia na criacao de relacionamentos entre tabelas

- **Chave Estrangeira / Foreign Key / FK**
  - Valores de referencia a uma PK de outra tabela da mesma tabela para criar um relacionamento

![](D:\Users\David Rufino\Documents\Estudo, Escola\Cursos\Bootcamp Santander FullStack\02 Conceitos e melhores praticas com bancos de dados PostgreeSQL\20210704182330.png)



#### Sistema de Gerenciamento de Banco de dados

Ou sistemas de gestão de base de dados.

Chamamos pela sigla SGBD. Conjunto de programas ou software responsaveis pelo gerenciamento de um banco de dados.

Programas que facilitam a administracao de um banco de dados.

![](D:\Users\David Rufino\Documents\Estudo, Escola\Cursos\Bootcamp Santander FullStack\02 Conceitos e melhores praticas com bancos de dados PostgreeSQL\20210704182717.png)



#### Introdução ao PostgreSQL



**O que é o PostgreeSQL?**

Sistema de gerenciamento de banco de dados objeto relacional.

Teve inicio no Departamento de Ciência da Computação na Universidade da Califórnia em Berkeley em 1986.

SGBD Opensource.

![](D:\Users\David Rufino\Documents\Estudo, Escola\Cursos\Bootcamp Santander FullStack\02 Conceitos e melhores praticas com bancos de dados PostgreeSQL\20210704182919.png)



**Modelo do Cliente/servidor**

O modelo do PostgreSQL é um modelo cliente/servidor

Significa que você tem processos que acontece somente na maquina cliente e processos que acontecem dentro do servidor.

Processos que acontecem no Cliente são interface Grafica, Terminal ou Aplicação Web/Mobile;

![](D:\Users\David Rufino\Documents\Estudo, Escola\Cursos\Bootcamp Santander FullStack\02 Conceitos e melhores praticas com bancos de dados PostgreeSQL\20210704183337.png)

**Principais caracteristicas**

- **OpenSource**;
- **Point in time recovery** - Se ocorrer problema no banco dedados, voce consegue restauras os dados com todos os dados que ele tem;
- Linguagem procedural com suporte a varias linguagens de programacao (perl, python, etc);
- Views, functions, procedures, triggers;
- Consultas complexas e Common table expressions (CTE);
- Suporte a dados geograficos (PostGIS);
- Controle de concorrencia multi-versão;



**Instalação e documentação do PostgreeSQL**

Site oficial: www.postgresql.org

Download com instruções passo a passo: www.postgresql.org/download

Documentação completa: www.postgresql.org/docs/manuals

===========================================

### Instalação do PostgreSQL no Ubuntu

...

### Instalação do PostgreSQL no CentOS/RedHat

**Instalar repositorio**

yum install [URL]

**Instalar o client**

yum install postgresql11

**Instalar o servidor**

yum install postgresql11-server

**Iniciar o cluster**

/usr/pgsql-11/bin/postgresql-11-setup initdb

**Habilitar o servico postgresql e iniciar nosso DB**

systemctl start postgresql-11

...



### Instalação do PostgreSQL no Windows

1. Instalação do PostgreSQL no Windows

