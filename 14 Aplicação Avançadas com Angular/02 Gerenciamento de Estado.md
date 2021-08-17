# Gerenciamento de Estado



## O que são Services

É o **objeto usado para organizar e/ou compartilhar estados de objetos e as regras de negócio da aplicação**. Ele é **singleton**, ou seja, há apenas uma instância disponível durante a vida útil da aplicação. Outra característica importante é a inicialização tardia (**lazily instantiated**), que só é efetuada quando o Angular identifica que tem algum componente dependente.

Opa, espera aí! **O *Controller* não é o lugar de controle da view?** Logo, **não é nele que eu tenho que ter as regras de negócio?** Sim, o **Controller** de fato controla a camada de visão, porém, **não é ele que armazena as regras que são compartilhadas na aplicação**. O **Controller** gerencia **APENAS as regras referentes a VIEW** a qual está associado.  Vou enumerar porquê as regras devem ir para um **SERVICE**:

1. O **Controller** é criado sempre que acessamos a *VIEW* que o tem como dependência e **é destruído assim que essa dependência não é mais necessária**, por *exemplo*, quando há mudança na rota e a *VIEW* é substituída por uma nova. Então, quando queremos que o estado do objeto tenha o lifecycle independente da camada de visão, usamos **SERVICE** por ser **singleton;**
2. Através da injeção de dependência do Angular, o *service* pode ser utilizado por toda a aplicação. O controlador tem a limitação de não ser instanciado pelo *provider*, o serviço ***$controller*** é o responsável por inicia-lo. **[Aqui](https://github.com/angular/angular.js/wiki/Understanding-Dependency-Injection)** você tem mais detalhes sobre a injeção de dependência do Angula, **recomendo a leitura**;
3. O **Angular** dispõe de uma vasta opção de **SERVICES**, por exemplo o [$http](https://docs.angularjs.org/api/ng/service/$http), para facilitar a comunicação remota. Além disso, é muito fácil criar o nosso próprio serviço;
4. A centralização das regras em um service **facilita na Manutenibilidade e testabilidade do código**.



# Desenvolvendo State Management com NgRx

Com o **Angular**, projetar e desenvolver a **Camada VIEW** de nosso aplicativo é mais simples do que nunca.

Mas a **camada de Service** (também conhecida como camada de dados), que é realmente o **coração funcional do aplicativo**.

Um **Sistema de Gerenciamento de Estado** completo deve permitir que você modele um estado - por exemplo, crie uma representação simples de como o estado deve ser, atualize seu valor, monitore o estado quando o valor muda e recupere os valores do estado.

### NgRx

É um conjunto de *bibliotecas* criado especificamente para **Gerenciar Estados em Aplicações *Angular*** totalmente baseado em **RxJS**. Ele torna o desenvolvimento Angular mais fácil, simplificando o estado do aplicativo em objetos e reforçando o fluxo de dados unidirecional.

Fortemente inspirada pelo **Redux** original, ela compartilha dos mesmos conceitos fundamentais de arquitetura como **stores**, **actions** e **reducers**. [NGRX DOC](https://ngrx.io/guide/store)

As bibliotecas incluídas no pacote **NgRx** incluem:

- [Store](https://ngrx.io/guide/store)
- [Effects](https://ngrx.io/guide/effects)
- [Entity](https://ngrx.io/guide/entity)
- [ComponentStore](https://ngrx.io/guide/component-store)
- [Router Store](https://ngrx.io/guide/router-store)



<img src="img/20210814170255.png" width="70%;" />

> Tirando as setas do **SELECTOR** e **COMPONENT**. Elas **NÃO SÃO OBRIGATORIAS**. **ACTION** não necessariamente precisa cair em **REDUCER**. E o **EFFECTS** não necessariamente precisa retornar uma nova **ACTION**

- **`STORE`** - É um gerenciamento de estado **global**, ela **centraliza a aplicação INTEIRA**; Basicamente é um **JSON GIGANTE** (dependendo da aplicação). A **STORE** armazenara o estado da aplicação exemplo: ira adicionar o usuário que esta logado, as listas que a aplicação possui, estado de loaders e etc. **STORE** é a "Fonte da Verdade", os componentes vão simplesmente 'refletir' o **estado** que esta na **STORE**. **Reduzindo as inconsistência** na aplicação;
- **`COMPONENT`** - Ele se comunica com **STORE** através da **`ACTION`**; Um **`COMPONENT`** dispara uma **ACTION** e esta **`ACTION`** PODE acionar o REDUCER>STORE **MAS** ao mesmo tempo, a mesma **ACTION** também pode gerar um side **`EFFECTS`** ;
- **`REDUCER`** - Ele pega o estado atual da **STORE**, vai misturar com a **`ACTION`** que foi disparada e **vai gerar um novo Estado**;
- **`SELECTOR`** - É utilizada para extrair "Pedaços" extraindo apenas o que é preciso (exp.: só a lista, só o usuário etc) da **STORE** e retornar um **Observable**, sendo possível dar **subscribe** e atualizar o **COMPONENT**. Toda vez que a **STORE** for modificada, o **COMPONENT** conseguira reagir a essas mudanças;
- **`EFFECTS`** - É o responsável por fazer a **comunicação HTTP** ou se precisar fazer, por exemplo: mudar  o estado, consumir Cookies, local history ou precise combinar informação; Uma **REQUEST HTTP é asynchronous (assíncrona)**. Quando a **REQUEST HTTP** retornar, será preciso atualizar a **`STORE`**. Então os **EFFECTS** também podem, no final da execução, disparar uma nova **ACTION**. E esta **`ACTION`** NÃO vai para **`COMPONENT`**. ela vai direto para o **`REDUCER`** podendo então, modificar a **`STORE`**;



### NgRx Store

É um **Sistema de Gerenciamento de Estado** inspirado no **Redux** que permite usar **Observables** para gerenciar o estado em um aplicativo Angular. A principal vantagem de usar o **NgRx Store** é a capacidade de **Armazenar todos os Estados em uma Única Árvore** que pode ser acessada de **qualquer parte do aplicativo**.

### NgRx Effects

Nos permitem ouvir tipos de ação específicos e "fazer algo" quando essa ação acontece. Qualquer efeito que você escrever também é uma **Observable**.

Um **`EFFECTS`** é uma **Observable** que usa o Action Stream como sua fonte e também como seu destino. Ou seja, um efeito **Subscribes** para o Action Stream, e também pode **Publish** para o fluxo de ação.

### NgRx Router Store

Existe para que seja possível que a **STORE** seja a **fonte única da verdade** para o estado de roteamento de um aplicativo. Se um aplicativo usa rotas/navegação, o **roteamento ou router se torna uma parte essencial do estado do aplicativo**. **Router Store** servira para vincular o roteamento com a **NgRx Store**. Cada vez que o router mudar, uma ação será despachada e atualizará a **STORE** por meio de um **REDUCER**. 



# Aplicativo Angular simples usando NgRx

1. Instalando o Angular CLI: `npm install -g @angular/cli`
2. Criando um novo projeto Angular, no local especificado no **Terminal**: `ng new [NOME-DO-PROJETO]`
3. Com o projeto Angular criado, abra o diretório do projeto pelo **Terminal**: `dir` e `cd [NOME-DO-PROJETO]`
4. Instalando o [NgRx Store](https://ngrx.io/guide/store/install):  `ng add @ngrx/store@latest`
5. Instalando o [NgRx Store devtools](https://ngrx.io/guide/store-devtools/install):  `ng add @ngrx/store-devtools@latest`
6. Instalando o [NgRx Effects](https://ngrx.io/guide/effects/install): `ng add @ngrx/effects@latest`
7. Instalando o [NgRx Router Store](https://ngrx.io/guide/router-store/install): `ng add @ngrx/router-store@latest`



Em **app.module.ts** , podemos ver que foram importados os Module:

```
...
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  ...
  imports: [
    ...
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot()
  ],
  ...
```

- `StoreModule.forRoot` - ***NgRx Store***. Implementação completa de uma biblioteca para controle de estado em aplicações Angular totalmente **Redux-like** que utiliza extensões reativas (*RxJS*) em sua base. Ele espera receber um **app REDUCER map**;
- `StoreDevtoolsModule.instrument` - ***NgRx Store devtools***. Serve para fazer a conexão com o estado da nossa aplicação, com a **extensão do Chrome [Redux DevTool](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)**. É uma ferramenta que permite debugar em detalhes as mudanças de estado e que possui outros recursos interessantes, como navegar (voltar ou avançar) no tempo entre as mudanças ocorridas;
- `EffectsModule.forRoot` -  ***NgRx Effects***. Biblioteca responsável por lidar com “efeitos colaterais” (*side-effects*) causados por *actions* que realizam tarefas assíncronas (como requisições http por ex.), isolando o tratamento desses efeitos de funções puras responsáveis somente por cuidar de mudanças de estado;
- `StoreRouterConnectingModule.forRoot` - ***NgRx Router Store***. Serve para Conectar o Estado da Rota do Angular, e jogar essa informação dentro da **`STORE`**;



## Reducer

É uma função pura. É aonde estaremos criando um pedaço dentro da STORE. Será aonde se faz a **configuração do estado**. Criamos então em `src\app\state\` (opcional) o arquivo **app.reducer.ts** contendo:

```
import { Action, createReducer } from "@ngrx/store";
import { User } from "./shared/models/user.model";

// Primeiro é feito a definição do estado(State)
export interface AppState {
    // Esta é a 'cara' do State, que vai aparecer na STORE.
    // A STORE vai ser populada com State que tem este 'tipo' (User)
    user: User; 
}

export const initialState: AppState = {
    //  Inicialmente, a STORE tera esta informação
    user: undefined,    // user setado com undefined
};

/* Abaixo temos o Combo de definição de REDUCER */

const appStateReducer = createReducer(
    // createReducer é uma function do NgRx
    // É onde nos passamos o STATE inicial PRIMEIRO, depois é passado outras informações
    initialState,
);

export function reducer(state: AppState | undefined, action: Action): AppState {
    // Temos aqui uma função pura, que aceita o
    // STATE atual, uma action e retorna o STATE modificado
    // com retorno chamando o appStateReducer
    return appStateReducer(state, action);
}
```

Agora em **app.module.ts**,  o `StoreModule.forRoot({}, {}),` receberá o **REDUCER map** ficando assim: `StoreModule.forRoot({userContext: reducer}, {})`. Não esquecendo de dar `import { reducer } from './state/app.reducer';`



## Action





# Referência

Gabriel Feitosa. **AngularJS: Services** - https://gabrielfeitosa.com/angularjs-services/

Angular University. **Angular Service Layers: Redux, RxJs and Ngrx Store - When to Use a Store And Why?** - https://blog.angular-university.io/angular-2-redux-ngrx-rxjs/

Movile. **Construindo aplicações front-end reativas com NgRx** - https://movile.blog/construindo-aplicacoes-front-end-reativas-com-ngrx/

LogRocket por Wisdom Ekpot **Angular state management made simple with NgRx** - https://blog.logrocket.com/angular-state-management-made-simple-with-ngrx/#managingstateinfrontendapplications

LogRocket por Neo Ighodaro. **Why use Redux? A tutorial with examples** - https://blog.logrocket.com/why-use-redux-reasons-with-clear-examples-d21bffd5835/

Medium por Tanya Gray. **Understanding NgRx Effects and the Action Stream** - https://medium.com/@tanya/understanding-ngrx-effects-and-the-action-stream-1a74996a0c1c

Dev por Salim Chemes. **How to implement ngrx-router-store** - https://dev.to/salimchemes/how-to-implement-ngrx-router-store-4552

ti-enxame por cartant. **Entendendo a finalidade do projeto ngrx router-store em comparação com o uso somente do roteador angular 2** - https://www.ti-enxame.com/pt/ngrx/entendendo-finalidade-do-projeto-ngrx-router-store-em-comparacao-com-o-uso-somente-do-roteador-angular-2/830340005/

