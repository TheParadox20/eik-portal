import Link from "next/link"

export default function Status(){
    return(
        <div>
            <p className="text-xl font-semibold mb-4">Training Status</p>
            <p className="font-semibold mb-1">Status</p>
            <select name="" id="" className="w-full py-1 px-2 rounded-md my-2">
                <option value="">Active</option>
                <option value="">In Active</option>
            </select>
            <p className="mb-4">
                {
                    true?
                    'This training will be available for sale on the website.'
                    :
                    'This training is currently inactive and not available for sale.'
                }
            </p>
            {/* <p>Adverts</p>
            <input type="checkbox" name="" id="" />

            <button>Save Draft</button>
            <div className="flex gap-6 mt-6">
                <Link href={'/trainings'} className="py-2 w-20 rounded-lg hover:scale-105 border-2 block text-center text-gray-600">Discard</Link>
                <button className="py-2 w-20 rounded-lg hover:scale-105 bg-secondary text-white">Next</button>
            </div>

            <section>
                <h5 className="text-lg font-semibold mt-8 mb-4">Drafts</h5>
            </section> */}
        </div>
    )
}