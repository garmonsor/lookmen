# jQuery Copy On Click Plugin

This plugin provides a simple and flexible way to add "copy to clipboard" functionality to a website. This sounds like a fairly simple thing to do, but at the time of writing most solutions for this simple action relied on Adobe Flash! Support for clipboard access in web browsers is still tenuous for security reasons, so it can be kind of difficult to find a method that works well for you.

I have seen various different techniques in use around the web, and I have selected what seems to be the most portable and flexible technique, that of using the document.execCommand("copy"); call, and have encapsulated it in a plugin for ease of use and deployment.

This technique literally creates a new temporary element "in the background", highlights the contents of the elements and then copies that selection, before finally deleting this temporary element again.

The main idea behind this plugin is the ability to easily and coherently add "Copy" buttons to a web page, and while the examples on this page are all static the plugin is quite at home to being used with dynamically generated buttons too - you just need to make sure you call the plugin for your added buttons!

# Using the plugin

It should go without saying that you need to load jQuery before you can use this jQuery plugin; you can download the latest editions Here. I built this plugin against jQuery 3.2.1 and haven't tested earlier versions extensively, but I forsee no major issues using this with legacy jQuery.

The plugin is designed to copy some text into the system clipboard when an element is clicked. There are lots of ways you may wish to implement this, and the plugin attempts to be flexible enough to cover as many of them as possible; You can copy HTML, Text, Form control values and element attribute values from either the same element that was clicked or another that is pointed to.

All elements which have this copy-on-click behaviour must specify the data-copy-on-click attribute in their html, which is either the text to copy in its simplest form, or a jQuery selector string to find the element to copy.

For the simplest implementations, where you just want a button which copies a given piece of text, you need one HTML element and one line of JavaScript/jQuery initialisation code:

```html
<!-- HTML HEAD SNIPPET -->
  <!-- Load jQuery -->
  <script src="/path/to/jquery.3.2.1.js"></script>

  <!-- Load Plugin -->
  <script src="/path/to/copy_on_click.js"></script>

  <!-- Initialise copy buttons on load -->
  <script>
    $(function(){
      /* Javascript called when page has loaded */
      $("*").copyOnClick();
    });
  </script>

<!-- HTML BODY SNIPPET -->
  <button data-copy-on-click="Copy This Text">Copy</button>
```

This example assumes we just want a button which copies the text "Copy This Text" when clicked. The plugin is much more powerful than this, however, so I advise you check out the more detailed examples in below.

# Plugin Options

The plugin has the following options, all of which are passed in as a single object argument:
| Option | Type | Description |
| ---    | ---  | ---         |
| **triggerOn**     |	`string` (jQuery event name(s))	| This gets passed on to the event binding routine so that the named event will be used to trigger the copy. This defaults to "click.copyOnClick", but you can change this to anything valid in the jQuery .on() function. |
| **attrData**	    | `string`	| This specifies the name of the HTML attribute used for copy on click elements. The default is data-copy-on-click which is suitable for most purposes, but you can change it to another attribute if you wish. |
| **attrTarget**	  | `string`	| This specifies the name of the HTML attribute which is used when copyMode is set to "attr""; for example if we wanted to fetch the src of an image we would set {copyMode:"attr",attrTarget:"src"}. |
| **copyMode**	    | `string`	| This must be set to one of the following: attr, attribute, html, self, text, val or value. The default is self. This sets the source of the copy; where to get the text from. If this is set to self then the calling element (eg. the clicked button) will have an attrData attribute (such as the default data-copy-on-click) and the value of this is what will be copied. For all other modes, the attrData attribute should be set to the jQuery selector for the element you wish to use as a source for the copy. |
| **confirmClass**	| `string`	| This specifies the CSS class used by the confirmation popup. The default is copy-on-click. This can be used to have different styles of copy confirmation popup within one page. |
| **confirmShow**	  | `boolean`	| Whether or not to produce a popup when text has been copied. |
| **confirmText**	  | `string`	| This is the text to display in the confirmation popup. The default is "<b>Copied:</b> %c". The %c will be replaced with the text that was copied. Similarly %i will be replaced with the id of the source element (that the text was copied from). As you can see from the default, you can include HTML; the popup will be encapsulated in a <div> element. |
| **confirmTime**	  | `float`	| The number of seconds to show the confirmation popup for. Note that only one popup with the class specified by confirmClass will be visible at once, as you only want the popup to be displayed for the most recent copy operation; for this reason you shouldn't use the confirmClass for other things in your code. |
| **confirmPopup**	| `function(msg,target,cls,tim,txt)`	| You can override this function, which is what actually creates the confirmation popup. The arguments are as follows: msg is the copied text, target is a jQuery object representing the source element, cls is the confirmClass option, tim is the confirmTime option value and txt is the confirmText option value. Check the plugin source to see the default confirmPopup function. |
| **beforeCopy**	  | `function(t,o,c)` |	You can define this function to modify or otherwise deal with copied text before it is actually copied to the clipboard. t is the text that is about to be copied, o is the jQuery object that the text was copied from and c is the calling object such as the button you clicked to copy. The return value should be the string you actually want to go into the clipboard, allowing you to filter and modify the text as you wish. |
| **afterCopy**	    | `function(t,o,c)`	| You can define this function to do something with the string after it has been copied to the clipboard, such as a more sophisticated preview or to trigger some feature of your web app. t is the text that has been copied, o is the jQuery object that the text was copied from and c is the calling object such as the button you clicked to copy. |
  
