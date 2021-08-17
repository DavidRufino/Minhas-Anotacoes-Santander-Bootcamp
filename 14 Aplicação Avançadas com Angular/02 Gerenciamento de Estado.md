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
import { User } from "../features/shared/models/user.model";

// Primeiro é feito a definição do estado(State)
export interface AppState {
    // Esta é a 'cara' do State, que vai aparecer na STORE.
    // A STORE vai ser populada com State que tem este 'tipo' (User)
    user: User | undefined; 
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

Antes de sair criando ACTION, verifique se a necessidade em criar uma **ACTION** e como essa necessidade vai se comportar. Vejamos no nosso **login.component.html** que estará localizado em `features\login\containers\login` ou o comando `ng g component features\login\containers\login`

```
<form [formGroup]="form" (ngSubmit)="login()">
    <label>Nome</label>
    <input formControlName="name">
  
    <label>E-mail</label>
    <input formControlName="email">
  
    <button class="primary">Login</button>
  </form>
```

Uma vez que for pressionado o button: **login** será executado o method: `login()` localizado em **login.component.ts** (na mesma pasta que **login.component.html**)

```
import { Component } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() { }

  login() { }
}
```

`login()` fara uma chamada de serviço, que retornara nosso **usuário**. Uma vez que, usuário seja retornado, temos que rotear ele para dentro.



Conforme o <u>NGRX STATE MAGAGEMENT LIFECYCLE</u>. A forma que o **COMPONENT** tem, de se comunicar com **STORE** é disparando uma **ACTION**.

Vamos criar então o arquivo **app.actions.ts** que ficará em `src\app\state\`  para fazer as definições da **ACTION**:

```
import { createAction, props } from "@ngrx/store";

//  Diferente do REDUCER, que tem uma definição de state, tendo que registrar ele no modulo etc
//  Uma ACTION nada mais é que uma função, nao precisamos registrar o doLogin em lugar algum
//  so precisamos definir e exportar esta constante para que possamos tuilzia-la em qualquer lugar
export const doLogin = createAction(
    //  createAction espera receber pelo menos um parametro
    //  PADROES do NGRX:
    //  As ACTIONS são definidas em duas partes:
    //  Primeiro fica dentro de [] ou colchetes 
    //  e o Segundo fica fora
    //  A informação que estiver dentro dos colchetes, normalmente é o contexto desta
    //  de onde esta ACTION esta sendo disparada
    //  no caso: [Login]
    '[Login] Do Login',

    //  Forma de passa a informação para dentro da STORE
    props<{ name: string, email: string }>(),
);

//  Agora que temos uma definição na nossa ACTION
//  Podemos despacha-la para dentro do nosso login.component.ts
```

Uma Action possui um tipo, e este tipo não e obrigatório ser único,mas é mais interessante ter tipos únicos, **para não gerar conflitos**, quando estiver fazendo definições dentro do **REDUCER**.



## Component

Voltando para o **login.component**, vamos chamar o method `doLogin()` que foi criado no **ACTION**

```
import { Component } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as fromAppActions from '../../../../state/app.actions';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(private store: Store<AppState>) {
    //  Primeiro, importaremos o STORE no nosso COMPONENT
  }

  login() {
    //  Agora podemos utilizar a STORE para disparar a informação
    this.store.dispatch(fromAppActions.doLogin(this.form.value)); // Aqui vamos dispachar uma ACTION
    // Como parametro deste dispatch, e esperado receber uma ACTION
  }
}
//  Se salvarmos agora e preenchermos o formulario e clicar no button login, nos nao iremos ver a STORE atualizar ainda. verifique no Console Redux DevTools do Chrome
```



Voltando para o **app.reducer.ts** 

```
import { Action, createReducer, on } from "@ngrx/store";
import { User } from "../features/shared/models/user.model";
import * as fromAppActions from './app.actions';

