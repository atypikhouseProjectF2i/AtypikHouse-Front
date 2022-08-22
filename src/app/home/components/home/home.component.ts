import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private meta: Meta, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle(
      "Atypikhouse : Locations d'hébergements insolites "
    );
    this.meta.addTag({
      name: 'description',
      content:
        "Envie de tenter l'aventure atypique ? N'attendez plus ! Découvrer tous les hébergements insolites disponibles sur notre site.",
    });
  }
}
