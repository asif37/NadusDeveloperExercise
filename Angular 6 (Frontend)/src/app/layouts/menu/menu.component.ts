import { Component, OnInit } from '@angular/core';
import { IMenuItem } from './menu-item';
import { MenuService } from './menu.service';
import { UserManagerService } from '../../domain/services/sharedservices/user-manager.service';


@Component({
  moduleId: module.id,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [MenuService],
  host: {
    'class': 'app-menu'
  }
})
export class MenuComponent implements OnInit {
  menuItems: IMenuItem[];
  showOverlay = false;

  constructor(private menuService: MenuService, private userService: UserManagerService) { }

  getMenuItems(): void {
    this.menuService.getMenuItems()
      .then(
        menuItems => {
          if (menuItems) {
            if (this.userService.getCurrentUser() != null) {

              let roleId = this.userService.getCurrentUser().roleId;
              this.menuItems = menuItems.filter(x => x.roleCanView === "b" || x.roleCanView === roleId);
              if (this.menuItems.length > 0) {
                this.menuItems.forEach(x => {
                  if (x.sub && x.sub.length > 0)
                    x.sub = x.sub.filter(c => c.roleCanView === "b" || c.roleCanView === roleId);
                });
              }
            }
            // if (this.menuItems.length > 0) {
            //   let sub = this.menuItems.
            //     sub.splice(sub.findIndex(x => x.title.toLowerCase() === "assigned machines"), 1);
            //   this.menuItems = menuItems;

            // } else {
            //   
            //   let home: IMenuItem = menuItems.filter(x => x.title.toLowerCase() === "home")[0];
            //   let sub = home.sub;
            //   sub.splice(sub.findIndex(x => x.title.toLowerCase() === "assigned machines"), 1);
            //   this.menuItems = menuItems;
            // }
          }

        }
      );
  }

  getLiClasses(item: any, isActive: any) {
    return {
      'has-sub': item.sub,
      'active': item.active || isActive,
      'menu-item-group': item.groupTitle,
      'disabled': item.disabled
    };
  }
  getStyles(item: any) {
    return {
      'background': item.bg,
      'color': item.color
    };
  }

  ngOnInit(): void {
    this.getMenuItems();
  }

  close(event: Event) {
    if (document.getElementById("clickButton")) {
      document.getElementById("clickButton").click();
    }

    // let elements = document.getElementsByClassName("open-sidebar");
    // if (elements && elements.length > 0) {
    //   if (elements[0]) {
    //     var div = elements[0] as HTMLDivElement;
    //     div.removeAttribute("class");
    //     //div.setAttribute("class","site-container menu-style-3");
    //   }
    // }
    // let eleme2 = document.getElementsByClassName("navbar-button open");
    // if (eleme2 && eleme2.length > 0) {
    //   if (eleme2[0]) {
    //     var div = eleme2[0] as HTMLDivElement;
    //     div.removeAttribute("class");
    //     div.setAttribute("class", "navbar-button");
    //   }
    // }
  }

  toggle(event: Event, item: any, el: any, t: number = 0) {      
    event.preventDefault();

    let items: any[] = el.menuItems;

    if (item.active) {
      item.active = false;
    } else {
      for (let i = 0; i < items.length; i++) {
        items[i].active = false;
      }
      item.active = true;
    }
    if (!item.clickAble)
      event.stopPropagation();
  }
}
