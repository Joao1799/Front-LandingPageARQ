import { Component, HostListener, ElementRef, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload'; 
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { homeService } from './home.service';
import { InputMaskModule } from 'primeng/inputmask';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import 'aos/dist/aos.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ScrollService } from '../scroll.service';


gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FileUploadModule,CarouselModule, ButtonModule,ReactiveFormsModule,InputTextModule,InputTextareaModule,ToastModule,InputMaskModule,DynamicDialogModule],
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

  nome!: string;
  telefone!: string;
  email!: string;
  arquivo: any;
  uploadResponse: string = '';

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient,
    private homeService: homeService, 
    private fb: FormBuilder,
    private messageService: MessageService,
    public dialogService: DialogService,
    private scrollService: ScrollService,
    private el: ElementRef) { }

  ngOnInit() {
    this.scrollService.scrollToSection$.subscribe((sectionId: string) => {
      const element = this.el.nativeElement.querySelector('#' + sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    this.getForms();
  }

  getForms() {
    this.formulario = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      numero: new FormControl('', [Validators.required,]),
      arquivo: new FormControl(null)
    });
  }

  onFileSelect(event: any) {
    const selectedFile = event.files?.[0];
    this.arquivo = selectedFile;
    this.formulario.patchValue({ arquivo: selectedFile });
    this.formulario.get('arquivo')?.updateValueAndValidity();
  }

  onUpload(event: any) {
    console.log('Arquivo enviado com sucesso!', event);
    this.uploadResponse = 'Arquivo enviado com sucesso!';
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
          window.location.reload();
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao enviar projeto' });
          console.error('Erro ao enviar dados para o WhatsApp:', error);
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha todos os campos obrigatórios.' });
      console.warn('Formulário inválido:', this.formulario.errors, this.formulario.value);
    }
  }
  @ViewChild('bodyhome') bodyhome!: ElementRef;
  @ViewChild('headerHome') headerHome!: ElementRef;
  @ViewChild('servicosRef') servicosRef!: ElementRef;
  @ViewChild('animatedText', { static: true }) animatedText!: ElementRef;
  @ViewChild('contatoRef', { static: true }) contatoRef!: ElementRef;

  ngAfterViewInit(): void {
    const grids = gsap.utils.toArray('.grid, .grid1, .grid2, .grid3, .grid4, .grid5, .grid6');
    const h2 = this.headerHome.nativeElement.querySelector('h2');
    const h1 = this.headerHome.nativeElement.querySelector('h1');
    const section = this.servicosRef.nativeElement;
    const textElement = this.animatedText.nativeElement;
    const words = textElement.innerText.split(' ');
    textElement.innerHTML = words.map((word: any) =>  `<span class="word">${word}</span>`).join(' ');
    const spans = textElement.querySelectorAll('.word');
    const imgThai = this.contatoRef.nativeElement.querySelector('.space');
    const boxTXT = this.contatoRef.nativeElement.querySelector('.boxTXT');

    gsap.set([this.bodyhome.nativeElement, h2, h1], { opacity: 0, y: 0 });
    gsap.registerPlugin(ScrollTrigger);


    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

    gsap.timeline().to(this.bodyhome.nativeElement, {
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
      }, "-=0.4")
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

      // gsap.from('.titulo-servicos', {
      //   scrollTrigger: {
      //     trigger: section,
      //     start: 'top center',
      //     end: 'bottom center',
      //     scrub: 1,
      //   },
      //   opacity: 0,
      //   y: 100,
      //   duration: 1,
      //   ease: 'power2.out',
      // });

      gsap.from('.titulo-servicos span', {
        scrollTrigger: {
          trigger: '.servicos',
          start: 'top 80%',
          end: 'top 10%',
          scrub: 1,
        },
        opacity: 0,
        y: 50,
        stagger: 0.1,
        ease: 'power3.out',
      });

      gsap.from(grids, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2, //Adiciona um atraso de 0.2 segundos entre cada elemento animado.  efeito de "entrada em sequência"
        scrollTrigger: {
          trigger: '.servicos',
          start: 'top 80%',
          end: 'top 10%',
          scrub: 1,
          // markers: true
        }
      });

      gsap.from('.banner', {
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
        opacity: 0,
        y: 100,
        duration: 1,
        ease: 'power2.out',
      });

      gsap.fromTo(spans,
        { opacity: 0,
          filter: 'blur(8px)',
          y: 20 
        },
        {
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".banner",
            start: 'top 90%',
            end: 'top 30%',
            toggleActions: 'play none none none',
            once: true,
            scrub: true,
            
          },
          opacity: 1,
          filter: 'blur(0px)',
        }
      );

      gsap.fromTo(imgThai,
        { 
          opacity: 0,
          filter: 'blur(8px)',
          x: -400 
        },
        {
          duration: 1.5,
          stagger: 0.15,
          scrollTrigger: {
            trigger: imgThai,
            start: 'top 50%',
            end: 'top 15%',
            toggleActions: 'play none none none',
            once: true, 
            // scrub: true,
          },
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
        }
      );

      gsap.fromTo(boxTXT,
        { 
          opacity: 0,
          filter: 'blur(8px)',
          x: 400 
        },
        {
          duration: 1.5,
          stagger: 0.15,
          scrollTrigger: {
            trigger: boxTXT,
            start: 'top 50%',
            end: 'top 15%',
            toggleActions: 'play none none none',
            once: true, 
            // scrub: true,
            // markers:true
          },
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
        }
      );

    }
}
