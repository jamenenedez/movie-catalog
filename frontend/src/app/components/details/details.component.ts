import { Component, OnInit } from '@angular/core';
import { ActorService } from 'src/app/services/actor.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  actor$: Object;

  constructor(private data: ActorService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => { this.actor$ = params.id });
  }

  ngOnInit() {
    this.data.getOne(this.actor$).subscribe(
      data => {
        this.actor$ = data
      }
    )
  }

}
