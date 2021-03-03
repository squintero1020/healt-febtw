import { Component, DoCheck, OnInit } from "@angular/core";
import { NgbDropdownConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { animate, style, transition, trigger } from "@angular/animations";
import { DattaConfig } from "../../../../../app-config";
import { AuthService } from "../../../../../shared/services/auth.service";
import { CambiarContrasenaComponent } from "src/app/components/modales/cambiar-contrasena/cambiar-contrasena.component";

@Component({
  selector: "app-nav-right",
  templateUrl: "./nav-right.component.html",
  styleUrls: ["./nav-right.component.scss"],
  providers: [NgbDropdownConfig],
  animations: [
    trigger("slideInOutLeft", [
      transition(":enter", [
        style({ transform: "translateX(100%)" }),
        animate("300ms ease-in", style({ transform: "translateX(0%)" })),
      ]),
      transition(":leave", [
        animate("300ms ease-in", style({ transform: "translateX(100%)" })),
      ]),
    ]),
    trigger("slideInOutRight", [
      transition(":enter", [
        style({ transform: "translateX(-100%)" }),
        animate("300ms ease-in", style({ transform: "translateX(0%)" })),
      ]),
      transition(":leave", [
        animate("300ms ease-in", style({ transform: "translateX(-100%)" })),
      ]),
    ]),
  ],
})
export class NavRightComponent implements OnInit, DoCheck {
  public visibleUserList: boolean;
  public chatMessage: boolean;
  public friendId: boolean;
  public dattaConfig: any;
  public UsuarioActual: any;

  constructor(config: NgbDropdownConfig, public authService: AuthService, public modal: NgbModal) {
    config.placement = "bottom-right";
    this.visibleUserList = false;
    this.chatMessage = false;
    this.dattaConfig = DattaConfig.config;
  }

  ngOnInit() {
    this.UsuarioActual = localStorage.getItem("nombres");
  }

  openModalChangePassword() {
    var modal = this.modal.open(CambiarContrasenaComponent, {
      ariaLabelledBy: "modal-basic-title",
      size: "lg",
    });
  }
  logOuth() {
    this.authService.logOut();
  }

  onChatToggle(friend_id) {
    this.friendId = friend_id;
    this.chatMessage = !this.chatMessage;
  }

  ngDoCheck() {
    if (document.querySelector("body").classList.contains("datta-rtl")) {
      this.dattaConfig["rtl-layout"] = true;
    } else {
      this.dattaConfig["rtl-layout"] = false;
    }
  }
}
