import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoginViewModel } from '../../domain/models/signin/sigin';
import { UserManagerService } from '../../domain/services/sharedservices/user-manager.service';
import { Router } from '@angular/router';
@Component({
  moduleId: module.id,
  selector: 'horizontal-navbar',
  templateUrl: 'horizontal-navbar.component.html',
  styleUrls: ['horizontal-navbar.component.scss'],
  host: {
    '[class.app-navbar]': 'true',
    '[class.show-overlay]': 'showOverlay'
  }
})
export class HorizontalNavbarComponent implements OnInit {
  user: LoginViewModel
  @Input() title: string;
  @Input() openedSidebar: boolean;
  @Output() sidebarState = new EventEmitter();
  showOverlay: boolean;

  constructor(private userService: UserManagerService, private router: Router) {
    this.openedSidebar = false;
    this.showOverlay = false;
  }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
  }

  open(event) {
    let clickedComponent = event.target.closest('.nav-item');
    let items = clickedComponent.parentElement.children;

    event.preventDefault();

    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('opened');
    }
    clickedComponent.classList.add('opened');

    //Add class 'show-overlay'
    this.showOverlay = true;
  }

  close(event) {
    let clickedComponent = event.target;
    let items = clickedComponent.parentElement.children;

    event.preventDefault();

    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('opened');
    }

    //Remove class 'show-overlay'
    this.showOverlay = false;
  }

  openSidebar(event: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.openedSidebar = !this.openedSidebar;
    this.sidebarState.emit();
  }
  closeSidebar() {
    this.openedSidebar = false;
    this.sidebarState.emit();
  }
  LogoutUser() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
