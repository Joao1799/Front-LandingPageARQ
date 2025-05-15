import { Component } from '@angular/core';
import { ScrollService } from '../scroll.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private scrollService: ScrollService) {}


  scrollTo(sectionId: string) {
    this.scrollService.scrollTo(sectionId);
  }

}
