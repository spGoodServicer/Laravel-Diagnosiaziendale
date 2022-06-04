  @extends('backend.layouts.app')
@section('title', __('labels.backend.questions.title').' | '.app_name())

@section('content')
    <link href = "https://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css"
         rel = "stylesheet">


    <script src = "https://code.jquery.com/jquery-1.10.2.js"></script>
    <script src="https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
    <script src="https://cdn.ckeditor.com/4.6.2/standard-all/ckeditor.js"></script>
    
    
    {{-- Test Selection --}}
    <div class="card">
        <div class="card-header">
            <h3 class="page-title float-left mb-0">Selection of Tests</h3>
            <div class="float-right">
                <a href="{{ route('admin.questions.index') }}"
                   class="btn btn-success">@lang('labels.backend.questions.view')</a>
            </div>         
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12 form-group">
                    {!! Form::label('tests', 'Test', ['class' => 'control-label']) !!}
                    @php
                        $i=0;
                    @endphp                
                     <select class="form-control select2 required" name="tests_id" id="tests_id" placeholder="Options" multiple>
                        @foreach($tests as $test)
                            @foreach($question_tests as $q)
                                <option value="{{$test->id}}"  @if($test->id==$q->test_id) selected @endif>{{ $test->title}}</option>
                            @endforeach
                        @endforeach  
                    </select>
                    
                     <p class="help-block"></p>
                    @if($errors->has('question'))
                        <p class="help-block">
                            {{ $errors->first('question') }}
                        </p>
                    @endif
                </div>
            </div>
        </div>
    </div>
    {{-- End Test Selection --}}
    <div class="row">
        {{-- Question --}}
        <div class="col-md-9">
            <div class="card">
                <div class="card-header">
                    <h3 class="page-title float-left mb-0">Question Deatils</h3>           
                </div>
                <div id="question_edit" class="card-body">
                    <input type="hidden" id="question_id" value="{{$question->id}}">
                    <div class="row">
                        <div class="col-12" >
                                <div class="form-group">
                                    <div class="form-group form-md-line-input has-info" style="margin-top:10px">
<!--                                            <textarea name="question_content" id="question_content" class="form-control ckeditor"></textarea>-->
                                        <!-- <input type="text" class="form-control"   id="question_content"> -->
                                        {!! Form::textarea('content', $question->question , ['class' => 'form-control ckeditor', 'placeholder' => '','name'=>'question_content','id' => 'question_content']) !!}
                                        <label for="question_content">Question</label>
                                    </div>                      
                                    <div class="form-group form-md-line-input has-info">