// Primeiro é feito a definição do estado(State)
export interface AppState {
    // Esta é a 'cara' do State, que vai aparecer na STORE.
    // A STORE vai ser populada com State que tem este 'tipo' (User)
    user: User | undefined; 
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
    // AGORA NA PARTE 2, depois de ter criado o action e editado o component.
    //  basicamente, faremos um switch case
    //  O createReducer, depois de initialState, é aceitavel N parametros
    //  e estes parametros tem este tipo on()
    //  que vai receber
    // LEIA: Quando esta actio (fromAppActions.doLogin) for disparada, vamos receber este estado e devolver o mesmo estado
    on(fromAppActions.doLogin, (state, { name, email }) => ({
        ...state,
        user: {
            ...state.user,
            name,
            email,
        }
    })), 
    // ...state significa: ok este objeto que estou retornando, ele é uma copia do meu state atual, mas calma, quero modificar o user
    // para poupar problemas futuros, se poem o ... caso tenha que extender o AppState, pondo mais informações, alem de user
    // o ...state.user, e um exemplo apra poupar problemas futuros, caso tenha que adicionar, por exemplo, o atributo id ou telefone no user
    //  Agora o REDUCER recebera as informações de ACTION que foi criada no formulario login

    // { name, email } tem que ser igual a como foi definido no ACTION no method doLogin();
);

export function reducer(state: AppState | undefined, action: Action): AppState {
    // Temos aqui uma função pura, que aceita o
    // STATE atual, uma action e retorna o STATE modificado
    // com retorno chamando o appStateReducer
    return appStateReducer(state, action);
}
```

Agora no **Redux DevTool**, podemos ver, em State, o nome e o email setado no formulário. Agora podemos obter a informação do componente, e injeta-lo dentro do State.



## Effects

No caso do **login**, precisamos fazer uma chamada para o **SERVICE** , que ira popular a **STORE** com o resultado da chamada do **SERVICE**, que ira retornar o nosso *usuário*. Depois que esta chamada retornar, é preciso 'routear' o *usuário* para dentro da aplicação. 

Acontece que o **REDUCER** não é feito para esta tarefa, o **REDUCER** recebe o State atual, recebe uma **ACTION** e devolve um **novo State modificado**. 

Para fazer a chamada ao **SERVICE**, para 'routear' em outro lugar, nos não utilizamos o **REDUCER** (como é mostrado na **imagem do DIAGRAMA**), nos utilizaremos o **EFFECTS**.

O **EFFECTS** é responsável por lidar com os **Side Effects** que uma **ACTION** pode ter. 

Agora vamos criar um **EFFECTS** que será responsável por fazer o login e no final de todo o fluxo, teremos a nossa **STORE** atualizada e o nosso *usuário* 'routeado' para dentro da aplicação.

Em `src\app\state\` criaremos o arquivo chamado: **app.effects.ts**

```
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import * as fromAppActions from "./app.actions";

@Injectable()
export class AppEffects {

    //  Declarando o nosso primeiro 'Effects'
    //  O EFFECT responde a uma ACTION
    dologin$ = createEffect(() => this.actions$
        .pipe(
            ofType(fromAppActions.doLogin),
            map(({ name, email }) => console.log(name, email)),
        ),
        {dispatch: false}
    );

    //  Declarar o nosso construtor, recebendo o Actions
    //  este Actions extend Observable, por isso o 'dollar' ($) 
    constructor(private actions$: Actions){  
    }
}
```

Já em **app.module.ts** adicionaremos o `EffectsModule.forRoot([AppEffects])` não esquecendo de importar `import { AppEffects } from './state/app.effects';`

Agora no **Redux DevTool**, podemos ver, em Action, State, e no Console o valor 'printado' de login pelo **app.effects**. No momento, nos configuramos o **app.effects** para apenas dar um `console.log()`.



Agora vamos atualizar o **app.effects**, para que ele faça oque e esperado por ele, que seria, fazer a  chamada do **SERVICE**, esperar a chamada retornar e etc.

```
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { LoginService } from "../features/shared/services/login.service";
import * as fromAppActions from "./app.actions";

