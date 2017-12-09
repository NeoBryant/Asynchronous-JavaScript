$(window).ready(function() {
    sum = 0;
    count = 0;
    flag = false;
    j = 0;
    $(".apb").click(function() {
        if (flag == false) {
            $("li").eq(j).trigger("click", j);
            flag = true;
        }
    });
    $("li").click(function(e,j) {
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
                        setTimeout(function() {
                            $("p").html(sum);
                            $("#info-bar").removeClass("enable").addClass("disable");
                        }, 500);
                    }
                    setTimeout(function() {
                        if (j <= 4) {
                            j++;
                            $("li").eq(j).trigger("click", j);
                        }
                    }, 500);
                });
            }
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