# Usage Examples

These examples will cover most of what you need to know if you just want copy-on-click behaviour.
  
## Simple Example
  
The simplest usage of the plugin is to copy a preset value to the clipboard when an element is clicked.

The `dataAttr` option sets what attribute this value is set in; for our examples we'll use the default of `data-copy-on-click`.

Here's the HTML we need for the button, the preset value here being "Simple Example":

```html
<button class="copy-default" data-copy-on-click="Simple Example">Copy</button>
```
  
Because the plugin only adds the click event handlers for items with a data-copy-on-click, the following will provide a default for all copy-on-click elements:

```js
$('*').copyOnClick();
```

This works because we put this plugin call above all the others. Subsequent plugin calls will override any existing copy-on-click; you'll note that the other examples each have their own class selected instead of "*", overriding this default on each of them.

Note that I have left the confirmation popup unstyled on this example; see the "Controlling Confirmation Popup" example to see how to control the appearance as seen on the other examples.

## Text Content & HTML Examples

You can also use the plugin to copy the `innerText` or `innerHTML` values of another element. We use the attribute specified by the `attrData` option as a jQuery selector to the element we want to use as a source.

For this example we'll create a `<div>` to copy from:

```html
<div id="text_copy"><b>This</b> is the text that will be <i>copied</i>.</div>
<button class="copy-text" data-copy-on-click="#text_copy">Copy Text</button>
<button class="copy-html" data-copy-on-click="#text_copy">Copy HTML</button>
```

This time we provide a non-default copyMode to specify the copy mode for these buttons:

```js
$('.copy-text').copyOnClick({copyMode:"text"});
$('.copy-html').copyOnClick({copyMode:"html"});
```

## Attribute Example

We often want to copy a particular attribute of a particular element, such as copying a link's url as well as being able to click the link to navigate to it:

```html
<a href="http://sulli.work/jquery_copy_on_click#example_attr" id="link_copy">Link To This Page</a>
<button class="copy-attr" data-copy-on-click="#link_copy">Copy</button>
```

We are using the attr or attribute copyMode here, so we need to specify it rather than the default self:

```js
$('.copy-attr').copyOnClick({copyMode:"attr",attrTarget:"href"});
```

# Popup Confirmation

The user usually needs some way to know their click has worked, so the plugin provides a popup mechanism. You can control what css class these popups will have assigned to them, the text that appears on them and how long they appear, and you can override the default popup with your own routine if you prefer:

## Controlling the Confirmation Popup

You'll notice that, by default, a div appears briefly to confirm the copied text. By default this "popup" appears for 1.5 seconds and has the css class `copy-on-click`; I have left this class undefined so you can see what happens when it's not styled, but I have provided the class "copy-confirmation" instead, which we will use in the examples below:

```html
<style>
  .copy-confirmation {
    background-color:rgba(200,200,200,0.7);
    position:absolute;
    z-index:100;
    color:#000;
    font-size:15px;
    text-align:center;
    padding:10px;
    padding-top:5px;
    padding-bottom:5px;
    border-radius:3px;
    border:1px solid #ccc;
    display:block;
    max-width:60vw;
    margin-left:auto;
    margin-right:auto;
    margin-top:-15px;
    margin-bottom:1px;
  }
</style>
<button id="ex1" data-copy-on-click="Copied Text 1">None</button>
<button id="ex2" data-copy-on-click="Copied Text 2">½ sec</button>
<button id="ex3" data-copy-on-click="Copied Text 3">3 sec</button>
<button id="ex4" data-copy-on-click="Copied Text 4">Custom</button>
<button id="ex5" data-copy-on-click="Copied Text 5">Select</button>
<button id="ex6" data-copy-on-click="Copied Text 6">Simple</button>
```

