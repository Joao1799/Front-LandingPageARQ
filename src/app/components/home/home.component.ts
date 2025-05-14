import { Component, HostListener, ElementRef, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
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
import * as AOS from 'aos';
import 'aos/dist/aos.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, ButtonModule,ReactiveFormsModule,InputTextModule,InputTextareaModule,ToastModule,InputMaskModule,DynamicDialogModule],
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

  @ViewChild('bodyhome') bodyhome!: ElementRef;
  @ViewChild('headerHome') headerHome!: ElementRef;
  @ViewChild('servicosRef') servicosRef!: ElementRef;

  ngAfterViewInit(): void {
    const h2 = this.headerHome.nativeElement.querySelector('h2');
    const h1 = this.headerHome.nativeElement.querySelector('h1');

    gsap.set([this.bodyhome.nativeElement, h2, h1], { opacity: 0, y: 0 });
    gsap.registerPlugin(ScrollTrigger);
    gsap.timeline()
    .to(this.bodyhome.nativeElement, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out'
      })
      .to(h2, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      }, "-=0.6")
      .to(h1, {
        opacity: 1,
        y: 0,
        scale: 1.02,
        duration: 1.2,
        ease: 'back.out(1.4)'
      }, "-=0.8");

      gsap.fromTo(".body",
        {
          opacity: 1,
          filter: "blur(0px)",
          ease: "power2.inOut"
        },
        {
          scrollTrigger: {
            trigger: ".box-text",
            start: "top 80%",
            end: "top 20%",
            scrub: 1, // anima sincronizada com scroll
            // markers: true, // ative para debug
          },
          opacity: 0.3,
          filter: "blur(5px)"
        }
      );

      gsap.fromTo(".box-text",
        {
          // x: -600,
          opacity: 0.2,
          filter: "blur(7px)"
        },
        {
          scrollTrigger: {
            trigger: ".box-text",
            start: "top 85%",
            end: "top 20%",
            scrub: 1, // anima sincronizada com scroll
            // markers: true, // ative para debug
          },
          // x: 0,
          opacity: 1,
          filter: "blur(0px)",
          ease: "power2.inOut"
        }
      );
      
      gsap.fromTo(".box-img",
        {
          // x: 600,
          opacity: 0.2,
          filter: "blur(7px)"
        },
        {
          scrollTrigger: {
            trigger: ".box-img",
            start: "top 85%",
            end: "top 20%",
            scrub: 1,
          },
          // x: 0,
          opacity: 1,
          filter: "blur(0px)",
          ease: "power2.inOut"
        }
      );

      gsap.fromTo(".sobreBox",
        {
          opacity: 1,
          filter: "blur(0px)",
          ease: "power2.inOut"
        },
        {
          scrollTrigger: {
            trigger: ".servicos",
            start: "top 80%",
            end: "top 20%",
            scrub: 1, // anima sincronizada com scroll
            //markers: true, // ative para debug

          },
          opacity: 0.3,
          filter: "blur(5px)"
        }
      );


      const section = this.servicosRef.nativeElement;
      ScrollTrigger.create({
        trigger: section,
        start: 'top 10%',
        endTrigger: '.projetos',
        end: '+=1000',
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        pinSpacing: true,
        markers: true
      });
    }
}
