<div class="navbar navbar-fixed-top">
  <div class="navbar-inner">
    <div class="container">
      <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>
      <a class="brand" href="/">LocaleMaps Admin</a>
      <div class="nav-collapse">
        <ul class="nav">
          <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">Locales <b class="caret"></b></a>
            <ul class="dropdown-menu">
              <?php if (isset($isLocalesPage) && $isLocalesPage):?><li class="active dropdown"><?php else:?><li class="dropdown"><?php endif;?>
                <a href="/locales">All Locales</a>
              </li>
              <li><a href="/locales/add">Add</a></li>
            </ul>
          </li>
          <?php if (isset($isNotificationsPage) && $isNotificationsPage):?><li class="active"><?php else:?><li style="display:none"><?php endif;?>
            <a href="/notifications">Notifications</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>