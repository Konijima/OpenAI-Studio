import { AfterViewInit, Directive, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilesService } from 'src/app/services/files.service';
import { FineTunesService } from 'src/app/services/fine-tunes.service';
import { ModelsService } from 'src/app/services/models.service';

declare var Prism: any;

@Directive({
  selector: 'app-base-page',
})
export class BasePageComponent implements OnInit, AfterViewInit, OnDestroy {
  protected id!: string;
  protected subscriptions: Subscription[] = [];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected modelService: ModelsService,
    protected fineTunesService: FineTunesService,
    protected filesService: FilesService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub?.unsubscribe());
  }

  protected updatePrism(): void {
    setTimeout(() => Prism.highlightAll(), 0);
  }
}
