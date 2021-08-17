# Segregando a aplicação em Módulos e trabalhando com Rotas

#### Exemplo Simples de Pagina login

Criando um modulo login: `app\features\login\login.module.ts`  ou comando `ng g module features\login` contendo:

```
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './containers/login/login.component';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        {
            //  Quando for para a url localhost:4200/login
            //  sera redirecionado para a roda de LoginComponent
            path: 'login', component: LoginComponent
          }
    ])
  ]
})
export class LoginModule {
}
```



Criando os componentes de login: `app\features\login\containers\login\login.component` ou comando `ng g component features\login\containers\login` contendo:
**Login.component.html**

```
<form [formGroup]="form" (ngSubmit)="login()">
    <label>Nome</label>
    <input formControlName="name">
  
    <label>E-mail</label>
    <input formControlName="email">
  
    <button class="primary">Login</button>
</form>
```

**Login.component.ts**

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

  // Metodo login()
  login() { }
}
```



Agora em **app.module.ts**, precisa apenas adicionar o `LoginModule` no **@NgModule-imports** e remover o `LoginComponente` de **@NgModule-declarations** 

```
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    RouterModule.forRoot([
      {
        //  path vazio estamos dizendo que é na url root (localhost:4200)
        //  Quando ele for para root da aplicação (localhost:4200) 
        //  ele redireciona para 'login' url: localhost:4200/login
        path: '', redirectTo: 'login', pathMatch: 'full'
      }
    ]),
    StoreModule.forRoot({userContext: reducer}, {})
    //,
    //StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    //EffectsModule.forRoot([]),
    //StoreRouterConnectingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Agora em **app.component.html**, adicione a diretiva de **Router**, [`router-outlet`](https://angular.io/api/router/RouterOutlet)

```
<router-outlet></router-outlet>
```



## Shared Module

O **shared** é onde todos os componentes compartilhados, pipes, filters e services devem ir. A pasta **shared** pode ser importado em qualquer module. Assim esses itens serão reutilizados. O shared module deve ser independente do restante do aplicativo. Portanto, não deve ter referências de outro módulo.

No **shared** ficam os components que você usa em mais contextos, o VMessage por exemplo é um caso, ele aparece no SignIn, no SignUp e outros lugares.



## Pasta Core

A ideia do **Core** é basicamente dizer que ele é um *component essencial* em um **contexto mais geral**, o Header por exemplo está **para toda a aplicação**, diferente do PhotoDetails que é mais específico.

Tem um *componente* que aparece em **vários lugares**? *Shared*. Tem um **component essencial no contexto geral**, *Core*.



# Referência

Balta. **Angular: Rotas, Guardas e Navegação** - https://balta.io/blog/angular-rotas-guardas-navegacao

Bruno Brito. **Angular - Como estruturar componentes em grandes projetos** - https://www.brunobrito.net.br/estruturando-components-angular/

Malcoded. **Lern how to split your Angular App into Modules [Includes Lazy-Loading]** - https://malcoded.com/posts/angular-fundamentals-modules/

Wands Macêdo **Pasta/módulo Core** - https://cursos.alura.com.br/forum/topico-pasta-modulo-core-76030