import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { homeService } from './home.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,CommonModule, ButtonModule,ReactiveFormsModule,InputTextModule,InputTextareaModule,ToastModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [MessageService, homeService]
})
export class HomeComponent {
  carrosel: any;
  numVisible: any;
  textoPadrao: any;
  formulario!: FormGroup;
  lastScrollTop: any;
  opcoesResponsividade: any;
  orientation: any = 'vertical';

  constructor( private homeService: homeService, private fb: FormBuilder,private messageService: MessageService) { }

  ngOnInit() {
    this.getForms();
    this.txtPadrao();
  }

  getForms(){
    this.formulario =new FormGroup({
      nome: new FormControl('', [Validators.required]), 
      email: new FormControl('', [Validators.email]), 
      numero: new FormControl('', [Validators.required,Validators.pattern('^[- +()0-9]+$')]), 
      cidade: new FormControl('', [Validators.required]), 
      descricao: new FormControl('',[Validators.required] ), 
    }) 
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
      },
      {
        image: 'images/123casa/123.png',
        nome: 'Projeto 3D de Cozinha',
      },
      {
        image: 'images/123casa/312.png',
        nome: 'Projeto 3D de Banheiro',
      },

      {
        image: 'images/parque2/verde2.png',
        nome: 'Projeto 3D de Parque',
      },
      {
        image: 'images/parque2/verde1.png',
        nome: 'Projeto 3D de Parque',
      },
      {
        image: 'images/parque2/verde3.png',
        nome: 'Projeto 3D de Parque',
      },

      {
        image: 'images/casa/irmao1.png',
        nome: 'Projeto 3D de casa',
      },
      {
        image: 'images/casa/irmao2.png',
        nome: 'Projeto 3D de casa',
      },
      {
        image: 'images/casa/irmao3.png',
        nome: 'Projeto 3D de casa',
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
    this.messageService.add({ severity: 'info', summary:'info', detail: 'Enviando..' })
    if (this.formulario.valid) {
      this.homeService.enviarParaWhatsApp(this.formulario.value).subscribe(
        (response: any) => {
          console.log('Dados enviados para o WhatsApp:', response);
          this.messageService.add({severity:'success', summary:'Sucesso', detail:'Seu projeto foi enviado!'});
        },
        (error: HttpErrorResponse) => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Preencha todos os campos do formulario'})
          console.error('Erro ao enviar dados para o WhatsApp:', error);
        }
      );
    }
  }

  CSSfunc(scrollTop: number): void {
    const imgPrincipal = document.querySelector('.efeito-img') as HTMLElement;
    const txtPrincipal = document.querySelector('.efeito-txt') as HTMLElement;
    let rotacao = Math.max(-scrollTop / 10, -360);
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
