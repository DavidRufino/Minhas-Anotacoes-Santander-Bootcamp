|      | [PRÓXIMO](01%20Trabalhando%20com%20Estrutura%20e%20Otimizacao%20.md) |
| ---- | ------------------------------------------------------------ |

**Objetivos do curso**

1. Ganhar mais profundidade nas coisas que o Angular oferece
2. Arquitetar soluções melhores, mantendo em mente a otimização
3. Conhecer APIs não tão comumente utilizadas



## Ciclo de vida do Angular

Depois que seu [aplicativo instancia um componente](https://angular.io/guide/lifecycle-hooks#lifecycle-event-sequence) ou diretiva chamando seu construtor, o **Angular chama os hook methods** que você implementou no ponto apropriado no ciclo de vida dessa instância.

Angular executa métodos de gancho na seguinte sequência. Os methods mais comuns são: `ngOnInt`, `ngAfterViewInt` e `ngOnDestroy`. Você pode usá-los para realizar os seguintes tipos de operações:

|        Hook method        | Propósito                                                    | Tempo                                                        |
| :-----------------------: | ------------------------------------------------------------ | :----------------------------------------------------------- |
|      `ngOnChanges()`      | Responder quando Angular define ou redefine as propriedades de entrada vinculadas a dados. O método recebe um `SimpleChanges` objeto de valores de propriedade atuais e anteriores.<br />Observe que isso acontece com muita frequência, portanto, qualquer operação realizada aqui afeta o desempenho de forma significativa. | É o primeiro *Lifecycle Hook*. Ele é Chamado antes de `ngOnInit()`(se o componente tiver entradas associadas) e sempre que uma ou mais propriedades de entrada associadas a dados forem alteradas. |
|       `ngOnInit()`        | Inicialize a diretiva ou componente após Angular exibir primeiro as propriedades vinculadas a dados e definir as propriedades de entrada da diretiva ou do componente. | Ligado uma vez, depois da primeira `ngOnChanges()`. `ngOnInit()`ainda é chamado mesmo quando `ngOnChanges()`não é |
|       `ngDoCheck()`       | Detectar e agir de acordo com as mudanças que o Angular não consegue ou não detecta sozinho. | Chamado imediatamente após `ngOnChanges()`cada execução de detecção de alteração e imediatamente após `ngOnInit()`na primeira execução. |
|  `ngAfterContentInit()`   | Responda depois que o Angular projeta conteúdo externo na visualização do componente ou na visualização em que uma diretiva está. | Ligado *uma vez* após o primeiro `ngDoCheck()`.              |
| `ngAfterContentChecked()` | Responda depois que o Angular verificar o conteúdo projetado na diretiva ou componente. | Chamado depois `ngAfterContentInit()`e a cada subsequente `ngDoCheck()`. |
|    `ngAfterViewInit()`    | Responder após o Angular inicializar as visualizações do componente e as visualizações filhas ou a visualização que contém a diretiva. | Ligado *uma vez* após o primeiro `ngAfterContentChecked()`.  |
|  `ngAfterViewChecked()`   | Responder após o Angular verificar as visualizações do componente e as visualizações filhas, ou a visualização que contém a diretiva. | Chamado após o `ngAfterViewInit()`e todos os subsequentes `ngAfterContentChecked()`. |
|      `ngOnDestroy()`      | A limpeza antes de Angular destruir a diretiva ou o componente. Cancelar a assinatura de Observables e desanexar manipuladores de eventos para evitar vazamentos de memória. | Chamado imediatamente antes de Angular destruir a diretiva ou o componente. |



#### O que é o Change Detection?

**Change Detection** é um Mecanismo responsável por notar mudanças no estado da nossa aplicação e refletir esse novo estado para o usuário.  Ela é unidirecional;

Um ciclo de detecção de mudança pode ser dividido em duas partes:

- **O desenvolvedor** atualiza o modelo do aplicativo
- **O Angular** sincroniza o modelo atualizado na visualização ao renderizá-lo novamente



Vamos dar uma olhada mais detalhada neste processo:

1. O desenvolvedor **atualiza o modelo de dados**, por exemplo, atualizando uma ligação de componente;
2. Angular **detecta a mudança**;
3. A detecção de alterações **verifica cada componente na árvore de componentes** de cima para baixo para ver se o modelo correspondente mudou;
4. Se houver um novo valor, ele **atualizará a visualização do componente** (DOM);



O seguinte GIF demonstra esse **processo de maneira simplificada**:

<img src="img/20210813221645.gif" width="50%;" />



## Zone.js

Em geral, um **Zone** pode rastrear e interceptar **qualquer tarefa assíncrona**. Ele consiste em executar um pedaço de código dentro de um **Wrapper**. Um **Wrapper** sabe quando o código começou e terminou de ser executado.

Um **Zone** normalmente tem estas *fases*:

- Começa estável;
- Torna-se instável se as tarefas forem executadas na **Zone**;
- Torna-se estável novamente se as *tarefas forem concluídas*;

O Angular corrige várias APIs de navegador de baixo nível na inicialização para ser capaz de detectar mudanças no aplicativo. Isso é feito usando [zone.js](https://github.com/angular/angular/tree/master/packages/zone.js) que [corrige](https://github.com/angular/angular/tree/master/packages/zone.js) APIs como `EventEmitter`, ouvintes de eventos DOM `XMLHttpRequest`, `fs` API em Node.js [e muito mais](https://github.com/angular/angular/blob/master/packages/zone.js/STANDARD-APIS.md) .



#### O que causa mudanças no estado da nossa aplicação?

Resumindo, a estrutura acionará uma detecção de mudança se um dos seguintes eventos ocorrer:

- qualquer evento do navegador (click, focus, submit, etc.)
- `setInterval()` e `setTimeout()`
- Solicitações HTTP requests;

O Angular usa sua zona chamada `NgZone`. Existe apenas um `NgZone`e a detecção de alterações só é acionada para operações assíncronas acionadas nesta zona.



### Exemplos de códigos

```
import { Component, NgZone } from '@angular/core';

@Component({
	selector: 'my-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	value = this._value;
	
	constructor(private ngZone: NgZone) {
		mgZpme.runOutsideAngular(() =>
			setInterval(() => this.value = this._value, 1)
		);
	}
	
	private get _value(): number {
		return Math.floar(Math.random() * 10);
	}
}
```



# Referência

Mokkapps por Michael Hoffmann. **The Last Guide For Angular Change Detection You'll Ever Need** - https://www.mokkapps.de/blog/the-last-guide-for-angular-change-detection-you-will-ever-need/#what-is-change-detection