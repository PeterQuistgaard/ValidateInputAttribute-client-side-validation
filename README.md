# ValidateInputAttribute-client-side-validation
Client side validation for asp.net mvc 5 “A potentially dangerous Request.Form…

ValidateInput Attribute is used to prevent XSS Attack in ASP.Net MVC 5.

It can be explicitly set as ```[ValidateInput(true)]```, but it is default set on all ActionResults in a Controller.

When detecting a potentially dangerous client input value, it vil give this server side error:

*A potentially dangerous Request.Form value was detected from the client ....*

It is possible to awoid this error, by catching the error on the client, before it is send to the server.

## Standard client side validation in ASP.Net MVC 5
ASP.Net MVC 5 use jquery.validate.js and jquery.validate.unobtrusive.js to validate user input on the client.

This line in App_Start\BundleConfig.cs

``` C#
bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include("~/Scripts/jquery.validate*"));
```

and this line in Views

``` C#
@section Scripts {
    @Scripts.Render("~/bundles/jqueryval")
}
```

adds jquery.validate.js and jquery.validate.unobtrusive.js to the View.


## Add validation rules to form fields

Add the file xssvalidation.js to ```@section Scripts``` in View

``` C#
@section Scripts {
    @Scripts.Render("~/bundles/jqueryval")
   <script src="~/Scripts/xssvalidation.js"></script>
}
```

jQuery.validator.addMethod() is used to add two validation rules form fields.
(https://jqueryvalidation.org/jQuery.validator.addMethod)

### xssvalidation.js

``` javascript
/// xssvalidation.js

jQuery(document).ready(function () {

    // Add a custom validation method to capture &# 
    $.validator.addMethod(
        "xssvalidation1",
        function (value, element) {
            return this.optional(element) || !/\&\#/gi.test(value);//search for &#
        },
        "The character combination &# is not allowed"
    );
        
    // Add a custom validation method to capture <
    $.validator.addMethod(
        "xssvalidation2",
        function (value, element) {
            return this.optional(element) || !/\<(?=([a-z]|[\!\/\?]))/gi.test(value);     
        },
        "The character < is not allowed if it is directly followed by a letter a-z or one of these three characters ! / ?"
    );

    //Select form fields and add class xssvalidation
    $("form input:text, form textarea").addClass("xssvalidation");

    //Add rules to alle field with the class name xssvalidation
    $.validator.addClassRules("xssvalidation", {
        xssvalidation1: true,
        xssvalidation2: true
    });
}); 
```

## Demo
When not allowed character combinations are used, an error message is given to the user.

<img src="https://raw.githubusercontent.com/PeterQuistgaard/ValidateInputAttribute-client-side-validation/master/Screendump.PNG" width="500">