<!--                                            <textarea name="help-editor" id="help-editor" class="form-control ckeditor"></textarea>-->
                                        {!! Form::textarea('content', $question->help_info , ['class' => 'form-control ckeditor', 'placeholder' => '','id' => 'help-editor']) !!}
                                        <label for="question_help_info">Question Help or Information</label>
                                    </div>  
                                    @if($errors->has('question'))
                                        <p class="help-block">
                                            {{ $errors->first('question') }}
                                        </p>
                                    @endif
                                </div>    
                                <div class="mt-2">
                                    <img id="preview" src="@if($question->questionimage!="" && $question->questionimage!=null) {{$question->questionimage}} @endif" width="100%">
                                    <form id="question_type_image" action="" method="POST" enctype="multipart/form-data">
                                        @csrf
                                        <div class="form-group">
                                            <label class="form-label">Image</label>
                                            <input type="file" id="quiz_img" class="form-control" name="file" accept="image/*">
                                            <input type="hidden" id="quiz_img_name" name="quiz_img_name" value="{{$question->questionimage}}">
                                        </div>
                                    </form>
                                </div>       
                        </div>
                    </div>
                </div>     
            </div>
            {{-- Question Type --}}
            <div class="card">
                <div class="card-header">
                    <h3>Question Type</h3>
                </div>
                <div class="card-body">
                    <div class="mb-2">
                        {!! Form::label('question_type', trans('labels.backend.questions.fields.question_type'), ['class' => 'control-label']) !!}
                        <select class="form-control"  name="options" id="question_type" placeholder="Options">
                            @foreach(config('constants.question_types') as $question_type_key=>$question_type_label)   
                                <option value="{{$question_type_key}}" @if($question->questiontype==$question_type_key) selected @endif>{{ $question_type_label}}</option>
                            @endforeach
                        </select>
                        <p class="help-block"></p>
                    </div>
                    <div id="question-type-box">
                        @foreach(config('constants.question_types') as $question_type_key=>$question_type_label)   
                            @if($question->questiontype==$question_type_key)
                                @include('backend.questions.components.simple.'.$question_type_key,['content' => $question->content])
                            @else
                                @include('backend.questions.components.simple.'.$question_type_key,[ 'display' => 'none'])
                            @endif
                        @endforeach
                        <div id="score-box" class="form-group show_single_input" @if($question->questiontype!='single_input') style="display:none" @endif>
                            <label class="from-label">Score</label>
                            <input type="number" id="score" name="score"  class="form-control" placeholder="0" @if($question->questiontype=='single_input') value="{{$question->score}}" @endif>
                        </div>
                    </div>
                </div>
            </div>
            {{-- End Question Type --}}
            {{-- Logic --}}
            <div class="card">
                <div class="card-header">
                    <h3 class="page-title float-left mb-0">Logic</h3>          
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-12 form-group">                    
                            <div>
                                <div class="logic_part" style="border:1px solid #bbbbbb;padding:10px;">
                                    
                                    <div id="sortable-14">
                                        <div class="row">
                                            <div class="col-1 offset-11">
                                                <button id="condition_add" class="btn btn-xs btn-primary"><i class="fa fa-plus"></i></button>
                                            </div>
                                        </div>
                                        @if($question->logic != "" && $question->logic != "[]")
                                            @php 
                                                $logics = json_decode($question->logic); 
                                            @endphp
                                            @foreach($logics as $logic)
                                                
                                                @if(!property_exists($logic,'question_id'))
                                                    @continue
                                                @endif
                                                @php 
                                                    $logicQuestion = DB::table('questions')->where('id','=',$logic->question_id)->first();
                                                @endphp
                                                @if(!$logicQuestion)
                                                    @continue
                                                @endif
                                                <div class="logic_condition row mt-1">
                                                    <div class="col-2">
                                                        <select class="form-control btn-primary condition_operator">
                                                            <option value="and" {{ ($logic->condition_operator == 'and')?'selected':'' }}>And</option>
                                                            <option value="or" {{ ($logic->condition_operator == 'or')?'selected':'' }}>Or</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-6">
                                                        <div class="dropdown dropdown-tree question-dropdown-tree" data-question-id={{$logic->question_id}} data-question-type={{$logicQuestion->questiontype}}></div>
                                                    </div>
                                                    <div class="col-3">                                    
                                                        <select class="form-control btn-warning comparison_operator">
                                                            @foreach(config('constants.comparison_operators') as $opKey => $opVal)
                                                                <option value="{{ $opKey }}" {{($logic->comparison_operator == $opKey)?'selected':''}}>{{ $opVal }}</option>
                                                            @endforeach                                       
                                                        </select>
                                                    </div>
                                                    <div class="col-1 logic-tools">
                                                        <button class="btn btn-xs btn-danger del-btnx">
                                                            <i class="fa fa-trash"></i>
                                                        </button>
                                                    </div>
                                                    <div class="col-12 row logic-content">
                                                        <div class="col-12 logic-question-part">{{$logicQuestion->id}}.{!!$logicQuestion->question!!}</div>
                                                        @switch($logicQuestion->questiontype)
                                                            @case('single_input')
                                                                <div class="col-8 form-group">
                                                                    <label>Please enter/select the value </label>
                                                                    <input class="form-control single_input_textarea" value="@if(isset($logic->question_checkeds[0]->textarea)){{$logic->question_checkeds[0]->textarea}}@endif"/>
                                                                </div>
                                                                <div class="col-4">
                                                                    <div class="form-body">
                                                                        <div class="form-group ">
                                                                            <img class="display-image-preview" src="{{$logicQuestion->questionimage}}"style="max-height: 150px;">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                @break
                                                            @case('checkbox')
                                                                @foreach ( json_decode($logicQuestion->content) as $row)
                                                                    @if(!property_exists($row,'label'))
                                                                        @continue
                                                                    @endif
                                                                    <div class="col-md-3 col-sm-6 checbox_box" display="inline-flex">
                                                                        <div  class="checkbox">
                                                                            <label>{{$row->label}}</label>
                                                                            <input type="checkbox" class="form-control logic_check" @if(in_array($loop->index,$logic->question_checkeds)) checked @endif>
                                                                        </div>
                                                                    </div>
                                                                @endforeach
                                                                
                                                                @break
                                                            @case('radiogroup')
                                                                @foreach ( json_decode($logicQuestion->content) as $row)
                                                                    @if(!property_exists($row,'label'))
                                                                        @continue
                                                                    @endif
                                                                    <div class="col-md-3 col-sm-6 checbox_box" display="inline-flex">
                                                                        <div  class="radio">
                                                                            <label>{{$row->label}}</label>
                                                                            <input type="radio" class="form-control logic_optradio" @if(in_array($loop->index,$logic->question_checkeds)) checked @endif>
                                                                        </div>
                                                                    </div>
                                                                @endforeach
                                                                
                                                                @break
                                                            @case('image')
                                                                @foreach ( json_decode($logicQuestion->content) as $row)
                                                                    @if(!property_exists($row,'file'))
                                                                        @continue
                                                                    @endif
                                                                    <div class="col-md-3 col-sm-6 image_box" style="padding:10px;width:7vw;height:10vw;" display="inline-flex" >
                                                                        <div class="checkbox"><input type="checkbox" class="image_check" @if(in_array($loop->index,$logic->question_checkeds)) checked @endif /></div>
                                                                        <img src="{{$row->file}}"  width="90%" height="80%" style="max-width:100%; max-height:100%;">
                                                                    </div>
                                                                @endforeach
                                                                @break
                                                            @default
                                                        @endswitch
                                                    </div>
                                                </div>
                                            @endforeach
                                        @endif
                                            <div class="logic_condition row clone_condition mt-1">
                                                <div class="col-12 logic-question-part"></div>
                                                <div class="col-2">
                                                    <select class="form-control btn-primary condition_operator">
                                                        <option value="and">And</option>
                                                        <option value="or">Or</option>
                                                    </select>
                                                </div>
                                                <div class="col-6">
                                                    <div class="dropdown dropdown-tree question-dropdown-tree"></div>
                                                </div>
                                                <div class="col-3">                                    
                                                    <select class="form-control btn-warning comparison_operator">
                                                        @foreach(config('constants.comparison_operators') as $opKey => $opVal)
                                                            <option value="{{ $opKey }}">{{ $opVal }}</option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                                <div class="col-1">                                            
                                                    <button class="btn btn-xs  btn-danger del-btnx"><i class="fa fa-trash"></i></button>
                                                </div>
                                                <div class="col-12 row logic-content"></div>
                                            </div>
                                         
                                        
                                    </div>                            
                                </div>
                            </div>
                        </div>
                                @if($errors->has('question'))
                                    <p class="help-block">
                                        {{ $errors->first('question') }}
                                    </p>
                                @endif
                    </div>
            
                </div>
            </div>
            {{-- End Logic --}}
        </div>
        {{-- End Question --}}
        {{-- Question Properties --}}
        <div class="col-md-3">
            <div class="card">
                <div class="card-header">
                    <h3>Layout Properties</h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="form-check">
                                <input type="checkbox" name="required" id="required" placeholder="" class="form-check-input" value="1" @if($question->required==1) checked @endif/>
                                {!! Form::label('required', 'Is Required', ['class' => 'form-check-label']) !!}
                            </div>
                            <div id="more_than_one_answer_box" class="form-check show_single_input">
                                <input type="checkbox" name="more_than_one_answer" id="more_than_one_answer" placeholder="" class="form-check-input" value="1" @if($question->more_than_one_answer==1) checked @endif />
                                {!! Form::label('more_than_one_answer', 'More than 1 answers', ['class' => 'form-check-label']) !!}
                            </div>
                            {!! Form::label('state', 'State', ['class' => 'control-label']) !!}
                            <select class="form-control" name="options" id="state" placeholder="Options">
                                @php
                                    $states = [
                                        'deafult' => 'Default',
                                        'collapased' => 'Collapsed',
                                        'expanded' => 'Expanded'
                                    ];
                                @endphp
                                @foreach($states as $key=>$value)
                                    <option value="{{$key}}" @if($question->state==$key) selected @endif>{{$value}}</option>
                                @endforeach
                            </select>
                            {!! Form::label('title_location', 'Title location', ['class' => 'control-label']) !!}
                            <select class="form-control" name="options" id="title_location" placeholder="Options">
                                @php
                                    $title_location = [
                                        'col-12' => 'Default',
                                        'col-12 order-1' => 'Top',
                                        'col-12 order-2' => 'Center',
                                        'col-12 order-3' => 'Bottom',
                                        'col-6 order-1' => 'Left',
                                        'col-6 order-2' => 'Right',
                                        'd-none' => 'Hide'
                                    ];
                                @endphp
                                @foreach($title_location as $key=>$value)
                                    <option value="{{$key}}" @if($question->titlelocation==$key) selected @endif>{{$value}}</option>
                                @endforeach
                            </select>
                            {!! Form::label('answer_location', 'Answer location', ['class' => 'control-label']) !!}
                            <select class="form-control" name="options" id="answerposition" placeholder="Options">
                                @php
                                    $answer_location = [
                                        'col-12' => 'Default',
                                        'col-12 order-1' => 'Top',
                                        'col-12 order-3' => 'Bottom',
                                        'col-12 order-2' => 'Center',
                                        'col-8 order-1' => 'Left',
                                        'col-8 order-2' => 'Right',
                                        'd-none' => 'Hide'
                                    ];
                                @endphp
                                @foreach($answer_location as $key=>$value)
                                    <option value="{{$key}}" @if($question->answerposition==$key) selected @endif>{{$value}}</option>
                                @endforeach
                            </select>
                            {!! Form::label('image_location', 'Image location', ['class' => 'control-label']) !!}
                            <select class="form-control" name="options" id="imageposition" placeholder="Options">
                                @php
                                    $image_location = [
                                        'col-12' => 'Default',
                                        'col-12 order-1' => 'Top',
                                        'col-12 order-3' => 'Bottom',
                                        'col-12 order-2' => 'Center',
                                        'col-4 order-1' => 'Left',
                                        'col-4 order-2' => 'Right',
                                        'd-none' => 'Hide'
                                    ];
                                @endphp
                                @foreach($image_location as $key=>$value)
                                    <option value="{{$key}}" @if($question->imageposition==$key) selected @endif>{{$value}}</option>
                                @endforeach
                            </select>
                            {!! Form::label('image_aligment', 'Image Aligment', ['class' => 'control-label']) !!}
                            <select class="form-control" name="options" id="image_aligment" placeholder="Options">
                                @php
                                    $image_aligment = [
                                        'col-12' => 'Full',
                                        'offset-md-6 col-6' => 'Right',
                                        'offset-md-0 col-6' => 'Left',
                                        'offset-md-3 col-6' => 'Center',
                                    ];
                                @endphp
                                @foreach($image_aligment as $key=>$value)
                                    <option value="{{$key}}" @if($question->image_aligment==$key) selected @endif>{{$value}}</option>
                                @endforeach
                            </select>
                            {!! Form::label('answer_aligment', 'Answer Aligment', ['class' => 'control-label']) !!}
                            <select class="form-control" name="options" id="answer_aligment" placeholder="Options">
                                @php
                                    $answer_aligment = [
                                        'offset-md-0' => 'Full',
                                        '' => 'Left',
                                        'offset-md-6' => 'Right',
                                        'offset-md-3' => 'Center',
                                    ];
                                @endphp
                                @foreach($answer_aligment as $key=>$value)
                                    <option value="{{$key}}" @if($question->answer_aligment==$key) selected @endif>{{$value}}</option>
                                @endforeach
                            </select>
                            {!! Form::label('question_bg_color', 'Question Background', ['class' => 'control-label']) !!}
                            <select class="form-control" name="options" id="question_bg_color" placeholder="Options">
                                @php
                                    $question_bg_color = [
                                        '#fff' => 'White',
                                        '#ff5733' => 'Light Brown',
                                        '#ffe933' => 'Yellow',
                                        '#cab81d' => 'Dark yellow',
                                        '#1d76ca' => 'Blue',
                                    ];
                                @endphp
                                @foreach($question_bg_color as $key=>$value)
                                    <option value="{{$key}}" @if($question->question_bg_color==$key) selected @endif>{{$value}}</option>
                                @endforeach
                            </select>
                            <!-- {!! Form::label('help_info_location', 'Help Info location', ['class' => 'control-label']) !!}
                            <select class="form-control" name="options" id="help_info_location" placeholder="Options">
                                @php
                                    $help_info_location = [
                                        'deafult' => 'Default',
                                        'top' => 'Top',
                                        'bottom' => 'Bottom',
                                        'left' => 'Left',
                                        'hidden' => 'Hidden'
                                    ];
                                @endphp
                                @foreach($help_info_location as $key=>$value)
                                    <option value="{{$key}}" @if($question->help_info_location==$key) selected @endif>{{$value}}</option>
                                @endforeach
                            </select> -->
                            {!! Form::label('indent', 'Indent', ['class' => 'control-label']) !!}
                            <input type="number" name="indent" id="indent" placeholder="" class="form-control" value="{{$question->indent}}"/>

                            {!! Form::label('width', 'Width', ['class' => 'control-label']) !!}
                            <input type="number" name="width" id="width" placeholder="" class="form-control" value="{{$question->width}}"/>

                            {!! Form::label('min_width', 'Min Width', ['class' => 'control-label']) !!}
                            <input type="number" name="min_width" id="min_width" placeholder="" class="form-control" value="{{$question->min_width}}"/>

                            {!! Form::label('max_width', 'Max Width', ['class' => 'control-label']) !!}
                            <input type="number" name="max_width" id="max_width" placeholder="" class="form-control" value="{{$question->max_width}}"/>

                            {!! Form::label('size', 'Size', ['class' => 'control-label']) !!}
                            <input type="number" name="size" id="size" placeholder="" class="form-control"  value="{{$question->size}}"/>

                            {{--{!! Form::label('font_size', 'Font size', ['class' => 'control-label']) !!}
                            <input type="text" name="font_size" id="font_size" placeholder="" class="form-control"  value="{{ $current_question->fontsize }}"/>
                            <div id="font_size1"></div>
                            {!! Form::label('column_count', 'Column Count', ['class' => 'control-label']) !!}
                            <input type="text" name="column_count" id="column_count" placeholder="" class="form-control" /> --}}

                            {!! Form::label('imagefit', 'Image Fit', ['class' => 'control-label']) !!}  
                            <select class="form-control" name="options" id="image_fit" placeholder="Options">
                                @php
                                    $image_fit = [
                                        '0' => 'None',
                                        '1' => 'Contain',
                                        '2' => 'Cover',
                                        '3' => 'Fill'
                                    ];
                                @endphp
                                @foreach($image_fit as $key=>$value)
                                    <option value="{{$key}}" @if($question->imagefit==$key) selected @endif>{{$value}}</option>
                                @endforeach
                            </select>
                            <div id="image_fit1"></div>
                            {!! Form::label('image_width', 'Image Width', ['class' => 'control-label']) !!}
                            <input type="text" name="image_width" id="image_width" placeholder="" class="form-control"  value="{{$question->imagewidth}}"/>
                            <div id="image_width1"></div>
                            {!! Form::label('image_height', 'Image Height', ['class' => 'control-label']) !!}
                            <input type="text" name="image_height" id="image_height" placeholder="" class="form-control"  value="{{$question->imageheight}}"/>
                            <div id="image_height1"></div>
                        </div> 
                    </div>
                </div>
            </div>
            <div class="mt-2 mb-2">
                <button id="save_data" class="btn btn-danger">Save Data</button>
            </div>
        </div>
        {{-- End Question Properties --}}
    </div>


    
 
    
    <script type="text/javascript" src="{{asset('js/select2.full.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/main.js')}}"></script>
    <script src="{{asset('plugins/sweetalert2/sweetalert2.min.js')}}"></script>
    {{-- <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script> --}}
    <script type="text/javascript" src="{{asset('js/ui-nestable.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/jquery.nestable.js')}}"></script>

    <script type="text/javascript" src="{{asset('js/jquery.dataTables.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/dataTables.bootstrap.js')}}"></script>
    
    <script type="text/javascript" src="{{asset('js/table-editable.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/question-create.js')}}"></script>

    <script src="{{ asset('assets/metronic_assets/global/plugins/jquery.min.js')}}" type="text/javascript"></script>


    <script type="text/javascript" src="{{asset('js/3.5.1/jquery.min.js')}}"></script>

    <link rel="stylesheet" type="text/css" href="{{asset('assets/metronic_assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css')}}"/>   
    <script type="text/javascript" src="{{asset('assets/metronic_assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js')}}"></script>

    <!-- dropzonejs -->
    <link rel="stylesheet" type="text/css" href="{{asset('plugins/dropzone/min/dropzone.min.css')}}"/>   
    <script src="{{asset('plugins/dropzone/min/dropzone.min.js')}}"></script>
    

    <script src="{{asset('plugins/bootstrap-tagsinput/bootstrap-tagsinput.js')}}"></script>
    <script src="{{asset('/vendor/laravel-filemanager/js/lfm.js')}}"></script>
    <script>
        function radioScore(ele){
            alert("Score Updated");
            $(ele).data('value',ele.value);
            $('#'+ele.dataset.q_id).attr('value',ele.value);
            // console.log($('body .q_id'+ele.dataset.q_id).val());
            console.log($('#'+ele.dataset.q_id));

        }
        CKEDITOR.replace('question_content', {
            height : 300,
            filebrowserUploadUrl: `{{route('admin.questions.editor_fileupload',['_token' => csrf_token() ])}}`,
            filebrowserUploadMethod: 'form',
            extraPlugins: 'font,widget,colorbutton,colordialog,justify',
        });

        CKEDITOR.replace('help-editor', {
            height : 300,
            filebrowserUploadUrl: `{{route('admin.questions.editor_fileupload',['_token' => csrf_token() ])}}`,
            filebrowserUploadMethod: 'form',
            extraPlugins: 'font,widget,colorbutton,colordialog,justify',
        });
        

        jQuery(document).ready(function(e) {       
            
            UITree.selectQuestion(@json($courses));  
            UINestable.init();
            TableEditable.init();
            QuestionCreate.init();  
            //UIToastr.init();  
        });
    </script>








    
@stop

