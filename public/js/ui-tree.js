
var UITree = function () {
    var g_tree_data;
    var show_logic_content = function (qt_id,elContent){
        console.log(qt_id);
        $.ajax({
            data: {id:qt_id},
            url: siteinfo.url_root+'/user/questions/get_info',
            type: "GET",
            dataType: 'json',
            success: function(response){
                var content=[];
                try {
                    content = JSON.parse(response.content);
                } catch (error) {
                    content=[];
                }
                var html_append='<div class="col-12 logic-question-part">'+response.id+'.'+response.question+'</div>'; 
                if (response.questiontype == 'single_input')
                {
                    html_append +=
                        '<div class="col-8 form-group">'+
                            '<label>Please enter/select the value </label>'+
                            '<input class="form-control single_input_textarea">'+
                        '</div>'+
                        '<div class="col-4">'+
                            '<div class="form-body">'+
                                '<div class="form-group ">'+
                                    '<img class="display-image-preview" src="'+ response['questionimage']+'"style="max-height: 150px;">'+
                                '</div>'+
                            '</div>'+
                        '</div>';
                }

                if (response.questiontype == 'checkbox')
                {
                    html_append +='<div class="col-8 form-group">';
                    for(var i = 0; i< content.length; i++){
                        if(content[i].label){
                            html_append +='<div  class="checkbox"><label>' + content[i].label+ '</label><input type="checkbox" classs"form-control logic_check"></div>';
                        }
                    }    
                    html_append +='</div>';
                    html_append +='<div class="col-4">'+
                                    '<div class="form-body">'+
                                        '<div class="form-group ">'+
                                            '<img class="display-image-preview" src="'+ response['questionimage']+'"style="max-height: 150px;">'+
                                        '</div>'+
                                    '</div>'+
                                '</div>';
                }
                // if (response.questiontype == 'rating')
                // {
                //     html_append +='<div class="col-8 form-group">';
                //     for(var i = 0; i< content.data.length; i++){
                //         if(content.data[i].label){
                //             html_append +='<div  class="rating"><label>' + content.data[i].label+ '</label><input type="radio" name="logic_rating_radio"></div>';
                //         }
                //     }    
                //     html_append +='</div>';
                //     html_append +='<div class="col-4">'+
                //                     '<div class="form-body">'+
                //                         '<div class="form-group ">'+
                //                             '<img class="display-image-preview" src="'+ response['questionimage']+'"style="max-height: 150px;">'+
                //                         '</div>'+
                //                     '</div>'+
                //                 '</div>';
                // }
                if (response.questiontype == 'radiogroup')
                {
                    html_append +='<div class="col-8 form-group">';
                    for(var i = 0; i< content.length; i++){
                        if(content[i].label){
                            html_append +='<div  class="radio"><label>' + content[i].label+ '</label><input type="radio" name="logic_optradio"></div>';
                        }
                    }    
                    html_append +='</div>';
                    html_append +='<div class="col-4">'+
                                    '<div class="form-body">'+
                                        '<div class="form-group ">'+
                                            '<img class="display-image-preview" src="'+ response['questionimage']+'"style="max-height: 150px;">'+
                                        '</div>'+
                                    '</div>'+
                                '</div>';
                }

                if (response.questiontype == 'image')
                {
                    for(var i = 0;i< content.length; i++){
                        if(content[i].file)
                            html_append +='<div class="col-md-3 col-sm-6 image_box" style="padding:10px;width:7vw;height:10vw;" display="inline-flex" >'+
                                '<div  class="checkbox">'+
                                '<input type="checkbox" class="image_check"></div>'+
                                '<img src="' + content[i].file+'"  width="90%" height="80%" style="max-width:100%; max-height:100%;"></div>';
                    }
                }

                if (response.questiontype == 'matrix')
                {
                    html_append ='<div class="row main-content"><div class="col-12 form-group"><label>Please enter/select the value </label><input type="text" class="form-control"></div></div>';
                }
                
                $(elContent).html(html_append);
            },
            error: function(response){
                 console.log(response);
            }
        });
    }
    var selectQuestion = function(data){
        g_tree_data=data;
        var options = {
            title : "Select Question",
            data: data,
            maxHeight: 300,
            clickHandler: function(element,event,mainEnlement){
                if($(element).data('type')=='question'){
                    $(mainEnlement).SetTitle($(element).find("a").first().text());
                    $(mainEnlement).data('question-id',$(element).data('id'));
                    $(mainEnlement).data('question-type',$(element).data('question-type'));
                    show_logic_content($(mainEnlement).data('question-id'),$(mainEnlement).parent().siblings(".logic-content").get());
                }
            },
            expandHandler: function(element,expanded){
                console.log("expand");
            },
            checkHandler: function(element,checked){
                console.log("check");
            },
            closedArrow: '<i class="fa fa-caret-right" aria-hidden="true"></i>',
            openedArrow: '<i class="fa fa-caret-down" aria-hidden="true"></i>',
            multiSelect: false,
            selectChildren: true,
        }
        $(".question-dropdown-tree").each(function(i,e){
            $(e).DropDownTree(options);
        });
    };
    var initQuestion = function(el){
        var options = {
            title : "Select Question",
            data: g_tree_data,
            maxHeight: 300,
            clickHandler: function(element,event,mainEnlement){
                if($(element).data('type')=='question'){
                    $(mainEnlement).SetTitle($(element).find("a").first().text());
                    $(mainEnlement).data('question-id',$(element).data('id'));
                    $(mainEnlement).data('question-type',$(element).data('question-type'));
                    console.log($(mainEnlement).data('question-type'));
                    show_logic_content($(mainEnlement).data('question-id'),$(mainEnlement).parent().siblings(".logic-content").get());
                }
            },
            expandHandler: function(element,expanded){
                console.log("expand");
            },
            checkHandler: function(element,checked){
                console.log("check");
            },
            closedArrow: '<i class="fa fa-caret-right" aria-hidden="true"></i>',
            openedArrow: '<i class="fa fa-caret-down" aria-hidden="true"></i>',
            multiSelect: false,
            selectChildren: true,
        }
        $(el).children().remove();
        $(el).DropDownTree(options);
    };
    return {
        //main function to initiate the module
        init:function(el){
            initQuestion(el);
        },
        selectQuestion: function (data) {
            selectQuestion(data);
        }

    };

}();