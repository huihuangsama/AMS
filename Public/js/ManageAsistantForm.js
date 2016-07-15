window.onload = function() {
    add_banner();
    gotofunc();
    AssistantsTable();
    del_add_Assistant();
}

function AssistantInfo(did, dname, aid, sname, phone, email) {
    this.head = "<tr id='"+aid+"'><form><th><button class='btn delbutton' value='"+aid+"'>注销</button></th><td>";
    this.text1 = "</td></form><td>";
    this.text2 = "</td><td>";
    this.text3 = "</td><td>";
    this.text4 = "</td><td>";
    this.text5 = "</td></tr>";
    this.did = did;
    this.dname = dname;
    this.aid = aid;
    this.sname = sname;
    this.phone = phone;
    this.email = email;
    this.GetAssistantInfo_ = GetAssistantInfo(this);
}

function GetAssistantInfo(Assistant) {
    return (Assistant.head+Assistant.aid+Assistant.text1+Assistant.sname+Assistant.text2+Assistant.dname+Assistant.text3
        +Assistant.phone+Assistant.text4+Assistant.email+Assistant.text5);
}


function AssistantsTable() {
    $.ajax({
        url: 'getAllAssistants',
        success: function(res) {
            if (res['success'] == 1) {
                console.log(res);
                var dnames = res['did_depart'];

                for (var x in dnames) {
                    $("#ManageTable").append("<tbody id='did"+x+"' name='"+dnames[x]+"'></tbody>");
                    $("#addDid").append("<option value='"+x+"'>"+dnames[x]+"</option>");
                }
                var Assistant = res['all_info'];
                for (var i = 0; i < Assistant.length; i++) {
                    var a = new AssistantInfo(Assistant[i]["did"], dnames[Assistant[i]["did"]], Assistant[i]["id"],Assistant[i]["name"],Assistant[i]["phone"],Assistant[i]["email"]);
                    var tbodyid = "#did" + a.did;
                    $(tbodyid.toString()).append(a.GetAssistantInfo_);
                }

            }
        }, error: function(err) {
            console.log(err);
        }
    });

}

function del_add_Assistant() {
    $("table").delegate('.delbutton', 'click', function() {
        var delAssistantId = this.value;
        $.ajax({
            url: 'delAssistant',
            type: 'POST',
            dataType: 'JSON',
            data: {'aid': delAssistantId},
            success: function(data) {
                //删除成功后，删除表项；
                var id_ = "#" + delAssistantId;
                $(id_.toString()).remove();
                // console.log(data);
                alert("助理删除成功！");
            }, error: function(err) {
                alert("出现错误：" + err);
            }
        });
    });

    $("#addbutton").click(function(){
        var addAssistantId = $("#addid").val();
        var addAssistantDid = $("#addDid").val();
        var tbodyid = "#did" + addAssistantDid;
        var addAssistantDname = $("select option:selected").text();
        console.log(addAssistantDid);
        $.ajax({
            url: 'addAssistant',
            type: 'POST',
            dataType: 'JSON',
            data: {'aid': addAssistantId, 'did':addAssistantDid},
            success: function(res) {
                if (res['success'] == 1) {
                    var a = new AssistantInfo(addAssistantDid, addAssistantDname, addAssistantId,"anonymous", "0","xxx@xxx.com");
                    $(tbodyid.toString()).append(a.GetAssistantInfo_);
                    $("#addid").val("");
                    $("#addDid").val("");
                    alert("助理添加成功！");
                } else {
                    // 添加失败
                    alert("该助理已存在！");
                    $("#addid").val("");
                    $("#addDid").val("");
                }
                // console.log(res);
            }, error: function(err) {
                console.log(err);
            }
        });
    });
}

// function addDelAssistant() {
    // $("#addbutton").click(function(){ 
    //     var addAssistantId = $("#addid").val();
    //     var add_url = url + '/addAssistant';
    //     $.ajax({
    //         url: add_url,
    //         type: 'POST',
    //         dataType: 'JSON',
    //         data: {'aid': addAssistantId},
    //         success: function(data) {
    //             console.log(data);
    //         }, error: function(err) {
    //             console.log(err);
    //         }
    //     });
    // });

//     $(".delbutton").click(function(){ 
        // var delAssistantId = this.value;
        // alert(delAssistantId);
        // var del_url = url + '/delAssistant';
        // $.ajax({
        //     url: del_url,
        //     type: 'POST',
        //     dataType: 'JSON',
        //     data: {'aid': delAssistantId},
        //     success: function(data) {
        //         console.log(data);
        //     }, error: function(err) {
        //         console.log(err);
        //     }
        // });
//     });
// }
