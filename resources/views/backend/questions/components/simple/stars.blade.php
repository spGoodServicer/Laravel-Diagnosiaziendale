{{-- stars --}}
@php
    if(isset($content) && $content !=  '')
        $content = json_decode($content);
    else
        $content=null;
    
@endphp
<div id="stars_part" class="row question-box" @if(isset($display)) style="display:{{$display}};" @endif>
    <div class="col-2">
        <!--  <a id="rating_add" class="btn btn-success" style="color:white; margin-top:10px;">+ New</a> -->
        <div class="mb-3">
            <label for="color">Select Color</label>
            <input type="color" name="color" id="stars_color" class="form-control" value="@if(isset($content) && isset($content->color)){{$content->color}}@endif">
        </div>
    </div>
    <div class="col-6" >
        <label for="">Select Display</label>
        <select name="rating_display" class="form-control" id="stars_display">
            <option value="col-12" @if(isset($content) && isset($content->col)) selected @endif>1</option>
            <option value="col-6" @if(isset($content) && isset($content->col)) selected @endif>2</option>
            <option value="col-3" @if(isset($content) && isset($content->col)) selected @endif>3</option>
            <option value="col-4" @if(isset($content) && isset($content->col)) selected @endif>4</option>
        </select>
    </div>
    <div class="col-12 form-group" id="sortable_rating">
    
        @if(isset($content) && isset($content->data))
           
            
            @foreach($content->data as $row)
                <div class="radio">
                    <label><input type="radio" name="rating_optradio" @if($row->checked) checked @endif ></label>
                    <input class="radio_label" type="text" value="{{$row->label}}">
                    <label>Score</label>
                    <input class ="radio_score" type="number"   value="{{$row->score}}" style="margin-right:1vw" required>
                    <a class="btn btn-xs mb-2 btn-danger del-btnx" style="cursor:pointer;" data-id="41">
                        <i class="fa fa-trash" style="color:white"></i>
                    </a>
                </div>
            @endforeach
        @else
            <div class="radio">
                <label  style="color:transparent"><input type="radio" name="rating_optradio" checked>Option</label>
                <input class="radio_label" type="text" value="1" style="margin-left:-2vw;;margin-right:5vw;z-index:20;" required>
                <label  >Score</label>
                <input  class ="radio_score" type="number"   value="0" style="margin-right:1vw" required>
                <a class="btn btn-xs mb-2 btn-danger del-btnx" style="cursor:pointer;" data-id="41">
                    <i class="fa fa-trash" style="color:white"></i>
                </a>
            </div>
            <div class="radio">
                <label  style="color:transparent"><input type="radio" name="rating_optradio" >Option</label>
                <input class="radio_label" type="text" value="2" style="margin-left:-2vw;;margin-right:5vw;z-index:20;" required>
                <label  >Score</label>
                <input  class ="radio_score" type="number"   value="0" style="margin-right:1vw" required>
                <a class="btn btn-xs mb-2 btn-danger del-btnx" style="cursor:pointer;" data-id="42">
                    <i class="fa fa-trash" style="color:white"></i>
                </a>
            </div>
    
            <div class="radio">
                <label  style="color:transparent"><input type="radio" name="rating_optradio" >Option</label>
                <input class="radio_label" type="text" value="3" style="margin-left:-2vw;margin-right:5vw;z-index:20;" required>
                <label  >Score</label>
                <input  class ="radio_score" type="number"   value="0" style="margin-right:1vw" required>
                <a class="btn btn-xs mb-2 btn-danger del-btnx" style="cursor:pointer;" data-id="42">
                    <i class="fa fa-trash" style="color:white"></i>
                </a>
            </div>
    
            <div class="radio">
                <label  style="color:transparent"><input type="radio" name="rating_optradio" >Option</label>
                <input class="radio_label" type="text" value="4" style="margin-left:-2vw;;margin-right:5vw;z-index:20;" required>
                <label  >Score</label>
                <input  class ="radio_score" type="number"   value="0" style="margin-right:1vw" required>
                <a class="btn btn-xs mb-2 btn-danger del-btnx" style="cursor:pointer;" data-id="42">
                    <i class="fa fa-trash" style="color:white"></i>
                </a>
            </div>
            <div class="radio">
                <label  style="color:transparent"><input type="radio" name="rating_optradio" >Option</label>
                <input class="radio_label" type="text" value="5" style="margin-left:-2vw;;margin-right:5vw;z-index:20;" required>
                <label  >Score</label>
                <input  class ="radio_score" type="number"   value="0" style="margin-right:1vw" required>
                <a class="btn btn-xs mb-2 btn-danger del-btnx" style="cursor:pointer;" data-id="42">
                    <i class="fa fa-trash" style="color:white"></i>
                </a>
            </div>
        @endif

        <p class="help-block"></p>
        @if($errors->has('question'))
            <p class="help-block">
                {{ $errors->first('question') }}
            </p>
        @endif
    </div>
</div>
{{-- End Rating --}}