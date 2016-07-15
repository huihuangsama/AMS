window.onload = function() {
    add_banner();
    gotofunc();
    addschedule();
    // workregister();
}

function addschedule() { //从后台接收个人排班数据并显示
    // var schedule = [{"sid" : "10", "time": "108000900"}, {"sid" : "11", "time": "308000900"}, {"sid" : "12", "time": "408000900"}]; //test data
    $.ajax({
        url: 'getScheduling',
        success:function(res) {
            console.log(res);
            if(res['success'] == 1) {
                var schedule = res['data'];
                tbody = document.getElementById("tbo");
                for (var i = 0; i < schedule.length; i++) {
                    tbody.insertRow(i);
                    tbody.rows[i].insertCell(0).innerHTML = schedule[i].sid;
                    var time = schedule[i]['time'];
                    if (time[0] == '1')
                        tbody.rows[i].insertCell(1).innerHTML = "星期一";
                    else if (time[0] == '2') {
                        tbody.rows[i].insertCell(1).innerHTML = "星期二";
                    }
                    else if (time[0] == '3') {
                        tbody.rows[i].insertCell(1).innerHTML = "星期三";
                    }
                    else if (time[0] == '4') {
                        tbody.rows[i].insertCell(1).innerHTML = "星期四";
                    }
                    else if (time[0] == '5') {
                        tbody.rows[i].insertCell(1).innerHTML = "星期五";
                    }
                    else if (time[0] == '6') {
                        tbody.rows[i].insertCell(1).innerHTML = "星期六";
                    }
                    else if (time[0] == '7') {
                        tbody.rows[i].insertCell(1).innerHTML = "星期日";
                    } else {
                        alert("Time Format Error!!!")
                    }
                    var worktime = time[1] + time[2] + ":" + time[3] + time[4] + " ~ " + time[5] + time[6] +":" + time[7] + time[8];
                    tbody.rows[i].insertCell(2).innerHTML = worktime;
                    var on_work = document.createElement("a");
                    on_work.href = "javascript:void(0)";
                    tbody.rows[i].insertCell(3).appendChild(on_work);
                    var off_work = document.createElement("a");
                    off_work.href = "javascript:void(0)";
                    tbody.rows[i].insertCell(4).appendChild(off_work);
                    on_work.innerHTML = "上班";
                    off_work.innerHTML = "下班";
                    var myDate = new Date();
                    var Day = myDate.getDay();
                    var work_Day = parseInt(time[0]);
                    // console.log(Day); 
                    if (work_Day === Day ) {
                        on_work.setAttribute("class", "onwork");
                        off_work.setAttribute("class", "offwork");
                    } else {
                        on_work.style.color = "black";
                        off_work.style.color = "black";
                    }
                }
                $(".panel-body").delegate('.onwork', 'click', function(event) {
                    // if (this.innerHTML === "上班") {
                    //     this.innerHTML = "已上";
                        // console.log(this);
                        var sid = this.parentNode.previousSibling.previousSibling.previousSibling.innerHTML;
                        var ontime_str = this.parentNode.previousSibling.innerHTML;
                        var myDate = new Date();
                        var hour = myDate.getHours();
                        var onhour = parseInt(ontime_str[0] + ontime_str[1]);
                        var min = myDate.getMinutes();
                        var bias = 0;
                        if (hour >= onhour) {
                                bias += min;
                                bias += 60 * (hour - onhour);
                                bias = -bias;
                        } else {
                                bias += (60 - min);
                                bias += 60 * (onhour - hour - 1);
                        }
                        //把bias传给后台
                        console.log(sid)
                        console.log(bias)
                        $.ajax({
                               url: 'checkIn',
                               type: 'POST',
                               dataType: 'json',
                               data: {'sid': sid, 'bias': bias},
                               success:function(res) {
                                    console.log(res);
                               }, error: function(err) {
                                    console.log(err);
                               }
                           });
                              
                });
                $(".panel-body").delegate('.offwork', 'click', function(event) {
                    var sid = this.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;
                    console.log(sid);
                    var myDate = new Date();
                    var hour = myDate.getHours();
                    var offtime_str = this.parentNode.previousSibling.previousSibling.innerHTML;
                    var offhour = parseInt(offtime_str[8] + offtime_str[9]);
                    var min = myDate.getMinutes();
                    var bias = 0;
                    if (hour < offhour) {
                            bias += (60 - min);
                            bias += 60 * (offhour - hour - 1);
                            bias = -bias;
                    } else {
                        bias += min;
                        bias += 60 * (hour - offhour);
                    }
                    //把bias传给后台
                    console.log(bias);
                    $.ajax({
                           url: 'checkOut',
                           type: 'POST',
                           dataType: 'json',
                           data: {'sid': sid, 'bias': bias},
                           success:function(res) {
                                console.log(res);
                           }, error: function(err) {
                                console.log(err);
                           }
                       });
                });
            } else {

            }
            // console.log(res);
        }, error:function(err) {
            console.log(err);
        }
    });
}
