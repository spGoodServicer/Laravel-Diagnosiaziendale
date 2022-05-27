var UITree = function () {
    var handleSample1 = function () {

        $('.tree_1').jstree({
            "core" : {
                "themes" : {
                    "responsive": false
                }            
            },
            "types" : {
                "default" : {
                    "icon" : "fa fa-folder icon-state-warning icon-lg"
                },
                "file" : {
                    "icon" : "fa fa-file icon-state-warning icon-lg"
                }
            },
            "plugins": ["types"]
        });
        
        $('.tree_1').on('select_node.jstree', function(e,data) { 
            console.log("tree1");
            console.log("##############################DATA#################################");
            console.log(data);
            var html_append=``; 
            console.log(data.node.id);
            var str = $('#' + data.selected).text();
            var logiccontent=$(this).parent().siblings(".logic-content");
            var qt_type_in= $(this).parent().siblings(".qt_type");
            var logic_question_id= $(this).parent().siblings(".logic_question_id");
            var qt_nm = $(this).siblings(".qt_name");
            var name= str.split(".");
            var id = data.node.id.split("_");
            var route = "/user/questions/get_info";
            if (name.length>1)
            {
            var qt_id =name[0];
            e.preventDefault();
            $.ajax({
                data: {id:qt_id},
            //url: "{{ route('questions.store') }}",
                url: route,
                type: "GET",
                dataType: 'json',
                success: function(response){
                var type=response[0].questiontype; 
                var questionid=response[0].id; 
                console.log(response[0]);
                if(response[0].content != ""){
                    // var content= JSON.parse(response[0].content);
                    var content= response[0].content;
                    qt_type_in.val(type);
                    logic_question_id.val(questionid);
                    qt_nm.val(response[0].id+"."+response[0].question);
    
                   console.log(type);
					
                    if (type == 0)
                    {
                        html_append +=
                            `<div class="row main-content" id="cond_`+ response[0].id +`"  >
                                <div class="col-8 form-group">
                                
                                <div class="form-group form-md-line-input">
                                    <textarea class="form-control" rows="1"></textarea>
                                    <label for="form_control_1">Please enter/select the value</label>
                                </div>                     
                         
                            
                                </div>
                                <div class="col-4">
                                    <div class="form-body">                                    
                                        <div class="form-group ">
                                            <img class="display-image-preview" src="/uploads/image/`+ response[0].questionimage+`"
                                             style="max-height: 150px;">
                                        </div>
                        
                                    </div>
                                </div>
                            </div> `;
                    }
    
                    if (type == 1)
                    {
                       var datacontent = JSON.parse(response[0].content);
                       console.log(datacontent.length);
                        html_append +=
                    `<div class="row main-content" id="cond_`+ response[0].id +`" >                    
                        <div class="col-7 form-group logic_check" style="margin-left:20px;">`;
                        $.each(datacontent,function(index,value){
                            if(index != (datacontent.length-1)){
                            html_append +=
                            `<div  class="checkbox">
                                <label><input class="checkbox_`+ index +`" type="checkbox" >` + value.label+ `</label>                      
                            </div>`;
                            }
                            
                        });
                        html_append +=       
                                `</div>                
                                <div class="col-4">
                                    <div class="form-body">                                    
                                        <div class="form-group ">
                                            <img class="display-image-preview" src="/uploads/image/`+ response[0].questionimage+`"
                                            style="max-height: 150px;">
                                        </div>
                        
                                    </div>
                                </div>                    
                            </div>`;
                    // for(var i= 0; i< content.length; i++)    
                    //     html_append +=
                    //     `<div  class="checkbox">
                    //         <label><input class="checkbox_`+ i +`" type="checkbox" >` + content[i]+ `</label>                      
                    //     </div>`;
                    
                    // html_append +=       
                    //     `</div>                
                    //     <div class="col-4">
                    //         <div class="form-body">                                    
                    //             <div class="form-group ">
                    //                 <img class="display-image-preview" src="/uploads/image/`+ response[0]['questionimage']+`"
                    //                  style="max-height: 150px;">
                    //             </div>
                
                    //         </div>
                    //     </div>                    
                    // </div>`;
                    }
    
                    if (type == 2)
                    {
                        var datacontent = JSON.parse(response[0].content);
                        html_append +=`
                        <div class="row main-content" id="cond_`+ response[0].id +`"  >       
                            <div class="col-7 form-group logic_radio" style="margin-left:20px;">`;
                            $.each(datacontent,function(index,value){
                                if(index != (datacontent.length-1)){
                                html_append +=
                                `<div  class="radio">
                                    <label><input class="radio_`+ index  +`" type="radio" name="optradio` + response[0].id+ `">` + value.label+ `</label>                      
                                </div>`;
                                }
                                
                            });
                                    
                            html_append +=       
                                `</div>                
                                <div class="col-4">
                                    <div class="form-body">                                    
                                        <div class="form-group ">
                                            <img class="display-image-preview" src="/uploads/image/`+ response[0].questionimage+`"
                                            style="max-height: 150px;">
                                        </div>
                        
                                    </div>
                                </div>                    
                            </div>`;
                    }
    
                    if (type == 3)
                    {
                        html_append +=`   
                        <div class="row main-content logic_img" id="cond_`+ content['id'] +`"  >    
                            `;           
                        
                            for(var i=0;i< content.length; i++)
                                html_append +=
                                `<div class="col-md-3 col-sm-6 image_box" style="padding-left:20px;width:7vw;height:10vw;" display="inline-flex" >
                                    <div  class="checkbox">
                                        <input class="imagebox_`+ i +`" type="checkbox" class="img_check`+ i +`">                      
                                    </div>
                                    <img src="/uploads/image/` + content[i]+`"  width="50px" height="50px" style="object-fit:fill">
                                </div>`;
    
                        html_append += `
                            </div>`;
                            
    
                    }
    
                    if (type == 4)
                    {
                        // html_append =
                        //     `<div class="row main-content" id="cond_`+ response[0].id +`"  >
                        //         <div class="col-12 form-group">
                                
                        //             <div class="form-group form-md-line-input">
                        //                 <textarea class="form-control" rows="1"></textarea>
                        //                 <label for="form_control_1">Please enter/select the value</label>
                        //             </div>  
                        //         </div>
                                
                        //     </div> `;
                            html_append = response[0].content;
                    }
                    logiccontent.html(html_append);
                    
                }
                
                
                },
                error: function(response){
                console.log(response);
                }
            });
            }
            console.log(html_append);   
            $(this).hide();

    
        });
 
        // handle link clicks in tree nodes(support target="_blank" as well)       
       
    }

    var handleSample2 = function () {

        $('.tree_2').jstree({
            "core" : {
                "themes" : {
                    "responsive": false
                }            
            },
            "types" : {
                "default" : {
                    "icon" : "fa fa-folder icon-state-warning icon-lg"
                },
                "file" : {
                    "icon" : "fa fa-file icon-state-warning icon-lg"
                }
            },
            "plugins": ["types"]
        });

        $('.tree_2').on('select_node.jstree', function(e,data) { 
            console.log("tree2");
            var str = $('#' + data.selected).text();
            var logiccontent=$(this).parent().siblings(".logic-content");
            var qt_type_in= $(this).parent().siblings(".qt_type");
            var qt_nm = $(this).siblings(".qt_name");

            var name= str.split(".");
            if (name.length>1)
            {
            var qt_id =name[0];
        
            e.preventDefault();
        // $(this).html('Sending..');

            $.ajax({
                data: {id:qt_id},
            //url: "{{ route('questions.store') }}",
                url: "../get_info",
                type: "GET",
                dataType: 'json',
                success: function(response){
                var type=response[0]['questiontype']; 
                var content= JSON.parse(response[0]['content']);
                var html_append=``; 

                qt_type_in.val(type);
                qt_nm.val(response[0]['id']+"."+response[0]['question']);

                
                if (type == 0)
                {
                    html_append =
                        `<div class="row main-content" id="cond_`+ response[0]['id'] +`"  >
                            <div class="col-8 form-group">
                                <div class="form-group form-md-line-input">
                                    <textarea class="form-control" rows="1"></textarea>
                                    <label for="form_control_1">Please enter/select the value</label>
                                </div>  
                        
                            </div>
                            <div class="col-4">
                                <div class="form-body">                                    
                                    <div class="form-group ">
                                        <img class="display-image-preview" src="/uploads/image/`+ response[0]['questionimage']+`"
                                         style="max-height: 150px;">
                                    </div>
                    
                                </div>
                            </div>
                        </div> `;
                }

                if (type == 1)
                {
                    html_append =
                `<div class="row main-content" id="cond_`+ response[0]['id'] +`" >                    
                    <div class="col-7 form-group logic_check" style="margin-left:20px;">`;
                for(var i= 0; i< content.length; i++)    
                    html_append +=
                    `<div  class="checkbox">
                        <label><input class="checkbox_`+ i +`" type="checkbox" >` + content[i]+ `</label>                      
                    </div>`;
                
                html_append +=       
                    `</div>                
                    <div class="col-4">
                        <div class="form-body">                                    
                            <div class="form-group ">
                                <img class="display-image-preview" src="/uploads/image/`+ response[0]['questionimage']+`"
                                 style="max-height: 150px;">
                            </div>
            
                        </div>
                    </div>                    
                </div>`;
                }

                if (type == 2)
                {
                    html_append =`
                <div class="row main-content" id="cond_`+ response[0]['id'] +`"  >       
                    <div class="col-7 form-group logic_radio"  style="margin-left:20px;">`;
                for(var i= 0; i< content.length; i++)    
                    html_append +=
                    `<div  class="radio">
                        <label><input class="radio_`+ i +`" type="radio" name="optradio` + response[0]['id']+ `">` + content[i]+ `</label>                      
                    </div>`;
                            
                html_append +=       
                    `</div>                
                    <div class="col-4">
                        <div class="form-body">                                    
                            <div class="form-group ">
                                <img class="display-image-preview" src="/uploads/image/`+ response[0]['questionimage']+`"
                                style="max-height: 150px;">
                            </div>
            
                        </div>
                    </div>                    
                </div>`;
                }

                if (type == 3)
                {
                    html_append =`   
                    <div class="row main-content logic_img" id="cond_`+ response[0]['id'] +`"  >    
                        `;           
                        
                        for(var i=0;i< content.length; i++)
                            html_append +=
                            `<div class="col-3  image_box" style="padding-left:20px;width:7vw;height:10vw;" display="inline-flex" >
                                <div  class="checkbox">
                                    <input class="imagebox_`+ i +`" type="checkbox" class="img_check`+ i +`">                      
                                </div>
                                <img src="/uploads/image/` + content[i]+`"  width="80px" height="80px" style="object-fit:fill">
                            </div>`;

                    html_append += `
                        </div>`;
                        

                }

                if (type == 4)
                {
                    html_append =
                        `<div class="row main-content" id="cond_`+ response[0]['id'] +`"  >
                            <div class="col-12 form-group">
                                <div class="form-group form-md-line-input">
                                    <textarea class="form-control" rows="1"></textarea>
                                    <label for="form_control_1">Please enter/select the value</label>
                                </div>  
                        
                            </div>
                            
                        </div> `;
                }
           



                logiccontent.html(html_append);
                
                
                },
                error: function(response){
                console.log(response);
                }
            });
            }
                
            $(this).hide();

    
        });


      
 
        // handle link clicks in tree nodes(support target="_blank" as well)
   
    }
    var radio_id= 50;
    var handleSample3 = function () {

        $('.tree_3').jstree({
            "core" : {
                "themes" : {
                    "responsive": false
                }            
            },
            "types" : {
                "default" : {
                    "icon" : "fa fa-folder icon-state-warning icon-lg"
                },
                "file" : {
                    "icon" : "fa fa-file icon-state-warning icon-lg"
                }
            },
            "plugins": ["types"]
        });
        
        $('.tree_3').on('select_node.jstree', function(e,data) { 
            var str = $.trim($('#' + data.selected).text());
            var logiccontent=$(this).parent().siblings(".logic-content");
            var qt_type_in= $(this).parent().siblings(".qt_type");
            var qt_nm = $(this).siblings(".qt_name");

            var name= str.split(".");
            if (name.length>1) {
                var qt_id = name[0];

                e.preventDefault();
                // $(this).html('Sending..');

                $.ajax({
                    data: {id: qt_id},
                    //url: "{{ route('questions.store') }}",
                    url: "get_info",
                    type: "GET",
                    dataType: 'json',
                    success: function (response) {
                        var type = response[0]['questiontype'];
                        var html_append = ``;

                        qt_type_in.val(type);
                        qt_nm.val(response[0]['id'] + "." + response[0]['question']);


                        if (type == 0) {
                            var content = JSON.parse(response[0]['content']);
                            html_append = `<div class="row main-content" id="cond_` + response[0]['id'] + `"  >
                                            <div class="col-8 form-group">
                                                <div class="form-group form-md-line-input">
                                                    <textarea class="form-control" rows="1"></textarea>
                                                    <label for="form_control_1">Please enter/select the value</label>
                                                </div>  
                                        
                                            </div>
                                            <div class="col-4">
                                                <div class="form-body">                                    
                                                    <div class="form-group ">
                                                        <img class="display-image-preview" src="/uploads/image/` + response[0]['questionimage'] + `"
                                                         style="max-height: 150px;">
                                                    </div>
                                    
                                                </div>
                                            </div>
                                        </div> `;
                        }

                        if (type == 1) {
                            var content = JSON.parse(response[0]['content']);
                            var img_name = response[0]['questionimage'];
                            var img_path = "";
                            if (img_name != null && img_name != "")
                                img_path = "/uploads/image/" + img_name;
                            html_append = `<div class="row main-content" id="cond_` + response[0]['id'] + `" >
                                            <div class="col-7 form-group logic_check" style="margin-left:20px;">`;
                            for (var i = 0; i < content.length - 1; i++) {
                                var is_checked = "";
                                if (content[i]['is_checked'] == 1) {
                                    is_checked = "checked";
                                }
                                var score = content[i]['score'];
                                var label = content[i]['label'];
                                html_append += `<div class="checkbox"><label>
                                                    <input class="checkbox_` + i + `" type="checkbox" value="` + score + `" ` + is_checked + ` >` + label + `
                                                </label></div>`;
                            }

                            html_append += `</div>                
                                                <div class="col-4">
                                                    <div class="form-body">                                    
                                                        <div class="form-group ">
                                                            <img class="display-image-preview" src="` + img_path + `"
                                                             style="max-height: 150px;">
                                                        </div>
                                        
                                                    </div>
                                                </div>                    
                                            </div>`;
                        }

                        if (type == 2 || type == 6) {
                            var content = JSON.parse(response[0]['content']);
                            radio_id++;
                            var img_name = response[0]['questionimage'];
                            var img_path = "";
                            if (img_name != null && img_name != "")
                                img_path = "/uploads/image/" + img_name;
                            html_append = `<div class="row main-content" id="cond_` + response[0]['id'] + `"  >       
                                    <div class="col-7 form-group logic_radio" style="margin-left:20px;">`;
                            for (var i = 0; i < content.length - 1; i++) {
                                var score = content[i]['score'];
                                var label = content[i]['label'];
                                html_append += `<div class="radio"><label>
                                                    <input class="radio_` + i + `" type="radio" name="optradio` + response[0]['id'] + `_` + radio_id + `" value="` + score + `">` + label + `</label>                      
                                                </div>`;
                            }
                            html_append += `</div>                
                                                <div class="col-4">
                                                    <div class="form-body">                                    
                                                        <div class="form-group ">
                                                            <img class="display-image-preview" src="` + img_path + `"
                                                            style="max-height: 150px;">
                                                        </div>
                                                    </div>
                                                </div>                    
                                            </div>`;
                        }

                        if (type == 3) {
                            var content = JSON.parse(response[0]['content']);
                            html_append = `<div class="row main-content logic_img" id="cond_` + response[0]['id'] + `"  >`;
                            var images = content[0]['image'];
                            var scores = content[0]['score'];
                            for (var i = 0; i < images.length; i++) {
                                var image = "";
                                if (images[i] != null && images[i] != "")
                                    image = "/uploads/image/" + images[i];
                                var label = content[i]['label'];
                                html_append += `<div class="col-md-3 col-sm-6 image_box" style="padding-left:20px;width:7vw;height:10vw;" display="inline-flex" >
                                                    <div  class="checkbox">
                                                        <input class="imagebox_` + i + `" type="checkbox" class="img_check` + i + `" value="` + scores[i] + `">                      
                                                    </div>
                                                    <img src="` + image + `"  width="50px" height="50px" style="object-fit:fill">
                                                </div>`;
                            }
                            html_append += `</div>`;
                        }

                        if (type == 4) {
                            var img_name = response[0]['questionimage'];
                            var img_path = "";
                            if (img_name != null && img_name != "")
                                img_path = "/uploads/image/" + img_name;
                            var content = response[0]['content'];
                            html_append = `<div class="row main-content" id="cond_` + response[0]['id'] + `"  >
                                                <div class="col-12 form-group">` + content;
                            html_append += `</div> 
                                            <div class="col-4">
                                                <div class="form-body">                                    
                                                    <div class="form-group ">
                                                        <img class="display-image-preview" src="` + img_path + `"
                                                        style="max-height: 150px;">
                                                    </div>
                                                </div>
                                            </div>                    
                                        </div>`;
                        }
                        if (type == 5 || type == 8) {
                            var content = JSON.parse(response[0]['content']);
                            radio_id++;
                            var img_name = response[0]['questionimage'];
                            var img_path = "";
                            if (img_name != null && img_name != "")
                                img_path = "/uploads/image/" + img_name;
                            html_append = `<div class="row main-content" id="cond_` + response[0]['id'] + `"  >       
                                    <div class="col-7 form-group logic_radio" style="margin-left:20px;">`;
                            for (var i = 0; i < content.length - 2; i++) {
                                var score = content[i]['score'];
                                var label = content[i]['label'];
                                html_append += `<div class="radio"><label>
                                                    <input class="radio_` + i + `" type="radio" name="optradio` + response[0]['id'] + `_` + radio_id + `" value="` + score + `">` + label + `</label>                      
                                                </div>`;
                            }
                            html_append += `</div>                
                                                <div class="col-4">
                                                    <div class="form-body">                                    
                                                        <div class="form-group ">
                                                            <img class="display-image-preview" src="` + img_path + `"
                                                            style="max-height: 150px;">
                                                        </div>
                                                    </div>
                                                </div>                    
                                            </div>`;
                        }
                        if (type == 7) {

                        }
                        if (type == 9) {

                        }
                        if (type == 10) {

                        }

                        logiccontent.html(html_append);
                        $('.custom-hide').remove();


                    },
                    error: function (response) {
                        console.log(response);
                    }
                });
            }
                
            $(this).hide();

    
        });

        
 
        // handle link clicks in tree nodes(support target="_blank" as well)       
       
    }

    var radio_id2= 50;
    var handleSample4 = function () {

        $('.tree_4').jstree({
            "core" : {
                "themes" : {
                    "responsive": false
                }            
            },
            "types" : {
                "default" : {
                    "icon" : "fa fa-folder icon-state-warning icon-lg"
                },
                "file" : {
                    "icon" : "fa fa-file icon-state-warning icon-lg"
                }
            },
            "plugins": ["types"]
        });
        
       
        $('.tree_4').on('select_node.jstree', function(e,data) {
            var str = $.trim($('#' + data.selected).text());
            var logiccontent=$(this).parent().siblings(".logic-content");
            var qt_type_in= $(this).parent().siblings(".qt_type");
            var qt_nm = $(this).siblings(".qt_name");

            var name= str.split(".");
            if (name.length>1) {
                var qt_id = name[0];

                e.preventDefault();
                // $(this).html('Sending..');

                $.ajax({
                    data: {id: qt_id},
                    //url: "{{ route('questions.store') }}",
                    url: "../get_info",
                    type: "GET",
                    dataType: 'json',
                    success: function (response) {
                        var type = response[0]['questiontype'];
                        var html_append = ``;

                        qt_type_in.val(type);
                        qt_nm.val(response[0]['id'] + "." + response[0]['question']);


                        if (type == 0) {
                            var content = JSON.parse(response[0]['content']);
                            html_append = `<div class="row main-content" id="cond_` + response[0]['id'] + `"  >
                                            <div class="col-8 form-group">
                                                <div class="form-group form-md-line-input">
                                                    <textarea class="form-control" rows="1"></textarea>
                                                    <label for="form_control_1">Please enter/select the value</label>
                                                </div>  
                                        
                                            </div>
                                            <div class="col-4">
                                                <div class="form-body">                                    
                                                    <div class="form-group ">
                                                        <img class="display-image-preview" src="/uploads/image/` + response[0]['questionimage'] + `"
                                                         style="max-height: 150px;">
                                                    </div>
                                    
                                                </div>
                                            </div>
                                        </div> `;
                        }

                        if (type == 1) {
                            var content = JSON.parse(response[0]['content']);
                            var img_name = response[0]['questionimage'];
                            var img_path = "";
                            if (img_name != null && img_name != "")
                                img_path = "/uploads/image/" + img_name;
                            html_append = `<div class="row main-content" id="cond_` + response[0]['id'] + `" >
                                            <div class="col-7 form-group logic_check" style="margin-left:20px;">`;
                            for (var i = 0; i < content.length - 1; i++) {
                                var is_checked = "";
                                if (content[i]['is_checked'] == 1) {
                                    is_checked = "checked";
                                }
                                var score = content[i]['score'];
                                var label = content[i]['label'];
                                html_append += `<div class="checkbox"><label>
                                                    <input class="checkbox_` + i + `" type="checkbox" value="` + score + `" ` + is_checked + ` >` + label + `
                                                </label></div>`;
                            }

                            html_append += `</div>                
                                                <div class="col-4">
                                                    <div class="form-body">                                    
                                                        <div class="form-group ">
                                                            <img class="display-image-preview" src="` + img_path + `"
                                                             style="max-height: 150px;">
                                                        </div>
                                        
                                                    </div>
                                                </div>                    
                                            </div>`;
                        }

                        if (type == 2 || type == 6) {
                            var content = JSON.parse(response[0]['content']);
                            radio_id++;
                            var img_name = response[0]['questionimage'];
                            var img_path = "";
                            if (img_name != null && img_name != "")
                                img_path = "/uploads/image/" + img_name;
                            html_append = `<div class="row main-content" id="cond_` + response[0]['id'] + `"  >       
                                    <div class="col-7 form-group logic_radio" style="margin-left:20px;">`;
                            for (var i = 0; i < content.length - 1; i++) {
                                var score = content[i]['score'];
                                var label = content[i]['label'];
                                html_append += `<div class="radio"><label>
                                                    <input class="radio_` + i + `" type="radio" name="optradio` + response[0]['id'] + `_` + radio_id + `" value="` + score + `">` + label + `</label>                      
                                                </div>`;
                            }
                            html_append += `</div>                
                                                <div class="col-4">
                                                    <div class="form-body">                                    
                                                        <div class="form-group ">
                                                            <img class="display-image-preview" src="` + img_path + `"
                                                            style="max-height: 150px;">
                                                        </div>
                                                    </div>
                                                </div>                    
                                            </div>`;
                        }

                        if (type == 3) {
                            var content = JSON.parse(response[0]['content']);
                            html_append = `<div class="row main-content logic_img" id="cond_` + response[0]['id'] + `"  >`;
                            var images = content[0]['image'];
                            var scores = content[0]['score'];
                            for (var i = 0; i < images.length; i++) {
                                var image = "";
                                if (images[i] != null && images[i] != "")
                                    image = "/uploads/image/" + images[i];
                                var label = content[i]['label'];
                                html_append += `<div class="col-md-3 col-sm-6 image_box" style="padding-left:20px;width:7vw;height:10vw;" display="inline-flex" >
                                                    <div  class="checkbox">
                                                        <input class="imagebox_` + i + `" type="checkbox" class="img_check` + i + `" value="` + scores[i] + `">                      
                                                    </div>
                                                    <img src="` + image + `"  width="50px" height="50px" style="object-fit:fill">
                                                </div>`;
                            }
                            html_append += `</div>`;
                        }

                        if (type == 4) {
                            var img_name = response[0]['questionimage'];
                            var img_path = "";
                            if (img_name != null && img_name != "")
                                img_path = "/uploads/image/" + img_name;
                            var content = response[0]['content'];
                            html_append = `<div class="row main-content" id="cond_` + response[0]['id'] + `"  >
                                                <div class="col-12 form-group">` + content;
                            html_append += `</div> 
                                            <div class="col-4">
                                                <div class="form-body">                                    
                                                    <div class="form-group ">
                                                        <img class="display-image-preview" src="` + img_path + `"
                                                        style="max-height: 150px;">
                                                    </div>
                                                </div>
                                            </div>                    
                                        </div>`;
                        }
                        if (type == 5 || type == 8) {
                            var content = JSON.parse(response[0]['content']);
                            radio_id++;
                            var img_name = response[0]['questionimage'];
                            var img_path = "";
                            if (img_name != null && img_name != "")
                                img_path = "/uploads/image/" + img_name;
                            html_append = `<div class="row main-content" id="cond_` + response[0]['id'] + `"  >       
                                    <div class="col-7 form-group logic_radio" style="margin-left:20px;">`;
                            for (var i = 0; i < content.length - 2; i++) {
                                var score = content[i]['score'];
                                var label = content[i]['label'];
                                html_append += `<div class="radio"><label>
                                                    <input class="radio_` + i + `" type="radio" name="optradio` + response[0]['id'] + `_` + radio_id + `" value="` + score + `">` + label + `</label>                      
                                                </div>`;
                            }
                            html_append += `</div>                
                                                <div class="col-4">
                                                    <div class="form-body">                                    
                                                        <div class="form-group ">
                                                            <img class="display-image-preview" src="` + img_path + `"
                                                            style="max-height: 150px;">
                                                        </div>
                                                    </div>
                                                </div>                    
                                            </div>`;
                        }
                        if (type == 7) {

                        }
                        if (type == 9) {

                        }
                        if (type == 10) {

                        }

                        logiccontent.html(html_append);
                        $('.custom-hide').remove();


                    },
                    error: function (response) {
                        console.log(response);
                    }
                });
            }
                
            $(this).hide();

    
        });

        
 
        // handle link clicks in tree nodes(support target="_blank" as well)       
       
    }


    var handleSample5 = function () {

        $('.tree_5').jstree({
            "core" : {
                "themes" : {
                    "responsive": false
                }            
            },
            "types" : {
                "default" : {
                    "icon" : "fa fa-folder icon-state-warning icon-lg"
                },
                "file" : {
                    "icon" : "fa fa-file icon-state-warning icon-lg"
                }
            },
            "plugins": ["types"]
        });
        
        $('.tree_5').on('select_node.jstree', function(e,data) { 
            
        //     var str = $('#' + data.selected).text();
        //     var logiccontent=$(this).parent().siblings(".logic-content");
        //     var qt_type_in= $(this).parent().siblings(".qt_type");
        //     var qt_nm = $(this).siblings(".qt_name");

        //     var name= str.split(".");
        //     if (name.length>1)
        //     {
        //     var qt_id =name[0];
        
        //     e.preventDefault();
        // // $(this).html('Sending..');

        //     $.ajax({
        //         data: {id:qt_id},
        //     //url: "{{ route('questions.store') }}",
        //         url: "get_info",
        //         type: "GET",
        //         dataType: 'json',
        //         success: function(response){
        //         var type=response[0]['questiontype']; 
        //         var content= JSON.parse(response[0]['content']);
        //         var html_append=``; 

        //         qt_type_in.val(type);
        //         qt_nm.val(response[0]['id']+"."+response[0]['question']);


        //         if (type == 0)
        //         {
        //             html_append =
        //                 `<div class="row main-content" id="cond_`+ response[0]['id'] +`"  >
        //                     <div class="col-8 form-group">
                            
        //                     <div class="form-group form-md-line-input">
        //                         <textarea class="form-control" rows="1"></textarea>
        //                         <label for="form_control_1">Please enter/select the value</label>
        //                     </div>                     
                     
                        
        //                     </div>
        //                     <div class="col-4">
        //                         <div class="form-body">                                    
        //                             <div class="form-group ">
        //                                 <img class="display-image-preview" src="/uploads/image/`+ response[0]['questionimage']+`"
        //                                  style="max-height: 150px;">
        //                             </div>
                    
        //                         </div>
        //                     </div>
        //                 </div> `;
        //         }

        //         if (type == 1)
        //         {
        //             html_append =
        //         `<div class="row main-content" id="cond_`+ response[0]['id'] +`" >                    
        //             <div class="col-7 form-group logic_check" style="margin-left:20px;">`;
        //         for(var i= 0; i< content.length; i++)    
        //             html_append +=
        //             `<div  class="checkbox">
        //                 <label><input class="checkbox_`+ i +`" type="checkbox" >` + content[i]+ `</label>                      
        //             </div>`;
                
        //         html_append +=       
        //             `</div>                
        //             <div class="col-4">
        //                 <div class="form-body">                                    
        //                     <div class="form-group ">
        //                         <img class="display-image-preview" src="/uploads/image/`+ response[0]['questionimage']+`"
        //                          style="max-height: 150px;">
        //                     </div>
            
        //                 </div>
        //             </div>                    
        //         </div>`;
        //         }

        //         if (type == 2)
        //         {
        //             html_append =`
        //         <div class="row main-content" id="cond_`+ response[0]['id'] +`"  >       
        //             <div class="col-7 form-group logic_radio" style="margin-left:20px;">`;
        //         for(var i= 0; i< content.length; i++)    
        //             html_append +=
        //             `<div  class="radio">
        //                 <label><input class="radio_`+ i +`" type="radio" name="optradio` + response[0]['id']+ `">` + content[i]+ `</label>                      
        //             </div>`;
                            
        //         html_append +=       
        //             `</div>                
        //             <div class="col-4">
        //                 <div class="form-body">                                    
        //                     <div class="form-group ">
        //                         <img class="display-image-preview" src="/uploads/image/`+ response[0]['questionimage']+`"
        //                         style="max-height: 150px;">
        //                     </div>
            
        //                 </div>
        //             </div>                    
        //         </div>`;
        //         }

        //         if (type == 3)
        //         {
        //             html_append =`   
        //             <div class="row main-content logic_img" id="cond_`+ response[0]['id'] +`"  >    
        //                 `;           
                    
        //                 for(var i=0;i< content.length; i++)
        //                     html_append +=
        //                     `<div class="col-md-3 col-sm-6 image_box" style="padding-left:20px;width:7vw;height:10vw;" display="inline-flex" >
        //                         <div  class="checkbox">
        //                             <input class="imagebox_`+ i +`" type="checkbox" class="img_check`+ i +`">                      
        //                         </div>
        //                         <img src="/uploads/image/` + content[i]+`"  width="50px" height="50px" style="object-fit:fill">
        //                     </div>`;

        //             html_append += `
        //                 </div>`;                       

        //         }

        //         if (type == 4)
        //         {
        //             html_append =
        //                 `<div class="row main-content" id="cond_`+ response[0]['id'] +`"  >
        //                     <div class="col-12 form-group">
                            
        //                         <div class="form-group form-md-line-input">
        //                             <textarea class="form-control" rows="1"></textarea>
        //                             <label for="form_control_1">Please enter/select the value</label>
        //                         </div>  
        //                     </div>
                            
        //                 </div> `;
        //         }
        //         logiccontent.html(html_append);
                
                
        //         },
        //         error: function(response){
        //         console.log(response);
        //         }
        //     });
        //     }
                
           //(this).hide();

    
        });
 
        // handle link clicks in tree nodes(support target="_blank" as well)       
       
    }

    var handleSample6 = function () {

        $('.tree_6').jstree({
            "core" : {
                "themes" : {
                    "responsive": false
                }            
            },
            "types" : {
                "default" : {
                    "icon" : "fa fa-folder icon-state-warning icon-lg"
                },
                "file" : {
                    "icon" : "fa fa-file icon-state-warning icon-lg"
                }
            },
            "plugins": ["types"]
        });
        
        $('.tree_6').on('select_node.jstree', function(e,data) { 
            
            // var str = $('#' + data.selected).text();
            // var logiccontent=$(this).parent().siblings(".logic-content");
            // var qt_type_in= $(this).parent().siblings(".qt_type");
            // var qt_nm = $(this).siblings(".qt_name");

            // var name= str.split(".");
            // if (name.length>1)
            // {
            // var qt_id =name[0];
        
            // e.preventDefault();
        // $(this).html('Sending..');

            // $.ajax({
            //     data: {id:qt_id},
            // //url: "{{ route('questions.store') }}",
            //     url: "get_info",
            //     type: "GET",
            //     dataType: 'json',
            //     success: function(response){
            //     var type=response[0]['questiontype']; 
            //     var content= JSON.parse(response[0]['content']);
            //     var html_append=``; 

            //     qt_type_in.val(type);
            //     qt_nm.val(response[0]['id']+"."+response[0]['question']);


            //     if (type == 0)
            //     {
            //         html_append =
            //             `<div class="row main-content" id="cond_`+ response[0]['id'] +`"  >
            //                 <div class="col-8 form-group">
                            
            //                 <div class="form-group form-md-line-input">
            //                     <textarea class="form-control" rows="1"></textarea>
            //                     <label for="form_control_1">Please enter/select the value</label>
            //                 </div>                     
                     
                        
            //                 </div>
            //                 <div class="col-4">
            //                     <div class="form-body">                                    
            //                         <div class="form-group ">
            //                             <img class="display-image-preview" src="/uploads/image/`+ response[0]['questionimage']+`"
            //                              style="max-height: 150px;">
            //                         </div>
                    
            //                     </div>
            //                 </div>
            //             </div> `;
            //     }

            //     if (type == 1)
            //     {
            //         html_append =
            //     `<div class="row main-content" id="cond_`+ response[0]['id'] +`" >                    
            //         <div class="col-7 form-group logic_check" style="margin-left:20px;">`;
            //     for(var i= 0; i< content.length; i++)    
            //         html_append +=
            //         `<div  class="checkbox">
            //             <label><input class="checkbox_`+ i +`" type="checkbox" >` + content[i]+ `</label>                      
            //         </div>`;
                
            //     html_append +=       
            //         `</div>                
            //         <div class="col-4">
            //             <div class="form-body">                                    
            //                 <div class="form-group ">
            //                     <img class="display-image-preview" src="/uploads/image/`+ response[0]['questionimage']+`"
            //                      style="max-height: 150px;">
            //                 </div>
            
            //             </div>
            //         </div>                    
            //     </div>`;
            //     }

            //     if (type == 2)
            //     {
            //         html_append =`
            //     <div class="row main-content" id="cond_`+ response[0]['id'] +`"  >       
            //         <div class="col-7 form-group logic_radio" style="margin-left:20px;">`;
            //     for(var i= 0; i< content.length; i++)    
            //         html_append +=
            //         `<div  class="radio">
            //             <label><input class="radio_`+ i +`" type="radio" name="optradio` + response[0]['id']+ `">` + content[i]+ `</label>                      
            //         </div>`;
                            
            //     html_append +=       
            //         `</div>                
            //         <div class="col-4">
            //             <div class="form-body">                                    
            //                 <div class="form-group ">
            //                     <img class="display-image-preview" src="/uploads/image/`+ response[0]['questionimage']+`"
            //                     style="max-height: 150px;">
            //                 </div>
            
            //             </div>
            //         </div>                    
            //     </div>`;
            //     }

            //     if (type == 3)
            //     {
            //         html_append =`   
            //         <div class="row main-content logic_img" id="cond_`+ response[0]['id'] +`"  >    
            //             `;           
                    
            //             for(var i=0;i< content.length; i++)
            //                 html_append +=
            //                 `<div class="col-md-3 col-sm-6 image_box" style="padding-left:20px;width:7vw;height:10vw;" display="inline-flex" >
            //                     <div  class="checkbox">
            //                         <input class="imagebox_`+ i +`" type="checkbox" class="img_check`+ i +`">                      
            //                     </div>
            //                     <img src="/uploads/image/` + content[i]+`"  width="50px" height="50px" style="object-fit:fill">
            //                 </div>`;

            //         html_append += `
            //             </div>`;                       

            //     }

            //     if (type == 4)
            //     {
            //         html_append =
            //             `<div class="row main-content" id="cond_`+ response[0]['id'] +`"  >
            //                 <div class="col-12 form-group">
                            
            //                     <div class="form-group form-md-line-input">
            //                         <textarea class="form-control" rows="1"></textarea>
            //                         <label for="form_control_1">Please enter/select the value</label>
            //                     </div>  
            //                 </div>
                            
            //             </div> `;
            //     }
            //     logiccontent.html(html_append);
                
                
            //     },
            //     error: function(response){
            //     console.log(response);
            //     }
            // });
            // }
                
            //$(this).hide();

    
        });
 
        // handle link clicks in tree nodes(support target="_blank" as well)       
       
    }

    return {
        //main function to initiate the module
        init: function () {
            handleSample1();//question-create
            handleSample2();//question-edit
            handleSample3();//textgroup-create
            handleSample4();//textgroup-edit
            handleSample5();//chart-create
            handleSample6();//chart-create

        }

    };

}();