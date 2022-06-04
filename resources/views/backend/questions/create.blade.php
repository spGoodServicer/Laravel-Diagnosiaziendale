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
                <a id="add_another_question" style="display:none" href="{{ route('admin.questions.create') }}"
                       class="btn btn-success">Add Another Question</a>
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
                            @if ($i ==0)
                                <option value="{{$test->id}}" selected>{{ $test->title}}</option>
                                @php
                                    $i++;
                                @endphp
                            @else
                                <option value="{{$test->id}}">{{$test->title}}</option>                             
                            @endif 
                        @endforeach  
                    </select>
                    <div id="tests_id1"></div>
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
                        <div class="row">
                            <div class="col-12" >
                                    <div class="form-group">
                                        <div class="form-group form-md-line-input has-info" style="margin-top:10px">
                                            <textarea name="question_content" id="question_content" class="form-control ckeditor"></textarea>
                                            <!-- <input type="text" class="form-control"   id="question_content"> -->
                                            {{--{!! Form::textarea('content', '', ['class' => 'form-control editor', 'placeholder' => '','name'=>'question_content','id' => 'question_content']) !!}--}}
                                            <label for="question_content">Question</label>
                                        </div>                      
                                        <div class="form-group form-md-line-input has-info">
                                            <textarea name="help-editor" id="help-editor" class="form-control ckeditor"></textarea>
                                            {{--{!! Form::textarea('content', '', ['class' => 'form-control editor', 'placeholder' => '','id' => 'help-editor']) !!}--}}
                                            <label for="question_help_info">Question Help or Information</label>
                                        </div>  
                                        @if($errors->has('question'))
                                            <p class="help-block">
                                                {{ $errors->first('question') }}
                                            </p>
                                        @endif
                                    </div>    
                                    <div class="mt-2">
                                        <img id="preview" src="" width="100%">
                                        <form id="question_type_image" action="" method="POST" enctype="multipart/form-data">
                                            @csrf
                                            <div class="form-group">
                                                <label class="form-label">Image</label>
                                                <input type="file" id="quiz_img" class="form-control" name="file" accept="image/*">
                                                <input type="hidden" id="quiz_img_name" name="quiz_img_name" >
                                                
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
                                    <option value="{{$question_type_key}}" >{{ $question_type_label}}</option>
                                @endforeach
                            </select>
                            <p class="help-block"></p>
                        </div>
                        <div id="question-type-box">
                            @foreach(config('constants.question_types') as $question_type_key=>$question_type_label)   
                                @if ($loop->first)
                                    @include('backend.questions.components.simple.'.$question_type_key,['content' => ''])
                                @else
                                    @include('backend.questions.components.simple.'.$question_type_key,[ 'display' => 'none'])
                                @endif
                            @endforeach
                            <div id="score-box" class="form-group show_single_input">
                                <label class="from-label">Score</label>
                                <input type="number" id="score" name="score"  class="form-control" placeholder="0" >
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
                                    <input type="checkbox" name="required" id="required" placeholder="" class="form-check-input"/>
                                    {!! Form::label('required', 'Is Required', ['class' => 'form-check-label']) !!}
                                </div>
                                <div id="more_than_one_answer_box" class="form-check">
                                    <input type="checkbox" name="more_than_one_answer" id="more_than_one_answer" placeholder="" class="form-check-input"/>
                                    {!! Form::label('more_than_one_answer', 'More than 1 answers', ['class' => 'form-check-label']) !!}
                                </div>
                                {!! Form::label('state', 'State', ['class' => 'control-label']) !!}
                                <select class="form-control" name="options" id="state" placeholder="Options">
                                    <option value="default">Default</option>
                                    <option value="collapsed">Collapsed</option>
                                    <option value="expanded">Expanded</option>
                                </select>
                                {!! Form::label('title_location', 'Title location', ['class' => 'control-label']) !!}
                                <select class="form-control" name="options" id="title_location" placeholder="Options">
                                    <option value="col-12 order-1">Default</option>
                                    <option value="col-12 order-1">Top</option>
                                    <option value="col-12 order-2">Center</option>
                                    <option value="col-12 order-3">Bottom</option>
                                    <option value="col-6 order-1">Left</option>
                                    <option value="col-6 order-2">Right</option>
                                    <option value="d-none">Hidden</option>
                                </select>
                                {!! Form::label('answer_location', 'Answer location', ['class' => 'control-label']) !!}
                                <select class="form-control" name="options" id="answerposition" placeholder="Options">
                                    <option value="col-12 order-3">Default</option>
                                    <option value="col-12 order-1">Top</option>
                                    <option value="col-12 order-3">Bottom</option>
                                    <option value="col-12 order-2">Center</option>
                                    <option value="col-8 order-1">Left</option>
                                    <option value="col-8 order-2">Right</option>
                                    <option value="d-none">Hidden</option>
                                </select>
                                {!! Form::label('image_location', 'Image location', ['class' => 'control-label']) !!}
                                <select class="form-control" name="options" id="imageposition" placeholder="Options">
                                    <option value="col-12 order-2">Default</option>
                                    <option value="col-12 order-1">Top</option>
                                    <option value="col-12 order-3">Bottom</option>
                                    <option value="col-12 order-2">Center</option>
                                    <option value="col-6">Bottom</option>
                                    <option value="col-4 order-1">Left</option>
                                    <option value="col-4 order-2">Right</option>
                                    <option value="d-none">Hidden</option>
                                </select>
                                {!! Form::label('answer_aligment', 'Answer Aligment', ['class' => 'control-label']) !!}
                                <select class="form-control" name="options" id="answer_aligment" placeholder="Options">
                                    <option value="offset-md-0">full</option>
                                    <option value="">Left</option>
                                    <option value="offset-md-3">Center</option>
                                    <option value="offset-md-6">Right</option>
                                </select>
                                {!! Form::label('image_aligment', 'Image aligment', ['class' => 'control-label']) !!}
                                <select class="form-control" name="options" id="image_aligment" placeholder="Options">
                                    <option value="col-12">Full</option>
                                    <option value="offset-md-6 col-6">Right</option>
                                    <option value="offset-md-0 col-6">Left</option>
                                    <option value="offset-md-3 col-6">Center</option>
                                </select>
                                {!! Form::label('question_bg_color', 'Question Backgroud', ['class' => 'control-label']) !!}
                                <select class="form-control" name="options" id="question_bg_color" placeholder="Options">
                                    <option value="#fff">White</option>
                                    <option value="#ff5733">Light Brown</option>
                                    <option value="#ffe933">Yellow</option>
                                    <option value="#cab81d">Dark Yellow</option>
                                    <option value="#1d76ca">Blue</option>
                                </select>
                                <!-- {!! Form::label('help_info_location', 'Help Info location', ['class' => 'control-label']) !!}
                                <select class="form-control" name="options" id="help_info_location" placeholder="Options">
                                    <option value="default">Default</option>
                                    <option value="top">Top</option>
                                    <option value="bottom">Bottom</option>
                                    <option value="left">Left</option>
                                    <option value="hidden">Hidden</option>
                                </select> -->
                                {!! Form::label('indent', 'Indent', ['class' => 'control-label']) !!}
                                <input type="number" name="indent" id="indent" placeholder="" class="form-control" value=""/>

                                {!! Form::label('width', 'Width', ['class' => 'control-label']) !!}
                                <input type="number" name="width" id="width" placeholder="" class="form-control" value=""/>

                                {!! Form::label('min_width', 'Min Width', ['class' => 'control-label']) !!}
                                <input type="number" name="min_width" id="min_width" placeholder="" class="form-control" value=""/>

                                {!! Form::label('max_width', 'Max Width', ['class' => 'control-label']) !!}
                                <input type="number" name="max_width" id="max_width" placeholder="" class="form-control" value=""/>

                                {!! Form::label('size', 'Size', ['class' => 'control-label']) !!}
                                <input type="number" name="size" id="size" placeholder="" class="form-control"  value=""/>
                                <div id="size1"></div>
                                {{--{!! Form::label('font_size', 'Font size', ['class' => 'control-label']) !!}
                                <input type="text" name="font_size" id="font_size" placeholder="" class="form-control"  value="{{ $current_question->fontsize }}"/>

                                {!! Form::label('column_count', 'Column Count', ['class' => 'control-label']) !!}
                                <input type="text" name="column_count" id="column_count" placeholder="" class="form-control" /> --}}

                                {!! Form::label('imagefit', 'Image Fit', ['class' => 'control-label']) !!}  
                                <select class="form-control" name="options" id="image_fit" placeholder="Options">
                                    <option value="0">None</option>
                                    <option value="1">Contain</option>
                                    <option value="2">Cover</option>
                                    <option value="3">Fill</option>
                                </select>
                                <div id="options1"></div>
                                {!! Form::label('image_width', 'Image Width', ['class' => 'control-label']) !!}
                                <input type="text" name="image_width" id="image_width" placeholder="" class="form-control"  value=""/>
                                <div id="image_width1"></div>

                                {!! Form::label('image_height', 'Image Height', ['class' => 'control-label']) !!}
                                <input type="text" name="image_height" id="image_height" placeholder="" class="form-control"  value=""/>
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

    <!-- <script type="text/javascript" src="{{asset('js/select2.min.js')}}"></script> -->
    <script type="text/javascript" src="{{asset('js/jquery.dataTables.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/dataTables.bootstrap.js')}}"></script>
    
    <script type="text/javascript" src="{{asset('js/table-editable.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/question-create.js')}}"></script>

    <script src="{{ asset('assets/metronic_assets/global/plugins/jquery.min.js')}}" type="text/javascript"></script>


    <script type="text/javascript" src="{{asset('js/3.5.1/jquery.min.js')}}"></script>

    {{-- <link href="{{asset('css/custom.css')}}"  rel="stylesheet" type="text/css"/> --}}
    <link rel="stylesheet" type="text/css" href="{{asset('assets/metronic_assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css')}}"/>   
    <script type="text/javascript" src="{{asset('assets/metronic_assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js')}}"></script>

    
    <script src="{{asset('plugins/bootstrap-tagsinput/bootstrap-tagsinput.js')}}"></script>
