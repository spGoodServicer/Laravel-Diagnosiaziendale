{{-- Image --}}
@php
    $image_count = 2;
    if(isset($content) && $content != null &&$content != ''){
        $content = json_decode($content);
        if(is_array($content)){
            $col = isset($content[(sizeof($content))-1]->col)?$content[(sizeof($content))-1]->col:'';
        }
        else{
            $col = '';
        }
        
    }else{
        $content=null;
    }
@endphp
<div id="image_part" class="row question-box" @if(isset($display)) style="display:{{$display}};" @endif>
    <div class="col-12">
        <label for="">Select Display</label>
        <select name="image_file_display" class="form-control" id="image_file_display">
            <option value="col-12" {{isset($content)?($col == 'col-12')?'selected':'':''}}>1</option>
            <option value="col-6" {{isset($content)?($col == 'col-6')?'selected':'':''}}>2</option>
            <option value="col-3" {{isset($content)?($col == 'col-3')?'selected':'':''}}>3</option>
            <option value="col-4" {{isset($content)?($col == 'col-4')?'selected':'':''}}>4</option>
        </select>
    </div>
    <div class="col-md-12 form-body mt-4">                                    
        <div class="card card-default">
            <div class="card-body">
              <div id="actions" class="row">
                <div class="col-lg-6">
                  <div class="btn-group w-100">
                    <span class="btn btn-success col fileinput-button">
                      <i class="fas fa-plus"></i>
                      <span>Add files</span>
                    </span>
                  </div>
                </div>
                <div class="col-lg-6 d-flex align-items-center">
                  <div class="fileupload-process w-100">
                    <div id="total-progress" class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                      <div class="progress-bar progress-bar-success" style="width:0%;" data-dz-uploadprogress></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="table table-striped files" id="previews">
                @if($content && count($content)>1)
                    @foreach ($content as $row)
                        @if($loop->last)
                            @break
                        @endif
                        <div class="row mt-2 dz-processing dz-image-preview dz-success dz-complete" data-file-name='{{$row->file}}'>
                            <div class="col-auto">
                                <span class="preview"><img src="{{$row->file}}" alt="" data-dz-thumbnail data-xblocker="passed" style="width: 80px; height: 80px; object-fit: none; visibility: visible;" width="80px" height="80px"/></span>
                            </div>
                            
                            <div class="col-4 d-flex align-items-center contain-score">
                                <input type="number" placeholder="score" class="form-control image-score-value" value="{{$row->score}}" />
                            </div>
                            <div class="col-auto d-flex align-items-center">
                            <div class="btn-group">
                                <button data-dz-remove class="btn btn-danger delete">
                                <i class="fas fa-trash"></i>
                                </button>
                            </div>
                            </div>
                        </div>
                    @endforeach
                @endif
                <div id="template" class="row mt-2">
                  <div class="col-auto">
                      <span class="preview"><img src="data:," alt="" data-dz-thumbnail /></span>
                  </div>
                  <div class="col-4 d-flex align-items-center contain-progress">
                      <div class="progress progress-striped active w-100" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                        <div class="progress-bar progress-bar-success" style="width:0%;" data-dz-uploadprogress></div>
                      </div>
                  </div>
                  <div class="col-auto d-flex align-items-center">
                    <div class="btn-group">
                      <button data-dz-remove class="btn btn-danger delete">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
    </div>
</div>   
{{-- End Image --}}