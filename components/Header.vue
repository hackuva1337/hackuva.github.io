<template>
  <div>
    <nav class="navbar-default" id="nav">
      <div class="container">
        <div class="col-sm-10 zero-padding">
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
              <li><a href="/" class="active">Willkommen</a></li>
              <li><a href="/hackuva/" class="active">Über Hackuva</a></li>
              <li class="dropdown"></li>
              <li><a href="/presse/" class="active">Presse</a></li>
            </ul>
          </div>
        </div>
        <div class="col-sm-2 col-xs-12 zero-padding">
          <div class="navbar-header">
            <button
              type="button"
              class="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar top-bar"></span>
              <span class="icon-bar middle-bar"></span>
              <span class="icon-bar bottom-bar"></span>
            </button>
            <a href="/">
              <div class="logo">Hackuva</div>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>