<!--
    <script type="text/javascript" src="{{asset('/vendor/unisharp/laravel-ckeditor/ckeditor.js')}}"></script>
    <script type="text/javascript" src="{{asset('/vendor/unisharp/laravel-ckeditor/adapters/jquery.js')}}"></script>
-->
    <script src="{{asset('/vendor/laravel-filemanager/js/lfm.js')}}"></script>
    <link rel="stylesheet" type="text/css" href="{{asset('plugins/dropzone/min/dropzone.min.css')}}"/>   
    <script src="{{asset('plugins/dropzone/min/dropzone.min.js')}}"></script>
    <script>

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
            // initiate layout and plugins
            // Metronic.init(); // init metronic core components
            // Layout.init(); // init current layout
            // QuickSidebar.init(); // init quick sidebar
            // Demo.init(); // init demo features
            UITree.selectQuestion(@json($courses));  
            UINestable.init();
            TableEditable.init();
            QuestionCreate.init();  
            //UIToastr.init();  
        });

        $('.jstree-anchor').on('click', function(e) {
            alert("clicked");
            e.preventDefault();

            // This removes the class on selected li's
            $("#sizelist li").removeClass("select");

            // adds 'select' class to the parent li of the clicked element
            // 'this' here refers to the clicked a element
            $(this).closest('li').addClass('select');

            // sets the input field's value to the data value of the clicked a element
            $('#sizevalue').val($(this).data('value'));
        });

        function radioScore(ele){
            // var id = $(ele).attr('id');
            // console.log(id);
            // $('#'+id).attr('value',$(ele).val());
            // console.log($('#'+id).val());
            $(ele).data('value',ele.value);
            $('#'+ele.dataset.q_id).attr('value',ele.value);
            // console.log($('body .q_id'+ele.dataset.q_id).val());
            console.log($('#'+ele.dataset.q_id));

        }
		 
    </script>
@stop
