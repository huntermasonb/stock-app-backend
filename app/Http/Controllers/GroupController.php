<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use mysql_xdevapi\Exception;
use function Laravel\Prompts\error;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groups = auth()->user()->group;
        return Inertia::render('Group/Index', [
            'groups' => $groups,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = auth()->user();
        $stocks = $user->stocks;
        if ($user){
            return Inertia::render('Group/Create', [
                'user' => $user,
                'stocks' => $stocks,
            ]);
        }else {
            return Redirect::route('login');
        }
    }

    /**
     * Set attributes for 'Group' database entry
     * */
    public function validateData(Request $request): array
    {
        return $request->validate([
            'name' => 'required|string|max:50',
            'selectedStocks' => 'required|array',
            'selectedStocks.*' => 'exists:stocks,id'
        ]);
    }

/**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $selectedStocks = $request->input('selectedStocks');
        $validatedData = $this->validateData($request);
        if (!$validatedData){
            return Redirect()->back()->with('error', 'Error: Invalid Data');
        } else {
            try {
                $data = new Group($validatedData);

                auth()->user()->group()->save($data);
                $data->stocks()->withTimestamps()->attach($validatedData['selectedStocks']);
                return to_route('group.index')->with('success', 'Group Successfully created.');
            } catch (\Exception $err){
                Log::error('Error: Group failed to be created', ['error' => $err->getMessage()]);
                return Redirect::back()->with('error', 'Error: Group failed to be created, please try again');
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($groupId)
    {
        $group = auth()->user()->group()->findOrFail($groupId);
        $stocks = $group->stocks;

        if ($group && $stocks->isNotEmpty()){
            return Inertia::render('Group/Show', [
               'group' => $group,
               'stocks' => $stocks,
            ]);
        } else {
            return Redirect::back()->with('error', 'Error: Failed to group or associated stocks belonging to the group you selected.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Group $group)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Group $group)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($groupId)
    {
        $group = auth()->user()->group()->findOrFail($groupId);
        if (!$group || !$group->exists() || !auth()->check()){
            Log::error('Error: Failed to delete a stock');
            return Redirect::back()->with('error', 'Error: Group failed to be deleted because the group did not exist, or your session timed out.');
        } else {
            try {
                $group->delete();
                return to_route('group.index')->with('success', 'Group ' . $group['name'] . 'was succesfully deleted.');
            } catch (\Exception $err){
                Log::error('Error: Group' . $group['id'] . 'failed to be deleted', ['error' => $err->getMessage()]);
                return Redirect::back()->with('error', 'Error: Group failed to be deleted, please try again momentarily');
            }
        }
    }
}
