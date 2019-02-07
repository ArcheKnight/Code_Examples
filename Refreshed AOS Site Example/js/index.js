var initialize = (function() {
  let vars = {
    contentNav: {
      ConcatWins: {
        active: true,
        relation: 'concatenate-wins',
        
      },
      ConcatTickets: {
        active: false,
        relation: 'concatenate-tickets',
        
      },
      CopyResponse: {
        active: false,
        relation: 'copy-response',
        
      }
    },
    contentMenuButtons: document.getElementsByClassName('main__menu--button'),
    contentPages: document.getElementsByClassName('content'),
    navLinks: document.getElementsByClassName('top-nav__link'),
    navMenus: document.getElementsByClassName('drop-menu'),
    copySelect: document.getElementById('CRSelect'),
    copyBox: document.getElementById('CRBox'),
    buttons: document.querySelectorAll('button'),
    inputs: [document.querySelectorAll('input'), document.querySelectorAll('textarea')]
  }
  
  let topNav = {
    initNav: function() {
      this.setNavHovers();
      this.setLinks();
    },
    setNavHovers: function() {
      for (let i = 0; i < vars.navLinks.length; i++) {
        let menu = topNav.getMenu(vars.navMenus[i].dataset.relation);
        let link = topNav.getLink(vars.navLinks[i].dataset.relation);
        
        this.navOffHover(menu, link);
        
        link.addEventListener('mouseenter', function() { topNav.navOnHover(menu, link); }, false);
        menu.addEventListener('mouseenter', function() { topNav.navOnHover(menu, link); }, false);
        link.addEventListener('mouseleave', function() { topNav.navOffHover(menu, link); }, false);
        menu.addEventListener('mouseleave', function() { topNav.navOffHover(menu, link); }, false);
      }
    },
    navOnHover: function(menu, link) {
      menu.style.left = link.offsetLeft + 'px';
      
      menu.style.transition = '.15s linear .1s, border 0s linear .1s';
      menu.style.maxHeight = '1000px';
      menu.style.webkitTransform = 'perspective(400) rotate3d(0,0,0,0)';
      link.style.transition = 'all .1s linear';
      link.style.color = 'white';
      link.style.backgroundSize = '100% 100%';
      
      link.style.borderLeftColor = getComputedStyle(document.documentElement, null).getPropertyValue('--WM-Yellow');
    },
    navOffHover: function(menu, link) {
      menu.style.transition = '.15s linear, border 0s linear .15s';
      menu.style.maxHeight = '0px';
      menu.style.webkitTransform = 'perspective(400) rotate3d(1,0,0,-90deg)';
      link.style.transition = 'all .1s linear .18s';
      link.style.color = getComputedStyle(document.documentElement, null).getPropertyValue('--WM-Light-Blue');
      link.style.backgroundSize = '100% 0';
      
      link.style.borderLeftColor = 'rgba(0,0,0,0)';
    },
    setLinks: function() {
      
      for (let i = 0; i < vars.navMenus.length; i++) {
        vars.navLinks[i].addEventListener('click', function() {
          window.open(linkUrls[i][0]);
        }, false);
        
        for (let j = 0; j < vars.navMenus[i].children.length; j++) {
          vars.navMenus[i].children[j].addEventListener('click', function() {
            if (linkUrls[i][j] === '#') {
              switch (vars.navMenus[i].children[j].innerHTML) {
                case 'Fix WIN Pages':
                  for (let k = 0; k < FixWIN.length; k++) { window.open(FixWIN[k]); }
                  break;
                case 'Fix Access Pages':
                  for (let k = 0; k < FixAccess.length; k++) { window.open(FixAccess[k]); }
                  break;
                default:
                  alert('ERROR IN SETTING MULTI PAGE OPEN');
                  break;
              }
            } else {
              window.open(linkUrls[i][j]);
            }
          }, false);
        }
      }
    },
    getLink: function(relation) {
      for (let i = 0; i < vars.navLinks.length; i++) {
        if (vars.navLinks[i].dataset.relation === relation) { return vars.navLinks[i]; };
      }
    },
    getMenu: function(relation) {
      for (let i = 0; i < vars.navMenus.length; i++) {
        if (vars.navMenus[i].dataset.relation === relation) { return vars.navMenus[i]; };
      }
    }
  }
  
  let pageContent = {
    initContent: function() {
      this.updateActiveContent();
      this.addClickListeners();
      this.addHoverListeners();
      this.setSelect();
      this.selectUpdate();
      this.clearButtons();
      this.runButtons();
    },
    setSelect: function() {
      for (let i = 0; i < resArray.length; i++) {
        let option = document.createElement('option');
        let arr = [];
        for (let ele in resArray[i]) { arr.push(resArray[i][ele]); }
        option.innerHTML = arr[0];
        option.value = arr[1];
        vars.copySelect.appendChild(option);
      }
    },
    selectUpdate: function() {
      vars.copySelect.addEventListener('change', function() {
        vars.copyBox.innerHTML = vars.copySelect.value;
      }, false);
    },
    getActiveContent: function() {
      for (var ele in vars.contentNav) {
        if (vars.contentNav[ele].active === true) { return vars.contentNav[ele]; };
      }
      return null;
    },
    getNextContent: function(relation) {
      for (var ele in vars.contentNav) {
        if (vars.contentNav[ele].relation === relation) { return vars.contentNav[ele]; };
      }
      return null;
    },
    changeActiveContent: function(next) {
      let current = this.getActiveContent();
      
      if (current !== null) {
        current.active = false;
        next.active = true;
      } else {
        alert('NO ACTIVE OPTION ERROR');
      }
    },
    updateActiveContent: function() {
      let current = this.getActiveContent();
      
      for (let i = 0; i < vars.contentPages.length; i++) {
        if (vars.contentMenuButtons[i].dataset.relation === current.relation) {
          this.toActive(i);
        } else {
          this.fromActive(i);
        }
      }
    },
    toActive: function(ele) {
      vars.contentPages[ele].style.display = 'block';
      vars.contentMenuButtons[ele].style.backgroundSize = '100% 100%, 100% 100%';
      vars.contentMenuButtons[ele].style.color = getComputedStyle(document.documentElement, null).getPropertyValue('--WM-Light-Blue');
    },
    fromActive: function(ele) {
      vars.contentPages[ele].style.display = 'none';
      vars.contentMenuButtons[ele].style.backgroundSize = '0 100%, 100% 100%';
      vars.contentMenuButtons[ele].style.color = 'white';
    },
    toHover: function(ele) {
      ele.style.backgroundSize = '95% 100%, 100% 100%';
      ele.style.color = getComputedStyle(document.documentElement, null).getPropertyValue('--WM-Light-Blue');
    },
    fromHover: function(ele) {
      ele.style.backgroundSize = '0 100%, 100% 100%';
      ele.style.color = 'white';
    },
    addClickListeners: function() {
      for (let i = 0; i < vars.contentMenuButtons.length; i++) {
        let nextVar = pageContent.getNextContent(vars.contentMenuButtons[i].dataset.relation);
        vars.contentMenuButtons[i].addEventListener('click', function() {
          
          pageContent.changeActiveContent(nextVar);
          pageContent.updateActiveContent();
        }, false);
      }
    },
    addHoverListeners: function() {
      for (let i = 0; i < vars.contentMenuButtons.length; i++) {
        vars.contentMenuButtons[i].addEventListener('mouseenter', function() {
          if (pageContent.getActiveContent().relation !== this.dataset.relation) {
            pageContent.toHover(this);
          }
        });
        vars.contentMenuButtons[i].addEventListener('mouseleave', function() {
          pageContent.fromHover(this);
          pageContent.updateActiveContent();
        });
      }
    },
    runButtons: function() {
      for (let i = 0; i < document.body.children.length; i++) { console.log(document.body.children[i]); };
    },
    clearButtons: function() {
      for (let k = 0; k < vars.buttons.length; k++) {
        if (vars.buttons[k].innerHTML === 'Clear') {
          vars.buttons[k].addEventListener('click', function() {
            for (let i = 0; i < vars.inputs.length; i++) {
              for (let j = 0; j < vars.inputs[i].length; j++) {
                vars.inputs[i][j].value = '';
                vars.copySelect.value = resArray[0][1];
              }
            }
          }, false);
        }
      }
    }
  }
  
  let init = (function() {
    topNav.initNav();
    pageContent.initContent();
  }());
  
}());