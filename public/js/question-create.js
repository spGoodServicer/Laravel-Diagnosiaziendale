var QuestionCreate = function() {

    // Global var
    var currentRow = 1;
    var numberCol = 0;
    var numberRow = 0;
    var updateOutput = function(e) {};
    
    /**
    * Set the Default Question Type to Signle Input
    **/
    //$("#question_type").val("0");
    
    /**
    * On Question Input Type Change
    * Show the Relevant Question Box
    **/
    var questionBoxUpdate = function(){
        var selected_text = $("#question_type").val();
        //hide
        $(".question-box").hide();
        $("#more_than_one_answer_box").hide();
        $("#score-box").hide();
        //show
        $('#'+selected_text+'_part').show();
        $('.show_'+selected_text).removeClass('no');
        $('.show_'+selected_text).show();
    };
    $('#question_type').on('change',function() {
        questionBoxUpdate();
    });
    $(function(){
        // DropzoneJS Demo Code Start
        Dropzone.autoDiscover = false;
        Dropzone.options.dropzone = {
            accept: function(file, done) {
                if (file.type != "image/jpeg") {
                    done("Error! Files of this type are not accepted");
                }
                else { done(); }
            }
        }
        // Get the template HTML and remove it from the doumenthe template HTML and remove it from the doument
        var previewNode = document.querySelector("#template")
        previewNode.id = ""
        var previewTemplate = previewNode.parentNode.innerHTML
        previewNode.parentNode.removeChild(previewNode)
        var myDropzone = new Dropzone(document.body, { // Make the whole body a dropzone
            url: siteinfo.url_root+'/user/questions/upload-images',
            accept: function(file, done) {
                if (file.type.includes('image')==false) {
                    done("Error! Files of this type are not accepted");
                }
                else { done(); }
            },
            thumbnailWidth: 80,
            thumbnailHeight: 80,
            parallelUploads: 20,
            previewTemplate: previewTemplate,
            autoQueue: true, // Make sure the files aren't queued until manually added
            previewsContainer: "#previews", // Define the container to display the previews
            clickable: ".fileinput-button", // Define the element that should be used as click trigger to select files.
            init: function() {
                thisDropzone = this;
                this.on("success", function(file, responseText) {
                    console.log(file)
                    $(file.previewElement).data('file-name',responseText.filename);
                });
            }
        })
        
        // Update the total progress bar
        myDropzone.on("totaluploadprogress", function(progress) {
            document.querySelector("#total-progress .progress-bar").style.width = progress + "%"
        })
        myDropzone.on("sending", function(file, xhr, formData) {
            document.querySelector("#total-progress").style.opacity = "1"
            formData.append("_token", $('meta[name="csrf-token"]').attr('content'));
        })
        // Hide the total progress bar when nothing's uploading anymore
        myDropzone.on("queuecomplete", function(progress) {
            document.querySelector("#total-progress").style.opacity = "0";
            $('.dz-success .contain-progress').html('<input type="number" placeholder="score" class="form-control image-score-value" value="" />');
            $('.dz-error').remove();
            $('.dz-success .contain-progress').removeClass( "contain-progress" ).addClass( "contain-score" );
            
        })
        $('.dz-processing.dz-image-preview.dz-success.dz-complete button.delete').on('click',function(){
            $(this).parents('.dz-processing.dz-image-preview.dz-success.dz-complete').remove();
        })
        // Setup the buttons for all transfers
        // The "add files" button doesn't need to be setup because the config
        // `clickable` has already been specified.
        // document.querySelector("#actions .start").onclick = function() {
        //     myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED))
        // }
        // document.querySelector("#actions .cancel").onclick = function() {
        //     myDropzone.removeAllFiles(true)
        // }
    // DropzoneJS Demo Code End
    });
    
    
    var image_part_data = [];
    $(".image-upload-form").on('change', function(e) {
        e.preventDefault();
        var v = $('.image_score').map(function(idx, elem) {
            return $(elem).val();
        }).get();
        let formData = new FormData(this);
        $.ajax({
            type: 'POST',
            url: siteinfo.url_root+'/user/questions/upload-images',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                // console.log(response.img_name);
                // if (response) {
                //     var temp_img = {};
                //     temp_img['image'] = response.img_name;
                //     temp_img['score'] = v;
                //     image_part_data = temp_img;
                // }

            },
            error: function(response) {
                // console.log(response);
            }
        })
    });
    
    var question_img_data = [];
    $("#quiz_img").on('change', function(e) {
        e.preventDefault();
        let formData = new FormData($("#question_type_image")[0]);
        var route = siteinfo.url_root+'/user/questions/upload-images';
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: 'POST',
            url: route,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                //swal('success','Image uploaded to the server.','success');
                $("#quiz_img_name").val(response.filename);
            },
            error: function(response) {
                swal('error','Error in uploading the image.','error');
                // console.log(response);
            }
        })
    });
    
    var check_id = 2;
    var check_dro_id = 2;
    var col_add = 0;

    $('#checkbox_part').on('click', '.del-btnx', function() {
        $(this).parent().remove();
    });

    $("#check_add").on('click', function() {
        // console.log(check_id);
        check_id++;
        $("#sortable-10").append(`
        <div class="checkbox">
            <label  style="color:transparent"><input type="checkbox" value="">Option 1 </label>  
            <input class="check_label" type="text" value="Check1" style="margin-left:-2vw;margin-right:5vw;z-index:20;border:none;">
            <label  >Score</label>
            <input type="text" class="checkbox_score" value="0" style="margin-right:1vw">
        
            <a class="btn btn-xs mb-2 btn-danger del-btnx" style="cursor:pointer;" data-id="` + 12 + `">
                <i class="fa fa-trash" style="color:white"></i>
            </a>
        </div>`);
    });
    
    $("#check_add_euro").on('click', function() {
        $("#euro_part #sortable-12").append(`
        <div class="checkbox">
            <label  style="color:transparent"><input type="checkbox" value="">Option 1 </label>  
            <input class="check_label" type="text" value="Check1" style="margin-left:-2vw;margin-right:5vw;z-index:20;border:none;">
            <label  >Score</label>
            <input type="text" class="checkbox_score" value="0" style="margin-right:1vw">
        
            <a class="btn btn-xs mb-2 btn-danger del-btnx" style="cursor:pointer;" data-id="` + 12 + `">
                <i class="fa fa-trash" style="color:white"></i>
            </a>
        </div>`);
    });


    $('#radio_part').on('click', '.del-btnx', function() {
        $(this).parent().remove();
    });
    $(document).on("click", "#euro_part #sortable-12 .checkbox .del-btnx", function(){
        $(this).parent().remove();
    })


    $("#radio_add").on('click', function() {
        // console.log(check_id);
        check_id++;
        $("#sortable-11").append(`
        <div class="radio">
            <label  style="color:transparent"><input type="radio" name="optradio" checked>Option 1</label>
            <input class="radio_label" type="text" value="radio" style="margin-left:-2vw;margin-right:5vw;z-index:20;border:none;">
            <label label>Score</label>
            <input class="radio_score" type="text"  style="margin-right:1vw">
        
            <a class="btn btn-xs mb-2 btn-danger del-btnx" style="cursor:pointer;" data-id="` + 12 + `">
                <i class="fa fa-trash" style="color:white"></i>
            </a>
        </div>`);
    });

    $('#dropdown_part').on('click', '.del-btnx', function() {
        $(this).parent().remove();
    });


    $("#dropdown_add").on('click', function() {
        // console.log(check_id);
        check_id++;
        $("#sortable_drop").append(`
        <div class="radio">
            <label><input type="radio" name="dropdown_optradio"></label>
            <input class="radio_label" type="text" value="` + check_id + `" style="border:none;">
            <label label>Score</label>
            <input class="radio_score" type="number"  style="margin-right:1vw">
        
            <a class="btn btn-xs mb-2 btn-danger del-btnx" style="cursor:pointer;" data-id="` + 12 + `">
                <i class="fa fa-trash" style="color:white"></i>
            </a>
        </div>`);
    });

    $('#rating_part').on('click', '.del-btnx', function() {
        $(this).parent().remove();
    });

    $('#rangs_part').on('click', '.del-btnx', function() {
        $(this).parent().remove();
    });

    $("#rating_add").on('click', function() {
        // console.log(check_id);
        check_id++;
        $("#sortable_rating").append(`
        <div class="radio">
            <label  style=""><input type="radio" name="optradio" checked>Option</label>
            <input class="radio_label" type="text" value="` + check_id + `" style="margin-left:-2vw;margin-right:5vw;z-index:20;border:none;">
            <label label>Score</label>
            <input class="radio_score" type="text"  style="margin-right:1vw">
        
            <a class="btn btn-xs mb-2 btn-danger del-btnx" style="cursor:pointer;" data-id="` + 12 + `">
                <i class="fa fa-trash" style="color:white"></i>
            </a>
        </div>`);
    });

    $('#image_panel').on('click', '.del-btnx', function() {
        $(this).parent().parent().parent().parent().parent().remove();
    });




    $('#col_panel').on('click', '.del-btnx', function() {
        $(this).parent().parent().remove();
    });

    $('#row_panel').on('click', '.del-btnx', function() {
        $(this).parent().parent().remove();
    });

    var html_cont, score_cont;
    $('#mat_update').on('click', function() {
        $('#real_matrix').children().remove();
        $('#score_matrix').children().remove();
        html_cont = `
                        <tr>
                            <td><input type="text" placeholder="" class="form-control" value="  " disabled></td>`;

        for (var i = 2; i <= $("#col_panel").children().length; i++) {
            html_cont += `<td>`;
            var caption = $("#col_panel div:nth-child(" + i + ")").find("input").val();
            html_cont += `<input type="text" placeholder="" class="form-control" value="` + caption + `" disabled>`;
            html_cont += `</td>`;
        }
        html_cont += `</tr>`;

        for (var j = 2; j <= $("#row_panel").children().length; j++) {
            html_cont += `<tr><td width="15%">`;
            var caption = $("#row_panel div:nth-child(" + j + ")").find("input").val();
            html_cont += `<input type="text" placeholder="" class="form-control" value="` + caption + `" disabled></td>`;

            for (var i = 2; i <= $("#col_panel").children().length; i++) {
                html_cont += `<td> <input type="text"  placeholder="" class="form-control" ></td>`;
            }
            html_cont += `</tr>`;
        }
        $("#real_matrix").append(html_cont);

        $("#score_matrix").append(html_cont);

    });

   
    var no_coulmns = 0;
    var questiontype = '';
    $("#add_col").on('click', function() {
        questiontype = $("#matrix_symbol").val();
        $('#row_add').data('columns',parseInt($("#row_add").data('columns'))+1);
        var add_q_id = 1;
        col_add++;
        var last_Q_id = parseInt($('#last_q_id').val());
        var q_id = last_Q_id + add_q_id;
        numberCol--;
        var scoreinput = '';
        var radiocol = '';
        if($(".selecttype").val() == "checkbox"){
            scoreinput = '<input type="text" data-q_id="q_id'+col_add+'" data-value="" class="form-control col-10 d-inline radioscore" value=""  onchange="radioScore(this)">';
            radiocol = 'col-2';
        }
        if($('#add-matrix tr').length <= 2){
            var add_head_col = '<th scope="row" class="custom-border"><label contenteditable="true" class="form-label">Column</label></th>';
            var add_col = '<td class="col-3 custom-border"><input id="q_id'+col_add+'" type='+$(".selecttype").val()+' value="" name="matrix'+$(".selecttype").val()+'" class="form-control radioselected d-inline '+radiocol+' q_id[q_id]'+col_add+'" onchange="inputToData(this)" data-questiontype="'+questiontype+'" data-value="" data-selected="false" data-q_id="[q_id]'+col_add+'">'+scoreinput+'</td>';
        }else{
            if(numberCol > 2){
                var add_col = '<td class="col-3 custom-border"><input id="q_id'+col_add+'" type='+$(".selecttype").val()+' value="" name="matrix'+$(".selecttype").val()+'" class="form-control radioselected d-inline '+radiocol+'  q_id[q_id]'+col_add+'" onchange="inputToData(this)" data-questiontype="'+questiontype+'" data-value="" data-selected="false" data-q_id="[q_id]'+col_add+'">'+scoreinput+'</td>';
                
            }
        }
        $("#header_row_col"+(currentRow-1)).append(add_head_col);
        $("#mr"+(currentRow-1)).append(add_col);
    });

    // Delete Row
    $("#add-matrix").on("click", "#delete_matrix_row", function() {
        $(this).closest("tr").remove();
        if($('#add-matrix tr').length == 1){
            $("#header_row_col"+(($('#add-matrix tr').length))).remove();
            $("#add_col").slideDown();
            $('#row_add').data('columns',0);
        }
        currentRow--;
        numberRow--;
     });

    $("#row_add").on('click', function() {

        var columns = parseInt($(this).data('columns'));
        if($('#add-matrix tr').length>=1){
            currentRow =  $('#add-matrix tr').length;
        }
        if($("#question_id").val()){
            col_add = $('#add-matrix tr td').length;
            columns = (col_add/(currentRow-1))-2;
        }
        numberCol = $("#add-matrix tr th").length;
        numberRow = $('#add-matrix tr').length;
        // if($("#mr"+currentRow).length){
        //     currentRow = currentRow + 1;

        // }
        var add_row = '';
        if(numberRow <= 0){
            if(($('#add-matrix tr').length+1) == 1){
                add_row += '<tr id="header_row_col'+currentRow+'"><th class="custom-hide">Action</th><th class=""></th></tr>';
            }
        }
        
        var scoreinput = '';
        var radiocol = '';
        var add_col = '';
        
        if(currentRow > 1){
            $("#add_col").slideUp();
            for(var i=0;i<columns;i++){
                col_add++;
                if($(".selecttype").val() == "checkbox"){
                    scoreinput = '<input type="text" data-q_id="q_id'+col_add+'" data-value="" class="form-control col-10 d-inline radioscore" value="" onchange="radioScore(this)">';
                    radiocol = 'col-2';
                }
                add_col += '<td class="col-3 custom-border"><input id="q_id'+col_add+'" type='+$(".selecttype").val()+' value="" name="matrix'+$(".selecttype").val()+'" class="form-control radioselected d-inline '+radiocol+' q_id[q_id]'+col_add+'" onchange="inputToData(this)" data-questiontype="'+questiontype+'" data-value="" data-selected="false" data-q_id="[q_id]'+col_add+'">'+scoreinput+'</td>';
            }

        }
        add_row += '<tr id="mr'+currentRow+'"><td class="custom-hide"><button class="btn btn-danger" id="delete_matrix_row"><i class="fa fa-trash"></i></button></td><td scope="row" class="custom-border"><label contenteditable="true" class="form-label ">Row</label></td></tr>';
        
        $("#add-matrix").append(add_row);        
        $("#mr"+currentRow).append(add_col);        
        currentRow++;
        numberCol++;
        // alert($("</div>").append($("#add-matrix").clone()).html());
    //     $("#row_panel").append(`
    //     <div class="row" >
    //         <div class="col-2">
    //             <select class="form-control input-small select2me" data-placeholder="Select...">
    //                 <option value="single_input" >Single Input</option>
	// 				<option value="checkbox">Checkbox</option>
	// 				<option value="radiogroup">Radiogroup</option>
	// 				<option value="file">File</option>
    //             </select>
                      
    //         </div>
    //         <div class="col-2">
    //             <input type="text" value="Input" style="z-index:20;" class="form-control">
                
    //         </div>
    //         <div class="col-2">
    //             <a class="btn btn-xs mb-2 btn-danger del-btnx" style="cursor:pointer;" data-id="11">
    //                 <i class="fa fa-trash" style="color:white"></i>
    //             </a>
    //         </div>
    //     </div>
    //    `);
    });


    var content, score;
    var data = [];
    var matrix_data = '';
    $('#save_data').on('click', function(e) {
        logic_build();
        // alert(document.getElementById("more_than_one_answer").checked);
        
        // alert($("<div />").append($("#add-matrix").clone()).html());
        // return;
        // If FormSubmitFlag is true then submit the form
        var formSubmitFlag = true;
        var errorMessage = "";
        
        //If the Question Text is Missing, Show Error Message
        // if(CKEDITOR.instances.question_content.getData().length<=0){
        //     swal("Warning","Please write the question!","warning");
        //     return;
        // }
        
        //Get Question Type
        var type_id = $("#question_type").val();
        //Get Score
        var score = $("#score").val();
        
        // Content for Question Type
        var content;
        // Validate Form Based on the Question Type
       
        switch(type_id) {
            //Single Input
            case 'single_input':
                break;
            //Checkbox
            case 'checkbox':
                var temp_arr = [];
                $("#checkbox_part #sortable-10 .checkbox").each(function(e){
                    if($(this).find(".check_label").val().trim()==""){
                        formSubmitFlag = false;
                        errorMessage = "Checkbox Title Missing!";
                    }
                    var checkbox_content = {};
                    checkbox_content['label'] = $(this).find(".check_label").val();
                    checkbox_content['score'] = $(this).find(".checkbox_score").val().trim() ?? 0;
                    checkbox_content['is_checked'] =  $(this).find(".check_box_q").is(":checked") ? 1 : 0;
                    temp_arr.push(checkbox_content);
                });
                temp_arr.push({
                    'col' : $("#display_checkbox").val()
                });
                content = JSON.stringify(temp_arr);
                break;
            //RadioGroup
            case 'radiogroup':
                var temp_arr = [];
                $("#radiogroup_part .radio").each(function(e){
                    if($(this).find(".radio_label").val().trim()==""){
                        formSubmitFlag = false;
                        errorMessage = "Radio Group Field Title Missing!";
                    }
                    var checkbox_content = {};
                    checkbox_content['label'] = $(this).find(".radio_label").val();
                    checkbox_content['score'] = $(this).find(".radio_score").val().trim() ?? 0;
                    checkbox_content['is_checked'] =  $(this).find(".radio_box_q").is(":checked") ? 1 : 0;
                    temp_arr.push(checkbox_content);
                });
                temp_arr.push({
                    'col' : $("#display_radio").val()
                });
                content = JSON.stringify(temp_arr);
                break;
            //Rating
            case 'rating':
                var contentVal = {};
                var dataRows = [];
                $("#rating_part #sortable_rating .radio").each(function(e){
                    var data = {};
                    data['checked'] = $(this).find("input:radio").prop('checked')?1:0;
                    data['label'] = $(this).find(".radio_label").val();
                    data['score'] = $(this).find(".radio_score").val().trim() ?? 0;
                    dataRows.push(data);
                });
                contentVal['data']=dataRows;
                contentVal['col']=$("#rating_display").val();
                contentVal['color']=$("#rating_color").val();
                content = JSON.stringify(contentVal);
                break;
            //Star
            case 'stars':
                var contentVal = {};
                var dataRows = [];
                $("#stars_part #sortable_rating .radio").each(function(e){
                    var data = {};
                    data['checked'] = $(this).find("input:radio").prop('checked')?1:0;
                    data['label'] = $(this).find(".radio_label").val();
                    data['score'] = $(this).find(".radio_score").val().trim() ?? 0;
                    dataRows.push(data);
                });
                contentVal['data']=dataRows;
                contentVal['col']=$("#stars_display").val();
                contentVal['color']=$("#stars_color").val();
                content = JSON.stringify(contentVal);
                break;
            //ImagePart
            case 'image':
                var dataRows = [];
                $('div.row.mt-2.dz-processing.dz-image-preview.dz-success.dz-complete').each(function(i,e){
                    
                    dataRows.push({'file':$(this).data('file-name'),'score':$(this).find('input.image-score-value').val()});
                });
                dataRows.push({
                    'col' : $("#image_file_display").val()
                });
                content = JSON.stringify(dataRows);
                $('#image_part').show();
                break;
            //Matrix
            case 'matrix':
                let text_vals = [];
                $('.radioscore').each(function(){
                    let vals = [];
                    vals.push($(this).data('q_id'));
                    vals.push($(this).val());
                    text_vals.push(vals);
                });
                $("#symbol_matrix_value").html("<tr><th>Value in "+$("#matrix_symbol").val()+"</th></tr>");
                $('#add-matrix td input[type="text"]').each(function (i,ele) {
                    let id = $(ele).data("q_id");
                    for(let i = 0; i < text_vals.length; i++) {
                        if(id == text_vals[i][0]) {
                            $(ele).attr('value', text_vals[i][1]);
                            break;
                        }
                    }
                });
                matrix_data = $("<div />").append($("#add-matrix").clone()).html();
                if($("#add-matrix tr").length > 1){
                    formSubmitFlag = true;
                }
                $('#matrix_part').show();
                break;
            //Dropdown
            case 'dropdown':
                var temp_arr = [];
                $("#dropdown_part #sortable_drop .radio").each(function(e){
                    if($(this).find(".radio_label").val().trim()==""){
                        formSubmitFlag = false;
                        errorMessage = "Radio Title Missing!";
                    }
                    var checkbox_content = {};
                    checkbox_content['checked'] = $(this).find("input:radio").prop('checked')?1:0;
                    checkbox_content['label'] = $(this).find(".radio_label").val();
                    checkbox_content['score'] = $(this).find(".radio_score").val().trim() ?? 0;
                    temp_arr.push(checkbox_content);
                });
                content = JSON.stringify(temp_arr);
                break;
            //File
            case 'file':
                $('#file_upload_input').show();
                break;
            //Range
            case 'range':
                var temp_content = {};
                temp_content['min_value'] = parseInt($("#range_part #range_min_value").val()) ;
                temp_content['max_value'] = parseInt($("#range_part #range_max_value").val());
                temp_content['steps'] = parseInt($("#step_value").val());
                //score = $("#rangs_part .radio_score").val() ?? 0;
                temp_content['symbol'] = $("#range_part #range_symbol").val();
                temp_content['type'] = $("#range_part #range_type").val();
                content = JSON.stringify(temp_content);
                // return;
                break;
            //€
            case 'euro':
                var content = {};
                content['label'] = $('#euro_part #sortable-11 .euro_label').val();
                content['score'] = parseInt($('#euro_part #sortable-11 .euro_score').val());
                content = JSON.stringify(content);
                break;
            default:
                $('#single_input').show();
                break;
        }
        
        if(formSubmitFlag==false){
            swal("error",errorMessage,"error");
            return;
        }
        var selected = [],
            selected_cat = [];
        $('#tests_id option:selected').each(function() {
            selected[$(this).val()] = $(this).val();
        });
        var k = 0;
        for (var i = 0; i < selected.length; i++) {
            if (selected[i] != null) {
                selected_cat[k] = selected[i];
                k++;
            }
        }
        // Bilal Change
        // var route = '/user/questions/update';
        // Original One 
        var route = '/user/questions';
        var answerposition = $("#answerposition").val();
        var imageposition = $("#imageposition").val();
        var answer_aligment = $("#answer_aligment").val();
        var image_aligment = $("#image_aligment").val();
        // console.log(score);
        var question_bg_color = $("#question_bg_color").val();
		
		if($("#question_id").val()){
            route = siteinfo.url_root+route + "/update";
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            route = route ;  
			$.ajax({
                data : {
                    'question_id': $("#question_id").val(),
                    '_method' : 'PUT',
                    'type_id': type_id,
                    'test_ids': selected_cat,
                    'question': CKEDITOR.instances.question_content.getData(), //$("#question_content").val(),
                    'help_info': CKEDITOR.instances["help-editor"].getData(), //$("#help-editor").val(),
                    'questionimage': $("#quiz_img_name").val() ?? null,
                    'score': score,
                    'content': content,
                    'logic': JSON.stringify(logicData),
                    'answerposition' : answerposition,
                    'image_aligment' : image_aligment,
                    'answer_aligment' : answer_aligment,
                    'imageposition' : imageposition,
                    'question_bg_color': question_bg_color,
                    'required': $("#required").is(":checked") ? 1 : 0,
                    'more_than_one_answer': $("#more_than_one_answer").is(':checked') ? 1 : 0,
                    'state': $("#state option:selected").val() ?? null,
                    'titlelocation': $("#title_location option:selected").val() ?? null,
                    'help_info_location': $("#help_info_location option:selected").val() ?? null,
                    'indent': $("#indent").val() ?? null,
                    'width': $("#width").val() ?? null,
                    'min_width': $("#min_width").val() ?? null,
                    'max_width': $("#max_width").val() ?? null,
                    'size': $("#size").val() ?? null,
                    'fontsize': $("#font_size").val() ?? "",
                    'imagefit': $("#image_fit option:selected").val() ?? '',
                    'imagewidth': $.trim($("#image_width").val()) ?? '',
                    'imageheight': $.trim($("#image_height").val()) ?? '',
                    'matrix_data' : matrix_data,
				},
                url: route,
                type: "POST",
                dataType: 'json',
                success: function(response) {
                    swal("Success", "Question Updated!", "success");
                },
                error: function(response) {
                    var responseTextObject = jQuery.parseJSON(response.responseText);
                    swal("Error!", "Fill in the form correctly!", "error");
                }
            });
        }
        else{
            route = siteinfo.url_root+route + "/store";
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            
            $.ajax({
                data: {
                    /**
                    * Form Data
                    **/
					'type_id': type_id,
                    'test_ids': selected_cat,
                    'question': CKEDITOR.instances.question_content.getData(), //$("#question_content").val(),
                    'help_info': CKEDITOR.instances["help-editor"].getData(), //$("#help-editor").val(),
                    'questionimage': $("#quiz_img_name").val() ?? null,
                    'score': score,
                    'content': content,
                    'logic': JSON.stringify(logicData),
                    'answerposition' : answerposition,
                    'image_aligment' : image_aligment,
                   'answer_aligment' : answer_aligment,
                   'imageposition' : imageposition,
                   'question_bg_color': question_bg_color,
                    //Properties
                    
                    //'page' : $("#question_page").val(),
                    //'order' :$("#question_order").val(),
                    'required': $("#required").is(":checked") ? 1 : 0,
                    'more_than_one_answer': $("#more_than_one_answer").val() ?? 0,
                    'state': $("#state option:selected").val() ?? null,
                    
                    'titlelocation': $("#title_location option:selected").val() ?? null,
                    'help_info_location': $("#help_info_location option:selected").val() ?? null,
                    
                    'indent': $("#indent").val() ?? null,
                    'width': $("#width").val() ?? null,
                    'min_width': $("#min_width").val() ?? null,
                    'max_width': $("#max_width").val() ?? null,
                    
                    'size': $("#size").val() ?? null,
                    'fontsize': $("#font_size").val() ?? "",
                    
                    'imagefit': $("#image_fit option:selected").val() ?? '',
                    'imagewidth': $.trim($("#image_width").val()) ?? '',
                    'imageheight': $.trim($("#image_height").val()) ?? '',
                    'matrix_data' : matrix_data,
                },
                ////url: "{{ route('questions.store') }}",
                url: route,
                type: "POST",
                success: function(response) {
                    if(response.add == 1){
                        $("#add_another_question").css('display','inline');
                    }
                    swal("Success", "Question Created!", "success");
                },
                error: function(response) {
                    swal("Error!", "Fill in the form correctly!", "error");
                }
            });
        }
        //
    });

    $("#width").on('change', function() {
        $(".main-content").css("width", $("#width").val());
    });
    $("#font_size").on('change', function() {
        $('div').css("font-size", parseInt($("#font_size").val()));
        $('input').css("font-size", parseInt($("#font_size").val()));
    });
    $("#indent").on('change', function() {
        $(".main-content").css("margin-left", parseInt($("#indent").val()));
    });

    $("#image_width").on('change', function() {
        $(".fileinput-preview").css("width", parseInt($("#image_width").val()));
    });

    $("#image_height").on('change', function() {
        $(".fileinput-preview").css("height", parseInt($("#image_height").val()));
    });
    $("#image_fit").on('change', function() {
        $(".fileinput-preview").css("object-fit", $("#image_fit option:selected").text());
    });

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('.file').change(function() {

        let reader = new FileReader();
        reader.onload = (e) => {
            $('.display-image-preview').attr('src', e.target.result);
        }
        reader.readAsDataURL(this.files[0]);

    });
    
    $('#img').change(function() {

        let reader = new FileReader();
        reader.onload = (e) => {
            $('#preview').attr('src', e.target.result);
        }
        reader.readAsDataURL(this.files[0]);

    });

    $(".image-upload-form").on('click', '.add-btn', function() {
        var lsthmtl = $(".clone").html();
        $(".increment").after(lsthmtl);
    });
    $(".image-upload-form").on("click", ".del-btn", function() {
        $(this).parents(".image_part_file").remove();
    });

    // $(".logic_part").on('click','#logic_open',function(){ 

    //     $("#sortable-14").show();

    // });

    $(".logic_part").on('click', '#condition_add', function() {
        var logichmtl = $(".clone_condition").html();
        logichmtl = `<div class="logic_condition row mt-1">` + logichmtl + `</div>`;
        $("#sortable-14").append(logichmtl);
        UITree.init($("#sortable-14 .logic_condition").last().find('.question-dropdown-tree').get());
    });

    $('.logic_part').on('click', '.del-btnx', function() {
        if($('.logic_part .logic_condition .del-btnx').length>1)
            $(this).parent().parent().remove();
    });

    
    var logicData = [];
    var logic_build = function() {
        $('#sortable-14 .logic_condition').each(function(i,logicContent){
            if($(logicContent).find('.question-dropdown-tree').data('question-id'))
            {
                var logicRow = {};
                logicRow['condition_operator'] = $(logicContent).find('select.condition_operator').val();
                logicRow['question_id'] = $(logicContent).find('.question-dropdown-tree').data('question-id');
                logicRow['question_type'] = $(logicContent).find('.question-dropdown-tree').data('question-type');
                logicRow['comparison_operator'] = $(logicContent).find('select.comparison_operator').val();
                logicRow['question_checkeds'] = [];
                console.log(logicRow['question_type']);
                switch(logicRow['question_type']) {
                    case 'single_input':
                        logicRow['question_checkeds'].push({'textarea':$(logicContent).find('.logic-content input.single_input_textarea').val()});
                    break;
                    case 'checkbox':
                        $(logicContent).find('.logic-content input:checkbox').each(function(i,checkboxEl){
                            if ($(checkboxEl).is(':checked') == true)
                                logicRow['question_checkeds'].push(i);
                        });
                    break;
                    case 'radiogroup':
                        $(logicContent).find('.logic-content input:radio').each(function(i,radioboxEl){
                            if ($(radioboxEl).is(':checked') == true)
                                logicRow['question_checkeds'].push(i);
                        });
                    break;
                    case 'image':
                        $(logicContent).find('.logic-content .image_box input:checkbox.image_check').each(function(i,checkboxEl){
                            if ($(checkboxEl).is(':checked') == true)
                                logicRow['question_checkeds'].push(i);
                        });
                    break;
                }
                logicData.push(logicRow);
            }    
        });
        // var id_list;
        // id_list = $('#sortable-14 .main-content').map(function() {
        //     return $(this).attr('id');
        // });
        // for (var i = 0; i < id_list.length; i++) {
        //     logic[i] = [];
        //     logic[i][0] = $("#sortable-14 div:nth-child(" + (i + 1) + ")").find(".condition_operator").val();
        //     logic[i][1] = id_list[i].split("_")[1];
        //     logic[i][2] = $("#sortable-14 div:nth-child(" + (i + 1) + ")").find(".comparison_operator").val();
        //     var qt_type = $("#sortable-14 div:nth-child(" + (i + 1) + ")").find(".qt_type").val();

        //     if (qt_type == 0) {
        //         logic[i][3] = $("#" + id_list[i]).find("textarea").val();
        //     }
        //     if (qt_type == 1) {
        //         var cnt = $("#" + id_list[i]).find(".logic_check").children().length;
        //         logic[i][3] = 0;
        //         for (var j = 0; j < cnt; j++) {
        //             if ($("#" + id_list[i]).find(".logic_check  .checkbox_" + j).is(':checked') == true)
        //                 logic[i][3] += Math.pow(2, cnt - j - 1);
        //         }
        //     }
        //     if (qt_type == 2) {
        //         var cnt = $("#" + id_list[i]).find(".logic_radio").children().length; //is(':checked');
        //         logic[i][3] = 0;
        //         for (var j = 0; j < cnt; j++) {
        //             if ($("#" + id_list[i]).find(".logic_radio  .radio_" + j + ":checked").val() == "on")
        //                 logic[i][3] += Math.pow(2, cnt - j - 1);
        //         }
        //     }
        //     if (qt_type == 3) {
        //         var cnt = $("#" + id_list[i]).children().length; //is(':checked');
        //         logic[i][3] = 0;
        //         for (var j = 0; j < cnt; j++) {
        //             if ($("#" + id_list[i]).find(".imagebox_" + j).is(':checked') == true)
        //                 logic[i][3] += Math.pow(2, cnt - j - 1);
        //         }
        //     }
        //     if (qt_type == 4) {
        //         logic[i][3] = $("#" + id_list[i]).find("textarea").val();
        //     }
        // }
    };


    return {
        //main function to initiate the module
        init: function() {


        }

    };


    

}();

