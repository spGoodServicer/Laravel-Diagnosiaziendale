{{-- € --}}
@if(isset($content) && $content!='')
    @php
        $content = json_decode($content);
    @endphp
@else
    @php
        $content=null;        
    @endphp    
@endif
<div id="euro_part" class="row question-box" @if(isset($display)) style="display:{{$display}};" @endif>
    <div class="col-12  form-group mt-4" id="sortable-11">
        <div class="radio">
            <label>Label: </label>
            <input class="euro_label" type="text" value="@if($content){{$content->label}}@endif" >
            <label> Score: </label>
            <input class ="euro_score" type="text"   value="@if($content){{$content->score}}@endif" style="margin-right:1vw">
        </div>
    </div>
</div>
{{-- End € --}}