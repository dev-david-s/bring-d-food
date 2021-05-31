import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { gql } from "apollo-boost";

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
                <h1>{restaurant.name}</h1>
                <div>
                    {restaurant.dishes.map((res) => (
                        <div style={{ padding: 0 }} key={res.id}>
                            <div style={{ margin: "0 10px" }}>
                                <img
                                    style={{ height: 250 }}
                                    src={`${process.env.NEXT_PUBLIC_API_URL}${res.image[0].url}`}
                                />
                                <div>
                                    <h2>{res.name}</h2>
                                    <h4>{res.description}</h4>
                                </div>
                                <div className="card-footer">
                                    <button>
                                        + Add To Cart
                                     </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    }
    return <h1>Add Dishes</h1>;
}
export default Restaurants;