Note the different options set below, and in particular to the options selected for `#ex4` below which show how you can use \\ to escape the replacement of %c if required:

```js
$('#ex1').copyOnClick({confirmShow:false});
$('#ex2').copyOnClick({
  confirmTime:0.5,
  confirmClass:"copy-confirmation"
});
$('#ex3').copyOnClick({
  confirmTime:3,
  confirmClass:"copy-confirmation"
});
$('#ex4').copyOnClick({
  confirmClass:"copy-confirmation",
  confirmText:"\\%c «%c» \\%c"
});
$('#ex5').copyOnClick({
  confirmClass:"copy-confirmation",
  confirmText:"Copied from %i"
});
$('#ex6').copyOnClick({
  confirmTime:1,
  confirmClass:"copy-confirmation",
  confirmText:"copied"
});
```

## Replacing The Popup With Alert Window

Sometimes during testing we use an alert box like this but it would get very annoying!

```html
<button class="copy-alert" data-copy-on-click="This is the copied text">Copy</button>
```

All we need to do is override the confirmPopup function:

```js
$('.copy-alert').copyOnClick({
  confirmPopup:function(copied,target,classname,time,txt){
    var s=$.fn.copyOnClick.replaceText(txt,str,"");
    alert(s);
  }
});
```

You can use this to trigger your own popups in addition to using the beforeCopy and afterCopy callbacks (see further examples below).

## A Different Popup

Here's a really stripped down version of the default popup; instead of using the `txt`,`classname` and `time` arguments we will ignore them and just use our own, static values. Note the `style` attribute used to change the colour of the popup too:

```html
<button class="copy-static" data-copy-on-click="This is the copied text">Copy</button>
Again, all we need to do is override the confirmPopup function:
```

```js
$('.copy-static').copyOnClick({
  confirmPopup:function(copied,target,classname,time,txt){
    if(typeof $.fn.copyOnClick.copyconf!="undefined") { clearTimeout($.fn.copyOnClick.copyconf);}
    $('.copy-confirmation').remove();
    target.after('<div class="copy-confirmation" style="background:#faa;">copied</div>');
    $.fn.copyOnClick.copyconf=setTimeout(function(){$('.copy-confirmation').remove();},1000);
  }
});
```

# Customised Callbacks

Sometimes you need to be able to process the text you're copying; In fact this is generally a good idea so you trim whitespace at the very least. You may also want additional behaviour on copy, like a more elaborate preview of the copied text, or you may want to simply change the default confirmation popup with a snazzy one of your own. That's what the following two methods are for:

## Using `beforeCopy` as a filter

Here we'll use a regex to replace anything but letters letters and spaces from the string "We have 10 items!" with asterisks using the regex `/[^a-z ]/ig`:

```html
<button class="copy-before-copy" data-copy-on-click="We have 10 items!">Copy</button>
```

We're using all default settings apart from our beforeCopy function and our copy-confirmation class:

```js
$('.copy-before-copy').copyOnClick({
  confirmClass:"copy-confirmation",
  beforeCopy:function(text,target,self){
    return text.replace(/[^a-z ]/ig,'*');
  }
});
```

As you can see all we need to do is take the text attribute, do our magic on it inside our beforeCopy function, and then return the result.

## Using `afterCopy` for extra behaviours:

Here we'll change the value of the text after each copy, starting at 1 and working upwards:

```html
<button class="copy-after-copy" data-copy-on-click="1">Copy</button>
```

We're using all default settings apart from our afterCopy function and our copy-confirmation class:

```js
$('.copy-after-copy').copyOnClick({
  confirmClass:"copy-confirmation",
  afterCopy:function(text,target,self){
    var v=parseInt(target.attr("data-copy-on-click"));
    if(!isNaN(v)) {
      v++;
      target.attr("data-copy-on-click",v);
    }
  }
});
```

## Binding to double click instead of click:

By overriding the `triggerOn` property, we can use a different event to trigger the copy:

```html
<div class="btn-block copy-doubleclick" id="double_copy_on_click" data-copy-on-click="#double_copy_on_click">Double click me to copy this text!</div>
```

And the javascript:

```js
$('#double_copy_on_click').off("click").on("click",function(e){e.preventDefault();e.stopPropagation();}).copyOnClick({
    confirmTime:3,
    confirmClass:"copy-confirmation",
    triggerOn:"dblclick.copyOnClick",
    copyMode:"html",
});
```

We've disabled the click action entirely here with `.on("click",function(e){e.preventDefault();e.stopPropagation();})`; this might be needed if the element was a link or button.

If you double click this element, the html will be copied - it doesn't need to be a button or other UI element!

