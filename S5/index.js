$(window).ready(function() {
    arr = [0, 1, 2, 3, 4];
    array = new Array();
    sum = 0;
    count = 0;
    flag = false;
    j = 0;
    $(".apb").click(function() {
        if (flag == false) {
            arr.sort(randomsort);
            for (var i = 0; i < 5; i++) {
                array[i] = String.fromCharCode(arr[i]+65);
            }
            $("#array").html(array.join(" "));
            $("li").eq(arr[j]).trigger("click", j);
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
                            $("li").eq(arr[j]).trigger("click", j);
                        }
                    }, 500);
                });
            }
        }
    });
    $("#at-plus-container").mouseleave(function() {
        $("p").html("");
        array.length = 0;
        $("span").html("");
        $("span").removeClass("unread");
        $("li").removeClass("disable");
        $("#info-bar").removeClass("enable").addClass("disable");
        $("#array").html("");
        sum = 0;
        count = 0;
        flag = false;
    });
});
function randomsort(a, b) {
        return Math.random()-0.5;
}
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