@Injectable()
export class AppEffects {

    //  Declarando o nosso primeiro 'Effects'
    //  O EFFECT responde a uma ACTION
    dologin$ = createEffect(() => this.actions$ //  estamos fazendo um pipe do observable que vai emitir todas as action que a app despachar
        .pipe(  // dentro do pipe
            ofType(fromAppActions.doLogin), // filtrando todas as actions, para passar so as que foram desse tipo especifico
            mergeMap(({ name, email }) => this.loginService.login(name, email) // aqui estamos utilizando as informacoes que foram passadas, para fazer uma chamada ao Service
                .pipe(  // dependendo do resultado
                    map(user => {
                        this.router.navigate(['']); //  REDIRECIONAR PARA UMA PAGINA/ROUTER quando login Sucess
                        return fromAppActions.doLoginSucess({ user });    // Sucess é disparado
                    }),
                    catchError(() => of(fromAppActions.doLoginFailure())),  // ou failure
                ),
            ),
        ),
    );

    //  Declarar o nosso construtor, recebendo o Actions
    //  este Actions extend Observable, por isso o 'dollar' ($) 
    constructor(private actions$: Actions,
        private loginService: LoginService,
        private router: Router) {
    }
}
```

Em **app.actions.ts** adicione os

```
import { User } from "../features/shared/models/user.model";
...
//  Adicionado para o effect retornar no caso de sucesso ou falha
export const doLoginSucess = createAction(
    '[API] Do Login Sucess',
    props<{ user: User }>(), // Com a chamada sucess, retornar o User
)
export const doLoginFailure= createAction(
    '[API] Do Login Failure',
)
```



Agora atualizaremos o **app.reducer.ts** , para preencher a history com o usuário que foi retornado com sucesso.

```
import { Action, createReducer, on } from "@ngrx/store";
import { User } from "../features/shared/models/user.model";
import * as fromAppActions from './app.actions';

// Primeiro é feito a definição do estado(State)
export interface AppState {
    // Esta é a 'cara' do State, que vai aparecer na STORE.
    // A STORE vai ser populada com State que tem este 'tipo' (User)
    user: User | undefined; 
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
    // AGORA NA PARTE 2, depois de ter criado o action e editado o component.
    //  basicamente, faremos um switch case
    //  O createReducer, depois de initialState, é aceitavel N parametros
    //  e estes parametros tem este tipo on()
    //  que vai receber
    // LEIA: Quando esta actio (fromAppActions.doLogin) for disparada, vamos receber este estado e devolver o mesmo estado
    on(fromAppActions.doLoginSucess, (state, { user }) => ({
        ...state,
        user,
    })), 
    // ...state significa: ok este objeto que estou retornando, ele é uma copia do meu state atual, mas calma, quero modificar o user
    // para poupar problemas futuros, se poem o ... caso tenha que extender o AppState, pondo mais informações, alem de user
    // o ...state.user, e um exemplo apra poupar problemas futuros, caso tenha que adicionar, por exemplo, o atributo id ou telefone no user
    //  Agora o REDUCER recebera as informações de ACTION que foi criada no formulario login

    // { name, email } tem que ser igual a como foi definido no ACTION no method doLogin();
);

export function reducer(state: AppState | undefined, action: Action): AppState {
    // Temos aqui uma função pura, que aceita o
    // STATE atual, uma action e retorna o STATE modificado
    // com retorno chamando o appStateReducer
    return appStateReducer(state, action);
}
```

**login.service.ts** localizado em `app\features\shared\services` ou utilizando comando: `ng g service features\shared\services\login`

```
import { Injectable } from "@angular/core";

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class LoginService {

  login(name: string, email: string): Observable<User> {
    return of({ name, email })
      .pipe(delay(2000));
  }
}

