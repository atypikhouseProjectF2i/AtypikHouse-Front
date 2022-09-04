import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.scss']
})
export class CookieComponent implements OnInit {

  cookieValue!: string | null;

  constructor(private cookieService: CookieService, private dialogRef: MatDialogRef<CookieComponent>,
              private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  acceptCookie() {
    this.cookieValue = this.authService!.getToken();
    this.cookieService.set('user_id', this.cookieValue!);
    this.dialogRef.close()
  }

  refuseCookie() {
    this.cookieService.deleteAll();
    this.dialogRef.close()
  }

}
