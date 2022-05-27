<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\File;

/**
 * Class Question
 *
 * @package App
 * @property text $question
 * @property string $question_image
 * @property integer $score
 */
class QuestionCondition extends Model
{
 //   use SoftDeletes;

    protected $fillable = ['question_id', 'logic_question_id', 'operators', 'condition_to_apply'];

     

}
