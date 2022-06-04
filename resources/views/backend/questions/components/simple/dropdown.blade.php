{{--Dropdown--}}
@php
    if(isset($content) && $content !=  '')
        $content = json_decode($content);
    else
        $content=null;
    
@endphp
<div id="dropdown_part" class="row question-box" @if(isset($display)) style="display:{{$display}};" @endif>
    <div class="col-12">
        <button id="dropdown_add" class="btn btn-success"><i class="fa fa-plus"></i> New</button>
    </div>
    <div class="col-12 form-group" id="sortable_drop">
    <!-- <form> -->
        @if(isset($content))
            @foreach($content as $key=>$c)
                <div class="radio">
                    <label><input type="radio" name="dropdown_optradio" @if($c->checked==1)checked @endif></label>
                    <input class="radio_label" type="text" value="{{$c->label}}" style="border:none;">
                    <label  >Score</label>
                    <input  class ="radio_score" type="number"   value="{{$c->score}}" style="margin-right:1vw">
                    <a class="btn btn-xs mb-2 btn-danger del-btnx" style="cursor:pointer;" data-id="41">
                        <i class="fa fa-trash" style="color:white"></i>
                    </a>
                </div>
            @endforeach
        @else
            <div class="radio">
                <label><input type="radio" name="dropdown_optradio" ></label>
                <input class="radio_label" type="text" value="1" style="border:none;">
                <label  >Score</label>
                <input  class ="radio_score" type="number"   value="" style="margin-right:1vw">
                <a class="btn btn-xs mb-2 btn-danger del-btnx" style="cursor:pointer;" data-id="41">
                    <i class="fa fa-trash" style="color:white"></i>
                </a>
            </div>
            <div class="radio">
                <label><input type="radio" name="dropdown_optradio" ></label>
                <input class="radio_label" type="text" value="2" style="border:none;">
                <label  >Score</label>
                <input  class ="radio_score" type="number"   value="" style="margin-right:1vw">
                <a class="btn btn-xs mb-2 btn-danger del-btnx" style="cursor:pointer;" data-id="42">
                    <i class="fa fa-trash" style="color:white"></i>
                </a>
            </div>
        @endif
    </div>
</div>
{{-- End Dropdown --}}