import { Component } from "@angular/core";
import { LoginForm } from "../components/login-form/login-form";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.html',
    imports: [LoginForm]
})
export class LoginPage {

}