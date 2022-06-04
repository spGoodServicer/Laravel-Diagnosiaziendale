{{-- Range --}}
@if(isset($content) && $content!='')
    @php
        $content = json_decode($content);
    @endphp
@else
    @php
        $content=null;        
    @endphp    
@endif
<div id="range_part" class="row question-box" @if(isset($display)) style="display:{{$display}};" @endif>
    <div class="col-12">
    <!-- <a id="dropdown_add" class="btn btn-success" style="color:white; margin-top:10px;">+ New</a> -->
    </div>
    @if(isset($content))
        <div class="col-12  form-group " id="sortable_drop1">
            <!-- <form> -->         
            <div class="radio">
                <label  style="">
                     Min Value
                    <input id="range_min_value" type="number" value="{{$content->min_value}}">
                </label>
                Max Value 
                <input id="range_max_value" type="number" value="{{$content->max_value}}">
                <label>Step</label>
                <input id="step_value" type="number"  class ="radio_score mr-2" placeholder="{{$content->steps}}">
            </div>
        </div>
        <div class="col-12">
        <div class="form-group">
            <label>Select Symbol</label>
            <select id="range_symbol" class="form-control">
                <option value="none" @if($content->symbol=="none") selected @endif>None</option>
                <option value="euro" @if($content->symbol=="euro") selected @endif>€</option>
            </select>
        </div>
        <div class="form-group">
            <label>Range Type</label>
            <select id="range_type" class="form-control">
                <option value="cursorbar" @if($content->type=="cursorbar") selected @endif>Cursor Bar</option>
                <option value="pulmibutton" @if($content->type=="pulmibutton") selected @endif>+/- Button</option>
            </select>
        </div>
    </div>
    @else
        <div class="col-12  form-group " id="sortable_drop1">
        <!-- <form> -->         
        <div class="radio">
            <label  style="">
                 Min Value
                <input id="range_min_value" type="number" value="1">
            </label>
            Max Value 
            <input id="range_max_value" type="number" value="10">
            <label>Step</label>
            <input type="number" id="step_value"  class ="radio_score mr-2" placeholder="0">
        </div>
        </div>
        <div class="col-12">
        <div class="form-group">
            <label>Select Symbol</label>
            <select id="range_symbol" class="form-control">
                <option value="none" selected>None</option>
                <option value="euro">€</option>
            </select>
        </div>
        <div class="form-group">
            <label>Range Type</label>
            <select id="range_type" class="form-control">
                <option value="cursorbar" selected>Cursor Bar</option>
                <option value="pulmibutton">+/- Button</option>
            </select>
        </div>
    </div>
    @endif
</div>
{{-- End Range --}}