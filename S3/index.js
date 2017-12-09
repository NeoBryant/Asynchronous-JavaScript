$(window).ready(function() {
    sum = 0;
    count = 0;
    flag = false;
    $(".apb").click(function() {
        if (flag == false) {
            for (var j = 0; j < 5; j++) {
                $("li").eq(j).trigger("click", j);
            }
            flag = true;
        }
    });
    $("li").click(function(e,j) {
        if ($(this).hasClass("button")) {
            var that = $(this).find("span");
            var point = $(this);
            $("li").addClass("disable");
            $(that).addClass("unread");
            $(that).html("...");
            $.get("/"+j, function(res, status, xhr) {
                $(that).html(res);
                sum += parseInt(res);
                ++count;
                if (count == 5) {
                    $("#info-bar").removeClass("disable").addClass("enable");
                    setTimeout(function() {
                        $("p").html(sum);
                        $("#info-bar").removeClass("enable").addClass("disable");
                    }, 500);
                }
            });
        }
    });
    $("#at-plus-container").mouseleave(function() {
        $("p").html("");
        $("span").html("");
        $("span").removeClass("unread");
        $("li").removeClass("disable");
        $("#info-bar").removeClass("enable").addClass("disable");
        sum = 0;
        count = 0;
        flag = false;
    });
});
function otherdisable() {
    for (var i = 0; i < 5; i++) {
        var num = $("li").eq(i);
        if (i != index_ && (!$(num).hasClass("disable"))) {
            $(num).addClass("disable");
        }
    }
}
function otherenable() {
    for (var i = 0; i < 5; i++) {
        var num = $("span").eq(i);
        if (!$(num).hasClass("unread")) {
            $("li").eq(i).removeClass("disable");
        }
    }
}