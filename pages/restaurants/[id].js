import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { gql } from "apollo-boost";
import Header from "../../components/Header";
import Link from "next/link";

import Cart from "../../components/Cart";
import AppContext from "../../context/AppContext";
import { useContext } from "react";

const GET_RESTAURANT_DISHES = gql`
  query($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;

function Restaurants(props) {
    const appContext = useContext(AppContext);
    const router = useRouter();
    const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
        variables: { id: router.query.id },
    });

    if (error) return "Error Loading Dishes";
    if (loading) return <h1>Loading ...</h1>;
    if (data.restaurant) {
        const { restaurant } = data;
        return (
            <>
                <Header />
                <div className="flex w-full justify-center p-6 bg-gray-200">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">{restaurant.name}</h2>
                </div>
                <div className="grid mt-8  gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
                    {restaurant.dishes.map((res) => (
                        <div className="flex flex-col " key={res.id}>
                            <div style={{ margin: "0 10px" }}>
                                <div className="bg-white shadow-md  rounded-3xl p-4">
                                    <div className="flex-none lg:flex">
                                        <div className="flex-3 h-full w-full lg:h-48 lg:w-48   lg:mb-0 mb-3 relative">
                                            <img
                                                className=" w-full  object-scale-down lg:object-cover  lg:h-48 rounded-2xl"
                                                src={`${process.env.NEXT_PUBLIC_API_URL}${res.image[0].url}`}
                                            />
                                        </div>
                                        <div className="flex-1 ml-3 justify-evenly py-2">
                                            <div className="flex flex-wrap ">
                                                <div className="w-full flex-none text-xs text-blue-700 font-medium ">
                                                    Dish
                                                </div>
                                                <h2 className="flex-auto text-lg font-medium">{res.name}</h2>
                                            </div>
                                            <p className="mt-3"></p>
                                            <div className="flex py-4  text-sm text-gray-600 ">
                                                <p className="line-clamp-3">{res.description}</p>
                                            </div>
                                            <div className="flex p-4 pb-2 border-t border-gray-200 "></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-x-3 text-sm font-medium">
                                        <a onClick={() => appContext.addItem(res)}
                                            className="mb-2 md:mb-0 bg-gray-800 px-5 py-2 shadow-sm tracking-wider text-white rounded-full hover:bg-gray-600"
                                            aria-label="like">+ Add To Cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="">
                        <Cart />
                    </div>
                </div>
            </>
        );
    }
    return <h1>Add Dishes</h1>;
}
export default Restaurants;