import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'OpenAI Studio';

  menuItems = [
    {
      type: 'header',
      icon: 'article',
      name: 'Files',
      link: ['/files'],
    },
    {
      type: 'header',
      icon: 'tune',
      name: 'Fine-tunes',
      link: ['/fine-tunes'],
    },
    {
      type: 'header',
      icon: 'model_training',
      name: 'Models',
      link: ['/models'],
    },
    {
      type: 'header',
      icon: 'play_arrow',
      name: 'Playground',
      link: ['/playground'],
    },
    {
      type: 'footer',
      icon: 'key',
      name: 'API Key',
      link: ['/api-key'],
    },
  ];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute)
      )
      .subscribe((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }

        route.data.subscribe((data) => {
          const dynamicPart = route.snapshot.url
            .slice(1)
            .map((segment) => segment.path)
            .join(' / ');
          this.title =
            (data['title'] ?? 'Unknown') +
            (dynamicPart ? ' / ' + dynamicPart : '');
        });
      });
  }
}
