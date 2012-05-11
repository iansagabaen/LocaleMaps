<?php
echo $this->append('css');
echo $this->Html->css('home_index');
echo $this->end();

echo $this->element('header');
?>
<h1>Sign In</h1>
<div class="row">
  <div class="span12">
    <form action="/login" class="well form-inline login-form" method="POST">
      <label for="data[User][username]">Username</label>
      <input class="input username" id="username" name="data[User][username]" type="text" placeholder="Username">
      <label for="data[User][password]">Password</label>
      <input class="input password" id="password" name="data[User][password]" type="password" placeholder="Password">
      <button type="submit" class="btn">Sign In</button>
    </form>
  </div>
</div>
