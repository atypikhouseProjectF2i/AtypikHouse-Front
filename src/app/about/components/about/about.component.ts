import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { About } from 'src/app/core/models/about-model';
import { AboutService } from 'src/app/core/services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  about$!: Observable<About>;
  roles!: any;
  admin: boolean = false;

  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    this.about$ = this.aboutService.getAboutText();
    this.roles = JSON.parse(sessionStorage.getItem('roles') || '[]');
    if (this.roles) {
      this.roles.includes('ROLE_ADMIN')
        ? (this.admin = true)
        : (this.admin = false);
    }
  }
}
