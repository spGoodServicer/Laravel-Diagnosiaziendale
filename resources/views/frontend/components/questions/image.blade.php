@if(!empty($content))
<style>
    .change-img-bg-color{
        background: rgba(20,6,62,1);
    }
</style>
<div class="row">
    @foreach($content[0]->image as $key=>$c)
   
    <div class="{{isset($content[(sizeof($content)-1)]->col)?$content[(sizeof($content)-1)]->col:''}} mt-2">
        <img id="preview" src="" width="100%">
            <div class="form-group">
                <img src="{{asset('uploads/image/')}}{{'/'.$c}}" class="{{(isset($answers[$question->id]) && $answers[$question->id] == $content[0]->score[$key]) ?  'change-img-bg-color' : ''}} img-thumbnail" alt="image{{$key}}" onclick="clickimg(this)" srcset="" >
                <input class="imageinputsave form-check-input " type="radio" style="display:none" name="imgradiogroup"  id="{{$question->id}}" value="{{$content[0]->score[$key]}}" data-score="{{$content[0]->score[$key]}}" {{(isset($answers[$question->id]) && $answers[$question->id] == $content[0]->score[$key]) ?  'selected="selected"' : ''}}>
            </div>
    </div> 
    @endforeach
</div>
@endif
@push('after-scripts')
    <script>
        function clickimg(ele){
            $('.change-img-bg-color').each(function(){
                $(this).removeClass('change-img-bg-color');
            });
            $(ele).addClass('change-img-bg-color');
            $(ele).siblings('.imageinputsave').prop("checked", true);
			
			var newid = $(ele).siblings('.imageinputsave').attr('id');
			var varvalue = $("input[type='radio'][id='"+newid+"']:checked").val();
			storeFun(newid,varvalue);
        }
		
		
		
    </script>
@endpush