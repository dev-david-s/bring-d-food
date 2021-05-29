/* components/RestaurantList/index.js */
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Image from "next/image";

import Link from "next/link";


const QUERY = gql`
  {
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`;

function RestaurantList(props) {
    const { loading, error, data } = useQuery(QUERY);
    if (error) return "Error loading restaurants";
    //if restaurants are returned from the GraphQL query, run the filter query
    //and set equal to variable restaurantSearch
    if (loading) return <h1>Fetching</h1>;
    if (data.restaurants && data.restaurants.length) {
        //searchQuery
        const searchQuery = data.restaurants.filter((query) =>
            query.name.toLowerCase().includes(props.search)
        );
        if (searchQuery.length != 0) {
            return (
                <div className="grid mt-8  gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
                    {searchQuery.map((res) => (
                        <div className="flex flex-col " key={res.id}>
                            <div className="bg-white shadow-md  rounded-3xl p-4">
                                <div className="flex-none lg:flex">
                                    <div className="flex-3 h-full w-full lg:h-48 lg:w-48   lg:mb-0 mb-3 relative">
                                        <img src={`${process.env.NEXT_PUBLIC_API_URL}${res.image[0].url}`}
                                            className=" w-full  object-scale-down lg:object-cover  lg:h-48 rounded-2xl" />
                                    </div>
                                    <div className="flex-1 ml-3 justify-evenly py-2">
                                        <div className="flex flex-wrap ">
                                            <div className="w-full flex-none text-xs text-blue-700 font-medium ">
                                                Restaurant
                                            </div>
                                            <h2 className="flex-auto text-lg font-medium">{res.name}</h2>
                                        </div>
                                        <p className="mt-3"></p>
                                        <div className="flex py-4  text-sm text-gray-600 ">
                                            <p className="line-clamp-3">{res.description}</p>
                                        </div>
                                        <div className="flex p-4 pb-2 border-t border-gray-200 "></div>
                                        <div className="flex justify-end space-x-3 text-sm font-medium">
                                            <button
                                                className="mb-2 md:mb-0 bg-gray-800 px-5 py-2 shadow-sm tracking-wider text-white rounded-full hover:bg-gray-600"
                                                type="button" aria-label="like">Visit Restaurant</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        } else {
            return <h1>No Restaurants Found</h1>;
        }
    }
    return <h5>Add Restaurants</h5>;
}
export default RestaurantList;