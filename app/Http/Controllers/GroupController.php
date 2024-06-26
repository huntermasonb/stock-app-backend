<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;


class GroupController extends Controller
{
    /**
     * Display a listing of all Groups belonging to the authenticated user
     */
    public function index()
    {
        $groups = auth()->user()->group;
        return Inertia::render('Group/Index', [
            'groups' => $groups,
        ]);
    }

    /**
     * Show the form for creating a new Group
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
     * Store a newly created Group in storage.
     */
    public function store(Request $request)
    {
        $selectedStocks = $request->input('selectedStocks');
        $validatedData = $this->validateData($request);
        if (!$validatedData){
            return Redirect()->back()->with('error', 'Error: Invalid Data');
        } else {
            try {
                //Create a new group with the validated stock information from the user
                $data = new Group($validatedData);

                //Authorize the user and save the new group attached with the validated selected stocks from the user
                auth()->user()->group()->save($data);
                $data->stocks()->withTimestamps()->attach($validatedData['selectedStocks']);
                return to_route('group.index')->with('success', 'Group Successfully created.');
            } catch (\Exception $err){
                Log::error('Error: Group failed to be created\n', ['error' => $err->getMessage()]);
                return Redirect::back()->with('error', 'Error: Group failed to be created, please try again');
            }
        }
    }

    /**
     * Display the specified Group.
     */
    public function show($groupId)
    {
        $user = auth()->user();
        $userStocks = $user->stocks;

        //Tried making the call to stocks in one line, but it fails to pass the stock data to the group
        $group = $user->group()->findOrFail($groupId);
        $groupName = $group->name;
        $groupStocks = $group->stocks;

        /*
        Check to see which stocks exist within the groupStocks variable and filter them.
        This is to show the user which stocks have not been added to the group (are available to be added)
        */
        $userStockIds = $userStocks->pluck('id')->toArray();
        $groupStockIds = $groupStocks->pluck('id')->toArray();

        //Use array diff to find only stocks that have not been added to the specific group & pass only needed information to the view
        $userOnlyStockIds = array_diff($userStockIds, $groupStockIds);

        $userStocks = $userStocks->whereIn('id', $userOnlyStockIds);
        $groupStocks = $groupStocks->whereIn('id', $groupStockIds);

        if ($group && $userStockIds && $groupStocks->isNotEmpty()){
            return Inertia::render('Group/Show', [
                'groupName' => $groupName,
                'groupId' => $group->id,
                'userStocks' => $userStocks->values()->all(),
                'groupStocks' => $groupStocks->values()->all(),
            ]);
        } else {
            return Redirect::back()->with('error', 'Error: Failed to find group or associated stocks belonging to the group you selected.');
        }
    }

    /**
     * Show the form for editing the specified Group.
     */
    public function edit($groupId)
    {

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
            Log::error('Error: Failed to delete a group that does not exist or user was not authenticated. Group' . $group['name'] . ' with ');
            return Redirect::back()->with('error', 'Error: Group failed to be deleted because the group did not exist, or your session timed out.');
        } else {
            try {
                $group->delete();
                return to_route('group.index')->with('success', 'Group ' . $group['name'] . ' was succesfully deleted.');
            } catch (\Exception $err){
                Log::error('Error: Group' . $group['id'] . ' failed to be deleted', ['error' => $err->getMessage()]);
                return Redirect::back()->with('error', 'Error: Group failed to be deleted, please try again momentarily');
            }
        }
    }
}
