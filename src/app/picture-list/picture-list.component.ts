import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';

import { Picture } from '../models/picture.interface';
import { PicturesService } from '../services/pictures.service';

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.scss']
})
export class PictureListComponent implements OnInit, OnDestroy {

  reactiveForm: FormGroup;
  pictures$: Observable<Picture[]>;

  searchSubscription: Subscription;
  search = new BehaviorSubject<string>('');

  constructor(private picturesService: PicturesService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.listenToInputChange();
  }

  initForm() {
    let controlConfig = this.getControlConfig();
    this.reactiveForm = this.fb.group(controlConfig, {
      validators: []
    });
  }

  getControlConfig(): any {
    let config = {
      searchTerm: ['', [] as any[]],
    };
    return config;
  }

  listenToInputChange() {
    this.searchSubscription = this.reactiveForm.controls.searchTerm
      .valueChanges.subscribe(value => {
        this.search.next(value);
      });

    this.pictures$ = this.search.pipe(
      debounceTime(400),
      switchMap(term => {
        return this.picturesService.searchPictures$(term)
      })
    );
  }

  onClickCard(picture: Picture) {
    this.router.navigate(['picture-discussion', picture?.id]);
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }
}
