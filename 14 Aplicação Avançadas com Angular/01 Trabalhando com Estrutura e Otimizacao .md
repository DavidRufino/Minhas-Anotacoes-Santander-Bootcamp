# Trabalhando com Estrutura e Otimização



## Bloqueando o Change Detector

Exemplo de código de bloqueio Change Detector APOS a **view** ser atualizada:

```
...
export class ContentCChildComponent implements OnInit, AfterViewInit {

	private user: { firstName: string, lastName: string };
	
	//	Para bloquear o Change Detector: private cdRef: ChangeDetectorRef
	constructor(private contentCService: ContentCService, private cdRef: ChangeDetectorRef) {
		
	}
	
	ngOnInit() {
		this.contentCService.getUser().subscribe(user => this.user = user);
	}
	
	ngAfterViewInit() {
		//	nao ira chamar nem um dos methds abaixo
		this.cdRef.detach();	//	bloquear o Change Detection
	}
	
	get userFirstName(): string {
		return this.user.firstName;
	}
	
	get userLastName(): string {
		return this.user.lastName;
	}
	
	get values(): string[] {
		return Array.from('0'.repeat(10000)).map(_, index) => `value: ${ index }`);
	}
	
	//	Quando um button é acionado
	onClick() {
		//	disparar 'uma rodada' de Change Detection
		this.cdRef.detectChanges();	//	atualiza apenas as mudancas detectadas
	}
}
```

- **detach() ** - Desanexa esta **view** da **Change Detection Tree**. Uma **view** desanexada **não é verificada até que seja reanexada**. Use em combinação com `detectChanges()` para implementar **Change Detection** de mudanças locais.
- **detectChanges()** - Verifica esta **view** e seus **children**. Use em combinação com `detach()` para implementar **Change Detection** de mudança local. Disparar "uma rodada'" de **Change Detection**



## Padrão Container vs Presenter

- Separa nossos componentes entre **Containers** e **Presenters**;
- Permite utilizar o **Change Detection** a nosso favor;
- Separa responsabilidades;
- Permite escrever componentes mais facilmente reutilizáveis;



#### Presenters

- Se preocupa em como as coisas são mostradas;
- Recebe informação do componente **pai via Input**;
- Emite eventos para componente **pai via Output;**
- **Não guardam** estado;
- Podem ter **Presenters** e **Containers** dentro deles;
- Podem ser mais performáticos com **OnPush**;

#### Containers

- Se preocupa em como as coisas funcionam;
- Consomem e geram informações de serviços;
- Disparam ações com base nos eventos do componente filho;
- Tem noção de estado;
- Podem ter **Presenters** e **Containers** dentro deles;



### Change Detection Strategy

A **Estratégia de detecção de mudança angular** são os métodos pelos quais as **atualizações do componente são rastreadas** e o componente é acionado para renderizar novamente. 

Existem basicamente 2 **Change Detection Strategy no Angular** . Podemos configurar a Estratégia de Detecção de Mudanças para o Componente dentro do Decorador.

1. Estratégia **Default;**
2. Estratégia **onPush**;



#### Default

A Change Detection Strategy *Default* é aplicada ao componente **enquanto ele é criado**. Se uma estratégia de componente **não for configurada**, ela será marcada como **padrão**. Nesta estratégia, o ciclo de detecção de mudanças **é executado em cada evento** que ocorre dentro do Componente.

1. Clique em evento de elementos
2. Recebendo dados por meio de chamada assíncrona
3. Acionando `setTimeout` e `setInterval`

#### onPush

Para resolver o problema mencionado acima, trabalhamos com a Change Detection Strategy *onPush*. Durante esta Estratégia de Detecção de Mudanças, o *ChildComponent* **não é verificado desnecessariamente**, se o elemento *parent* estiver atualizando os valores que não são passados como propriedades `@Input` para o Componente Filho, então o Componente Children não é verificado desnecessariamente.

- Nenhuma verificação suja desnecessária nos componentes filhos
- Renderização de componente mais rápida