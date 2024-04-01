import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import {useState} from "react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";


export default function create({auth, stocks}){
    // Inertia variables to assist with form processing
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        selectedStocks: [],
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('group.store'), {
            ...data
        });
    };

    function toggleStockSelection(selectedStocks, stockId) {
        if (selectedStocks.includes(stockId)) {
            return selectedStocks.filter(id => id !== stockId);
        } else {
            return [...selectedStocks, stockId];
        }
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={"New Group"} />
            <div>
                <form onSubmit={submit} name="New Group">
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        name="name"
                        placeholder={'Enter group name here'}
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        onChange={(e) => setData('name', e.target.value)}
                        isFocused={true}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />

                    <div className="flex flex-col p-2">
                        {console.log(data.selectedStocks)}
                        {console.log(data.name)}
                        {stocks && stocks.map((stock, index) => (
                            <label className="px-4" key={index} htmlFor={stock.name}>
                                <input name={stock.name} type="checkbox" onChange={() => setData('selectedStocks', toggleStockSelection(data.selectedStocks, stock.id))} value={stock.id}/>
                                {stock.symbol}
                            </label>
                        ))}
                    </div>
                    <InputError message={errors.selectedStocks} className="mt-2 text-indigo-950" />

                    <PrimaryButton disabled={processing}>
                        Create
                    </PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}

