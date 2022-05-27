<div class="mb-2 radiogroup" data-required="@if($question->required=="1") 1 @else 0 @endif">
 
  @if($content != '')
  <div class="row">
    @foreach($content as $key=>$c)
      @if(($key+1) != sizeof($content))
      <div class="{{$content[(sizeof($content)-1)]->col}}">
        <div class="form-check form-check-inline">
          <input class="form-check-input radioautosave" type="radio" name="radiogroup" id="{{$question->id}}" value="{{$c->score}}" data-score="{{$c->score}}" {{(isset($answers[$question->id]) && $answers[$question->id] == $c->score) ?  'checked="checked"' : ''}}>
          <label class="form-check-label" for="inlineRadio1">{{$c->label}}</label>
        </div>
      </div>
      @endif
    @endforeach
  </div>
    <div class="message mt-2">
    </div>
  @endif
</div>