import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CommonModule } from '@angular/common';
import {CarouselModule} from 'primeng-lts/carousel';
import {ButtonModule} from 'primeng-lts/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    CarouselModule,ButtonModule,
    RouterOutlet, HomeComponent,
     HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'projeto-portifolio';
}