```

Agora no **Redux DevTool**, podemos ver, a **ACTION** disparada e em seguida (com o delay adicionado) uma chamada para o **SERVICE** e em seguida, será redirecionado para a pagina especificada no router.



## Selector

Com **SELECTOR**, será possível, por exemplo, pegar apenas o **nome** do *usuário* da **STORE** e exibi-la na pagina. Para isso, vamos criar o **SELECTOR** em `src\app\state\` com nome **app.selectors.ts**

```
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../features/shared/models/user.model';
import { AppState } from './app.reducer';

// Da mesma forma que as ACTIONS e diferentemente dos REDUCERS e dos EFFECTS
// Os SELECTORS não precisam ser registrados em lugar algum
// Ele simplesmente e uma constant da mesma forma que as ACTIONS

// SELECTOR é um seletor que é responsavel por pegar uma propeties, que esta na raiz da STORE
// Ex.p: o 'userContext' exibido no Redux Extension
export const selectUserContext = createFeatureSelector<{ user: User }>('userContext');

export const selectUserName = createSelector(
  selectUserContext,
  (state: AppState) => state.user?.name,
);
```

Adicione ` <p>Ola, : {{ name$ | async }}</p>` no **login.component.html**

E em **login.component.ts**

```
import { Component } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from "rxjs";
import { AppState } from 'src/app/state/app.reducer';
import * as fromAppActions from '../../../../state/app.actions';
import * as fromAppSelectors from '../../../../state/app.selectors';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });

  name$: Observable<string | undefined>;

  constructor(private store: Store<AppState>) {
    //  Primeiro, importaremos o STORE no nosso COMPONENT
    // Agora vamos receber um novo valor toda vez que o nome do usuario for modificado
    this.name$ = this.store.pipe(select(fromAppSelectors.selectUserName)); 
  }

  login() {
    //  Agora podemos utilizar a STORE para disparar a informação
    this.store.dispatch(fromAppActions.doLogin(this.form.value)); // Aqui vamos dispachar uma ACTION
    // Como parametro deste dispatch, e esperado receber uma ACTION
  }
}
//  Se salvarmos agora e preenchermos o formulario e clicar no button login, nos nao iremos ver a STORE atualziar ainda
```

Agora quando o usuário fizer o login, o campo Name exibira o nome do usuário.



# Referência

Gabriel Feitosa. **AngularJS: Services** - https://gabrielfeitosa.com/angularjs-services/

Angular University. **Angular Service Layers: Redux, RxJs and Ngrx Store - When to Use a Store And Why?** - https://blog.angular-university.io/angular-2-redux-ngrx-rxjs/

Movile. **Construindo aplicações front-end reativas com NgRx** - https://movile.blog/construindo-aplicacoes-front-end-reativas-com-ngrx/

LogRocket por Wisdom Ekpot **Angular state management made simple with NgRx** - https://blog.logrocket.com/angular-state-management-made-simple-with-ngrx/#managingstateinfrontendapplications

LogRocket por Neo Ighodaro. **Why use Redux? A tutorial with examples** - https://blog.logrocket.com/why-use-redux-reasons-with-clear-examples-d21bffd5835/

Medium por Tanya Gray. **Understanding NgRx Effects and the Action Stream** - https://medium.com/@tanya/understanding-ngrx-effects-and-the-action-stream-1a74996a0c1c

Dev por Salim Chemes. **How to implement ngrx-router-store** - https://dev.to/salimchemes/how-to-implement-ngrx-router-store-4552

ti-enxame por cartant. **Entendendo a finalidade do projeto ngrx router-store em comparação com o uso somente do roteador angular 2** - https://www.ti-enxame.com/pt/ngrx/entendendo-finalidade-do-projeto-ngrx-router-store-em-comparacao-com-o-uso-somente-do-roteador-angular-2/830340005/

