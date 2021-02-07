import React from "react";
function NoMatch(){

return <div className="error-404box">
<section class="error-container">
  <span>4</span>
  <span><span class="screen-reader-text">0</span></span>
  <span>4</span>
</section>
<code><span>this_page</span>.<em>not_found</em> = true{";"}</code>
<code><span>if</span> (<b>you_spelt_it_wrong</b>) {"{"}<span>{"try_again()"}</span>{";}"}</code>
<code><span>else if (<b>we_screwed_up</b>)</span> {"{"}<em>alert</em>(<i>"We're really sorry about that."</i>){";"} <span>window</span>.<em>location</em> = home{";}"}</code>
<div class="link-container">
  <a href="/" class="more-link">Home</a>
</div>
</div>
}

export default NoMatch;
