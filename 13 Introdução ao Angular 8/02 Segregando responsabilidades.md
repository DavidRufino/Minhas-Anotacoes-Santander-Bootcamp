# Segregando responsabilidades



## Requisições em HTTP no Angular



#### HttpClient

É usado para fazer a comunicação entre cliente e servidor usando o **protocolo HTTP**. Para consumir dados de uma API externa o **[HttpClient](https://angular.io/guide/http#setup-for-server-communication)** facilitará essa comunicação, através de muitos métodos disponíveis: **post()**, **get()**, **put()**, **delete()**, **patch()**, **request()**, **head()**, **jsonp()**, **options()**.



#### Importando o HttpClientModule

em `src\app\app.module.ts`

```
import { HttpClientModule } from '@angular/common/http';
...
@NgModule({
	...
	imports: [
	...
	HttpClientModule
	]
	...
})
```

Dentro de **imports** do `@NgModule`, adicione o modulo **HttpClientModule**



#### Trabalhando com GET

em `src\app\courses\course.service.ts` (path de [exemplo do projeto](https://github.com/DavidRufino/Projeto-Simples-Com-Angular)):

```
import { HttpClient } from "@angular/common/http";
import { Course } from './course';
...

@Injectable({
    providedIn: 'root'
})
export class CourseService {
	...
	//	Endereço da API REST
	private courseUrl: string = "http://localhost:3100/api/courses";
	
	//  GET Method retrieveAll
    retrieveAll(): Observable<Course[]> {
    //	Retorna uma LISTA de COURSE
        return this.httpClient.get<Course[]>(this.courseUrl);
    }

    //  GET Method retrieveById
    retrieveById(id: number): Observable<Course> {
    //	Retorna UM COURSE pelo seu ID
        return this.httpClient.get<Course>(`${this.courseUrl}/${id}`);
    }
    ...
}
```



Agora em `src\app\course\course-list.component.ts` foi adicionado:

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
        this.retrieveAll();
    }
    
    retrieveAll(): void {
        //  é assincrono
        this.courseService.retrieveAll().subscribe({
            next: courses => {
                this._courses = courses;
            },
            error: err => console.log("Error", err)
        });
    }
}
```

No exemplo acima, quando ele for iniciado, ira executar o method: **retrieveAll()** que chamara o **courseService.retrieveAll()** configurado no  `course.service.ts`.



#### Trabalhando com PUT

em `src\app\courses\course.service.ts` (path de [exemplo do projeto](https://github.com/DavidRufino/Projeto-Simples-Com-Angular)), semelhante ao **GET**:

```
...
export class CourseService {
	private courseUrl: string = "http://localhost:3100/api/courses";
	...
	//  PUT Method save
    save(course: Course): Observable<Course> {
        //  Se course.id estiver PREENCHIDO
        if (course.id) {
            //   nao é aspas, é acento grave ` `
            return this.httpClient.put<Course>(`${this.courseUrl}/${course.id}`, course);
        } else { 
            return this.httpClient.put<Course>(`${this.courseUrl}`, course);
        }
    }
}
```

[*] no exemplo acima é utilizado acento grave ` na abertura e fechamento.



No projeto, quem fara uso desse method **save()** será o `src\app\courses\course-info.component.ts`:

```
import { Course } from "./course";
import { CourseService } from "./course.service";
...

@Component({
    templateUrl: './course-info.component.html'
})
export class CourseInfoComponent implements OnInit{
    
    //  Receber o Path variable
    course?: Course;
    
    constructor(private activatedRoute: ActivatedRoute, private courseService: CourseService) {}
	...
    save(): void {
        //  tem que adicionar .susbcribe para realizar esta chamada
        this.courseService.save(this.course as Course).subscribe({
            next: course => console.log("Saved with sucess", course),
            error: err => console.log("Error", err)
        })
    }
}
```

No exemplo acima, quando o `<button>Save</button>`  do `templateUrl: './course-info.component.html'` for  pressionado, será executado o method **save()** que chamara o **courseService.save()**.



## Segregando a aplicação em Módulos

Para gerar seu próprio **module**, abra um terminal na pasta do seu projeto de aplicativo. e Execute no terminal: `ng generate module [name]`



## Shared Module

O **shared** é onde todos os componentes compartilhados, pipes, filters e services devem ir. A pasta **shared** pode ser importado em qualquer module. Assim esses itens serão reutilizados. O shared module deve ser independente do restante do aplicativo. Portanto, não deve ter referências de outro módulo.

No **shared** ficam os components que você usa em mais contextos, o VMessage por exemplo é um caso, ele aparece no SignIn, no SignUp e outros lugares.



## Pasta Core

A ideia do **Core** é basicamente dizer que ele é um *component essencial* em um **contexto mais geral**, o Header por exemplo está **para toda a aplicação**, diferente do PhotoDetails que é mais específico.

Tem um *componente* que aparece em **vários lugares**? *Shared*. Tem um **component essencial no contexto geral**, *Core*.



# Referências

Malcoded. **Lern how to split your Angular App into Modules [Includes Lazy-Loading]** - https://malcoded.com/posts/angular-fundamentals-modules/

Bruno Brito. **Angular - Como estruturar componentes em grandes projetos** - https://www.brunobrito.net.br/estruturando-components-angular/

Wands Macêdo **Pasta/módulo Core** - https://cursos.alura.com.br/forum/topico-pasta-modulo-core-76030

