| [ANTERIOR](00%20Primeiros%20passos%20para%20desenvolver%20com%20Angular.md) | [PRÓXIMO](02%20Segregando%20responsabilidades.md) |
| ------------------------------------------------------------ | ------------------------------------------------- |



# Lidando com vários componentes



## O que é Injeção de Dependência

Dependências são serviços ou objetos de que uma classe precisa para realizar sua função. [Injeção de dependência](https://angular.io/guide/dependency-injection#:~:text=Dependencies%20are%20services%20or%20objects,sources%20rather%20than%20creating%20them.&text=You%20can%20use%20Angular%20DI,and%20modularity%20in%20your%20applications.), ou DI, é um padrão de design no qual uma classe solicita dependências de fontes externas em vez de criá-las.



#### Exemplo

arquivo: **course.service.ts**

```
import { Injectable } from "@angular/core";
import { Course } from "./course";

@Injectable({
    providedIn: 'root'
})

export class CourseService {
    
    //  Method retrieveAll
    retrieveAll(): Course[] {
        return COURSES;
    }
}

var COURSES: Course[] = [
    {
        id: 1,
        name: 'Angular: CLI',
        releaseDate: 'November 2, 2019',
        description: 'Neste curso, os alunos irão obter um grande conhecimento nos principais recursos do CLI.',
        duration: 120,
        code: 'XLF-1212',
        rating: 3,
        price: 12.99,
        imageUrl: '/assets/images/cli.png',
    },
    {
        id: 2,
        name: 'Angular: Forms',
        releaseDate: 'November 4, 2019',
        description: 'Neste curso, os alunos irão obter um conhecimento aprofundado sobre os recursos disponíveis no módulo de Forms.',
        duration: 80,
        code: 'DWQ-3412',
        rating: 3.5,
        price: 24.99,
        imageUrl: '/assets/images/forms.png',
    },
    {
        id: 3,
        name: 'Angular: HTTP',
        releaseDate: 'November 8, 2019',
        description: 'Neste curso, os alunos irão obter um conhecimento aprofundado sobre os recursos disponíveis no módulo de HTTP.',
        duration: 80,
        code: 'QPL-0913',
        rating: 4.0,
        price: 36.99,
        imageUrl: '/assets/images/http.png',
    },
    {
        id: 4,
        name: 'Angular: Router',
        releaseDate: 'November 16, 2019',
        description: 'Neste curso, os alunos irão obter um conhecimento aprofundado sobre os recursos disponíveis no módulo de Router.',
        duration: 80,
        code: 'OHP-1095',
        rating: 4.5,
        price: 46.99,
        imageUrl: '/assets/images/router.png',
    },
    {
        id: 5,
        name: 'Angular: Animations',
        releaseDate: 'November 25, 2019',
        description: 'Neste curso, os alunos irão obter um conhecimento aprofundado sobre os recursos disponíveis sobre Animation.',
        duration: 80,
        code: 'PWY-9381',
        rating: 5,
        price: 56.99,
        imageUrl: '/assets/images/animations.png',
    }
];
```

- [`@Injectable`](https://angular.io/guide/dependency-injection#creating-an-injectable-service) - Especifica que o Angular pode usar esta classe no DI system. 
  O **metadata** `providedIn: 'root'` significa que a classe `CourseService` é visível para todo o aplicativo.



Arquivo: **course-list.component.ts**

```
import { Component, OnInit } from "@angular/core";
import { Course } from './course';
import { CourseService } from "./course.service";

@Component({
    templateUrl: './course-list.component.html'
})

export class CourseListComponent implements OnInit {
    
    _courses: Course[] = [];

    constructor(private courseService: CourseService) {}

    ngOnInit(): void {
        this._courses = this.CourseService.retrieveAll();
    }
}
```

Aqui, o `constructor()`especifica um tipo de `CourseService` e armazena a instância de `CourseService` em um campo privado chamado `courseService`. em **ngOnInit** quando a aplicação iniciar, ele ira recuperar tudo os `courses` de da classe **CourseService**;



## Data Bindings no Angular CLI

Ligação de dados ou Data Binding é uma técnica geral que une duas fontes de dados/informações e as mantém em sincronia em um processo que estabelece uma conexão entre UI (interface de usuário) da aplicação e a lógica de negócio.

- **[Interpolação](https://angular.io/guide/interpolation)**: `{{ valor }}` - Associa informação do componente para o template (HTML);
- **[Property Binding](https://angular.io/guide/property-binding)**: `[propriedade]="valor"` - Associa informação do componente para o template (HTML);
- [**Event Binding**](https://angular.io/guide/event-binding): `(evento)="handler"` - Associa informação do template (HTML) para o componente;
- **[Two-Way Data Binding](https://angular.io/guide/two-way-binding)**: `[(ngModel)]="propriedade"` - Associa informação entre ambos, ou seja, mantém ambos atualizados (componente e template (HTML).



## Transformando dados usando Pipes

Use **[Pipes](https://angular.io/guide/pipes)** para transformar **strings**, **valores numericos**, **datas** e outros dados para exibição. **Pipes** são funções simples para usar **em expressões de modelo** para aceitar um **valor de entrada e retornar** um valor transformado. Por exemplo, você usaria um Pipe para mostrar uma data como 15 de abril de 1988 em vez do formato de string bruto.

Pipes de formatação mais usados:

- [`DatePipe`](https://angular.io/api/common/DatePipe): Formata um valor de data de acordo com as regras locais. 
  exemplo `<td>{{ course.releaseDate | date: 'dd/MM/yyyy' }}</td>`
- [`UpperCasePipe`](https://angular.io/api/common/UpperCasePipe): Transforma o texto em maiúsculas.
- [`LowerCasePipe`](https://angular.io/api/common/LowerCasePipe): Transforma o texto em minúsculas.
- [`CurrencyPipe`](https://angular.io/api/common/CurrencyPipe): Transforma um número em uma string de moeda, formatada de acordo com as regras locais.
- [`DecimalPipe`](https://angular.io/api/common/DecimalPipe): Transforma um número em uma string com um ponto decimal, formatado de acordo com as regras de local.
- [`PercentPipe`](https://angular.io/api/common/PercentPipe): Transforma um número em uma string de porcentagem, formatada de acordo com as regras de localidade.



## Construindo uma Pipe customizada

Também é possível criar uma **Pipe customizada**

arquivo: **replace.pipe.ts**

```
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'replace'
})
export class CustomReplacePipe implements PipeTransform {
    transform(value: string, char: string, valueToReplace: string) {
        return value.replace(char, valueToReplace);
    }
}
```

**Pipe customizada** do exemplo acima, possui 3 assinaturas para receber os valores para então dar replace.
Exemplo: `<td>{{ course.code | lowercase | replace: '-': ' ' }}</td>` a primeira assinatura, será a informação contida em `course.code`, a segunda e a terceira respetivamente após os `replace: `  com valor
`'-'` e `' '`.

Após criar uma Pipe customizada, tem que registra-la no `@NgModule`da aplicação.

```
import { CustomReplacePipe } from './pipe/replace.pipe';

@NgModule({
	declarations: [
	...
	CustomReplacePipe
	...
  ],
	...
})
```



# Rotas no Angula

O **Angular** nos fornece um esquema de **rotas e navegação completo**, simples e fácil de utilizar,  permite a navegação de uma visualização para a próxima conforme os usuários realizam tarefas de aplicativo.

- `RouterModule` - Adiciona diretivas e provedores para navegação no aplicativo entre visualizações definidas em um aplicativo.

**app.module.ts**

```
import { RouterModule } from '@angular/router';

@NgModule({
	...
	imports: [
    	...
        RouterModule.forRoot([
          {
            //  Quando for para a url localhost:4200/courses
            //  sera redirecionado para a roda de CourseListComponent
            //  mas precisa ainda de um "switch"
            path: 'courses', component: CourseListComponent
          },
          {
            //  em url localhost:4200/courses/info e um path variable
            //  chame component CourseInfoComponent
            path: 'courses/info/:id', component: CourseInfoComponent
          },
          {
            //  path vazio estamos dizendo que é na url root (localhost:4200)
            //  Quando ele for para root da aplicação (localhost:4200) 
            //  ele redireciona para 'courses' url: localhost:4200/courses
            path: '', redirectTo: 'courses', pathMatch: 'full'
          },
          {
            //  esta path, caso nao exista a url informada,
            //  sera redirecionado para o component 'Error404component'
            path: '**', component: Error404component
          }
        ])
    ],
  ...
})
```

No Exemplo acima, foi criada a rotas: `localhost:4200/courses` , `localhost:4200/courses/info/:id` recebendo uma **Path Variable** ID, e por ultimo `localhost:4200/**` caso não exista uma rota especificada, esta rota será chamada, e 'retornara' o component criado, chamado **Error404component**



# Referência

Stackoverflow. **Qual é a diferença entre os tipos de binding no Angular?** - https://pt.stackoverflow.com/questions/239600/qual-%C3%A9-a-diferen%C3%A7a-entre-os-tipos-de-binding-no-angular

Adrianocsilva. **Data Bindings no Angular** - http://adrianocsilva.com.br/blog/data-bindings-no-angular