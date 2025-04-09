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

  @ViewChild('bodyhome', { static: true }) bodyhome!: ElementRef;
  @ViewChild('headerHome', {static: true}) headerHome!: ElementRef;

  ngAfterViewInit(): void {
    gsap.to(this.bodyhome.nativeElement, {
      opacity: 1,
      duration: 2,
      backgroundColor:'white',
      ease: 'power2.out'
    });


    gsap.from(this.headerHome.nativeElement, {
      scrollTrigger: {
        trigger: this.headerHome.nativeElement,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 300,
      opacity: 0,
      duration: 1.5,
    });
  }
}
