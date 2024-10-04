import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { homeService } from './home.service';
import { InputMaskModule } from 'primeng/inputmask';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CardsInfoComponent } from '../modal/cards-info/cards-info.component';

interface CarroselItem {
  image: string;
  nome: string;
  id: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,CommonModule, ButtonModule,ReactiveFormsModule,InputTextModule,InputTextareaModule,ToastModule,InputMaskModule,DynamicDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [MessageService, homeService,DialogService]
})
export class HomeComponent {
  carrosel: any;
  numVisible: any;
  textoPadrao: any;
  formulario!: FormGroup;
  lastScrollTop: any;
  opcoesResponsividade: any;
  orientation: any = 'vertical';
  rfCard: DynamicDialogRef | undefined;
  widthCard: any;

  constructor( private homeService: homeService, private fb: FormBuilder,private messageService: MessageService,public dialogService: DialogService) { }

  ngOnInit() {
    this.getForms();
    this.txtPadrao();
  }

  getForms(){
    this.formulario =new FormGroup({
      nome: new FormControl('', [Validators.required]), 
      email: new FormControl('', [Validators.email]), 
      numero: new FormControl('', [Validators.required, this.formatadorNumero()]), 
      cidade: new FormControl('', [Validators.required]), 
      descricao: new FormControl('',[Validators.required] ), 
    }) 
  }
  formatadorNumero(): ValidatorFn {
    const formataNumero = /^\(\d{2}\)\s\d{9}$/;
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = formataNumero.test(control.value);
      return valid ? null : { numeroInvalido: true };
    };
  }

  openCardInfo(id: any){
    const item = this.carrosel.find((card: CarroselItem) => card.id === id);
    
    if (window.innerWidth <= 932) {
      this.widthCard = '70%';
    } else {
      this.widthCard = '30%';
    }
   
    if(item){
      this.rfCard = this.dialogService.open(CardsInfoComponent, {
        header:"Informações do Projeto",
        width: this.widthCard,
        modal:true,
        closable: false,
        contentStyle: { "height": "70vh", "overflow": "auto" },
        baseZIndex: 10000,
        data:item,
      });
    }
  }

  txtPadrao(){
    this.opcoesResponsividade=[
      {
        breakpoint: '940px',
        numVisible: 2,
        numScroll: 1,
        orientation: 'vertical'
      },
      {
        breakpoint: '1250px',
        numVisible: 1,
        numScroll: 1,
        orientation: 'horizontal',
      },
      {
        breakpoint: '1920px',
        numVisible: 3,
        numScroll: 3,
        orientation: 'horizontal',
      },
    ]
    this.attPosicao();

    this.carrosel = [
      {
        image: 'images/123casa/123123.png',
        nome: 'Projeto 3D Ambiente integrado',
        id: 1,
        descricao: 'Este projeto 3D de ambiente integrado combina sala de estar e cozinha em um espaço moderno e aberto. Foco no design contemporâneo, utilizando conceitos de iluminação e ergonomia.',
        tecnologias: ['SketchUp', 'V-Ray', 'AutoCAD'],
      },
      {
        image: 'images/123casa/123.png',
        nome: 'Projeto 3D de Cozinha',
        id: 2,
        descricao: 'Um projeto de cozinha detalhado em 3D, projetado com foco em funcionalidade e estilo minimalista. Ideal para quem busca otimização de espaço e soluções modernas.',
        tecnologias: ['AutoCAD', '3ds Max', 'Lumion'],
      },
      {
        image: 'images/123casa/312.png',
        nome: 'Projeto 3D de Banheiro',
        id: 3,
        descricao: 'Projeto de banheiro em 3D, com foco em materiais como mármore e porcelanato, proporcionando um ambiente sofisticado e funcional. Design contemporâneo e clean.',
        tecnologias: ['Revit', 'Enscape', 'SketchUp'],
      },
      {
        image: 'images/parque2/verde2.png',
        nome: 'Projeto 3D de Parque',
        id: 4,
        descricao: 'Desenvolvimento de parque em 3D com áreas verdes amplas, trilhas para caminhada e zonas de recreação. O projeto valoriza o paisagismo e o uso sustentável de recursos.',
        tecnologias: ['Lumion', 'AutoCAD', 'Revit'],
      },
      {
        image: 'images/parque2/verde1.png',
        nome: 'Projeto 3D de Parque',
        id: 5,
        descricao: 'Projeto de parque com foco em integração com a natureza, utilizando técnicas de paisagismo avançadas para criar um espaço convidativo e sustentável.',
        tecnologias: ['SketchUp', 'AutoCAD', 'V-Ray'],
      },
      {
        image: 'images/parque2/verde3.png',
        nome: 'Projeto 3D de Parque',
        id: 6,
        descricao: 'Este parque foi projetado em 3D para oferecer áreas de lazer e convivência, priorizando sustentabilidade e acessibilidade em um ambiente natural.',
        tecnologias: ['3ds Max', 'Revit', 'Lumion'],
      },
      {
        image: 'images/casa/irmao1.png',
        nome: 'Projeto 3D de casa',
        id: 7,
        descricao: 'Projeto de uma casa unifamiliar em 3D com estilo arquitetônico moderno. Foco em maximizar iluminação natural e ventilação cruzada, garantindo eficiência energética.',
        tecnologias: ['Revit', 'AutoCAD', 'Enscape'],
      },
      {
        image: 'images/casa/irmao2.png',
        nome: 'Projeto 3D de casa',
        id: 8,
        descricao: 'Modelo 3D de uma residência com design contemporâneo e linhas limpas. O projeto foca no uso de materiais sustentáveis e aproveitamento inteligente do espaço.',
        tecnologias: ['SketchUp', 'V-Ray', 'AutoCAD'],
      },
      {
        image: 'images/casa/irmao3.png',
        nome: 'Projeto 3D de casa',
        id: 9,
        descricao: 'Residência projetada em 3D com elementos arquitetônicos sofisticados, como grandes janelas e ambientes integrados, visando um estilo de vida moderno e funcional.',
        tecnologias: ['Lumion', 'Revit', 'AutoCAD'],
      },
    ];

    this.textoPadrao = `
    Olá! Sou Thailine Moura, estudante de Arquitetura e Urbanismo no 7º período pela Universidade do Distrito Federal (UDF). Apaixonada pelo impacto transformador da arquitetura, procuro sempre alinhar técnica e criatividade para oferecer soluções práticas e inovadoras.
    Minha jornada acadêmica e profissional é marcada pela atenção aos detalhes e pela constante busca por aprimoramento. Tenho domínio de ferramentas essenciais para o desenvolvimento de projetos arquitetônicos, como AutoCAD, SketchUp, Revit, e Photoshop, além de experiência com renderizações realistas em V-Ray e Lumion.<br>
    <br>Além do ambiente acadêmico, tive a oportunidade de estagiar em órgãos públicos e em escritórios de arquitetura, onde participei ativamente da elaboração de projetos e no atendimento a clientes. Também colaborei em projetos como o Parque Recreativo do Setor O, contribuindo para o desenvolvimento de espaços urbanos que promovem bem-estar e integração social.
    Sou motivada por desafios e busco constantemente aprender e evoluir, seja no campo da arquitetura, seja em minhas interações pessoais e profissionais. Acredito que a arquitetura pode melhorar a vida das pessoas, e é essa paixão que guia cada um dos meus projetos.
  `;  
  }

  attPosicao(){
    if (window.innerWidth <= 932) {
      this.orientation = 'vertical';
    } else {
      this.orientation = 'horizontal';
    }
  }

  onSubmit() {
    this.messageService.add({ severity: 'info', summary: 'info', detail: 'Enviando..' });
    if (this.formulario.valid) {
      this.homeService.enviarParaWhatsApp(this.formulario.value).subscribe({
        next: (response) => {
          console.log('Dados enviados para o WhatsApp:', response);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Seu projeto foi enviado!' });
          window.location.reload()
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao enviar projeto' });
          console.error('Erro ao enviar dados para o WhatsApp:', error);
        }
      });
    }
  }

  CSSfunc(scrollTop: number): void {
    const imgPrincipal = document.querySelector('.efeito-img') as HTMLElement;
    const txtPrincipal = document.querySelector('.efeito-txt') as HTMLElement;
    let rotacao = Math.max(-scrollTop / 20, -360);
    let opacidade = Math.max(1 - (scrollTop / 600), 0); 
    let slide = Math.min(scrollTop / 3, 500);

    imgPrincipal.style.transform = `rotate(${rotacao}deg)`;
    imgPrincipal.style.opacity = `${opacidade}`;

    txtPrincipal.style.transform = `translateX(-${slide}px)`;
    txtPrincipal.style.opacity = `${opacidade}`; 
  }

  @HostListener('window:scroll', [])
  scrollDaTela(): void {
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop > this.lastScrollTop) {
      this.CSSfunc(scrollTop);
    } else {
      this.CSSfunc(scrollTop);
    }
    this.lastScrollTop = scrollTop;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.attPosicao();
  }
}
