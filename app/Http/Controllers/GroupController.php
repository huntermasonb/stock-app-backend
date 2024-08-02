<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Services\StockServices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class GroupController extends Controller
{
    /**
     * Constructor to reference validateStockData to verify the data is in the same format as being "boookmarked" initially
     */
    private StockServices $stockServices;
    public function __construct(StockServices $stockServices){
        $this->stockServices = $stockServices;
    }
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
        if ($user && $stocks){
            return Inertia::render('Group/Create', [
                'user' => $user,
                'stocks' => $stocks,
            ]);
        }else {
            return Redirect::route('login');
        }
    }

    /**
     * Set attributes for Group database entry
     * */
    public function validateGroupData(Request $request): array
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
        $user = auth()->user();

        $validatedData = $this->validateGroupData($request);
        if (!$validatedData || !$user){
            return Redirect()->back()->with('error', 'Error: Invalid Data or User');
        } else {
            try {
                //Create a new group with the validated stock information from the user
                $group = new Group($validatedData);

                //Authorize the user and save the new group attached with the validated selected stocks from the user
                auth()->user()->group()->save($group);
                $group->stocks()->withTimestamps()->attach($validatedData['selectedStocks']);
                return to_route('group.index')->with('success', 'Group Successfully created.');
            } catch (\Exception $err){
                Log::error("Error: Group failed to be created\n", ['error' => $err->getMessage()]);
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
            return Redirect::back()->with('error', 'Error: Failed to find group or associated stocks belonging to the group selected.');
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
    public function update(Request $request, $groupId)
    {
        //        $selectedStocks = $request->input('selectedStocks');
        $validatedGroup = $this->validateGroupData($request->only(['name', 'selectedStocks']));

        $groupStocks = $validatedGroup['selectedStocks'];
        $groupName = $validatedGroup['name'];
        $groupStocksData = $request->input('selectedStocksData')->toArray();

        //Group ID is a numeric so return to avoid injection
        if (!is_numeric($groupId)){
            Log::error("Error: Group id must be numeric");
            return Redirect::back()->with('error', 'Error: Group id must be numeric');
        }
        // Query for the group ID associated with user groups or fail
        $user = auth()->user();
        $group = $user->group()->findOrFail($groupId);

        //Check if group is valid and user is authenticated before continuing.
        if (!$group || !$group->exists() || !auth()->check() || !$groupStocks){
            Log::error("Error: Failed to Update group because it does not exist, or user was not authenticated.\n Group Name: " . $group->name . " User Name: " . $user->getAuthIdentifierName());
            return Redirect::back()->with('error', 'Error: Failed to Update group because it does not exist or your session expired, please try logging in again.');
        } else {
            try{
                //Validate Stock data before writing anything to database
                $validatedStocks = $this->stockServices->validateStockData($groupStocksData);

                if (!$validatedStocks){
                    Log::error("Error: Failed to update Group due to invalid stock data\n Group Name: " . $group->name . " User Name: " . $user->getAuthIdentifierName() . "\n Stock Data: " . json_encode($validatedStocks));
                    return Redirect::back()->with('error', 'Error: Failed to update Group due to non-valid group or stock data');
                } else {
                    //Update group with new stocks by Name and Id
                    $group->where('name',$groupName)->where('id',$groupId)->update($validatedStocks);                }
                    return to_route('group.index')->with('success', 'Group successfully updated.');
            }catch (\Exception $err){
                //Log any errors
                Log::error("Error: Group $groupName failed to be updated\n", ['error' => $err->getMessage()]);
                return Redirect::back()->with('error', 'Error: Failed to update group, please try again');
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($groupId)
    {
        $group = auth()->user()->group()->findOrFail($groupId);
        if (!$group || !$group->exists() || !auth()->check()){
            Log::error("Error: Failed to delete a group that does not exist or user was not authenticated.\n Group Name: " . $group->name);
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
