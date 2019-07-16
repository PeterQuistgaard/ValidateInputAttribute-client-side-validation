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
