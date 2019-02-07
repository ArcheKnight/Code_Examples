var interfaceInit = (function() {

  let navLinks = document.getElementsByClassName('top-nav__link');
  let dropMenus = document.getElementsByClassName('drop-menu');
  let menuButtons = document.getElementsByClassName('main__menu--button');
  let contentScreens = document.getElementsByClassName('content');
  let topNav = document.getElementById('top-nav');

  setDropMenus();
  setMenuButtons();
  assignLinks();

  function assignLinks() {
    let links = document.getElementsByClassName('top-nav__link');
    
    for (let i = 0; i < links.length; i++) {
      let linkParent = links[i].parentNode.getElementsByClassName('drop-menu')[i];
      
      switch (linkParent.dataset.relation) {
        case 'issue-tracker':
          getLinks(linkParent, IssueTrackerLinks);
          break;
        case 'ams':
          getLinks(linkParent, AMSLinks);
          break;
        case 'quickbase':
          getLinks(linkParent, QuickBaseLinks);
          break;
        case 'associate-info':
          getLinks(linkParent, AssociateInfoLinks);
          break;
        case 'resources':
          getLinks(linkParent, ResourcesLinks);
          break;
        case 'links':
          getLinks(linkParent, UserLinks);
          break;
        default:
          break;
      }
    }
  }

  function getLinks(parent, linksArray) {
    let links = parent.getElementsByTagName('a');
    
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function() {
        window.open(linksArray[i]);
      }, false);
    }
  }

  function setMenuButtons() {
    for (let i = 0; i < menuButtons.length; i++) {
      let menuButton = menuButtons[i];
      
      menuButton.addEventListener('click', function(){clickMenuButton.call(this)}, false);
    }
  }

  function clickMenuButton() {
    let relation = this.dataset.relation;
    
    for (let i = 0; i < contentScreens.length; i++) {
      contentScreens[i].classList.remove('show');
      menuButtons[i].classList.remove('main__menu--button-active');
      
      if (contentScreens[i].dataset.relation == relation) {
        contentScreens[i].classList.add('show');
        this.classList.add('main__menu--button-active');
      }
    }
  }

  function setDropMenus() {
    for (let i = 0; i < navLinks.length; i++) {
      let navLink = navLinks[i];
      
      for (let j = 0; j < dropMenus.length; j++) {
        let dropMenu = dropMenus[j];
        
        if (dropMenu.dataset.relation == navLink.dataset.relation) {
          dropMenu.style.left = (navLink.offsetLeft - navLink.scrollLeft + navLink.clientLeft) + 'px';
          navLink.addEventListener('mouseenter', function(){hoverOnDropMenus.call(dropMenu, navLink)}, false);
          dropMenu.addEventListener('mouseenter', function(){hoverOnDropMenus.call(dropMenu, navLink)}, false);
          navLink.addEventListener('mouseleave', function(){hoverOffDropMenus.call(dropMenu, navLink)}, false);
          dropMenu.addEventListener('mouseleave', function(){hoverOffDropMenus.call(dropMenu, navLink)}, false);
        }
      }
    }
  }

  function hoverOnDropMenus(link) {
    link.style.backgroundSize = '100% 100%';
    link.style.color = 'white';
    link.style.transition = '.1s ease-in 0s';
    this.style.maxHeight = '1000px';
    this.style.webkitTransform = 'perspective(400) rotate3d(0,0,0,0)';
    this.style.transition = '.25s .1s';
  }

  function hoverOffDropMenus(link) {
    link.style.backgroundSize = '100% 0';
    link.style.color = '';
    link.style.transition = '.1s ease-out .1s';
    this.style.maxHeight = '0';
    this.style.webkitTransform = 'perspective(400) rotate3d(1,0,0,-90deg)';
    this.style.transition = '.1s 0s';
  }

}());