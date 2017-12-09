$(window).ready(function() {
    var sum = 0;
    var count = 0;
    $("li").click(function() {
        if ($(this).hasClass("button")) {
            var that = $(this).find("span");
            var point = $(this);
            if (!$(point).hasClass("disable")) {
                $("li").addClass("disable");
                $(point).removeClass("disable");
                $(that).addClass("unread");
                $(that).html("...");
                $.get("http://localhost:3000", function(res, status, xhr) {
                    $(that).html(res);
                    sum += parseInt(res);
                    ++count;
                    $(point).addClass("disable");
                    otherenable();
                    if (count == 5) {
                        $("#info-bar").removeClass("disable").addClass("enable");
                        $("#info-bar").click(function() {
                            $("p").html(sum);
                            $(this).removeClass("enable").addClass("disable");
                        });
                    }
                });
            }
        }
    });
    /*  鼠标光标离开时  */
    $("#at-plus-container").mouseleave(function() {
        $("p").html("");
        $("span").html("");
        $("span").removeClass("unread");
        $("li").removeClass("disable");
        $("#info-bar").removeClass("enable").addClass("disable");
        sum = 0;
        count = 0;
    });
});
function otherenable() {
    for (var i = 0; i < 5; i++) {
        var num = $("span").eq(i);
        if (!$(num).hasClass("unread")) {
            $("li").eq(i).removeClass("disable");
        }
    }
}