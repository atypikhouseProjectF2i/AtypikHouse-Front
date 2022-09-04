import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {CookieComponent} from "../cookie/cookie.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(
      "Atypikhouse : Locations d'hébergements insolites "
    );
    this.meta.addTag({
      name: 'description',
      content:
        "Envie de tenter l'aventure atypique ? N'attendez plus ! Découvrez tous les hébergements insolites disponibles sur notre site.",
    });

    this.openDialogCookie()
  }

  openDialogCookie(): void {
    this.dialog.open(CookieComponent, {
      width: '700px',
    });
  }
}
