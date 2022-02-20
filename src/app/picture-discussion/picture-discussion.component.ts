import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { Picture } from '../models/picture.interface';
import { PicturesService } from '../services/pictures.service';

@Component({
  selector: 'app-picture-discussion',
  templateUrl: './picture-discussion.component.html',
  styleUrls: ['./picture-discussion.component.scss']
})
export class PictureDiscussionComponent implements OnInit {

  id: number;
  picture$: Observable<Picture | undefined>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private picturesService: PicturesService) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.id = +this.route.snapshot.params['id'];
    this.picture$ = this.picturesService.getPictureById$(this.id);
  }

}
