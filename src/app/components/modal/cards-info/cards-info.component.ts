import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common'; 
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-cards-info',
  standalone: true,
  imports: [RatingModule,CommonModule,ButtonModule],
  templateUrl: './cards-info.component.html',
  styleUrl: './cards-info.component.scss'
})
export class CardsInfoComponent {
  dadosCard: any;

  constructor(public config: DynamicDialogConfig,public ref: DynamicDialogRef) {}

  ngOnInit() {
    this.dadosCard = this.config.data;
  }

  fecharCard() {
    this.ref.close(); 
  }


}
