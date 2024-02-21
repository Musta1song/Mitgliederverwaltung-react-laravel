<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Member;


class MemberController extends Controller
{

  public function store(Request $request)
  {
    $Member = new Member([
      'FirstName' => $request->get('FirstName'),
      'SecondName' => $request->get('SecondName'),
      'BirthDate' => $request->get('BirthDate'),
      'MemberId' => $request->get('MemberId'),
      'MembershipFee'=> $request->get('MembershipFee'),
      'role'=> $request->get('role'),
      'EntryDate'=> $request->get('EntryDate'),
      'ExitDate'=> $request->get('ExitDate'),
      'isActive'=> $request->get('isActive'),
    ]);
    $Member->save();
    return response()->json('Successfully added');
  }

  public function getAll()
  {
    $data = Member::get();
    return response()->json($data, 200);
  }
  public function get($id)
  {
    $data = Member::find($id);
    return response()->json($data, 200);
  }
 
  public function update(Request $request, $id)
  {
  
    $post = Member::find($id);
    $post->update($request->all());
    return response()->json($post, 200);

  }

  public function destroy($id)
  {
    $post = Member::find($id);
    $post->delete();
    return response()->json($post, 200);
  }
}
